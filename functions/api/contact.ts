type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
};

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  source?: string;
  website?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const RATE = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (RATE.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    RATE.set(ip, hits);
    return true;
  }
  hits.push(now);
  RATE.set(ip, hits);
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  try {
    const req = context.request;
    const env = context.env;

    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return json(
        { error: "Too many requests. Please try again shortly." },
        429,
        { "Retry-After": "60" },
      );
    }

    const body = (await req.json()) as ContactBody;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "contact").trim().slice(0, 80);
    const honeypot = (body.website ?? "").trim();

    if (honeypot) {
      return json({ ok: true });
    }

    if (!name || name.length > 200) {
      return json({ error: "Please enter your name." }, 400);
    }
    if (!email || !isValidEmail(email) || email.length > 200) {
      return json({ error: "Please enter a valid email." }, 400);
    }
    if (message.length > 5000) {
      return json({ error: "Message is too long." }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return json(
        { error: "Form is temporarily unavailable. Please email info@aintfoundationcic.co.uk." },
        503,
      );
    }

    const to = env.CONTACT_TO_EMAIL || "info@aintfoundationcic.co.uk";
    const from = env.RESEND_FROM_EMAIL || "AINT Foundation <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[AINT website] ${source}: ${name}`,
        text: [
          `Source: ${source}`,
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          message || "(No message provided)",
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Resend error:", res.status, errText);
      return json(
        { error: "Could not send your message. Please try again or email us directly." },
        502,
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return json({ error: "Unexpected error." }, 500);
  }
}
