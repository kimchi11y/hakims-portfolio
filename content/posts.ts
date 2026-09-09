import type { Post } from "@/lib/posts";
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
];

export const posts: Post[] = entries.filter((entry) => entry.meta.published !== false);