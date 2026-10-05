import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://hakimrazak.com/sitemap.xml",
    host: "https://hakimrazak.com",
  };
}
