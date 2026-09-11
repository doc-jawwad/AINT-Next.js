import type { Metadata } from "next";
import { StaticHtmlPage, staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("aint-books");

export default function Page() {
  return <StaticHtmlPage slug="aint-books" />;
}
