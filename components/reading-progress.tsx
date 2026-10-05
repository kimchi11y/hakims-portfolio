"use client";

import { useEffect, useState } from "react";

/** Scroll-linked reading progress, driven by a transform so it stays on the GPU. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[60] h-0.5 w-full origin-left bg-[var(--foreground)]"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
