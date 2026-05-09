import { skillsData } from "@/lib/data";

export function Skills() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight mb-10">What I Do Best</h2>
      <div className="space-y-6">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="group animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              <span className="flex-shrink-0 text-2xl font-bold text-[var(--text-dimmed)] w-8">
                {skill.number}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--text-dimmed)] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
