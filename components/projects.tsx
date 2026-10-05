import Image from "next/image";
import { projectsData, type Project } from "@/lib/data";
import { Reveal } from "./reveal";

export function Projects() {
  return (
    <section id="projects" className="py-12 scroll-mt-24">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
        My Work
      </h2>
      <div className="space-y-6">
        {projectsData.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card t-press press-subtle block bg-[var(--surface-sunken)] rounded-3xl p-1.5 hoverable:bg-[var(--surface-hover)]"
    >
      {/* Image area — wiped in by the surrounding <Reveal /> */}
      <div className="reveal-clip relative w-full bg-[var(--surface-hover)] rounded-[20px] overflow-hidden aspect-video">
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            fill
            className="t-zoom object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--surface-raised), var(--surface-hover))",
            }}
          >
            <span className="text-[var(--text-muted)] text-lg">
              Project Image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 pt-2.5 space-y-0.5">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-base font-semibold">{project.title}</h3>
          <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-[var(--border)] mt-0.5">
            <svg
              className="card-arrow w-3.5 h-3.5 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-dimmed)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
