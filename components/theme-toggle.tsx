"use client";

/** Must match `THEME_STORAGE_KEY` in app/layout.tsx. */
const THEME_STORAGE_KEY = "theme";

/* Both glyphs ship in the DOM and globals.css picks one from
   `<html data-theme>`, so no glyph state exists to hydrate — the correct icon
   is already painted before React runs and clicks stay a pure DOM write. */

const buttonClassName =
  "t-press flex items-center justify-center w-10 h-10 rounded-xl text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-sunken)]";

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* Private mode / storage disabled: the choice simply does not persist. */
        }
      }}
      aria-label="Toggle theme"
      title="Toggle theme"
      className={className ? `${buttonClassName} ${className}` : buttonClassName}
    >
      <svg
        aria-hidden="true"
        className="theme-icon-sun w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        aria-hidden="true"
        className="theme-icon-moon w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}
