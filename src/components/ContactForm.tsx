"use client";

import { FormEvent, useState, type CSSProperties } from "react";

type Props = {
  source?: string;
  submitLabel?: string;
  showMessage?: boolean;
  className?: string;
};

export default function ContactForm({
  source = "contact",
  submitLabel = "Submit",
  showMessage = true,
  className,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message") || "",
          source,
          website: data.get("website") || "",
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor={`${source}-name`} style={labelStyle}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${source}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          style={inputStyle}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor={`${source}-email`} style={labelStyle}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${source}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
        />
      </div>
      {showMessage ? (
        <div style={{ marginBottom: 20 }}>
          <label htmlFor={`${source}-message`} style={labelStyle}>
            Comment or Message
          </label>
          <textarea
            id={`${source}-message`}
            name="message"
            rows={5}
            style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          />
        </div>
      ) : null}
      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", height: 1, overflow: "hidden" }}
      >
        <label htmlFor={`${source}-website`}>Website</label>
        <input id={`${source}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn-p" disabled={status === "loading"} style={{ width: "100%" }}>
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
      {status === "success" ? (
        <p style={{ marginTop: 16, color: "var(--sage-d)", fontWeight: 600 }} role="status">
          Thank you — we have received your message and will be in touch.
        </p>
      ) : null}
      {status === "error" ? (
        <p style={{ marginTop: 16, color: "#a33", fontWeight: 600 }} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--char)",
  marginBottom: 8,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid rgba(92, 138, 111, 0.2)",
  borderRadius: 8,
  fontSize: 16,
  fontFamily: "inherit",
  boxSizing: "border-box",
  background: "#fff",
  color: "var(--char)",
};
