
export const identity = {
  name: "AKASH",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Open Source Contributor",
    "Problem Solver",
    "System Architect",
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
    "Performance Engineering",
    "API Design",
    "Cloud Infrastructure",
    "Open Source",
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
    id: "proj-01",
    title: "PROJECT_ALPHA",
    tagline: "A high-performance distributed task queue built for scale.",
    description:
      "Engineered a fault-tolerant task processing system capable of handling millions of jobs per day. Implemented priority queues, dead-letter handling, and real-time monitoring dashboards.",
    stack: ["Go", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    status: "SHIPPED",
    links: [
      { label: "live", href: "#" },
      { label: "source", href: "#" },
    ],
  },
  {
    id: "proj-02",
    title: "PROJECT_BETA",
    tagline: "Real-time collaborative code editor with AI assistance.",
    description:
      "Built a browser-based IDE with operational transformation for conflict-free concurrent editing. Integrated LLM-powered code completion and inline documentation generation.",
    stack: ["TypeScript", "React", "WebSockets", "Node.js", "OpenAI"],
    status: "SHIPPED",
    links: [
      { label: "live", href: "#" },
      { label: "source", href: "#" },
    ],
  },
  {
    id: "proj-03",
    title: "PROJECT_GAMMA",
    tagline: "CLI toolkit for automating cloud infrastructure deployments.",
    description:
      "Developed a developer-first CLI that abstracts away Terraform and Helm complexity. Supports multi-cloud deployments with a single config file and interactive prompts.",
    stack: ["Python", "Terraform", "AWS", "GCP", "Click"],
    status: "IN_PROGRESS",
    links: [
      { label: "source", href: "#" },
    ],
  },
  {
    id: "proj-04",
    title: "PROJECT_DELTA",
    tagline: "Open-source analytics platform with zero vendor lock-in.",
    description:
      "Self-hostable product analytics alternative. Tracks user events, funnels, and retention with a privacy-first approach. No cookies, no third-party scripts.",
    stack: ["Next.js", "ClickHouse", "Kafka", "Grafana", "Rust"],
    status: "SHIPPED",
    links: [
      { label: "live", href: "#" },
      { label: "source", href: "#" },
    ],
  },
];

export type SkillGroup = {
  category: string;
  skills: { name: string; level: number; icon?: string }[];
};

export const stack: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "Go", level: 85 },
      { name: "Python", level: 80 },
      { name: "Rust", level: 65 },
      { name: "Java", level: 75 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 82 },
      { name: "WebGL / Three.js", level: 60 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Kafka", level: 72 },
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      { name: "Docker / Kubernetes", level: 82 },
      { name: "AWS / GCP", level: 78 },
      { name: "Terraform", level: 70 },
      { name: "CI/CD Pipelines", level: 85 },
    ],
  },
];

export type TimelineEntry = {
  date: string;
  title: string;
  org: string;
  type: "work" | "education";
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    date: "2024 — Present",
    title: "Senior Software Engineer",
    org: "COMPANY_NAME",
    type: "work",
    description:
      "Leading backend architecture for a platform serving X million users. Reduced p99 latency by 40% through query optimization and caching strategies.",
  },
  {
    date: "2022 — 2024",
    title: "Software Engineer",
    org: "STARTUP_NAME",
    type: "work",
    description:
      "Built core product features from 0 to 1. Owned the entire data pipeline from ingestion to visualization. Helped grow the engineering team from 3 to 15.",
  },
  {
    date: "2021 — 2022",
    title: "Software Engineer Intern",
    org: "BIG_TECH_CO",
    type: "work",
    description:
      "Shipped a developer tooling feature used by 10,000+ internal engineers. Received return offer.",
  },
  {
    date: "2018 — 2022",
    title: "B.S. Computer Science",
    org: "UNIVERSITY_NAME",
    type: "education",
    description:
      "Graduated with honors. Focused on distributed systems and programming languages. Teaching assistant for Data Structures & Algorithms.",
  },
];

export type Award = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: "award" | "cert" | "achievement";
};

export const awards: Award[] = [
  {
    title: "HACKATHON_NAME — 1st Place",
    issuer: "ORGANIZING_BODY",
    date: "2024",
    description: "Built PLACEHOLDER_PROJECT in 48 hours. Won best technical implementation out of 200+ teams.",
    type: "award",
  },
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Professional-level certification covering cloud architecture, security, and cost optimization.",
    type: "cert",
  },
  {
    title: "CERTIFICATION_NAME",
    issuer: "PLATFORM_NAME",
    date: "2023",
    description: "EDIT_ME — describe the scope and what you learned.",
    type: "cert",
  },
  {
    title: "OPEN_SOURCE_ACHIEVEMENT",
    issuer: "GitHub",
    date: "2022",
    description: "EDIT_ME — e.g. reached X stars, merged into major project, etc.",
    type: "achievement",
  },
];

export const contact = {
  email: "hello@yourname.dev",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  twitter: "https://twitter.com/your-handle",
  resumeUrl: "#",
};
