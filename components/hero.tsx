import Image from "next/image";

import { personalData } from "@/lib/data";
import { ResumeLink, ResumeDownloadLink } from "./resume-link";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="pt-8 pb-12">
      {/* Decorative: animated ASCII nebula. Sized by the CSS font-size;
          the fixed-height frame crops the tall piece to a banner. */}
      <Reveal>
        <div className="w-full h-[180px] sm:h-[240px] md:h-[286px] rounded-2xl overflow-hidden relative bg-background">
          <ascii-art
            piece="nebula-drift"
            look="binary"
            bg="#040406"
            size="12"
            className="nebula-art absolute inset-0"
          ></ascii-art>
        </div>
      </Reveal>

      {/* Name & role */}
      <Reveal delay={60} className="mt-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-9">
          {personalData.name.first} {personalData.name.last}
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-normal text-[var(--text-dimmed)]">
          {personalData.title}
        </p>
      </Reveal>

      {/* Bio */}
      <Reveal delay={120}>
        <p className="mt-6 text-lg text-[var(--text-dimmed)] leading-relaxed max-w-[660px]">
          Hey, I&apos;m {personalData.name.first} {personalData.name.last}, a
          Computer Science student at{" "}
          <span className="font-semibold text-[var(--foreground)]">
            International Islamic University Malaysia
          </span>{" "}
          building full-stack web applications. I&apos;m currently seeking a
          six-month software engineering internship (February – August 2027) in{" "}
          <span className="inline-flex items-center gap-1">
            <span className="font-semibold text-[var(--foreground)]">
              Kuala Lumpur, Malaysia
            </span>
            <Image
              src="/malaysia-flag-icon.svg"
              alt="Malaysia"
              width={16}
              height={16}
              className="w-4 h-4 inline-block"
            />
          </span>
          .
        </p>
      </Reveal>

      {/* CTA buttons */}
      <Reveal delay={180}>
        <div className="flex flex-wrap items-center gap-1 mt-6">
          <a
            href="#projects"
            className="t-press flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-sunken)] rounded-xl text-base font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-hover)]"
          >
            <span>View work</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <ResumeLink className="t-press flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-sunken)] rounded-xl text-base font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-hover)]" />
          <ResumeDownloadLink className="t-press flex items-center justify-center w-10 h-10 bg-[var(--surface-sunken)] rounded-xl text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-hover)]" />
          <a
            href={`mailto:${personalData.email}`}
            className="t-press flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-sunken)] rounded-xl text-base font-medium text-[var(--text-dimmed)] hoverable:text-[var(--foreground)] hoverable:bg-[var(--surface-hover)]"
          >
            <span>Contact</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
