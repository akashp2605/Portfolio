"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 02_ABOUT</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — bio */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            variants={item}
            className="font-sans font-bold text-4xl md:text-5xl text-text mb-8 leading-tight"
          >
            About the{" "}
            <span className="text-green glow-green">Developer</span>
          </motion.h2>

          {about.paragraphs.map((p, i) => (
            <motion.p key={i} variants={item} className="text-muted leading-relaxed mb-5 text-sm md:text-base">
              {p}
            </motion.p>
          ))}

          {/* Focus areas */}
          <motion.div variants={item} className="mt-8">
            <div className="font-mono text-xs text-dim mb-4">FOCUS_AREAS[]</div>
            <div className="flex flex-wrap gap-2">
              {about.focusAreas.map((f) => (
                <motion.span
                  key={f}
                  whileHover={{ scale: 1.05, borderColor: "#00ff88", color: "#00ff88" }}
                  className="px-3 py-1.5 font-mono text-xs border border-line-bright text-muted rounded transition-colors"
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
          className="grid grid-cols-2 gap-4"
        >
          {about.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ scale: 1.03, borderColor: "#00ff88" }}
              className="p-6 rounded-xl border border-line-bright transition-all"
              style={{
                background: "rgba(13,13,13,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="font-sans font-bold text-3xl text-green glow-green mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] text-dim tracking-widest">{stat.label}</div>
            </motion.div>
          ))}

          {/* Terminal card */}
          <motion.div
            variants={item}
            className="col-span-2 p-5 rounded-xl border border-line-bright font-mono text-xs"
            style={{ background: "rgba(13,13,13,0.8)" }}
          >
            <div className="text-dim mb-3">$ whoami</div>
            <div className="space-y-1.5 text-muted">
              <div><span className="text-green">role</span>     <span className="text-dim">→</span> Software Engineer</div>
              <div><span className="text-cyan">location</span> <span className="text-dim">→</span> {"{LOCATION}"}</div>
              <div><span className="text-purple">status</span>  <span className="text-dim">→</span> <span className="text-green">available</span></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
