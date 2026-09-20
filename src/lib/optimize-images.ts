/**
 * Add loading/decoding hints to <img> tags in HTML fragments.
 * Keeps eager/high-priority images above the fold; lazy-loads the rest.
 */
export function optimizeHtmlImages(html: string): string {
  return html.replace(/<img\b([^>]*?)(\s*\/?)>/gi, (_match, attrs: string, closing: string) => {
    let a = attrs;
    const hasLoading = /\bloading\s*=/i.test(a);
    const hasDecoding = /\bdecoding\s*=/i.test(a);
    const isPriority =
      /\bfetchpriority\s*=\s*["']?high["']?/i.test(a) ||
      /\bloading\s*=\s*["']?eager["']?/i.test(a);

    if (!hasLoading) {
      a += isPriority ? ' loading="eager"' : ' loading="lazy"';
    }
    if (!hasDecoding) {
      a += isPriority ? ' decoding="sync"' : ' decoding="async"';
    }

    return `<img${a}${closing}>`;
  });
}
