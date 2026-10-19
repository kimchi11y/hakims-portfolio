import type { Post } from "@/lib/posts";
import HomelabPost from "./posts/homelab-journey.mdx";
import WelcomePost from "./posts/welcome-to-my-blog.mdx";
import CicdPost from "./posts/ci-cd-docker-github-actions-testing.mdx";

const entries: Post[] = [
  {
    slug: "ci-cd-docker-github-actions-testing",
    meta: {
      title: "From Push to Production: Docker, GitHub Actions, and a Test Gate",
      date: "2026-10-19",
      description:
        "How this site deploys itself from a push to main — a two-stage Docker image, GitHub Actions shipping to a VPS over SSH, and the test suite I put in front of it, including the two production bugs it found in the first hour.",
      tags: ["CI/CD", "Docker", "GitHub Actions", "Testing", "Next.js", "Playwright"],
    },
    Component: CicdPost,
  },
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