import { skillsData } from "@/lib/data";
import { Reveal } from "./reveal";

export function Skills() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight mb-10">
        What I Do Best
      </h2>
      <div className="space-y-6">
        {skillsData.map((skill, index) => (
          <Reveal key={skill.number} delay={index * 50}>
            <div className="flex gap-4">
              <span className="flex-shrink-0 text-2xl font-bold text-[var(--text-muted)] w-8">
                {skill.number}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{skill.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
