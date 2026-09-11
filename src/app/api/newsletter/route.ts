import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NewsletterBody = {
  email?: string;
  website?: string; // honeypot
};

const RATE = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function clientIp(req: Request): string {
  return (
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

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const body = (await req.json()) as NewsletterBody;
    const email = (body.email ?? "").trim().toLowerCase();
    const honeypot = (body.website ?? "").trim();

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!email || !isValidEmail(email) || email.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const server =
      process.env.MAILCHIMP_SERVER_PREFIX ||
      apiKey?.split("-").pop() ||
      "";

    if (!apiKey || !audienceId || !server) {
      console.error("Mailchimp env vars are not configured");
      return NextResponse.json(
        { error: "Newsletter signup is temporarily unavailable." },
        { status: 503 },
      );
    }

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

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
      return NextResponse.json({ ok: true });
    }

    // Already subscribed
    if (res.status === 400 && String(data.title).toLowerCase().includes("member exists")) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    console.error("Mailchimp error:", res.status, data);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 502 },
    );
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
