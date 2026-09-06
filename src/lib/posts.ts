import postsData from "../data/posts.json";

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: { url: string; alt: string } | null;
  categoryIds: number[];
};

export type PostsFile = {
  categories: { id: number; name: string; slug: string }[];
  posts: Post[];
};

const data = postsData as PostsFile;

export function getAllPosts(): Post[] {
  return [...data.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return data.posts.find((p) => p.slug === slug);
}
