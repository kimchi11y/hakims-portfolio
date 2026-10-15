import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/posts";
import { sortPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog - Hakim Razak",
  description:
    "Notes on software development, full-stack engineering, and things I'm learning.",
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts);

  return (
    <div className="pt-8 pb-16">
      <Reveal>
        <Link
          href="/"
          className="t-press inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </Reveal>

      <Reveal delay={50}>
        <header className="mt-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-lg text-[var(--text-dimmed)] leading-relaxed max-w-[660px]">
            Notes on software development, full-stack engineering, and things
            I&apos;m learning along the way.
          </p>
        </header>
      </Reveal>

      <div className="mt-8 space-y-6">
        {sortedPosts.map((post, index) => (
          <Reveal key={post.slug} delay={100 + index * 60}>
            <article>
              <PostCard post={post} />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
