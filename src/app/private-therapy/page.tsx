import type { Metadata } from "next";
import { StaticHtmlPage, staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("private-therapy");

export default function Page() {
  return <StaticHtmlPage slug="private-therapy" />;
}
