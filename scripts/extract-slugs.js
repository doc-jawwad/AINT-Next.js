import fs from "fs";

const data = JSON.parse(fs.readFileSync("src/data/posts.json", "utf8"));
data.posts.forEach((p) => {
  console.log(p.slug);
});
