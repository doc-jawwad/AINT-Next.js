"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
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
    <div>
      <form
        className="footer-signup-form"
        onSubmit={onSubmit}
        noValidate
        style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}
      >
        <label className="screen-reader-text" htmlFor="footerSignupEmail">
          Email address
        </label>
        <input
          type="email"
          id="footerSignupEmail"
          name="email"
          required
          placeholder="Your email address"
          style={{ flex: 1, minWidth: 0 }}
        />
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-10000px", height: 1, overflow: "hidden" }}
        >
          <label htmlFor="footerSignupWebsite">Website</label>
          <input id="footerSignupWebsite" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          className="btn-p footer-signup-btn"
          style={{ flexShrink: 0 }}
          disabled={status === "loading"}
        >
          {status === "loading" ? "…" : "Join"}
        </button>
      </form>
      {status === "success" ? (
        <p style={{ marginTop: 10, fontSize: 13, color: "rgba(255,255,255,0.85)" }} role="status">
          Thanks — you are subscribed.
        </p>
      ) : null}
      {status === "error" ? (
        <p style={{ marginTop: 10, fontSize: 13, color: "#f8c9c9" }} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
