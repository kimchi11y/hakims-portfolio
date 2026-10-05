"use client";

import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface RevealProps {
  children: React.ReactNode;
  /**
   * Stagger offset in ms. Keep sibling deltas between 30 and 80ms;
   * longer delays make the interface feel slow.
   */
  delay?: number;
  className?: string;
}

/**
 * Reveals its children once, when they scroll into view.
 *
 * The hidden state lives in `.reveal` (globals.css), so the transition itself
 * is pure CSS and retargets mid-flight. Callers nest `.reveal-clip` elements to
 * wipe images in behind the same observer.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    // Under reduced motion the fade still runs, but it should not wait for a
    // scroll intersection that may never happen for above-the-fold content.
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: prefersReducedMotion ? "100000px" : "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      data-revealed={revealed || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
