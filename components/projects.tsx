"use client";

import { useState } from "react";
import Image from "next/image";
import { projectsData } from "@/lib/data";

export function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">My Work</h2>
      <div className="space-y-6">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedProject === project.id}
            onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    link: string;
    images: string[];
    tags: string[];
    featured: boolean;
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectCard({ project, index, isExpanded, onToggle }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[var(--card-bg)] rounded-3xl p-1.5 hover:bg-zinc-200 transition-colors animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={(e) => {
        if (window.innerWidth < 768) {
          // Allow default behavior on mobile
          return;
        }
        e.preventDefault();
        onToggle();
      }}
    >
      {/* Image area */}
      <div className="relative w-full bg-zinc-200 rounded-[20px] overflow-hidden aspect-video">
        {project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300">
            <span className="text-zinc-500 text-lg">Project Image</span>
          </div>
        )}
        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/10 backdrop-blur-sm">
            {project.images.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === 0 ? "w-4 h-1.5 bg-zinc-800" : "w-1.5 h-1.5 bg-zinc-800/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 pt-2.5 space-y-0.5">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-base font-semibold">{project.title}</h3>
          <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-[var(--border)] mt-0.5">
            <svg className="w-3.5 h-3.3 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-zinc-200 text-[var(--text-dimmed)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
