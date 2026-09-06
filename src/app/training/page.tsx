import type { Metadata } from "next";
import { StaticHtmlPage, staticMetadata } from "../../lib/static-page";

export const metadata: Metadata = staticMetadata("training");

export default function Page() {
  return <StaticHtmlPage slug="training" />;
}
