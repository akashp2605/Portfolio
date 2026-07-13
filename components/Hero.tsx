"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { identity } from "@/lib/data";
import ProfileImage from "@/components/ProfileImage";

const CODE_LINES = [
  { code: `import { Developer } from "@/core";`,                    color: "#888" },
  { code: ``,                                                        color: "" },
  { code: `const profile: Developer = {`,                           color: "#888" },
  { code: `  name:     "${identity.name}",`,                        color: "#00ff88" },
  { code: `  status:   "available",`,                               color: "#00ff88" },
  { code: `  passion:  "building things",`,                         color: "#00e5ff" },
  { code: `  coffee:   Infinity,`,                                   color: "#8b5cf6" },
  { code: `};`,                                                      color: "#888" },
  { code: ``,                                                        color: "" },
  { code: `export default profile;`,                                 color: "#888" },
];

export default function Hero() {
  const [scanDone, setScanDone] = useState(false);
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [deleting, setDeleting]     = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const panelX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const panelY = useTransform(mouseY, [-1, 1], [-5, 5]);

  useEffect(() => { setScanDone(true); }, []);

  // ── Typewriter ─────────────────────────────────────────
  useEffect(() => {
    if (!scanDone) return;
    const current = identity.roles[roleIndex];
    const speed = deleting ? 22 : 58;
    const t = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) setDisplayed(current.slice(0, displayed.length + 1));
        else setTimeout(() => setDeleting(true), 1600);
      } else {
        if (displayed.length > 0) setDisplayed(current.slice(0, displayed.length - 1));
        else { setDeleting(false); setRoleIndex((i) => (i + 1) % identity.roles.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex, scanDone]);

  // ── Mouse parallax ─────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Depth gradient layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#070a08] to-[#050508]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* ── Scan line animation on load ── */}
      <AnimatePresence>
        {!scanDone && (
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none z-20"
            style={{ background: "linear-gradient(90deg, transparent, #00ff88, #00e5ff, transparent)", boxShadow: "0 0 20px #00ff88" }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", times: [0, 0.05, 0.9, 1] }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-center">

        {/* ── LEFT: Text content ── */}
        <div>
          {/* Mobile profile image — shown above content on small screens */}
          <div className="flex justify-center mb-10 lg:hidden">
            <ProfileImage scanDone={scanDone} />
          </div>
          {/* Main content — revealed after scan */}
          <AnimatePresence>
            {scanDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
                  style={{ borderColor: "rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.05)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"
                    style={{ boxShadow: "0 0 6px #00ff88" }} />
                  <span className="font-mono text-[11px] text-green tracking-widest">{identity.status}</span>
                </motion.div>

                {/* Name — glitch reveal */}
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                  className="font-sans font-bold leading-[0.92] tracking-tight"
                  style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
                >
                  <span className="block text-muted font-mono text-base mb-2 font-normal">
                    // IDENTITY
                  </span>
                  <span className="text-text">I&apos;m </span>
                  <span
                    className="text-green"
                    style={{ textShadow: "0 0 30px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)" }}
                  >
                    {identity.name}
                  </span>
                </motion.h1>

                {/* Typewriter role */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 font-mono text-lg md:text-xl h-8 flex items-center gap-2"
                >
                  <span className="text-dim">&gt;_</span>
                  <span className="text-cyan" style={{ textShadow: "0 0 12px rgba(0,229,255,0.5)" }}>
                    {displayed}
                  </span>
                  <span className="inline-block w-[2px] h-5 bg-cyan blink"
                    style={{ boxShadow: "0 0 6px #00e5ff" }} />
                </motion.div>

                {/* Summary */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-6 max-w-lg text-muted leading-relaxed text-sm md:text-base"
                >
                  {identity.summary}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <motion.a
                    href="#projects"
                    data-cursor="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-6 py-3 font-mono text-sm font-bold text-bg bg-green rounded overflow-hidden group"
                    style={{ boxShadow: "0 0 20px rgba(0,255,136,0.25)" }}
                  >
                    <span className="relative z-10">VIEW_WORK()</span>
                    <motion.span
                      className="absolute inset-0 bg-cyan"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a
                    href="#contact"
                    data-cursor="button"
                    whileHover={{ scale: 1.04, borderColor: "#00e5ff" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 font-mono text-sm font-bold text-cyan border border-cyan/40 rounded transition-all"
                    style={{ background: "rgba(0,229,255,0.04)" }}
                  >
                    CONTACT_ME()
                  </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 flex items-center gap-8"
                >
                  {[
                    { label: "PROJECTS",  value: identity.projectsShipped },
                    { label: "COFFEE",    value: identity.coffeeCount },
                  ].map((s, i) => (
                    <div key={s.label} className="relative">
                      {i > 0 && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-line-bright" />}
                      <div className="font-sans font-bold text-2xl text-green"
                        style={{ textShadow: "0 0 12px rgba(0,255,136,0.4)" }}>
                        {s.value}
                      </div>
                      <div className="font-mono text-[10px] text-dim mt-0.5 tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Profile image + code panel ── */}
        <div className="hidden lg:flex flex-col items-center gap-8">
          <ProfileImage scanDone={scanDone} />

          {/* Code panel */}
          <motion.div
            style={{ x: panelX, y: panelY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: scanDone ? 1 : 0, x: scanDone ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            data-cursor="card"
            className="w-full"
          >
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(8,12,10,0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(0,255,136,0.12)",
              boxShadow: "0 0 60px rgba(0,255,136,0.06), 0 0 120px rgba(0,229,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "rgba(0,255,136,0.1)", background: "rgba(0,0,0,0.3)" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
              <span className="ml-3 font-mono text-[11px] text-dim">~/developer.ts</span>
              <span className="ml-auto font-mono text-[10px] text-green-dim">● LIVE</span>
            </div>

            {/* Code lines */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: scanDone ? 1 : 0, x: scanDone ? 0 : -8 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
                  className="flex gap-4 min-h-[1.5rem]"
                >
                  <span className="select-none text-dim w-5 text-right shrink-0 text-xs pt-0.5">
                    {line.code ? i + 1 : ""}
                  </span>
                  <span style={{ color: line.color || "transparent" }}>
                    {line.code
                      .replace(/(import|from|const|export|default)/g, (m) =>
                        `\u200B${m}\u200B`)
                      .split("\u200B")
                      .map((part, pi) => {
                        if (["import","from","const","export","default"].includes(part))
                          return <span key={pi} style={{ color: "#8b5cf6" }}>{part}</span>;
                        return <span key={pi}>{part}</span>;
                      })}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom status bar */}
            <div className="px-4 py-2 border-t flex items-center justify-between"
              style={{ borderColor: "rgba(0,255,136,0.08)", background: "rgba(0,0,0,0.2)" }}>
              <span className="font-mono text-[10px] text-dim">TypeScript · UTF-8</span>
              <span className="font-mono text-[10px] text-green-dim flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                No errors
              </span>
            </div>
          </motion.div>

          {/* Floating data packets */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-[9px] text-green-dim pointer-events-none"
              initial={{ opacity: 0 }}
              animate={scanDone ? {
                opacity: [0, 0.5, 0],
                y: [0, -30 - i * 15],
                x: [0, (i - 1) * 20],
              } : {}}
              transition={{ delay: 1.5 + i * 0.4, duration: 2, repeat: Infinity, repeatDelay: 3 + i }}
              style={{ right: -20 + i * 10, top: 60 + i * 40 }}
            >
              {["0x4F2A", "PKT_OK", "ACK"][i]}
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <AnimatePresence>
        {scanDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] text-dim tracking-[0.3em]">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="w-px h-6 bg-gradient-to-b from-green to-transparent" />
              <div className="w-1 h-1 rounded-full bg-green"
                style={{ boxShadow: "0 0 4px #00ff88" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
