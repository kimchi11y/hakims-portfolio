import Image from "next/image";
import { personalData } from "@/lib/data";

export function Hero() {
  return (
    <section className="pt-8 pb-12">
      {/* Banner */}
      <div className="relative animate-fade-in-up">
        <div className="w-full h-[240px] md:h-[286px] rounded-2xl overflow-hidden relative bg-gradient-to-br from-zinc-100 to-red-200">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_20%_40%,rgba(120,40,180,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_45%_at_75%_30%,rgba(40,140,220,0.06)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_50%_70%,rgba(200,60,140,0.05)_0%,transparent_70%)]" />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-start relative z-10 -mt-[50px] ml-4">
          <div className="w-[92px] h-[92px] rounded-full bg-zinc-300 border-[6px] border-[var(--background)] overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-zinc-400 to-zinc-500 flex items-center justify-center text-3xl font-bold text-white">
              {personalData.name.first[0]}
              {personalData.name.last[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Name & Bio */}
      <div className="mt-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-9 animate-fade-in-up animation-delay-100">
          <span>{personalData.name.first}</span>
          <span>{personalData.name.last}</span>
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-normal text-[var(--text-dimmed)] animate-fade-in-up animation-delay-200">
          {personalData.title}
        </p>
        <p className="mt-6 text-lg text-[var(--text-dimmed)] leading-relaxed max-w-[660px] animate-fade-in-up animation-delay-300">
          Hey, I'm {personalData.name.first} {personalData.name.last}, a
          Computer Science student from{" "}
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
          . I'm passionate about software development and building full stack
          web applications.{" "}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-1 mt-6 animate-fade-in-up animation-delay-400">
        <a
          href="#projects"
          className="flex items-center gap-1.5 px-3 py-2 bg-[var(--card-bg)] rounded-xl text-base font-medium text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors"
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
        <a
          href={`mailto:${personalData.email}`}
          className="flex items-center gap-1.5 px-3 py-2 bg-[var(--card-bg)] rounded-xl text-base font-medium text-[var(--text-dimmed)] hover:text-[var(--foreground)] transition-colors"
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
    </section>
  );
}
