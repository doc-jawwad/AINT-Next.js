import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  source?: string;
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

    const body = (await req.json()) as ContactBody;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "contact").trim().slice(0, 80);
    const honeypot = (body.website ?? "").trim();

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !isValidEmail(email) || email.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Form is temporarily unavailable. Please email info@aintfoundationcic.co.uk." },
        { status: 503 },
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "info@aintfoundationcic.co.uk";
    const from =
      process.env.RESEND_FROM_EMAIL || "AINT Foundation <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[AINT website] ${source}: ${name}`,
      text: [
        `Source: ${source}`,
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message || "(No message provided)",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again or email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
