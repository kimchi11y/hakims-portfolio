import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published?: boolean;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  Component: ComponentType<MDXProps>;
}

/** Post dates are calendar days, not instants. `new Date("2026-09-01")` parses
 *  as UTC midnight, so the zone has to be pinned or a viewer west of UTC sees
 *  the previous day. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );
}