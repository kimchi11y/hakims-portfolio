import { describe, expect, it } from "vitest";
import { sortPosts, type Post } from "@/lib/posts";

function post(slug: string, date: string): Post {
  return {
    slug,
    meta: { title: slug, date, description: slug, tags: [] },
    Component: () => null,
  };
}

describe("sortPosts", () => {
  it("orders newest first", () => {
    const sorted = sortPosts([
      post("old", "2026-01-01"),
      post("newest", "2026-09-26"),
      post("middle", "2026-05-02"),
    ]);

    expect(sorted.map((entry) => entry.slug)).toEqual([
      "newest",
      "middle",
      "old",
    ]);
  });

  it("leaves the caller's array untouched", () => {
    // `posts` is a module-level array shared by /blog and the home preview;
    // an in-place sort would permanently re-order it for other readers.
    const input = [post("older", "2026-01-01"), post("newer", "2026-05-02")];
    const before = input.map((entry) => entry.slug);

    sortPosts(input);

    expect(input.map((entry) => entry.slug)).toEqual(before);
  });

  it("orders across a year boundary", () => {
    const sorted = sortPosts([post("lastYear", "2025-12-31"), post("thisYear", "2026-01-01")]);
    expect(sorted.map((entry) => entry.slug)).toEqual(["thisYear", "lastYear"]);
  });
});
