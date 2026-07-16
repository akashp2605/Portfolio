"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 px-6 md:px-16"
      style={{ background: "rgba(6,8,6,0.92)", backdropFilter: "blur(24px)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-dim">
          <span className="text-green">&gt;_</span> PORTFOLIO.EXE — Built with Next.js
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "GH",  href: contact.github },
            { label: "LI",  href: contact.linkedin },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              {...externalLinkProps(s.href)}
              whileHover={{ color: "#00ff88", y: -2, textShadow: "0 0 10px rgba(0,255,136,0.6)" }}
              className="font-mono text-xs text-muted transition-all"
            >
              {s.label}
            </motion.a>
          ))}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.05, borderColor: "rgba(0,255,136,0.5)", color: "#00ff88", boxShadow: "0 0 14px rgba(0,255,136,0.2)" }}
          className="font-mono text-xs text-muted border border-white/10 px-3 py-1.5 rounded transition-all"
        >
          ↑ TOP
        </motion.button>
      </div>
    </footer>
  );
}
