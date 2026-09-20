/** Booking / scheduling paths that must stay out of search indexes and sitemaps. */
export const NOINDEX_PATH_PREFIXES = [
  "/book",
  "/book-private",
  "/book-individual",
  "/book-couples",
  "/book-children",
  "/book-sos",
  "/book-group",
  "/booking",
] as const;

export function isNoIndexPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return NOINDEX_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

export function isNoIndexSitemapUrl(url: string): boolean {
  try {
    return isNoIndexPath(new URL(url).pathname);
  } catch {
    return NOINDEX_PATH_PREFIXES.some((prefix) => url.includes(prefix));
  }
}
