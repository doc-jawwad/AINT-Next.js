type Env = {
  MAILCHIMP_API_KEY?: string;
  MAILCHIMP_AUDIENCE_ID?: string;
  MAILCHIMP_SERVER_PREFIX?: string;
};

type NewsletterBody = {
  email?: string;
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

function toBase64(value: string): string {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  const Buf = (globalThis as { Buffer?: { from: (s: string) => { toString: (enc: string) => string } } }).Buffer;
  if (Buf) {
    return Buf.from(value).toString("base64");
  }
  throw new Error("No base64 encoder available");
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

    const body = (await req.json()) as NewsletterBody;
    const email = (body.email ?? "").trim().toLowerCase();
    const honeypot = (body.website ?? "").trim();

    if (honeypot) {
      return json({ ok: true });
    }

    if (!email || !isValidEmail(email) || email.length > 200) {
      return json({ error: "Please enter a valid email." }, 400);
    }

    const apiKey = env.MAILCHIMP_API_KEY;
    const audienceId = env.MAILCHIMP_AUDIENCE_ID;
    const server =
      env.MAILCHIMP_SERVER_PREFIX ||
      apiKey?.split("-").pop() ||
      "";

    if (!apiKey || !audienceId || !server) {
      console.error("Mailchimp env vars are not configured");
      return json(
        { error: "Newsletter signup is temporarily unavailable." },
        503,
      );
    }

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    const auth = toBase64(`anystring:${apiKey}`);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: ["website-footer"],
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      title?: string;
      detail?: string;
      status?: number | string;
    };

    if (res.ok) {
      return json({ ok: true });
    }

    if (res.status === 400 && String(data.title).toLowerCase().includes("member exists")) {
      return json({ ok: true, alreadySubscribed: true });
    }

    console.error("Mailchimp error:", res.status, data);
    return json(
      { error: "Could not subscribe. Please try again later." },
      502,
    );
  } catch (err) {
    console.error("Newsletter API error:", err);
    return json({ error: "Unexpected error." }, 500);
  }
}
