// Portfolio Data - Update these values with your own information

interface PersonalName {
  first: string;
  last: string;
}

export interface PersonalData {
  name: PersonalName;
  title: string;
  bio: string;
  shortBio: string;
  email: string;
  location: string;
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
  location: string;
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
  icon: "github" | "linkedin" | "twitter" | "email";
}

export const personalData: PersonalData = {
  name: {
    first: "Hakim",
    last: "Razak",
  },
  title: "Software Developer | Tech Enthusiast",
  bio: "Hey! I'm Hakim, a Computer Science student at IIUM, Malaysia   with a passion for building innovative web applications. I specialize in modern web technologies, scalable architecture, and crafting intuitive digital experiences. With a strong foundation in both frontend and backend development, I enjoy creating solutions that not only meet user needs but also push the boundaries of what's possible on the web.",
  shortBio: "Full Stack Developer specializing in modern web technologies, scalable architecture, and crafting intuitive digital experiences.",
  email: "hakim.doe@example.com",
  location: "Kuala Lumpur, Malaysia",
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "EIT, Engineering Industrial Training",
    description: "Full-stack web application for managing engineering industrial training programs. Built with Sveltekit, TypeScript, and MySql. Features include student registration, company management, and real-time notifications.",
    link: "https://eit-five.vercel.app",
    images: ["/eit.png"],
    tags: ["Sveltekit", "TypeScript", "drizzle-orm", "MySql"],
  },
];

export const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    company: "Motion-U Club",
    role: "Technical Operations Officer",
    type: "Club-Member",
    date: "Jan 2022 → Present",
    location: "KICT, IIUM",
    bullets: [
      "Led tech programs and workshops, educating students on web development and programming fundamentals",
    ],
  },
];

export const skillsData: Skill[] = [
  {
    number: "01",
    title: "Full-Stack Development",
    description: "I build complete web applications from database to UI. Comfortable working across the entire stack to deliver cohesive solutions.",
  },
  {
    number: "02",
    title: "Modern Frameworks",
    description: "Expert in React, Next.js, Sveltekit,  Vue.js, and Node.js. I stay current with the latest technologies and best practices to deliver modern solutions.",
  },
  {
    number: "03",
    title: "Database & APIs",
    description: "Experience with SQL and NoSQL databases, RESTful APIs. I design scalable data architectures that grow with your needs.",
  },
  {
    number: "04",
    title: "Cloud & DevOps",
    description: "Familiar with Digital Ocean, Docker, and CI/CD pipelines. I understand deployment workflows and can help automate your development process.",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/johndoe",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/johndoe",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/johndoe",
    icon: "twitter",
  },
  {
    name: "Email",
    url: "mailto:john.doe@example.com",
    icon: "email",
  },
];
