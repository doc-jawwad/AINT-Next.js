import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://aintfoundationcic.co.uk",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/privacy-policy-2": "/privacy-policy",
    "/book": "/booking",
    "/book-individual": "/book-private?session=individual",
    "/book-couples": "/book-private?session=couples",
    "/book-children": "/book-private?session=children",
    "/book-group": "/book-private?session=group",
  },
});
