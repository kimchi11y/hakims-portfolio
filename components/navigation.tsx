import Image from "next/image";
import { personalData } from "@/lib/data";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between py-3 mt-2">
      <div className="flex items-center gap-0.5 min-w-0">
        <span className="flex items-center gap-1.5 bg-[var(--card-bg)] rounded-xl pl-2 pr-2.5 py-2 text-[var(--text-dimmed)] min-w-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span className="text-base font-medium tracking-[-0.26px] leading-[1.1] truncate">
            {personalData.name.first} {personalData.name.last}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <a
          href="#"
          title="Malaysia"
          className="text-base font-medium px-2.5 py-2 rounded-xl bg-[var(--card-bg)] text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors tracking-[-0.26px] leading-[1.1] whitespace-nowrap flex items-center gap-1.5"
        >
          <Image
            src="/malaysia-flag-icon.svg"
            alt="Malaysia Flag"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>Malaysia</span>
        </a>
        <a
          href={`mailto:${personalData.email}`}
          className="text-base font-medium px-2.5 py-2 rounded-xl bg-[var(--card-bg)] text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors tracking-[-0.26px] leading-[1.1] whitespace-nowrap"
        >
          Contact
        </a>
        <a
          href="#projects"
          className="text-base font-medium px-2.5 py-2 rounded-xl bg-[var(--card-bg)] text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors tracking-[-0.26px] leading-[1.1] whitespace-nowrap"
        >
          Work
        </a>
      </div>
    </nav>
  );
}
