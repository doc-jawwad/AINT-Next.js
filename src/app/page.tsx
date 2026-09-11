import type { Metadata } from "next";
import HtmlContent from "../components/HtmlContent";
import { getPageHtml } from "../lib/pages";

export const metadata: Metadata = {
  title: "AINT Foundation – Community Interest Company",
  description:
    "Communities heal from the inside out. Trauma-informed therapeutic support, community wellbeing training, and practical emotional tools.",
};

export default function HomePage() {
  const html = getPageHtml("home");
  return <HtmlContent html={html} />;
}
