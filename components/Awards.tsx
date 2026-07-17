"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { awards } from "@/lib/data";
import { ExternalLink } from "lucide-react";

const TYPE_STYLE = {
  cert: { color: "#00e5ff", label: "Certificate", icon: "📜" },
  honor: { color: "#8b5cf6", label: "Honor", icon: "🏆" },
};

function CredentialCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const style = TYPE_STYLE[award.type] || TYPE_STYLE.cert;

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
      {/* Glass card */}
      <motion.div
        className="relative overflow-hidden rounded-xl p-6 md:p-8"
        style={{
          background: "rgba(12, 15, 12, 0.6)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${style.color}15`,
          boxShadow: hovered
            ? `0 0 30px ${style.color}12, 0 8px 32px rgba(0,0,0,0.4)`
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Large translucent icon */}
        <motion.div
          className="absolute top-4 right-4 text-6xl opacity-[0.08] pointer-events-none select-none"
          animate={{
            scale: hovered ? 1.1 : 1,
            opacity: hovered ? 0.12 : 0.08,
          }}
          transition={{ duration: 0.3 }}
        >
          {style.icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-sans font-bold text-xl md:text-2xl text-text mb-2"
          animate={{
            color: hovered ? style.color : "#f5f5f5",
          }}
          transition={{ duration: 0.3 }}
        >
          {award.title}
        </motion.h3>

        {/* Issuer */}
        <div className="font-mono text-sm mb-4" style={{ color: style.color }}>
          {award.issuer}
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-6">
          {award.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-3 mb-6 font-mono text-xs text-dim">
          <span style={{ color: style.color }}>{style.label}</span>
          <span>•</span>
          <span>{award.date}</span>
          <span>•</span>
          <span className="text-green">Verified</span>
        </div>

        {/* Certificate button */}
        {award.certificate && (
          <motion.a
            href={award.certificate}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View certificate for ${award.title}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm"
            style={{
              background: hovered ? `${style.color}15` : `${style.color}08`,
              border: `1px solid ${style.color}25`,
              color: style.color,
            }}
          >
            <span>View Certificate</span>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink size={14} />
            </motion.span>
          </motion.a>
        )}

        {/* Subtle border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `1px solid ${style.color}`,
            opacity: 0,
          }}
          animate={{ opacity: hovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
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
        <span className="text-green">Achievement Database</span>
      </motion.h2>

      {/* Grid layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {awards.map((award, i) => (
          <CredentialCard key={i} award={award} index={i} />
        ))}
      </div>
    </section>
  );
}
