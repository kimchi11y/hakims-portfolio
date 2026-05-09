import { personalData } from "@/lib/data";

export function About() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight mb-6">About me</h2>
      <div className="space-y-4 text-lg text-[var(--text-muted)] font-medium leading-normal">
        <p>
          I'm a Full Stack Developer with a passion for building modern web applications.
          I focus on creating scalable, user-friendly solutions that solve real problems.
          Recently, I've been working on projects ranging from e-commerce platforms to
          real-time collaboration tools.
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li>
            I start with understanding requirements, diving deep into the problem space
            before writing code.
          </li>
          <li>
            I build with scalability in mind, creating systems that can grow with your needs.
          </li>
          <li>
            I stay current with modern technologies and best practices, always learning and improving.
          </li>
        </ul>
      </div>
    </section>
  );
}
