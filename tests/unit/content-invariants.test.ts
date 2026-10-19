import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { posts } from "@/content/posts";

const POSTS_DIR = join(process.cwd(), "content", "posts");
const CANONICAL_ORIGIN = "https://hakimrazak.com";
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const URL_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("content/posts", () => {
  it("ships at least one published post", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("keeps every slug unique", () => {
    const slugs = posts.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps every slug usable as a URL path segment", () => {
    // The slug is spliced into /blog/<slug> and into generateStaticParams.
    for (const entry of posts) {
      expect(entry.slug, `"${entry.slug}" is not a URL-safe slug`).toMatch(
        URL_SLUG,
      );
    }
  });

  it("names each post after the MDX file it renders", () => {
    for (const entry of posts) {
      const source = join(POSTS_DIR, `${entry.slug}.mdx`);
      expect(existsSync(source), `${source} is missing`).toBe(true);
    }
  });

  it("uses parseable ISO dates", () => {
    for (const entry of posts) {
      const { slug, meta } = entry;
      expect(meta.date, `${slug} has a non-ISO date`).toMatch(ISO_DATE);
      expect(
        Number.isNaN(Date.parse(meta.date)),
        `${slug} has an unparseable date`,
      ).toBe(false);
    }
  });

  it("fills in the fields the listing and cards render", () => {
    for (const entry of posts) {
      const { slug, meta } = entry;
      expect(meta.title.trim(), `${slug} has no title`).not.toBe("");
      expect(meta.description.trim(), `${slug} has no description`).not.toBe(
        "",
      );
    }
  });

  it("gives every post at least one distinct tag", () => {
    for (const entry of posts) {
      const { slug, meta } = entry;
      expect(Array.isArray(meta.tags), `${slug} has no tag array`).toBe(true);
      expect(meta.tags.length, `${slug} has no tags`).toBeGreaterThan(0);
      for (const tag of meta.tags) {
        expect(tag.trim(), `${slug} has an empty tag`).not.toBe("");
      }
      expect(new Set(meta.tags).size, `${slug} repeats a tag`).toBe(
        meta.tags.length,
      );
    }
  });

  it("never leaks an unpublished draft into the listing", () => {
    // `content/posts.ts` filters `published: false` entries; registering a
    // draft must not make it appear in /blog or the home preview.
    for (const entry of posts) {
      expect(entry.meta.published, `${entry.slug} is a draft`).not.toBe(false);
    }
  });
});

describe("sitemap", () => {
  it("advertises the home page, the blog index, and every post", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));

    expect(urls.has(CANONICAL_ORIGIN)).toBe(true);
    expect(urls.has(`${CANONICAL_ORIGIN}/blog`)).toBe(true);
    for (const entry of posts) {
      expect(
        urls.has(`${CANONICAL_ORIGIN}/blog/${entry.slug}`),
        `${entry.slug} is missing from the sitemap`,
      ).toBe(true);
    }
  });

  it("uses absolute urls on the canonical origin", () => {
    // `new URL` throws on a relative path, which is exactly the failure Next
    // would surface as a broken sitemap.
    for (const entry of sitemap()) {
      const url = new URL(entry.url);
      expect(url.protocol).toBe("https:");
      expect(url.host).toBe("hakimrazak.com");
    }
  });
});
