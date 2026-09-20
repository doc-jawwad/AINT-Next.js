export type PageDef = {
  slug: string;
  title: string;
  description?: string;
};

export const STATIC_PAGES: PageDef[] = [
  {
    slug: "home",
    title: "AINT Foundation CIC | Therapy, Training & Community Wellbeing",
    description:
      "Trauma-informed therapy, community wellbeing support and practitioner training built around the AINT Model. Without judgement. Without shame. Without fear.",
  },
  {
    slug: "about",
    title: "About AINT Foundation CIC | Dr Trish Avery & the AINT Model",
    description:
      "Learn about AINT Foundation CIC, Dr Trish Avery, and the AINT Model — Avery Integrative Non-Judgemental Therapy — that underpins our work.",
  },
  {
    slug: "private-therapy",
    title: "Private Therapy Sessions",
    description:
      "Trauma-informed private therapy for individuals, couples, children and groups using the AINT Model. Sessions from £70, available online and in person.",
  },
  {
    slug: "community-support",
    title: "Community Wellbeing Support",
    description:
      "Community wellbeing support for those who cannot access private therapy. Free sessions and subsidised places from £10, delivered through the AINT Model.",
  },
  {
    slug: "training",
    title: "Practitioner Training in the AINT Model",
    description:
      "Train in the AINT Model — Avery Integrative Non-Judgemental Therapy. Trauma-informed certification for therapists, counsellors and coaches. Level 1 from £115.",
  },
  {
    slug: "membership",
    title: "Membership",
    description:
      "Membership options with AINT Foundation CIC — supporting our mission and accessing ongoing wellbeing resources and community.",
  },
  {
    slug: "aint-books",
    title: "Books & Resources",
    description:
      "Books, guides and publications from AINT Foundation CIC on the AINT Model, trauma-informed practice and emotional wellbeing.",
  },
  {
    slug: "collabs",
    title: "Partnerships & Awards",
    description:
      "AINT Foundation CIC's community partnerships, awards and press recognition. Exploring collaborations that extend our mission and reach.",
  },
  {
    slug: "booking",
    title: "Booking",
    description: "Choose the support that fits your needs today.",
  },
  {
    slug: "book-private",
    title: "Book Private Therapy",
    description: "Book a private therapy session with AINT Foundation.",
  },
  {
    slug: "book-sos",
    title: "Book SOS Support",
    description: "Urgent emotional support sessions — same-day or next available.",
  },
  {
    slug: "community-access",
    title: "Access Community Support",
    description:
      "Find out how to access AINT Foundation CIC's community wellbeing support, including free and subsidised sessions.",
  },
  {
    slug: "contact-us",
    title: "Contact Us",
    description:
      "Contact AINT Foundation CIC by phone or email. A safe, confidential point of contact for support, therapy enquiries, training and partnership information.",
  },
  {
    slug: "blog",
    title: "Articles & Insights",
    description:
      "Trauma-informed insights, wellbeing guides and professional resources from AINT Foundation CIC and Dr Trish Avery.",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How AINT Foundation CIC collects, uses and protects your personal data in line with UK data protection law.",
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description:
      "The terms and conditions governing use of AINT Foundation CIC's website and services.",
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "How AINT Foundation CIC uses cookies on this website and how you can manage your preferences.",
  },
  {
    slug: "safeguarding",
    title: "Safeguarding Policy",
    description:
      "AINT Foundation CIC's commitment to safeguarding the welfare of all individuals engaged with our services, training and community programmes.",
  },
  {
    slug: "confidentiality",
    title: "Confidentiality Policy",
    description:
      "AINT Foundation CIC's approach to confidentiality in therapy — including the limits of confidentiality and when disclosure may be required.",
  },
  {
    slug: "complaints",
    title: "Complaints Policy",
    description:
      "How to raise a concern or complaint with AINT Foundation CIC. We take all concerns seriously and aim to resolve them promptly.",
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy",
    description:
      "AINT Foundation CIC's cancellation and rescheduling policy for therapy and training sessions.",
  },
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
