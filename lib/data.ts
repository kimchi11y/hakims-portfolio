// Portfolio Data - Update these values with your own information
import Image from "next/image";
// TypeScript Interfaces for type safety
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
  avatar: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  images: string[];
  tags: string[];
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  type: string;
  date: string;
  location: string;
  logo: string;
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
  avatar: "/avatar.jpg", // Add your avatar image to public folder
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "EIT, Engineering Industrial Training",
    description: "Full-stack web application for managing engineering industrial training programs. Built with Sveltekit, TypeScript, and MySql. Features include student registration, company management, and real-time notifications.",
    link: "https://eit-five.vercel.app",
    images: ["/eit.png"], // Add your project images to public folder
    tags: ["Sveltekit", "TypeScript", "drizzle-orm", "MySql"],
    featured: true,
  }
];

export const experienceData: Experience[] = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    role: "Senior Full Stack Developer",
    type: "Full-time",
    date: "Jan 2022 → Present",
    location: "Remote (San Francisco)",
    logo: "/company1.svg", // Add company logos to public folder
    bullets: [
      "Led development of microservices architecture serving 100K+ daily users",
      "Built and maintained design system used across 5 product teams",
      "Reduced API response time by 60% through optimization efforts",
    ],
  },
  {
    id: 2,
    company: "Digital Solutions Co.",
    role: "Full Stack Developer",
    type: "Full-time",
    date: "Jun 2019 → Dec 2021",
    location: "New York, NY",
    logo: "/company2.svg",
    bullets: [
      "Developed full-stack features for client projects using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 50%",
      "Mentored junior developers and conducted code reviews",
    ],
  },
  {
    id: 3,
    company: "Startup Labs",
    role: "Frontend Developer",
    type: "Contract",
    date: "Jan 2018 → May 2019",
    location: "Remote",
    logo: "/company3.svg",
    bullets: [
      "Built responsive web applications from wireframes to production",
      "Collaborated with designers to implement pixel-perfect UIs",
      "Integrated third-party APIs and payment gateways",
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
    description: "Expert in React, Next.js, Vue.js, and Node.js. I stay current with the latest technologies and best practices to deliver modern solutions.",
  },
  {
    number: "03",
    title: "Database & APIs",
    description: "Experience with SQL and NoSQL databases, RESTful and GraphQL APIs. I design scalable data architectures that grow with your needs.",
  },
  {
    number: "04",
    title: "Cloud & DevOps",
    description: "Familiar with AWS, Docker, and CI/CD pipelines. I understand deployment workflows and can help automate your development process.",
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
