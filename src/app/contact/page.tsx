import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Reach AINT Foundation CIC at info@aintfoundationcic.co.uk for compassionate, non-judgmental support or information about our services.",
};

export default function ContactPage() {
  return (
    <div className="section-wrap" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="s-kicker" style={{ color: "var(--sage-d)" }}>
          Contact
        </div>
        <h1 className="s-title">Contact us</h1>
        <p className="s-body" style={{ marginBottom: 32 }}>
          You can reach AINT Foundation CIC directly at{" "}
          <a href="mailto:info@aintfoundationcic.co.uk" style={{ fontWeight: 600 }}>
            info@aintfoundationcic.co.uk
          </a>{" "}
          — a safe, confidential point of contact for anyone seeking compassionate,
          non‑judgmental support or information about our services.
        </p>

        <div
          style={{
            display: "grid",
            gap: 32,
            gridTemplateColumns: "minmax(0, 1fr)",
          }}
        >
          <div
            style={{
              background: "var(--white)",
              padding: 40,
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(24,36,28,0.04)",
              border: "1px solid rgba(92, 138, 111, 0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                color: "var(--char)",
                marginBottom: 20,
              }}
            >
              Send a message
            </h2>
            <ContactForm source="contact" submitLabel="Send message" />
          </div>

          <div
            style={{
              padding: 32,
              borderRadius: 16,
              background: "rgba(92,138,111,0.05)",
              border: "1px solid rgba(92,138,111,0.15)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24,
                color: "var(--char)",
                marginBottom: 16,
              }}
            >
              Contact
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9, color: "var(--text-m)" }}>
              <li>
                <a href="mailto:info@aintfoundationcic.co.uk">info@aintfoundationcic.co.uk</a>
              </li>
              <li>
                <a href="tel:+443000301309">+44 3000 301309</a>
              </li>
              <li>Location: United Kingdom</li>
              <li>AINT Foundation CIC</li>
              <li>Company Number: 17193409</li>
            </ul>

            <h3 style={{ marginTop: 28, fontSize: 16, color: "var(--char)" }}>Crisis Support Notice</h3>
            <p style={{ fontSize: 14, color: "var(--text-m)", marginBottom: 8 }}>
              We are not a crisis or emergency service.
            </p>
            <p style={{ fontSize: 14, color: "var(--text-m)", margin: 0 }}>
              <strong>If you need immediate help:</strong> Samaritans:{" "}
              <a href="tel:116123">116 123</a> · NHS: <a href="tel:111">111</a> · Emergency:{" "}
              <a href="tel:999">999</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
