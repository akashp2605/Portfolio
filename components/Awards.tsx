"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const TYPE_STYLE = {
  cert: { 
    color: "#2DD4BF", 
    label: "Certificate",
    border: "rgba(45,212,191,0.25)",
    glow: "rgba(45,212,191,0.18)",
    badgeBg: "rgba(45,212,191,0.12)",
  },
  honor: { 
    color: "#7C6CF3", 
    label: "Leadership",
    border: "rgba(124,108,243,0.25)",
    glow: "rgba(124,108,243,0.18)",
    badgeBg: "rgba(124,108,243,0.12)",
  },
  hackathon: { 
    color: "#00C97A", 
    label: "Hackathon",
    border: "rgba(0,201,122,0.25)",
    glow: "rgba(0,201,122,0.18)",
    badgeBg: "rgba(0,201,122,0.12)",
  },
};

function CredentialCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const style = TYPE_STYLE[award.type] || TYPE_STYLE.cert;
  const year = award.date.split("-")[2] || "2025";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <BorderGlow color={style.color}>
        {/* Glass card */}
        <motion.div
          className="relative overflow-hidden rounded-[28px] p-8"
          style={{
            background: hovered ? "rgba(15,18,22,0.9)" : "rgba(15,18,22,0.82)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: hovered 
              ? `0 0 40px ${style.glow}, 0 12px 40px rgba(0,0,0,0.5)` 
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left accent border */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[28px]"
            style={{ background: style.color }}
          />

          {/* Top row: Category badge and date */}
          <div className="flex items-center justify-between mb-8">
            <span
              className="font-mono text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider"
              style={{
                color: style.color,
                background: style.badgeBg,
                border: `1px solid ${style.border}`,
              }}
            >
              {style.label}
            </span>
            <span className="font-mono text-xs text-dim">{award.date}</span>
          </div>

          {/* Title */}
          <motion.h3
            className="font-sans font-bold text-2xl md:text-3xl text-white mb-3"
            animate={{
              textShadow: hovered ? `0 0 20px ${style.color}30` : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {award.title}
          </motion.h3>

          {/* Issuer */}
          <div className="font-mono text-sm mb-6" style={{ color: style.color }}>
            {award.issuer}
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mb-8">
            {award.description}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-3 mb-8 font-mono text-[10px] uppercase tracking-wider text-dim">
            <span style={{ color: style.color }}>{style.label}</span>
            <span>•</span>
            <span className="text-green">Verified</span>
            <span>•</span>
            <span>{year}</span>
          </div>

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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm"
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="block"
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
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section id="awards" className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section marker */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 06_CREDENTIAL_VAULT</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-16"
      >
        <span className="text-green">Credential Vault</span>
      </motion.h2>

      {/* Grid layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {awards.map((award, i) => (
          <CredentialCard key={i} award={award} index={i} />
        ))}
      </div>
    </section>
  );
}
