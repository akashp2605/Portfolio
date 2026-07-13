"use client";

import { motion } from "framer-motion";
import { awards } from "@/lib/data";

const TYPE_STYLE = {
  award:       { color: "#ffb000", label: "AWARD",       bg: "#ffb00011", border: "#ffb00044" },
  cert:        { color: "#00e5ff", label: "CERTIFICATE",  bg: "#00e5ff11", border: "#00e5ff44" },
  achievement: { color: "#8b5cf6", label: "ACHIEVEMENT",  bg: "#8b5cf611", border: "#8b5cf644" },
};

export default function Awards() {
  return (
    <section id="awards" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 06_AWARDS</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-12"
      >
        Awards &amp; <span className="text-amber" style={{ textShadow: "0 0 10px #ffb000, 0 0 20px #ffb000" }}>Certs</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-5">
        {awards.map((a, i) => {
          const style = TYPE_STYLE[a.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4, boxShadow: `0 0 32px ${style.color}22, 0 20px 60px rgba(0,0,0,0.6)` }}
              className="p-6 rounded-xl border transition-all relative overflow-hidden"
              style={{
                background: "rgba(12,15,12,0.85)",
                backdropFilter: "blur(24px)",
                borderColor: `${style.color}22`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Glow corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${style.color}11 0%, transparent 70%)` }}
              />

              <div className="flex items-start justify-between gap-4 mb-3">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded border"
                  style={{ color: style.color, background: style.bg, borderColor: style.border }}
                >
                  {style.label}
                </span>
                <span className="font-mono text-xs text-dim shrink-0">{a.date}</span>
              </div>

              <h3 className="font-sans font-bold text-base text-text">{a.title}</h3>
              <div className="font-mono text-xs mt-1" style={{ color: style.color }}>{a.issuer}</div>
              <p className="text-sm text-muted mt-3 leading-relaxed">{a.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
