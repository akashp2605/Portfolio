"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { contact } from "@/lib/data";

const socialLinks = [
  { label: "GitHub", href: contact.github, Icon: FaGithub },
  { label: "LinkedIn", href: contact.linkedin, Icon: FaLinkedin },
  { label: "Instagram", href: contact.instagram, Icon: FaInstagram },
];

export default function Footer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <footer
      className="border-t border-white/8 py-8 px-4 sm:px-6 md:px-16"
      style={{ background: "rgba(6,8,6,0.92)", backdropFilter: "blur(24px)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div className="font-mono text-xs text-dim">
          <span className="text-green">&gt;_</span> PORTFOLIO.EXE — @2026 Akash.
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {socialLinks.map((s, index) => {
            const Icon = s.Icon;
            return (
              <div key={s.label} className="relative flex flex-col items-center">
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 2, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute bottom-full mb-2.5 px-2 py-0.5 text-[10px] font-mono text-[#00ff88] bg-[#060806] border border-[#00ff88]/40 rounded shadow-[0_0_10px_rgba(0,255,136,0.2)] whitespace-nowrap pointer-events-none z-10"
                    >
                      {s.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    color: "#00ff88",
                    filter: "drop-shadow(0 0 8px rgba(0,255,136,0.7))",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-[#00ff88]/80 hover:text-[#00ff88] transition-colors cursor-pointer w-11 h-11 flex items-center justify-center rounded-lg active:bg-white/5"
                >
                  <Icon size={22} />
                </motion.a>
              </div>
            );
          })}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{
            scale: 1.05,
            borderColor: "rgba(0,255,136,0.5)",
            color: "#00ff88",
            boxShadow: "0 0 14px rgba(0,255,136,0.2)",
          }}
          className="font-mono text-xs text-muted border border-white/10 px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded transition-all active:bg-white/5"
        >
          ↑ TOP
        </motion.button>
      </div>
    </footer>
  );
}

