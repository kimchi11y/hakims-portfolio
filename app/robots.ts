import type { MetadataRoute } from "next";

// `output: "export"` only emits metadata routes that are explicitly static.
export const dynamic = "force-static";

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
