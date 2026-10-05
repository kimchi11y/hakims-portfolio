import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <hr className="my-8 border-[var(--border)]" />
      <Projects />
      <hr className="my-8 border-[var(--border)]" />
      <Experience />
      <hr className="my-8 border-[var(--border)]" />
      <Skills />
      <hr className="my-8 border-[var(--border)]" />
      <About />
      <Footer />
    </>
  );
}
