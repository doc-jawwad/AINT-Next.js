import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import HtmlContent from "../../components/HtmlContent";
import { getPageHtml } from "../../lib/pages";
import { staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("community-access");

export default function Page() {
  const html = getPageHtml("community-access");
  const [before, after = ""] = html.split("<!--AINT_CONTACT_FORM-->");

  return (
    <>
      <HtmlContent html={before} />
      <div style={{ maxWidth: 600, margin: "0 auto 80px", padding: "0 20px" }}>
        <div
          className="cs-wpforms-wrap"
          style={{
            background: "var(--white)",
            padding: 40,
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(24,36,28,0.04)",
            border: "1px solid rgba(92, 138, 111, 0.1)",
          }}
        >
          <ContactForm source="community-access" submitLabel="Submit" />
        </div>
      </div>
      <HtmlContent html={after} />
    </>
  );
}
