import type { Metadata } from "next";
import { StaticHtmlPage, staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("community-access");

export default function Page() {
  return <StaticHtmlPage slug="community-access" />;
}
