import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { formatDate } from "@/lib/posts";
import { Reveal } from "@/components/reveal";
import { ReadingProgress } from "@/components/reading-progress";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} - Hakim Razak`,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { Component } = post;

  return (
    <>
      <ReadingProgress />
      <article className="pt-8 pb-16">
        <Reveal>
          <Link
            href="/blog"
            className="t-press inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>
        </Reveal>

        <Reveal delay={50}>
          <header className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.meta.title}
            </h1>
            <div className="mt-3 text-sm font-medium text-[var(--text-muted)]">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-dimmed)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </Reveal>

        <hr className="my-8 border-[var(--border)]" />

        <Reveal delay={100}>
          <Component />
        </Reveal>
      </article>
    </>
  );
}
