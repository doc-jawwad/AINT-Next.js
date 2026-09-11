import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on healing, trauma-informed care, and community wellbeing from AINT Foundation CIC.",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="page-header">
        <div className="s-kicker" style={{ justifyContent: "center" }}>Resources & Insights</div>
        <h1 style={{ textAlign: "center" }}>Thoughts on healing &amp; community</h1>
      </header>
      <section className="section-wrap" style={{ paddingTop: 40 }}>
        <div className="blog-card-grid">
          {posts.map((post) => {
            const excerpt = stripHtml(post.excerpt).slice(0, 160);
            const date = new Date(post.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <Link key={post.id} href={`/${post.slug}`} className="blog-card">
                {post.featuredImage?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="blog-card-img"
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="blog-card-img" />
                )}
                <div className="blog-card-body">
                  <div className="blog-card-date">{date}</div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  {excerpt ? <p className="blog-card-excerpt">{excerpt}…</p> : null}
                  <span className="blog-card-more">Read article →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
