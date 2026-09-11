import type { Metadata } from "next";
import { StaticHtmlPage, staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("safeguarding");

export default function Page() {
  return <StaticHtmlPage slug="safeguarding" />;
}
