"use client";

import { useId, useState } from "react";
import { experienceData, type ExperienceEntry } from "@/lib/data";
import { Reveal } from "./reveal";

export function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-12 scroll-mt-24">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
        Experience
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[17px] top-[36px] bottom-4 w-px bg-[var(--border)]" />

        <div className="space-y-6">
          {experienceData.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 60}>
              <ExperienceRow
                entry={entry}
                isExpanded={expandedId === entry.id}
                onToggle={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceRowProps {
  entry: ExperienceEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceRow({ entry, isExpanded, onToggle }: ExperienceRowProps) {
  const panelId = useId();

  return (
    <div className="flex gap-4 items-start">
      {/* Icon */}
      <div className="flex-shrink-0 w-9 h-9 mt-[6px] rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)] flex items-center justify-center z-10 overflow-hidden">
        <span className="w-full h-full bg-[var(--foreground)] flex items-center justify-center text-xs font-bold text-[var(--background)]">
          {entry.company
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .substring(0, 2)}
        </span>
      </div>

      <div className="flex-1">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className="t-color w-full rounded-xl p-3 text-left hoverable:bg-[var(--surface-sunken)]"
        >
          <span className="flex items-start justify-between">
            <span className="block">
              <span className="flex items-baseline gap-1 flex-wrap">
                <span className="text-base font-medium">{entry.company}</span>
                <span className="text-sm text-[var(--text-dimmed)]">
                  - {entry.role}
                </span>
              </span>
              <span className="flex items-center gap-2 mt-1 text-sm text-[var(--text-dimmed)] flex-wrap">
                <span>{entry.type}</span>
                <span className="w-px h-4 bg-[var(--border)]" />
                <span>{entry.date}</span>
                <span className="w-px h-4 bg-[var(--border)]" />
                <span>{entry.location}</span>
              </span>
            </span>
            <svg
              className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1 transition-transform duration-[var(--dur-panel)] ease-[var(--ease-out)] ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {/* Expandable content — kept out of the button so the list stays valid HTML. */}
        <div
          id={panelId}
          inert={!isExpanded}
          className={`grid transition-[grid-template-rows] duration-[var(--dur-panel)] ease-[var(--ease-out)] ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="px-3 pb-3 space-y-1 text-sm text-[var(--text-muted)] font-medium list-disc ml-8">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
