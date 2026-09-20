import fs from "fs";

const postsData = JSON.parse(fs.readFileSync("src/data/posts.json", "utf8"));
const redirectsFile = "public/_redirects";

// Base redirects rules (first 9 lines)
const baseRedirects = `/about               /about-us          301
/about/              /about-us/         301
/contact             /contact-us        301
/contact/            /contact-us/       301
/collabs             /partnerships-awards  301
/collabs/            /partnerships-awards/ 301
/privacy-policy-2    /privacy-policy    301
/privacy-policy-2/   /privacy-policy/   301
/https-www-youtube-com-aintfoundationcicwithtrish   https://www.youtube.com/@aintfoundationcicwithtrish   302
`;

const EXCLUDE_SLUGS = new Set(["about-us", "contact-us", "partnerships-awards"]);

let addedCount = 0;
let newRules = "\n# Article redirects to /blog/\n";

postsData.posts.forEach((p) => {
  if (!EXCLUDE_SLUGS.has(p.slug)) {
    newRules += `/${p.slug}   /blog/   301\n`;
    addedCount += 1;
  }
});

fs.writeFileSync(redirectsFile, baseRedirects + newRules, "utf8");
console.log(`Added ${addedCount} article redirect rules to ${redirectsFile} (excluded real pages: ${Array.from(EXCLUDE_SLUGS).join(", ")})`);
