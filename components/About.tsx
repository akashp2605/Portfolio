"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8 md:mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 02_ABOUT</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Left — bio */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            variants={item}
            className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-text mb-6 md:mb-8 leading-tight"
          >
            About the{" "}
            <span className="text-green">Developer</span>
          </motion.h2>

          {about.paragraphs.map((p, i) => (
            <motion.p key={i} variants={item} className="text-muted leading-relaxed mb-4 sm:mb-5 text-sm md:text-base">
              {p}
            </motion.p>
          ))}

          {/* Focus areas */}
          <motion.div variants={item} className="mt-6 md:mt-8">
            <div className="font-mono text-xs text-dim mb-3 sm:mb-4">FOCUS AREAS[]</div>
            <div className="flex flex-wrap gap-2">
              {about.focusAreas.map((f) => (
                <motion.span
                  key={f}
                  className="px-3 py-2 font-mono text-xs border border-white/10 text-muted rounded transition-all min-h-[36px] flex items-center"
                  whileHover={{ scale: 1.05, borderColor: "rgba(0,255,136,0.5)", color: "#00ff88", boxShadow: "0 0 12px rgba(0,255,136,0.15)" }}
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — stats grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {about.stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03, borderColor: "rgba(0,255,136,0.4)", boxShadow: "0 0 0 1px rgba(0,255,136,0.15), 0 20px 60px rgba(0,0,0,0.6)" }}
              className="p-4 sm:p-6 rounded-xl border border-white/8 transition-all"
              style={{
                background: "rgba(12,15,12,0.85)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="font-sans font-bold text-2xl sm:text-3xl text-green glow-green mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-dim tracking-widest leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
