// Portfolio Data - Update these values with your own information

interface PersonalName {
  first: string;
  last: string;
}

export interface ResumeFiles {
  /** Served from /public. Opens in a new tab — browsers render PDF natively. */
  pdf: string;
  /** The editable Word document. Browsers cannot render .docx, so links download it. */
  docx: string;
}

export interface PersonalData {
  name: PersonalName;
  title: string;
  bio: string;
  shortBio: string;
  email: string;
  location: string;
  resume: ResumeFiles;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  images: string[];
  tags: string[];
}

export interface ExperienceEntry {
  id: number;
  company: string;
  role: string;
  type: string;
  date: string;
  /** Omitted where the resume does not state one; the row hides the separator. */
  location?: string;
  bullets: string[];
}

export interface Skill {
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export const personalData: PersonalData = {
  name: {
    first: "Hakim",
    last: "Razak",
  },
  title: "Computer Science Student | Software Engineer Intern Candidate",
  bio: "Computer Science student at International Islamic University Malaysia, seeking a six-month (February – August 2027) software engineering internship in Kuala Lumpur. Experienced in contributing to web application projects, troubleshooting backend APIs and coordinating development tasks with client communication. Eager to contribute to real-world software projects while strengthening skills in full-stack development and DevOps.",
  shortBio: "Computer Science student at IIUM seeking a six-month software engineering internship (February – August 2027), building full-stack web applications with React, ASP.NET Core and SvelteKit.",
  email: "abdulhakim0401@gmail.com",
  location: "Kuala Lumpur, Malaysia",
  resume: {
    pdf: "/resume/abdul-hakim-resume.pdf",
    docx: "/resume/abdul-hakim-resume.docx",
  },
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description:
      "Developed and deployed a personal portfolio website using Next.js on a DigitalOcean Droplet, containerised with Docker and shipped through a GitHub Actions CI/CD workflow on every push to main.",
    link: "https://hakimrazak.com",
    images: ["/portfolio.png"],
    tags: ["Next.js", "Docker", "GitHub Actions", "DigitalOcean", "Cloudflare"],
  },
  {
    id: 2,
    title: "University Engineering Internship Platform Prototype",
    description:
      "Contributed to an alternative web application prototype intended to improve the user experience of an existing university engineering internship platform, deployed for demonstration.",
    link: "https://eit-five.vercel.app",
    images: ["/eit.png"],
    tags: ["SvelteKit", "Svelte 5", "TypeScript", "MySQL", "Drizzle ORM", "Vercel"],
  },
];

export const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    company: "DeTA Technologies",
    role: "Freelance Software Developer",
    type: "Project-Based",
    date: "May 2025 – April 2026",
    bullets: [
      "Project Coordination: Coordinated sprint schedules for two developers working on a Laravel-based government web application, tracked feature progress, demonstrated the application to the client and documented requested changes during online meetings.",
      "Web Application Development: Contributed to a web application prototype built with SvelteKit intended to modernise a university engineering internship platform, with deployment for demonstration.",
      "Backend Troubleshooting: Set up and investigated issues in an ASP.NET Core Web API project supporting a Next.js application with active users.",
    ],
  },
  {
    id: 2,
    company: "Motion U",
    role: "Technical Operations Officer",
    type: "Club-Member",
    date: "Dec 2025 – Present",
    location: "International Islamic University Malaysia",
    bullets: [
      "Organised and participated in technical activities and collaborative software development initiatives.",
      "Facilitate hands-on technical workshops on Git/GitHub, version control, fullstack and collaborative development, upskilling 40+ students.",
    ],
  },
];

export const skillsData: Skill[] = [
  {
    number: "01",
    title: "Languages",
    description: "JavaScript, TypeScript, C#, PHP, Python, Java, Dart",
  },
  {
    number: "02",
    title: "Frontend",
    description: "HTML5, CSS3, React, Next.js, SvelteKit, Vue",
  },
  {
    number: "03",
    title: "Backend",
    description: "ASP.NET Core Web API, Laravel, FastAPI, Node.js, REST APIs",
  },
  {
    number: "04",
    title: "Databases",
    description: "MySQL, Firebase / Firestore",
  },
  {
    number: "05",
    title: "DevOps & Deployment",
    description: "Docker, GitHub Actions, DigitalOcean, Cloudflare",
  },
  {
    number: "06",
    title: "Tools & Platforms",
    description: "Git, GitHub, Linux",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/kimchi11y",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hakim-razak-239aaa283",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:abdulhakim0401@gmail.com",
    icon: "email",
  },
];
