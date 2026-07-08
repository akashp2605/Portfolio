"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line-bright py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-dim">
          <span className="text-green">&gt;_</span> PORTFOLIO.EXE — Built with Next.js &amp; Framer Motion
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "GH",  href: contact.github },
            { label: "LI",  href: contact.linkedin },
            { label: "TW",  href: contact.twitter },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              whileHover={{ color: "#00ff88", y: -2 }}
              className="font-mono text-xs text-dim transition-colors"
            >
              {s.label}
            </motion.a>
          ))}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1, borderColor: "#00ff88", color: "#00ff88" }}
          whileTap={{ scale: 0.95 }}
          className="font-mono text-xs text-dim border border-line-bright px-3 py-1.5 rounded transition-colors"
        >
          ↑ TOP
        </motion.button>
      </div>
    </footer>
  );
}
