"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";

const STATUS_STYLE: Record<string, { color: string; glow: string }> = {
  SHIPPED:     { color: "#00ff88", glow: "0 0 8px #00ff88" },
  IN_PROGRESS: { color: "#ffb000", glow: "0 0 8px #ffb000" },
  ARCHIVED:    { color: "#444",    glow: "none" },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const status = STATUS_STYLE[project.status];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      style={{
        transformStyle: "preserve-3d",
        background: "rgba(12,15,12,0.88)",
        backdropFilter: "blur(24px)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,255,136,0.18), 0 0 40px rgba(0,255,136,0.07)"
          : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      className="rounded-xl border border-white/8 overflow-hidden transition-all group"
    >
      {/* Animated top border */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green to-transparent"
          animate={hovered ? { x: ["−100%", "100%"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-line-bright" />
      </div>

      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
        </div>
        <span className="font-mono text-[10px]" style={{ color: status.color, textShadow: status.glow }}>
          {project.status}
        </span>
        <span className="font-mono text-[10px] text-dim">{project.id}</span>
      </div>

      <div className="p-6">
        <h3 className="font-sans font-bold text-xl text-text group-hover:text-green transition-colors">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-cyan mt-1">{project.tagline}</p>
        <p className="text-sm text-muted mt-4 leading-relaxed">{project.description}</p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((s) => (
            <motion.span
              key={s}
              whileHover={{ borderColor: "rgba(0,255,136,0.5)", color: "#00ff88", boxShadow: "0 0 10px rgba(0,255,136,0.12)" }}
              className="px-2 py-1 font-mono text-[10px] border border-white/8 text-dim rounded transition-all"
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-5 pt-4 border-t border-white/6">
          {project.links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              {...externalLinkProps(l.href)}
              whileHover={{ x: 3 }}
              className="font-mono text-xs text-muted hover:text-green transition-colors flex items-center gap-1"
            >
              <span className="text-green-dim">[</span>
              {l.label}
              <span className="text-green-dim">]</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 03_PROJECTS</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-12"
      >
        Selected <span className="text-green">Work</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
