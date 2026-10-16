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
            I&apos;m a Computer Science student at International Islamic
            University Malaysia (IIUM), specialising in Network and Security,
            with a CGPA of 3.68 and an expected graduation in 2027. I&apos;m
            looking for a six-month software engineering internship (February –
            August 2027) in Kuala Lumpur.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>
              I freelance at DeTA Technologies — coordinating sprints on a
              Laravel-based government application, investigating issues in an
              ASP.NET Core Web API backing a Next.js app with active users, and
              contributing to a SvelteKit internship platform deployed for
              demonstration.
            </li>
            <li>
              I ship end to end. This site runs in Docker on a DigitalOcean
              droplet and redeploys itself through GitHub Actions on every push
              to main.
            </li>
            <li>
              I&apos;m Technical Operations Officer at Motion U, where I run
              hands-on Git/GitHub and full-stack workshops that have upskilled
              40+ students.
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
