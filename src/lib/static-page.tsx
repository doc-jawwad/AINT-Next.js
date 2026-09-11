import type { Metadata } from "next";
import HtmlContent from "../components/HtmlContent";
import { getPageHtml } from "./pages";

type PageDef = {
  slug: string;
  title: string;
  description?: string;
};

const PAGES: PageDef[] = [
  { slug: "about", title: "About", description: "Meet the team and mission behind AINT Foundation CIC." },
  { slug: "private-therapy", title: "Private Therapy", description: "Personalised 1:1 trauma-informed therapy sessions." },
  { slug: "community-support", title: "Community Support", description: "Low-cost and free community wellbeing support." },
  { slug: "training", title: "Training", description: "Learn and certify in the award-winning AINT Model." },
  { slug: "aint-books", title: "Books", description: "Books by Dr Trish Avery on healing, resilience, and community care." },
  { slug: "collabs", title: "Collaborations", description: "Partner with AINT Foundation CIC." },
  { slug: "booking", title: "Booking", description: "Choose the support that fits your needs today." },
  { slug: "book-private", title: "Book Private Therapy", description: "Book a private therapy session with AINT Foundation." },
  { slug: "book-sos", title: "Book SOS Support", description: "Urgent emotional support sessions — same-day or next available." },
  { slug: "community-access", title: "Community Access", description: "Access low-cost and free community support." },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-and-conditions", title: "Terms & Conditions" },
  { slug: "cookie-policy", title: "Cookie Policy" },
  { slug: "safeguarding", title: "Safeguarding" },
  { slug: "confidentiality", title: "Confidentiality" },
  { slug: "complaints", title: "Complaints" },
  { slug: "cancellation-policy", title: "Cancellation Policy" },
];

export function getStaticPage(slug: string): PageDef | undefined {
  return PAGES.find((p) => p.slug === slug);
}

export function StaticHtmlPage({ slug }: { slug: string }) {
  const html = getPageHtml(slug);
  return <HtmlContent html={html} />;
}

export function staticMetadata(slug: string): Metadata {
  const page = getStaticPage(slug);
  return {
    title: page?.title ?? slug,
    description: page?.description,
  };
}
