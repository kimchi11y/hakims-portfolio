import type { Post } from "@/lib/posts";
import WelcomePost from "./posts/welcome-to-my-blog.mdx";
import MdxSetupPost from "./posts/setting-up-mdx-in-nextjs.mdx";

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
    slug: "setting-up-mdx-in-nextjs",
    meta: {
      title: "Setting up MDX in Next.js",
      date: "2026-09-07",
      description:
        "A practical walkthrough of wiring up MDX with syntax highlighting in a Next.js App Router project.",
      tags: ["Next.js", "MDX", "Tutorial"],
    },
    Component: MdxSetupPost,
  },
];

export const posts: Post[] = entries.filter((entry) => entry.meta.published !== false);