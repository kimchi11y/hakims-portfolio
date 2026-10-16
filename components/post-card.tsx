import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  /** The home preview nests these under an h2 section heading. */
  titleAs?: "h2" | "h3";
}

export function PostCard({ post, titleAs: Title = "h2" }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="t-press block bg-[var(--surface-sunken)] rounded-2xl p-4 hoverable:bg-[var(--surface-hover)]"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
        <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
      </div>
      <Title className="mt-1.5 text-xl font-semibold tracking-tight">
        {post.meta.title}
      </Title>
      <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">
        {post.meta.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {post.meta.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-dimmed)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
