"use client";

import { useState } from "react";
import { experienceData } from "@/lib/data";

export function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">Experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[17px] top-[36px] bottom-4 w-px bg-[var(--border)]" />

        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <ExperienceEntry
              key={exp.id}
              experience={exp}
              index={index}
              isExpanded={expandedId === exp.id}
              onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceEntryProps {
  experience: {
    id: number;
    company: string;
    role: string;
    type: string;
    date: string;
    location: string;
    logo: string;
    bullets: string[];
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceEntry({ experience, index, isExpanded, onToggle }: ExperienceEntryProps) {
  return (
    <div
      className="flex gap-4 items-start cursor-pointer group"
      onClick={onToggle}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-9 h-9 mt-[6px] rounded-xl bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-zinc-400 to-zinc-500 flex items-center justify-center text-xs font-bold text-white">
          {experience.company.split(" ").map((w) => w[0]).join("").substring(0, 2)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 rounded-xl p-3 hover:bg-[var(--card-bg)] transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-base font-medium">{experience.company}</span>
              <span className="text-sm text-[var(--text-dimmed)]">- {experience.role}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-dimmed)] flex-wrap">
              <span>{experience.type}</span>
              <span className="w-px h-4 bg-[var(--border)]"></span>
              <span>{experience.date}</span>
              <span className="w-px h-4 bg-[var(--border)]"></span>
              <span>{experience.location}</span>
            </div>
          </div>
          <svg
            className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Expandable content */}
        <div
          className={`grid transition-all duration-200 ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mt-3 space-y-1 text-sm text-[var(--text-muted)] font-medium list-disc ml-5">
              {experience.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
