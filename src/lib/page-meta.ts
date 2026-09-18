export type PageDef = {
  slug: string;
  title: string;
  description?: string;
};

export const STATIC_PAGES: PageDef[] = [
  { slug: "about", title: "About", description: "Meet the team and mission behind AINT Foundation CIC." },
  { slug: "private-therapy", title: "Private Therapy", description: "Personalised 1:1 trauma-informed therapy sessions." },
  { slug: "community-support", title: "Community Support", description: "Low-cost and free community wellbeing support." },
  { slug: "training", title: "Training", description: "Learn and certify in the award-winning AINT Model." },
  { slug: "membership", title: "Membership", description: "AINT annual membership — £70 per year for affiliation, resources, and licensing pathway." },
  { slug: "aint-books", title: "Books", description: "Books by Dr Trish Avery on healing, resilience, and community care." },
  { slug: "collabs", title: "Collaborations & Awards", description: "Partners, awards, and press features for AINT Foundation CIC." },
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
  return STATIC_PAGES.find((p) => p.slug === slug);
}

export function staticPageTitle(slug: string): string {
  return getStaticPage(slug)?.title ?? slug;
}

export function staticPageDescription(slug: string): string | undefined {
  return getStaticPage(slug)?.description;
}
