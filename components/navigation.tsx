"use client";

import { useState } from "react";
import { personalData } from "@/lib/data";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

const pillLinkClassName =
  "text-base font-medium px-2.5 py-2 text-[var(--text-dimmed)] hover:text-[var(--foreground)] hover:underline underline-offset-4 transition-colors tracking-[-0.26px] leading-[1.1] whitespace-nowrap";

const menuLinkClassName =
  "px-3 py-2.5 rounded-xl text-base font-medium text-[var(--text-dimmed)] hover:text-[var(--foreground)] hover:underline underline-offset-4 transition-colors tracking-[-0.26px]";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 mt-2 bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between py-3">
        {/* Name badge */}
        <a
          href="#"
          className="flex items-center gap-1.5 bg-[var(--card-bg)] rounded-xl pl-2 pr-2.5 py-2 text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors min-w-0"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span className="text-base font-medium tracking-[-0.26px] leading-[1.1] truncate">
            {personalData.name.first} {personalData.name.last}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={pillLinkClassName}>
              {link.label}
            </a>
          ))}
          <a href={`mailto:${personalData.email}`} className={pillLinkClassName}>
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center w-10 h-10 text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors"
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

      {/* Mobile menu panel */}
      <div
        className={`md:hidden absolute inset-x-0 top-full mt-1 p-1.5 flex flex-col gap-0.5 rounded-2xl border border-[var(--border)] bg-background/95 backdrop-blur-md shadow-lg transition-all duration-200 ${
          menuOpen
            ? "visible opacity-100 translate-y-0 pointer-events-auto"
            : "invisible opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={menuLinkClassName}
          >
            {link.label}
          </a>
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
