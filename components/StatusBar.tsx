"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "HOME" },
  { id: "about",    label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills",   label: "SKILLS" },
  { id: "timeline", label: "TIMELINE" },
  { id: "awards",   label: "AWARDS" },
  { id: "contact",  label: "CONTACT" },
];

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("HOME");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setScrollPct(Math.round((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100));
      let current = SECTIONS[0].label;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) current = s.label;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 h-7 flex items-center justify-between px-4 md:px-6 text-[10px] font-mono select-none border-t border-white/8"
      style={{ background: "rgba(6,8,6,0.95)", backdropFilter: "blur(24px)", boxShadow: "0 -4px 24px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="flex items-center gap-1.5 text-green" style={{ textShadow: "0 0 6px #00ff88" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          ONLINE
        </span>
        <span className="hidden sm:inline text-dim">UTF-8</span>
        <span className="text-cyan">SEC:{active}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-dim">SCROLL {scrollPct}%</span>
        <span className="text-muted">{time}</span>
      </div>
    </div>
  );
}
