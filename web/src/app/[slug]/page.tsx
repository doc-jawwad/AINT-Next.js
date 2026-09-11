import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HtmlContent from "../../components/HtmlContent";
import { getAllPosts, getPostBySlug } from "../../lib/posts";
import { pageExists } from "../../lib/pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Prefer dedicated static pages over blog posts if both exist
  if (pageExists(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="page-header">
        <div className="s-kicker" style={{ justifyContent: "center" }}>Blog</div>
        <h1 style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>{post.title}</h1>
        <p style={{ textAlign: "center", color: "var(--text-l)", marginTop: 12 }}>{date}</p>
      </header>
      <section className="section-wrap" style={{ paddingTop: 20 }}>
        {post.featuredImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            style={{
              width: "100%",
              maxWidth: 900,
              margin: "0 auto 40px",
              display: "block",
              borderRadius: 20,
              aspectRatio: "16 / 9",
              objectFit: "cover",
            }}
          />
        ) : null}
        <HtmlContent html={post.content} className="blog-prose" />
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link href="/blog" className="btn-s">← Back to Blog</Link>
        </div>
      </section>
    </>
  );
}
