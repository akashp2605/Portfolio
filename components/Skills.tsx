"use client";

import { motion } from "framer-motion";
import { stack } from "@/lib/data";

const ACCENT = ["#00ff88", "#00e5ff", "#8b5cf6", "#ffb000"];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 04_SKILLS</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-12"
      >
        Tech <span className="text-cyan glow-cyan">Stack</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {stack.map((group, gi) => {
          const accent = ACCENT[gi % ACCENT.length];
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              whileHover={{ borderColor: accent }}
              className="p-6 rounded-xl border border-line-bright transition-colors"
              style={{ background: "rgba(13,13,13,0.8)" }}
            >
              <div className="font-mono text-xs mb-6 tracking-widest" style={{ color: accent }}>
                {group.category.toUpperCase()}
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-mono text-xs mb-2">
                      <span className="text-text">{skill.name}</span>
                      <span className="text-dim">{skill.level}%</span>
                    </div>
                    <div className="h-px bg-line-bright rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, delay: gi * 0.1 + i * 0.07, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${accent}66, ${accent})`,
                          boxShadow: `0 0 8px ${accent}66`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
