import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { formatDate, sortPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog - Hakim Razak",
  description:
    "Notes on software development, full-stack engineering, and things I'm learning.",
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts);

  return (
    <div className="pt-8 pb-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to home
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-lg text-[var(--text-dimmed)] leading-relaxed max-w-[660px]">
          Notes on software development, full-stack engineering, and things I&apos;m
          learning along the way.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {sortedPosts.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block bg-[var(--card-bg)] rounded-2xl p-4 hover:bg-zinc-200 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              </div>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight">
                {post.meta.title}
              </h2>
              <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">
                {post.meta.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-zinc-200 text-[var(--text-dimmed)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}