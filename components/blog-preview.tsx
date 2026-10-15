import Link from "next/link";
import { posts } from "@/content/posts";
import { sortPosts } from "@/lib/posts";
import { PostCard } from "./post-card";
import { Reveal } from "./reveal";

const MAX_PREVIEW = 3;

export function BlogPreview() {
  const latest = sortPosts(posts).slice(0, MAX_PREVIEW);
  if (latest.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Blog</h2>
        <Link
          href="/blog"
          className="t-press flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)]"
        >
          All posts
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="space-y-6">
        {latest.map((post, index) => (
          <Reveal key={post.slug} delay={index * 60}>
            <PostCard post={post} titleAs="h3" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
