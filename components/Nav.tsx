"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",       label: "HOME" },
  { id: "about",      label: "ABOUT" },
  { id: "projects",   label: "PROJECTS" },
  { id: "skills",     label: "SKILLS" },
  { id: "timeline",   label: "TIMELINE" },
  { id: "awards",     label: "AWARDS" },
  { id: "contact",    label: "CONTACT" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className="mx-auto max-w-6xl px-6 flex items-center justify-between rounded-xl border border-line-bright"
          style={{
            background: "rgba(5,5,5,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: scrolled ? "0 0 30px rgba(0,255,136,0.05)" : "none",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm font-bold text-green glow-green tracking-widest"
          >
            &gt;_
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="relative px-3 py-1.5 font-mono text-[11px] tracking-widest transition-colors"
                style={{ color: active === s.id ? "#00ff88" : "#888" }}
              >
                {s.label}
                {active === s.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-green"
                    style={{ boxShadow: "0 0 6px #00ff88" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px w-5 bg-green"
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 8 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-xl border border-line-bright p-4 flex flex-col gap-2"
            style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-left font-mono text-sm py-2 px-3 rounded transition-colors"
                style={{ color: active === s.id ? "#00ff88" : "#888" }}
              >
                <span className="text-green-dim mr-2">$</span>{s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
