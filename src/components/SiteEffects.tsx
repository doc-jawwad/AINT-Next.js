"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads theme interaction scripts after each navigation.
 * theme.js expects DOM nodes from Header/Footer + page content.
 */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const load = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[data-aint-src="${src}"]`);
        if (existing) {
          existing.remove();
        }
        const s = document.createElement("script");
        s.src = `${src}?t=${Date.now()}`;
        s.async = false;
        s.dataset.aintSrc = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(s);
      });

    let cancelled = false;
    (async () => {
      try {
        await load("/js/theme.js");
        if (!cancelled && pathname === "/") {
          await load("/js/front-interactions.js");
        }
      } catch {
        // non-fatal — static site still works
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
