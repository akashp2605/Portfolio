import { title } from "process";

export const identity = {
  name: "Akash",
  roles: [
    "Full Stack Developer",
    "Spring Boot Developer",
    "Open Source Contributor",
  ],
  location: "Kuppam, Andhra Pradesh, India",
  status: "AVAILABLE FOR OPPORTUNITIES",
  summary:
    "I build fast, scalable, and beautiful software. Obsessed with clean architecture, developer experience, and shipping things that actually work.",
  projectsShipped: "8+",
  coffeeCount: "∞",
};

export const about = {
  paragraphs: [
    "I'm a software engineer who lives at the intersection of elegant code and meaningful products. I care deeply about the craft — from database schema design to pixel-perfect UI.",
    "Most of what I know came from taking things apart to understand how they work, then rebuilding them better. I believe the best code is the code that doesn't need a comment to explain itself.",
    "When I'm not shipping features, I'm contributing to open source, exploring new technologies, or writing about what I've learned.",
  ],
  focusAreas: [
    "Distributed Systems",
    "Developer Tooling",
    "API Design",
    "Cloud Infrastructure",
  ],
  stats: [
    { label: "Projects Shipped", value: "8+" },
    { label: "GitHub Stars", value: "10+" },
    { label: "Contributions", value: "200+" },
  ],
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "SHIPPED" | "IN_PROGRESS" | "ARCHIVED";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "Proj-01",
    title: "Sellex",
    tagline: "A E-Commerce platform for small businesses to sell online.",
    description:
      "Developed a full-stack e-commerce platform with real-time inventory management,order processing and analytics dashboard. Implemented microservices architecture for scalability.",
    stack: ["React", "Spring Boot", "Java", "JWT Authentication", "MySQL & Firebase"],
    status: "IN_PROGRESS",
    links: [
      { label: "live", href: "#" },
      { label: "source", href: "https://github.com/Akash90877/Sellex--E-Commerce_Platform" },
    ],
  },
  {
    id: "Proj-02",
    title: "GeoFlow",
    tagline: "A Ground Water AI assistant for real-time monitoring and prediction of groundwater levels.",
    description:
      "Developed a real-time groundwater monitoring system using AI models. Implemented predictive analytics for water level forecasting and alerting.",
    stack: ["Python", "React", "FastAPI", "Google Cloud AI"],
    status: "SHIPPED",
    links: [
      { label: "live", href: "https://geoflowai.netlify.app/" },
      { label: "source", href: "https://github.com/Akash90877/GeoFlow" },
    ],
  },
];
export type Tech = { name: string; color: string; icon: string };
export type SkillGroup = {
  category: string;
  description: string;
  accent: string;
  techs: Tech[];
};

export const stack: SkillGroup[] = [
  {
    category: "Backend",
    description: "Building scalable RESTful applications using Java and Spring technologies.",
    accent: "#00ff88",
    techs: [
      { name: "Java",            color: "#f89820", icon: "java" },
      { name: "Spring Boot",     color: "#6db33f", icon: "springboot" },
      { name: "Spring Security", color: "#6db33f", icon: "springsecurity" },
      { name: "Hibernate",       color: "#bcae79", icon: "hibernate" },
      { name: "REST API",        color: "#00ff88", icon: "rest" },
      { name: "Maven",           color: "#c71a36", icon: "maven" },
    ],
  },
  {
    category: "Frontend",
    description: "Developing modern responsive user interfaces.",
    accent: "#00e5ff",
    techs: [
      { name: "React.js",      color: "#61dafb", icon: "react" },
      { name: "Next.js",       color: "#ffffff", icon: "nextjs" },
      { name: "HTML5",         color: "#e34f26", icon: "html5" },
      { name: "CSS3",          color: "#1572b6", icon: "css3" },
      { name: "JavaScript",    color: "#f7df1e", icon: "javascript" },
    ],
  },
  {
    category: "Databases",
    description: "Designing reliable and scalable data storage solutions.",
    accent: "#8b5cf6",
    techs: [
      { name: "MySQL",      color: "#4479a1", icon: "mysql" },
      { name: "PostgreSQL", color: "#336791", icon: "postgresql" },
      { name: "Redis",      color: "#dc382d", icon: "redis" },
      { name: "Firebase",   color: "#ffca28", icon: "firebase" },
    ],
  },
  {
    category: "Cloud & DevOps",
    description: "Deploying and managing modern applications.",
    accent: "#f59e0b",
    techs: [
      { name: "Docker",     color: "#2496ed", icon: "docker" },
      { name: "Kubernetes", color: "#326ce5", icon: "kubernetes" },
    ],
  },
];

export type TimelineEntry = {
  date: string;
  title: string;
  org: string;
  type:  "work" | "education";
  description: string;
};

export const timeline: TimelineEntry[] = [
   {
    date: "May 2026 - July 2026",
    title: "Java Full Stack Intern",
    org: "VaultShpere AI Technologies",
    type: "work",
    description:
      "Developed end-to-end web applications, integrating front-end and back-end components. Implemented RESTful APIs and optimized database queries for performance.",
  },
  {
    date: "2023 — Present",
    title: " Engineering Undergraduate",
    org: "Kuppam Engineering College",
    type: "education",
    description:
      "Aspired to become a software engineer, focusing on full-stack development, cloud computing, and open-source contributions. Engaged in various projects and hackathons to enhance practical skills.",
  },
 
];

export type Award = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  type:"cert" | "honor";
  certificate?: string;
};

export const awards: Award[] = [
  {
    title: "Technical Quiz Host",
    issuer: "Kuppam Engineering College, Coding Club",
    date: "01-08-2025",
    description: "Hosted and organized a technical quiz competition for college students, focusing on programming, algorithms, and computer science concepts.",
    type: "honor",
    certificate: "/certificates/Coding-Club.pdf",
  },
  {
    title: "National Level Hackathon Participant",
    issuer: "Sri Manakula Vinayagar Engineering College",
    date: "19-09-2025-20-09-2025",
    description: "Participated in a national-level 24-hour hackathon, successfully advancing to Stage 3 of 5 by demonstrating strong problem-solving, teamwork, and software development skills.",
    type: "cert",
    certificate: "/certificates/Hackathon-Pondi.pdf",
  },
  {
    title: "Quantum Computing Certification",
    issuer: "Amaravati Quantum Valley(AQV), Wiser, Qubitech",
    date: "04-02-2026",
    description: "Successfully completed 4-week Quantum Computing Fundamentals program, covering quantum algorithms, and practical applications.",
    type: "cert",
    certificate: "/certificates/quantum-computing.pdf",
  },
  
];

export const contact = {
  email: "akashp2605@gmail.com",
  github: "https://github.com/Akash90877",
  linkedin: "https://www.linkedin.com/in/akash-p-77709a331?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resumeUrl: "/Resume.pdf",
};
