"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { identity } from "@/lib/data";
const HAS_PHOTO = true;
const PHOTO_SRC = "/profile.png";

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const top    = pos.startsWith("t") ? "top-0"    : "bottom-0";
  const side   = pos.endsWith("l")   ? "left-0"   : "right-0";
  const flipX  = pos.endsWith("r")   ? "scaleX(-1)" : "";
  const flipY  = pos.startsWith("b") ? "scaleY(-1)" : "";
  const delay  = { tl: 0, tr: 0.5, bl: 1, br: 1.5 }[pos];
  return (
    <motion.div
      className={`absolute ${top} ${side} w-7 h-7 pointer-events-none z-20`}
      style={{ transform: `${flipX} ${flipY}` }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 12 L3 3 L12 3" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

export default function ProfileImage({ scanDone }: { scanDone: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: scanDone ? 1 : 0, x: scanDone ? 0 : 40 }}
      transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-40px",
          background: "radial-gradient(ellipse at center, rgba(0,255,136,0.07) 0%, rgba(0,229,255,0.04) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-[22px] pointer-events-none"
        style={{ inset: "-6px" }}
        animate={{
          boxShadow: hovered
            ? "0 0 0 1px rgba(0,255,136,0.4), 0 0 48px rgba(0,255,136,0.14), 0 0 90px rgba(0,229,255,0.07)"
            : "0 0 0 1px rgba(0,255,136,0.14), 0 0 24px rgba(0,255,136,0.05)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Main frame */}
      <motion.div
        animate={{ y: hovered ? -7 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: "clamp(200px, 22vw, 300px)",
          height: "clamp(250px, 28vw, 375px)",
          background: "rgba(8,12,10,0.92)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? "rgba(0,255,136,0.38)" : "rgba(0,255,136,0.16)"}`,
          boxShadow: hovered
            ? "0 32px 80px rgba(0,0,0,0.75), 0 0 60px rgba(0,255,136,0.1), inset 0 1px 0 rgba(255,255,255,0.07)"
            : "0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
        data-cursor="card"
      >
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-3 z-10"
          style={{ background: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(0,255,136,0.1)" }}
        >
          <span className="font-mono text-[9px] text-green-dim tracking-widest">ID.PNG</span>
          <motion.span
            className="font-mono text-[9px] text-green flex items-center gap-1"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <span className="w-1 h-1 rounded-full bg-green inline-block" />
            LIVE
          </motion.span>
        </div>

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.55), rgba(0,255,136,0.35), transparent)",
            boxShadow: "0 0 10px rgba(0,229,255,0.35)",
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Photo or placeholder */}
        {HAS_PHOTO && PHOTO_SRC ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PHOTO_SRC}
            alt={`${identity.name} — Profile Photo`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pt-6 pb-10">
            {/* Silhouette */}
            <motion.div
              animate={{ boxShadow: hovered ? "0 0 32px rgba(0,255,136,0.18)" : "0 0 16px rgba(0,255,136,0.07)" }}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0,255,136,0.05)",
                border: "1px solid rgba(0,255,136,0.22)",
              }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="19" r="10" stroke="rgba(0,255,136,0.55)" strokeWidth="1.5" />
                <path d="M6 46c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="rgba(0,255,136,0.55)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            <div className="text-center space-y-1.5">
              <p className="font-mono text-xs text-green tracking-[0.2em]">YOUR PHOTO</p>
              <p className="font-mono text-[10px] text-muted">Replace with your image</p>
            </div>

            <div
              className="px-3 py-1.5 rounded font-mono text-[9px] text-dim"
              style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
            >
              /public/profile.jpg
            </div>
          </div>
        )}

        {/* Holographic sheen */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "linear-gradient(135deg, rgba(0,255,136,0.025) 0%, transparent 50%, rgba(0,229,255,0.025) 100%)",
          }}
        />

        {/* Bottom strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-9 flex items-center justify-between px-3 z-10"
          style={{ background: "rgba(0,0,0,0.55)", borderTop: "1px solid rgba(0,255,136,0.1)" }}
        >
          <span className="font-mono text-[9px] text-muted truncate">{`{ name: "${identity.name}" }`}</span>
          <span className="font-mono text-[9px] text-green-dim shrink-0 ml-2">v2.0</span>
        </div>
      </motion.div>

      {/* Corner brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((p) => (
        <Corner key={p} pos={p} />
      ))}

      {/* Floating side labels — desktop only */}
      {[
        { label: "STATUS: ONLINE",  top: "22%", color: "#00ff88", delay: 0.8 },
        { label: "STACK: JAVA",     top: "46%", color: "#00e5ff", delay: 1.2 },
        { label: "MODE: AVAILABLE", top: "70%", color: "#8b5cf6", delay: 1.6 },
      ].map((tag) => (
        <motion.div
          key={tag.label}
          className="absolute left-[calc(100%+12px)] hidden xl:flex items-center gap-1.5 font-mono text-[9px] whitespace-nowrap"
          style={{ top: tag.top, color: tag.color }}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: [0, 0.75, 0.75, 0], x: 0 }}
          transition={{ delay: 1.2 + tag.delay, duration: 3.5, repeat: Infinity, repeatDelay: 5 }}
        >
          <span className="w-px h-3 shrink-0" style={{ background: tag.color }} />
          {tag.label}
        </motion.div>
      ))}

      {/* Floating particles */}
      {[
        { x: "8%",  y: "18%", c: "#00ff88" },
        { x: "88%", y: "28%", c: "#00e5ff" },
        { x: "15%", y: "78%", c: "#8b5cf6" },
        { x: "82%", y: "72%", c: "#00ff88" },
        { x: "50%", y: "92%", c: "#00e5ff" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, background: p.c, boxShadow: `0 0 6px ${p.c}` }}
          animate={{ y: [0, -10, 0], opacity: [0.25, 0.7, 0.25], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}
