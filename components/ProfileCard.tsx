"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { identity, contact } from "@/lib/data";
import { Mail, MapPin, FileText, Download, ArrowRight, ExternalLink } from "lucide-react";
import "./ProfileCard.css";

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Center Hub initials
  const initials = "AK";

  // 3D tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Smooth springs for card tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setHoveredNode(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section className="relative flex items-center justify-center py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="w-full max-w-6xl"
      >
        {/* Main Terminal Panel */}
        <div className="profile-card-container relative p-6 sm:p-8 lg:p-10">
          {/* Cursor Glow Effect */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle, rgba(0, 255, 136, 0.07) 0%, rgba(0, 229, 255, 0.02) 45%, transparent 70%)",
              x: glowX,
              y: glowY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Subtly Scanning Light Line */}
          <motion.div
            className="absolute inset-x-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0, 255, 136, 0.025), transparent)",
              height: "40%",
            }}
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* Two-Column Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* ════════════════════════════════════════════════════════════ */}
            {/* LEFT PANEL (~60% width on desktop)                           */}
            {/* ════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* TOP HEADER */}
              <div>
                <div className="font-mono text-xs font-semibold tracking-widest text-[#00ff88] uppercase mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  SYSTEM IDENTITY NODE
                </div>
                <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase mb-2">
                  CONTACT HUB
                </h2>
                <p className="font-mono text-xs text-[#8f9a91] tracking-wide leading-relaxed">
                  Secure Communication • Identity Verified • Portfolio Access
                </p>
              </div>

              {/* CENTER NETWORK MATRIX DIAGRAM */}
              <div className="network-matrix relative my-4 sm:my-6 p-6 min-h-[360px] sm:min-h-[400px]">
                {/* SVG Glowing Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                  <defs>
                    <linearGradient id="cyan-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Line 1: Center to GitHub (Top-Left) */}
                  <motion.line
                    x1="50%" y1="50%"
                    x2="22%" y2="20%"
                    stroke={hoveredNode === "github" ? "#00ff88" : "rgba(0, 255, 136, 0.25)"}
                    strokeWidth={hoveredNode === "github" ? "2" : "1.2"}
                    className="network-line"
                    filter="url(#glow)"
                  />
                  {/* Line 2: Center to LinkedIn (Top-Right) */}
                  <motion.line
                    x1="50%" y1="50%"
                    x2="78%" y2="20%"
                    stroke={hoveredNode === "linkedin" ? "#00ff88" : "rgba(0, 255, 136, 0.25)"}
                    strokeWidth={hoveredNode === "linkedin" ? "2" : "1.2"}
                    className="network-line"
                    filter="url(#glow)"
                  />
                  {/* Line 3: Center to Email (Bottom-Left) */}
                  <motion.line
                    x1="50%" y1="50%"
                    x2="22%" y2="80%"
                    stroke={hoveredNode === "email" ? "#00ff88" : "rgba(0, 255, 136, 0.25)"}
                    strokeWidth={hoveredNode === "email" ? "2" : "1.2"}
                    className="network-line"
                    filter="url(#glow)"
                  />
                  {/* Line 4: Center to LeetCode (Bottom-Right) */}
                  <motion.line
                    x1="50%" y1="50%"
                    x2="78%" y2="80%"
                    stroke={hoveredNode === "leetcode" ? "#00ff88" : "rgba(0, 255, 136, 0.25)"}
                    strokeWidth={hoveredNode === "leetcode" ? "2" : "1.2"}
                    className="network-line"
                    filter="url(#glow)"
                  />
                  {/* Line 5: Center to Location (Top-Center) */}
                  <motion.line
                    x1="50%" y1="50%"
                    x2="50%" y2="12%"
                    stroke={hoveredNode === "location" ? "#00ff88" : "rgba(0, 255, 136, 0.25)"}
                    strokeWidth={hoveredNode === "location" ? "2" : "1.2"}
                    className="network-line"
                    filter="url(#glow)"
                  />
                </svg>

                {/* CENTER HUB NODE */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                  <motion.div
                    className="center-hub w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="font-mono font-black text-xl sm:text-2xl text-[#00ff88] tracking-widest glow-green">
                      {initials}
                    </span>
                    {/* Animated Outer Radar Ring */}
                    <span className="absolute inset-0 rounded-full border border-[#00ff88] animate-ping opacity-20 pointer-events-none" />
                  </motion.div>
                </div>

                {/* SATELLITE FLOATING NODES */}
                {/* Node 5: Location (Top Center) */}
                <motion.div
                  onMouseEnter={() => setHoveredNode("location")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="satellite-node absolute top-[6%] left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-default"
                >
                  <MapPin className="w-4 h-4 text-[#00ff88]" />
                  <div>
                    <div className="font-mono text-[9px] text-[#00ff88] font-semibold tracking-wider">LOCATION</div>
                    <div className="font-sans font-medium text-xs text-white">Andhra Pradesh, IN</div>
                  </div>
                </motion.div>

                {/* Node 1: GitHub (Top Left) */}
                <motion.a
                  href={contact?.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredNode("github")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="satellite-node absolute top-[14%] left-[4%] sm:left-[8%] flex items-center gap-2"
                >
                  {/* Inline GitHub SVG */}
                  <svg className="w-4 h-4 text-[#00ff88] fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ff88] font-semibold tracking-wider">GITHUB</div>
                    <div className="font-sans font-medium text-xs text-white flex items-center gap-1">
                      GitHub <ExternalLink className="w-3 h-3 text-[#8f9a91]" />
                    </div>
                  </div>
                </motion.a>

                {/* Node 2: LinkedIn (Top Right) */}
                <motion.a
                  href={contact?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredNode("linkedin")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="satellite-node absolute top-[14%] right-[4%] sm:right-[8%] flex items-center gap-2"
                >
                  {/* Inline LinkedIn SVG */}
                  <svg className="w-4 h-4 text-[#00ff88] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ff88] font-semibold tracking-wider">LINKEDIN</div>
                    <div className="font-sans font-medium text-xs text-white flex items-center gap-1">
                      LinkedIn <ExternalLink className="w-3 h-3 text-[#8f9a91]" />
                    </div>
                  </div>
                </motion.a>

                {/* Node 3: Email (Bottom Left) */}
                <motion.a
                  href={`mailto:${contact?.email || "akashp2605@gmail.com"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `mailto:${contact?.email || "akashp2605@gmail.com"}`;
                  }}
                  onMouseEnter={() => setHoveredNode("email")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="satellite-node absolute bottom-[14%] left-[4%] sm:left-[8%] flex items-center gap-2 cursor-pointer z-30"
                >
                  <Mail className="w-4 h-4 text-[#00ff88]" />
                  <div>
                    <div className="font-mono text-[9px] text-[#00ff88] font-semibold tracking-wider">EMAIL</div>
                    <div className="font-sans font-medium text-xs text-white flex items-center gap-1">
                      Email <ExternalLink className="w-3 h-3 text-[#8f9a91]" />
                    </div>
                  </div>
                </motion.a>

                {/* Node 4: LeetCode (Bottom Right) */}
                <motion.a
                  href={(contact as any)?.leetcode || "https://leetcode.com/u/akash26059/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredNode("leetcode")}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="satellite-node absolute bottom-[14%] right-[4%] sm:right-[8%] flex items-center gap-2 cursor-pointer"
                >
                  {/* Inline LeetCode SVG */}
                  <svg className="w-4 h-4 text-[#00ff88] fill-current" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.17 6.2a1.375 1.375 0 0 0-.011 1.936l4.137 4.195a1.374 1.374 0 0 0 1.948.012l5.352-5.76a1.374 1.374 0 0 0-.012-1.948L14.448.438A1.374 1.374 0 0 0 13.483 0zm-5.7 8.35L2.3 13.82a1.374 1.374 0 0 0 .012 1.948l5.352 5.76a1.374 1.374 0 0 0 1.948-.012l5.352-5.76a1.374 1.374 0 0 0-.012-1.948L10.815 9.61a1.375 1.375 0 0 0-1.936.012zM16.14 11.516a.85.85 0 0 0-.85.85v.006c0 .47.38.85.85.85h5.01a.85.85 0 0 0 .85-.85v-.006a.85.85 0 0 0-.85-.85h-5.01z" />
                  </svg>
                  <div>
                    <div className="font-mono text-[9px] text-[#00ff88] font-semibold tracking-wider">LEETCODE</div>
                    <div className="font-sans font-medium text-xs text-white flex items-center gap-1">
                      LeetCode <ExternalLink className="w-3 h-3 text-[#8f9a91]" />
                    </div>
                  </div>
                </motion.a>
              </div>

              {/* BOTTOM TERMINAL FOOTER STATUS BAR */}
              <div className="terminal-status-bar">
                <div className="flex items-center gap-2 text-[#00ff88] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
                  <span>● SYSTEM ONLINE</span>
                </div>
                <div className="text-[#8f9a91] tracking-widest text-[10px] uppercase">
                  SECURE CONNECTION
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════ */}
            {/* RIGHT PANEL (~40% width on desktop)                          */}
            {/* ════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-2 lg:pt-0">
              {/* TOP HEADER */}
              <div>
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-2">
                  IDENTITY NODE
                </h2>
                <p className="font-mono text-xs text-[#8f9a91] leading-relaxed">
                  Access verified communication channels and downloadable professional assets through encrypted connections.
                </p>
              </div>

              {/* 3 PREMIUM CARDS */}
              <div className="space-y-4 my-auto flex flex-col justify-center">
                {/* Card 1: Resume / Professional Documentation */}
                <motion.a
                  href={contact?.resumeUrl || "/Resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="asset-card group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2.5 rounded-lg bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] text-[#00ff88]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] text-[#00ff88] uppercase tracking-wider font-semibold">
                      Resume
                    </div>
                    <div className="font-sans font-semibold text-sm text-white group-hover:text-[#00ff88] transition-colors truncate">
                      Documentation
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#8f9a91] group-hover:text-[#00ff88] transition-colors">
                    <span>View Resume</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>

                {/* Card 2: Local Copy / Download PDF */}
                <motion.a
                  href={contact?.resumeUrl || "/Resume.pdf"}
                  download="Akash_Resume.pdf"
                  className="asset-card group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2.5 rounded-lg bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] text-[#00ff88]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] text-[#00ff88] uppercase tracking-wider font-semibold">
                      Local Copy
                    </div>
                    <div className="font-sans font-semibold text-sm text-white group-hover:text-[#00ff88] transition-colors truncate">
                      Download PDF
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#8f9a91] group-hover:text-[#00ff88] transition-colors">
                    <span>Download</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>

                {/* Card 3: Availability */}
                <motion.div
                  className="asset-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 rounded-lg bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88] animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] text-[#8f9a91] uppercase tracking-wider font-semibold">
                      Status Indicator
                    </div>
                    <div className="font-mono font-bold text-sm text-[#00ff88] tracking-wider uppercase glow-green">
                      AVAILABLE FOR WORK
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Terminal Cursor */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[#8f9a91] border-t border-[rgba(0,255,136,0.1)] pt-3 mt-2">
                <span>IDENTITY_HASH: 0x8F92A0</span>
                <span className="text-[#00ff88] animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
