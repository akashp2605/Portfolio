"use client";

import { motion } from "framer-motion";
import { stack, type SkillGroup, type Tech } from "@/lib/data";
import {
  SiSpringboot, SiSpringsecurity, SiHibernate, SiApachemaven,
  SiReact, SiNextdotjs, SiHtml5, SiCss, SiJavascript, SiTailwindcss, SiFramer,
  SiMysql, SiPostgresql, SiRedis, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiVercel, SiSpring,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { Database, Server, Globe, Cloud } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

// ── Icon maps ──────────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, IconType> = {
  java: FaJava, springboot: SiSpringboot, spring: SiSpring,
  springsecurity: SiSpringsecurity, hibernate: SiHibernate,
  maven: SiApachemaven, react: SiReact, nextjs: SiNextdotjs,
  html5: SiHtml5, css3: SiCss, javascript: SiJavascript,
  tailwind: SiTailwindcss, framer: SiFramer,
  mysql: SiMysql, postgresql: SiPostgresql, redis: SiRedis, firebase: SiFirebase,
  docker: SiDocker, kubernetes: SiKubernetes, git: SiGit,
  github: SiGithub, vercel: SiVercel,
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Backend: Server, Frontend: Globe, Databases: Database, "Cloud & DevOps": Cloud,
};

// ── Tech badge ─────────────────────────────────────────────────────────────
function TechBadge({ tech, accent }: { tech: Tech; accent: string }) {
  const Icon = TECH_ICONS[tech.icon] ?? TbApi;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/6
                 bg-white/[0.04] cursor-default select-none transition-all"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="text-2xl transition-all duration-300"
        style={{ color: tech.color, filter: `drop-shadow(0 0 6px ${tech.color}66)` }}
      >
        <Icon />
      </motion.div>
      <span className="font-mono text-[10px] text-dim group-hover:text-text transition-colors text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
  );
}

// ── Category card ──────────────────────────────────────────────────────────
function CategoryCard({ group, index }: { group: SkillGroup; index: number }) {
  const CatIcon = CATEGORY_ICONS[group.category] ?? Server;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ borderColor: `${group.accent}44`, y: -6, boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 40px ${group.accent}12` }}
      className="relative p-6 rounded-2xl border overflow-hidden transition-all duration-300"
      style={{ background: "rgba(12,15,12,0.88)", backdropFilter: "blur(28px)", borderColor: `${group.accent}18`, boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      {/* corner glow */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${group.accent}, transparent 70%)` }}
      />

      {/* header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="p-2 rounded-lg"
          style={{ background: group.accent + "18", color: group.accent }}
        >
          <CatIcon size={18} />
        </div>
        <h3 className="font-sans font-semibold text-lg text-text">{group.category}</h3>
      </div>

      <p className="font-mono text-xs text-dim mb-5 leading-relaxed">{group.description}</p>

      {/* tech grid */}
      <div className="grid grid-cols-4 gap-2">
        {group.techs.map((tech) => (
          <TechBadge key={tech.name} tech={tech} accent={group.accent} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 04_SKILLS</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-14"
      >
        Tech <span className="text-green">Stack</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {stack.map((group, i) => (
          <CategoryCard key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
