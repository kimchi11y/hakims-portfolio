"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { personalData } from "@/lib/data";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
];

const SCROLL_THRESHOLD = 8;

const pillLinkClassName =
  "t-press rounded-lg text-base font-medium px-2.5 py-2 text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:underline underline-offset-4 tracking-[-0.26px] leading-[1.1] whitespace-nowrap";

const menuLinkClassName =
  "t-color px-3 py-2.5 rounded-xl text-base font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-sunken)]";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 mt-2 bg-background/80 backdrop-blur-md border-b t-color ${
        scrolled ? "border-[var(--border)]" : "border-transparent"
      }`}
    >
      <div className="flex items-center justify-between py-3">
        {/* Name badge */}
        <Link
          href="/"
          className="t-press flex items-center gap-1.5 rounded-xl pl-2 pr-2.5 py-2 text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] min-w-0"
        >
          <span className="text-base font-medium tracking-[-0.26px] leading-[1.1] truncate">
            {personalData.name.first} {personalData.name.last}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={pillLinkClassName}>
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${personalData.email}`} className={pillLinkClassName}>
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="t-press md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-sunken)]"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel — scales from its trigger, not from centre. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden absolute inset-x-0 top-full mt-1 p-1.5 flex flex-col gap-0.5 rounded-2xl border border-[var(--border)] bg-background/95 backdrop-blur-md shadow-lg origin-top-right t-panel ${
          menuOpen
            ? "visible opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "invisible opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={menuLinkClassName}
          >
            {link.label}
          </Link>
        ))}
        <a
          href={`mailto:${personalData.email}`}
          onClick={() => setMenuOpen(false)}
          className={menuLinkClassName}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
