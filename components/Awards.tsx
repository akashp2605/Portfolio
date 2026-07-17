"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const TYPE_STYLE = {
  award: { color: "#ffb000", label: "AWARD",       bg: "#ffb00011", border: "#ffb00044" },
  cert:  { color: "#00e5ff", label: "CERTIFICATE",  bg: "#00e5ff11", border: "#00e5ff44" },
  honor: { color: "#8b5cf6", label: "HONOR",        bg: "#8b5cf611", border: "#8b5cf644" },
};

export default function Awards() {
  const [hovered, setHovered] = useState<number | null>(null);

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
        Certs <span className="text-green">&amp; Honors</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-5">
        {awards.map((a, i) => {
          const style = TYPE_STYLE[a.type] || TYPE_STYLE.award;
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

              {a.certificate && (
                <motion.a
                  href={a.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certificate for ${a.title}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -3, scale: 1.03, boxShadow: `0 0 20px ${style.color}33, 0 8px 32px rgba(0,0,0,0.5)` }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs focus-visible:outline focus-visible:outline-2"
                  style={{
                    background: `${style.color}0d`,
                    border: `1px solid ${style.color}33`,
                    color: style.color,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="inline-block" style={{ minWidth: "7.5ch" }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={hovered === i ? "v" : "d"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="block"
                      >
                        {hovered === i ? "Verifying..." : "Cert.verify()"}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <motion.span
                    animate={{ x: hovered === i ? 2 : 0, opacity: hovered === i ? 1 : 0.7 }}
                    transition={{ duration: 0.14 }}
                  >
                    <ExternalLink size={11} />
                  </motion.span>
                </motion.a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
