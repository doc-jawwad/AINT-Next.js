import { readFileSync } from "fs";
import path from "path";

const HTML_DIR = path.join(process.cwd(), "src/data/html");

export function getPageHtml(slug: string): string {
  const file = path.join(HTML_DIR, `${slug}.html`);
  return readFileSync(file, "utf8");
}

export function pageExists(slug: string): boolean {
  try {
    getPageHtml(slug);
    return true;
  } catch {
    return false;
  }
}
