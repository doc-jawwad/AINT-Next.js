"use client";

import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const QUICK = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Who We Serve", href: "/#serve" },
  { label: "How to Get Started", href: "/#start" },
  { label: "The Team", href: "/#team" },
];

const SERVICES = [
  { label: "Training", href: "/training" },
  { label: "Community Support", href: "/community-support" },
  { label: "Private Therapy", href: "/private-therapy" },
  {
    label: "SOS Booking",
    href: "https://book.carepatron.com/Aint-Foundation-CIC/Aint-Foundation?p=Wd4kcNkaS2e-6Py4IfQBCA&s=OwaP1NrA&i=ir7KLD-y",
  },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Confidentiality", href: "/confidentiality" },
  { label: "Complaints", href: "/complaints" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aint-foundation-cic/",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Aint.foundation.cic/",
    path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aint_foundation_cic/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AINTFoundationCICwithTrish",
    path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
  },
];

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="footer-brand footer-about">
            <div>
              <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
                <div className="logo-orb">A</div>
                <div>
                  <div className="logo-name">AINT Foundation CIC</div>
                  <div className="logo-sub">Community Interest Company</div>
                </div>
              </Link>
              <div
                className="footer-cic-trust"
                style={{
                  marginTop: 24,
                  padding: 18,
                  background: "rgba(92,138,111,0.15)",
                  border: "1px solid rgba(92,138,111,0.3)",
                  borderRadius: 16,
                }}
              >
                <strong style={{ display: "block", fontSize: 14, color: "#fff", marginBottom: 6 }}>
                  AINT Foundation CIC — A Community Interest Company
                </strong>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, display: "block" }}>
                  Private therapy income helps fund low-cost and free community support.
                </span>
              </div>

              <div
                className="footer-awards"
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "stretch",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/awards/awards-logos-strip.webp"
                  alt="AINT Foundation awards and partner logos"
                  style={{
                    height: 56,
                    width: "auto",
                    maxWidth: "100%",
                    display: "block",
                    borderRadius: 8,
                    background: "#fff",
                    padding: "6px 10px",
                    objectFit: "contain",
                    boxSizing: "border-box",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/partners/cpd-group.webp"
                  alt="The CPD Group"
                  style={{
                    height: 56,
                    width: "auto",
                    maxWidth: 120,
                    display: "block",
                    borderRadius: 8,
                    background: "#fff",
                    padding: "6px 10px",
                    objectFit: "contain",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div className="footer-brand-btns" style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: 16 }}>
                <Link href="/community-access" className="btn-gold footer-brand-btn" style={{ flex: 1, textAlign: "center", padding: "12px 8px", fontSize: 13, minWidth: 0 }}>
                  Access Community Support
                </Link>
                <Link href="/book-private" className="btn-p footer-brand-btn" style={{ flex: 1, textAlign: "center", padding: "12px 8px", fontSize: 13, minWidth: 0 }}>
                  Book a Session
                </Link>
              </div>
            </div>

            <div className="footer-socials" aria-label="Social links">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} className="footer-social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-widget">
              <h2>Quick Links</h2>
              <ul>
                {QUICK.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-widget">
              <h2>Services</h2>
              <ul>
                {SERVICES.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} className="footer-service-text" target="_blank" rel="noopener noreferrer">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="footer-service-text">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-widget">
              <h2>Legal & Policies</h2>
              <ul>
                {LEGAL.map((l) => (
                  <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer-widget footer-contact">
              <h2>Contact</h2>
              <ul>
                <li><a href="mailto:info@aintfoundationcic.co.uk">info@aintfoundationcic.co.uk</a></li>
                <li><a href="tel:+443000301309">+44 3000 301309</a></li>
                <li><span className="footer-service-text">Location: United Kingdom</span></li>
                <li><span className="footer-service-text">AINT Foundation CIC</span></li>
                <li><span className="footer-service-text">Company Number: 17193409</span></li>
              </ul>
            </div>

            <div
              className="footer-crisis-horizontal"
              style={{
                gridColumn: "1 / -1",
                padding: "24px 32px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Crisis Support Notice</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>We are not a crisis or emergency service.</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <strong style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  If you need immediate help:
                </strong>
                <div style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 600 }}>
                  <span><span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginRight: 6 }}>Samaritans:</span> <a href="tel:116123" style={{ color: "#fff", textDecoration: "none" }}>116 123</a></span>
                  <span><span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginRight: 6 }}>NHS:</span> <a href="tel:111" style={{ color: "#fff", textDecoration: "none" }}>111</a></span>
                  <span><span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginRight: 6 }}>Emergency:</span> <a href="tel:999" style={{ color: "#fff", textDecoration: "none" }}>999</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-signup">
          <div className="footer-signup-copy">
            <div className="footer-signup-title">Join our updates on training and wellbeing</div>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-bottom">
          <div className="f-copy">© {new Date().getFullYear()} AINT Foundation CIC</div>
          <div className="footer-legal">
            <span>AINT Foundation CIC</span>
          </div>
        </div>
      </footer>

      <div className="aint-quiz-modal" id="aintQuizModal" aria-hidden="true" hidden>
        <div className="aint-quiz-backdrop" data-aint-quiz-close="" />
        <div className="aint-quiz-panel" role="dialog" aria-modal="true" aria-label="2-minute quiz">
          <button type="button" className="aint-quiz-close" aria-label="Close quiz" data-aint-quiz-close="">×</button>
          <div className="aint-quiz-inner" data-aint-quiz-root="">
            {/* Rendered by theme.js */}
          </div>
        </div>
      </div>

      <button
        className="btt"
        id="btt"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
