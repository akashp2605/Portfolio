"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const TYPE_LABEL: Record<string, string> = {
  cert: "Certificate",
  honor: "Leadership",
  hackathon: "Hackathon",
};

const SHARED_STYLE = {
  color: "#00ff88",
  border: "rgba(0,255,136,0.25)",
  glow: "rgba(0,255,136,0.18)",
  badgeBg: "rgba(0,255,136,0.10)",
};

// Cosmetic accents per card index — purely decorative, zero height impact
const ACCENTS = [
  // 0: corner dot
  ({ style }: { style: typeof SHARED_STYLE }) => (
    <div className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-60" style={{ background: style.color }} />
  ),
  // 1: top-right corner bracket
  ({ style }: { style: typeof SHARED_STYLE }) => (
    <div className="absolute top-4 right-4 w-5 h-5 opacity-30"
      style={{ borderTop: `2px solid ${style.color}`, borderRight: `2px solid ${style.color}` }} />
  ),
  // 2: bottom-left corner bracket
  ({ style }: { style: typeof SHARED_STYLE }) => (
    <div className="absolute bottom-4 left-4 w-5 h-5 opacity-30"
      style={{ borderBottom: `2px solid ${style.color}`, borderLeft: `2px solid ${style.color}` }} />
  ),
  // 3: faded year watermark (absolute, no layout impact)
  ({ style, award }: { style: typeof SHARED_STYLE; award: typeof awards[0] }) => (
    <div className="absolute bottom-6 right-6 font-mono font-bold text-6xl select-none pointer-events-none"
      style={{ color: style.color, opacity: 0.05, lineHeight: 1 }}>
      {award.date.split(" ").pop()}
    </div>
  ),
];

function CredentialCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const style = { ...SHARED_STYLE, label: TYPE_LABEL[award.type] ?? award.type };
  const Accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative h-full"
    >
      <BorderGlow color={style.color} className="h-full">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full"
        >
          <div
            className="relative overflow-hidden rounded-[24px] p-5 sm:p-8 flex flex-col h-full"
            style={{
              background: hovered ? "rgba(15,18,22,0.9)" : "rgba(15,18,22,0.82)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${style.border}`,
              boxShadow: hovered ? `0 0 40px ${style.glow}, 0 12px 40px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <Accent style={style} award={award} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ color: style.color, background: style.badgeBg, border: `1px solid ${style.border}` }}>
                {style.label}
              </span>
              <span className="font-mono text-xs text-dim">{award.date}</span>
            </div>

            {/* Body */}
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white mb-2">{award.title}</h3>
            <div className="font-mono text-xs sm:text-sm mb-4" style={{ color: style.color }}>{award.issuer}</div>
            <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{award.description}</p>

            {/* Verify button */}
            {award.certificate && (
              <motion.a
                href={award.certificate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View certificate for ${award.title}`}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] w-full sm:w-auto rounded-xl font-mono text-sm"
                style={{
                  background: hovered ? style.badgeBg : `${style.color}06`,
                  border: `1px solid ${style.border}`,
                  color: style.color,
                  boxShadow: hovered ? `0 0 20px ${style.glow}` : "none",
                }}
              >
                <span className="inline-block" style={{ minWidth: "10ch" }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={buttonHovered ? "opening" : "verify"}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }} className="block"
                    >
                      {buttonHovered ? "Opening..." : "Verify Credential"}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <motion.span
                  animate={{ x: buttonHovered ? 4 : 0, opacity: buttonHovered ? 1 : 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="py-16 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section marker */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-8 sm:mb-12"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 05_CREDENTIAL_VAULT</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-text mb-8 sm:mb-16"
      >
        <span className="text-green">Credential Vault</span>
      </motion.h2>

      {/* Grid layout */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 auto-rows-fr">
        {awards.map((award, i) => (
          <CredentialCard key={i} award={award} index={i} />
        ))}
      </div>
    </section>
  );
}
