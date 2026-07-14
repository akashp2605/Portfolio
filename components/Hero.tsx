"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { identity } from "@/lib/data";
import ProfileImage from "@/components/ProfileImage";

const CODE_LINES = [
  { code: `import { Developer } from "@/core";`, color: "#888" },
  { code: ``,                                    color: "" },
  { code: `const profile: Developer = {`,        color: "#888" },
  { code: `  name:     "${identity.name}",`,      color: "#00ff88" },
  { code: `  status:   "available",`,             color: "#00ff88" },
  { code: `  passion:  "building things",`,       color: "#00e5ff" },
  { code: `  coffee:   Infinity,`,                color: "#8b5cf6" },
  { code: `};`,                                   color: "#888" },
  { code: ``,                                    color: "" },
  { code: `export default profile;`,              color: "#888" },
];

const STATS = [
  { label: "PROJECTS", value: identity.projectsShipped },
  { label: "CGPA",     value: "8.7" },
  { label: "COFFEE",   value: identity.coffeeCount },
];

// ── Shared code panel ─────────────────────────────────────────────────────
function CodePanel({ scanDone, compact = false }: { scanDone: boolean; compact?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="rounded-xl overflow-hidden w-full"
      style={{
        background: "rgba(8,12,10,0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(0,255,136,0.12)",
        boxShadow: "0 0 40px rgba(0,255,136,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b"
        style={{ borderColor: "rgba(0,255,136,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <span className="w-2 h-2 rounded-full bg-red/50" />
        <span className="w-2 h-2 rounded-full bg-amber/50" />
        <span className="w-2 h-2 rounded-full bg-green/50" />
        <span className="ml-2 font-mono text-[10px] text-dim">~/developer.ts</span>
        <span className="ml-auto font-mono text-[9px] text-green-dim">● LIVE</span>
      </div>

      <div className={`${compact ? "p-3" : "p-5"} font-mono ${compact ? "text-[10px]" : "text-sm"} leading-relaxed`}>
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: scanDone ? 1 : 0, x: scanDone ? 0 : -6 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.25 }}
            className="flex gap-3 min-h-[1.4rem]"
          >
            <span className="select-none text-dim w-4 text-right shrink-0 pt-0.5 text-[9px]">
              {line.code ? i + 1 : ""}
            </span>
            <span style={{ color: line.color || "transparent" }}>
              {line.code
                .replace(/(import|from|const|export|default)/g, (m) => `\u200B${m}\u200B`)
                .split("\u200B")
                .map((part, pi) =>
                  ["import","from","const","export","default"].includes(part)
                    ? <span key={pi} style={{ color: "#8b5cf6" }}>{part}</span>
                    : <span key={pi}>{part}</span>
                )}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="px-3 py-2 border-t flex items-center justify-between"
        style={{ borderColor: "rgba(0,255,136,0.08)", background: "rgba(0,0,0,0.2)" }}>
        <span className="font-mono text-[9px] text-dim">TypeScript · UTF-8</span>
        <span className="font-mono text-[9px] text-green-dim flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          No errors
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [scanDone, setScanDone] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const panelX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const panelY = useTransform(mouseY, [-1, 1], [-5, 5]);

  useEffect(() => { setScanDone(true); }, []);

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
    <section ref={sectionRef} id="hero" className="relative">
      {/* Depth gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#070a08] to-[#050508]" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Scan line */}
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

      {/* ── DESKTOP layout: side-by-side, fills viewport ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16
                      hidden lg:grid lg:grid-cols-[1fr_auto] lg:gap-12 xl:gap-20 lg:items-center lg:min-h-screen">

        {/* Desktop left: text */}
        <div>
          <AnimatePresence>
            {scanDone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
                  style={{ borderColor: "rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.05)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" style={{ boxShadow: "0 0 6px #00ff88" }} />
                  <span className="font-mono text-[11px] text-green tracking-widest">{identity.status}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                  className="font-sans font-bold leading-[0.92] tracking-tight"
                  style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
                >
                  <span className="block text-muted font-mono text-base mb-2 font-normal">// IDENTITY</span>
                  <span className="text-text">I&apos;m </span>
                  <span className="text-green" style={{ textShadow: "0 0 30px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)" }}>
                    {identity.name}
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="mt-5 font-mono text-lg md:text-xl h-8 flex items-center gap-2"
                >
                  <span className="text-dim">&gt;_</span>
                  <span className="text-cyan" style={{ textShadow: "0 0 12px rgba(0,229,255,0.5)" }}>{displayed}</span>
                  <span className="inline-block w-[2px] h-5 bg-cyan blink" style={{ boxShadow: "0 0 6px #00e5ff" }} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-6 max-w-lg text-muted leading-relaxed text-sm md:text-base"
                >
                  {identity.summary}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <motion.a href="#projects" data-cursor="button"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="relative px-6 py-3 font-mono text-sm font-bold text-bg bg-green rounded overflow-hidden"
                    style={{ boxShadow: "0 0 20px rgba(0,255,136,0.25)" }}
                  >
                    <span className="relative z-10">VIEW_WORK()</span>
                    <motion.span className="absolute inset-0 bg-cyan" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                  </motion.a>
                  <motion.a href="#contact" data-cursor="button"
                    whileHover={{ scale: 1.04, borderColor: "#00e5ff" }} whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 font-mono text-sm font-bold text-cyan border border-cyan/40 rounded transition-all"
                    style={{ background: "rgba(0,229,255,0.04)" }}
                  >
                    CONTACT_ME()
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                  className="mt-10 flex items-center gap-8"
                >
                  {STATS.map((s, i) => (
                    <div key={s.label} className="relative">
                      {i > 0 && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-line-bright" />}
                      <div className="font-sans font-bold text-2xl text-green" style={{ textShadow: "0 0 12px rgba(0,255,136,0.4)" }}>{s.value}</div>
                      <div className="font-mono text-[10px] text-dim mt-0.5 tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop right: profile + code panel */}
        <div className="flex flex-col items-center gap-6">
          <ProfileImage scanDone={scanDone} />
          <motion.div
            style={{ x: panelX, y: panelY }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: scanDone ? 1 : 0, x: scanDone ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full" data-cursor="card"
          >
            <CodePanel scanDone={scanDone} />
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden relative z-10 w-full max-w-2xl mx-auto px-5 pt-24 pb-10">
        <AnimatePresence>
          {scanDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
                style={{ borderColor: "rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.05)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" style={{ boxShadow: "0 0 6px #00ff88" }} />
                <span className="font-mono text-[10px] text-green tracking-widest">{identity.status}</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
                className="font-sans font-bold leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 12vw, 4rem)" }}
              >
                <span className="block text-muted font-mono text-sm mb-1.5 font-normal">// IDENTITY</span>
                <span className="text-text">I&apos;m </span>
                <span className="text-green" style={{ textShadow: "0 0 24px rgba(0,255,136,0.4)" }}>{identity.name}</span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-3 font-mono text-base h-7 flex items-center gap-2"
              >
                <span className="text-dim">&gt;_</span>
                <span className="text-cyan" style={{ textShadow: "0 0 10px rgba(0,229,255,0.5)" }}>{displayed}</span>
                <span className="inline-block w-[2px] h-4 bg-cyan blink" style={{ boxShadow: "0 0 5px #00e5ff" }} />
              </motion.div>

              {/* Summary */}
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-4 text-muted leading-relaxed text-sm"
              >
                {identity.summary}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-5 flex flex-wrap gap-3"
              >
                <motion.a href="#projects" data-cursor="button"
                  whileTap={{ scale: 0.97 }}
                  className="relative px-5 py-2.5 font-mono text-sm font-bold text-bg bg-green rounded overflow-hidden"
                  style={{ boxShadow: "0 0 16px rgba(0,255,136,0.25)" }}
                >
                  <span className="relative z-10">VIEW_WORK()</span>
                </motion.a>
                <motion.a href="#contact" data-cursor="button"
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 font-mono text-sm font-bold text-cyan border border-cyan/40 rounded"
                  style={{ background: "rgba(0,229,255,0.04)" }}
                >
                  CONTACT_ME()
                </motion.a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                className="mt-5 flex items-center gap-6"
              >
                {STATS.map((s, i) => (
                  <div key={s.label} className="relative">
                    {i > 0 && <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-px h-5 bg-line-bright" />}
                    <div className="font-sans font-bold text-xl text-green" style={{ textShadow: "0 0 10px rgba(0,255,136,0.4)" }}>{s.value}</div>
                    <div className="font-mono text-[9px] text-dim tracking-widest">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* ── Shared cyber panel: profile + terminal ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-8 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(8,12,10,0.88)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,255,136,0.14)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b"
                  style={{ borderColor: "rgba(0,255,136,0.1)", background: "rgba(0,0,0,0.35)" }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red/50" />
                    <span className="w-2 h-2 rounded-full bg-amber/50" />
                    <span className="w-2 h-2 rounded-full bg-green/50" />
                  </div>
                  <span className="font-mono text-[9px] text-dim tracking-widest">CYBER_ID · PROFILE</span>
                  <motion.span
                    className="font-mono text-[9px] text-green flex items-center gap-1"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <span className="w-1 h-1 rounded-full bg-green" />LIVE
                  </motion.span>
                </div>

                {/* Profile + terminal side by side */}
                <div className="flex flex-col xs:flex-row sm:flex-row gap-0">
                  {/* Profile image — left */}
                  <div className="flex items-center justify-center p-4 sm:p-5 sm:border-r"
                    style={{ borderColor: "rgba(0,255,136,0.08)" }}>
                    <div style={{ transform: "scale(0.72)", transformOrigin: "center" }}>
                      <ProfileImage scanDone={scanDone} />
                    </div>
                  </div>

                  {/* Terminal — right */}
                  <div className="flex-1 p-3 sm:p-4 min-w-0">
                    <CodePanel scanDone={scanDone} compact />
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator — desktop only */}
      <AnimatePresence>
        {scanDone && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
          >
            <span className="font-mono text-[10px] text-dim tracking-[0.3em]">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="w-px h-6 bg-gradient-to-b from-green to-transparent" />
              <div className="w-1 h-1 rounded-full bg-green" style={{ boxShadow: "0 0 4px #00ff88" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
