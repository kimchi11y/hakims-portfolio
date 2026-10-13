import type { Post } from "@/lib/posts";
import HomelabPost from "./posts/homelab-journey.mdx";
import WelcomePost from "./posts/welcome-to-my-blog.mdx";

const entries: Post[] = [
  {
    slug: "welcome-to-my-blog",
    meta: {
      title: "Welcome to my blog",
      date: "2026-09-01",
      description:
        "I'm starting a blog to share what I learn about web development, full-stack engineering, and building things on the internet.",
      tags: ["Intro", "Web Development"],
    },
    Component: WelcomePost,
  },
  {
    slug: "homelab-journey",
    meta: {
      title: "Building My Homelab: Self-Hosting with Docker & Tailscale",
      date: "2026-09-26",
      description:
        "How I run my own Minecraft servers, a personal dashboard, and private services at home — and what it taught me about containers, networking, and security.",
      tags: ["Homelab", "Docker", "Self-Hosting", "Tailscale", "DevOps", "Next.js"],
    },
    Component: HomelabPost,
  },
];

export const posts: Post[] = entries.filter((entry) => entry.meta.published !== false);