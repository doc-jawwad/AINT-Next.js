import { getStaticPage } from "./page-meta";
import { isNoIndexPath } from "./seo-noindex";

export type Crumb = {
  label: string;
  href?: string;
};

const ROUTE_LABELS: Record<string, string> = {
  about: "About",
  "about-us": "About Us",
  "private-therapy": "Private Therapy",
  "community-support": "Community Support",
  training: "Training",
  membership: "Membership",
  "aint-books": "Books",
  collabs: "Collaborations & Awards",
  "partnerships-awards": "Partnerships & Awards",
  "community-access": "Community Access",
  blog: "Blog",
  contact: "Contact",
  "contact-us": "Contact Us",
  "privacy-policy": "Privacy Policy",
  "terms-and-conditions": "Terms & Conditions",
  "cookie-policy": "Cookie Policy",
  safeguarding: "Safeguarding",
  confidentiality: "Confidentiality",
  complaints: "Complaints",
  "cancellation-policy": "Cancellation Policy",
};

function isKnownRoute(segment: string): boolean {
  return Boolean(ROUTE_LABELS[segment] || getStaticPage(segment));
}

function labelForSegment(segment: string, fallbackTitle?: string): string {
  if (ROUTE_LABELS[segment]) return ROUTE_LABELS[segment];
  const fromMeta = getStaticPage(segment)?.title;
  if (fromMeta) return fromMeta;
  if (fallbackTitle) return fallbackTitle;
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Build a breadcrumb trail for the current path.
 * Returns null on home / booking pages (no trail shown).
 */
export function buildBreadcrumbs(
  pathname: string,
  options?: { currentLabel?: string }
): Crumb[] | null {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return null;
  if (isNoIndexPath(path)) return null;

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

  // Blog article: Home > Blog > Title
  if (
    segments.length === 1 &&
    !isKnownRoute(segments[0]) &&
    options?.currentLabel
  ) {
    crumbs.push({ label: "Blog", href: "/blog" });
    crumbs.push({ label: options.currentLabel });
    return crumbs;
  }

  let href = "";
  segments.forEach((segment, index) => {
    href += `/${segment}`;
    const isLast = index === segments.length - 1;
    const label = labelForSegment(
      segment,
      isLast ? options?.currentLabel : undefined
    );

    if (isLast) {
      crumbs.push({ label });
    } else {
      crumbs.push({ label, href });
    }
  });

  return crumbs;
}
