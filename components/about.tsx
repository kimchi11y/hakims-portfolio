import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="py-12 scroll-mt-24">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
        About me
      </h2>
      <Reveal>
        <div className="space-y-4 text-lg text-[var(--text-muted)] font-medium leading-normal">
          <p>
            I&apos;m a Full Stack Developer with a passion for building modern
            web applications. I focus on creating scalable, user-friendly
            solutions that solve real problems.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>
              I start with understanding requirements, diving deep into the
              problem space before writing code.
            </li>
            <li>
              I build with scalability in mind, creating systems that can grow
              with your needs.
            </li>
            <li>
              I stay current with modern technologies and best practices, always
              learning and improving.
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
