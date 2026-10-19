import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";

const SITE_URL = "https://hakimrazak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.meta.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
