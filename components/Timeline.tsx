"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 05_TIMELINE</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-16"
      >
        My <span className="text-purple glow-purple">Journey</span>
      </motion.h2>

      <div className="relative max-w-3xl">
        {/* Neon vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-4 md:left-6 top-0 bottom-0 w-px origin-top"
          style={{ background: "linear-gradient(to bottom, #00ff88, #8b5cf6, #00e5ff)", boxShadow: "0 0 8px #00ff8844" }}
        />

        <div className="space-y-12 pl-12 md:pl-16">
          {timeline.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                className="absolute -left-[2.85rem] md:-left-[3.85rem] top-1.5 w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: entry.type === "work" ? "#00ff88" : "#8b5cf6",
                  background: "#050505",
                  boxShadow: `0 0 10px ${entry.type === "work" ? "#00ff88" : "#8b5cf6"}`,
                }}
              />

              <motion.div
                whileHover={{ borderColor: entry.type === "work" ? "#00ff88" : "#8b5cf6", x: 4 }}
                className="p-5 rounded-xl border border-line-bright transition-all"
                style={{ background: "rgba(13,13,13,0.8)" }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      color: entry.type === "work" ? "#00ff88" : "#8b5cf6",
                      borderColor: entry.type === "work" ? "#00ff8844" : "#8b5cf644",
                      background: entry.type === "work" ? "#00ff8811" : "#8b5cf611",
                    }}
                  >
                    {entry.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-cyan">{entry.date}</span>
                </div>
                <h3 className="font-sans font-bold text-lg text-text">{entry.title}</h3>
                <div className="font-mono text-xs text-muted mt-0.5">{entry.org}</div>
                <p className="text-sm text-muted mt-3 leading-relaxed">{entry.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
