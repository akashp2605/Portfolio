"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { identity, contact } from "@/lib/data";
import { Mail, MapPin, FileText, Send, Check, ExternalLink } from "lucide-react";

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cursor glow position
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Spring physics for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
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
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-full max-w-md"
      >
        <motion.div
          whileHover={{ z: 20 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            background: "#0b0f0d",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            boxShadow: isHovered
              ? "0 0 40px rgba(0, 255, 136, 0.12), 0 20px 60px rgba(0, 0, 0, 0.8)"
              : "0 4px 24px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Cursor-following glow */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(0, 255, 136, 0.06) 0%, transparent 70%)",
              x: glowX,
              y: glowY,
              translateX: "-50%",
              translateY: "-50%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.1 }}
          />

          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(0, 255, 136, 0.015), transparent)",
              height: "50%",
            }}
            animate={{ y: ["-50%", "150%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Noise overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-green/10">
              <div className="font-mono text-xs text-green tracking-widest mb-1">
                CONTACT TERMINAL
              </div>
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  <span className="font-mono text-[10px] text-green">SYSTEM ONLINE</span>
                </motion.div>
                <span className="font-mono text-[10px] text-dim">v2.0.4</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {/* Email */}
              <motion.a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 p-3 rounded-lg transition-all"
                style={{ background: "rgba(0, 255, 136, 0.03)" }}
                whileHover={{ 
                  background: "rgba(0, 255, 136, 0.08)",
                  x: 4,
                }}
                onClick={copyEmail}
              >
                <Mail size={14} className="text-green" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-dim mb-0.5">EMAIL</div>
                  <div className="font-sans text-sm text-white">{contact.email}</div>
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1 text-green text-[10px] font-mono"
                    >
                      <Check size={10} />
                      <span>Copied</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>

              {/* GitHub using ExternalLink icon */}
              <motion.a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg transition-all"
                style={{ background: "rgba(0, 255, 136, 0.03)" }}
                whileHover={{ 
                  background: "rgba(0, 255, 136, 0.08)",
                  x: 4,
                }}
              >
                <ExternalLink size={14} className="text-green" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-dim mb-0.5">GITHUB</div>
                  <div className="font-sans text-sm text-white">github.com/akashp2605</div>
                </div>
              </motion.a>

              {/* LinkedIn using ExternalLink icon */}
              <motion.a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg transition-all"
                style={{ background: "rgba(0, 255, 136, 0.03)" }}
                whileHover={{ 
                  background: "rgba(0, 255, 136, 0.08)",
                  x: 4,
                }}
              >
                <ExternalLink size={14} className="text-green" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-dim mb-0.5">LINKEDIN</div>
                  <div className="font-sans text-sm text-white">linkedin.com/in/akash-p</div>
                </div>
              </motion.a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(0, 255, 136, 0.03)" }}>
                <MapPin size={14} className="text-green" />
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-dim mb-0.5">LOCATION</div>
                  <div className="font-sans text-sm text-white">Andhra Pradesh, India</div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6 p-3 rounded-lg" style={{ background: "rgba(0, 255, 136, 0.05)", border: "1px solid rgba(0, 255, 136, 0.1)" }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-dim">STATUS</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="font-mono text-xs text-green">AVAILABLE FOR WORK</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-xs text-green transition-all"
                style={{
                  background: "rgba(0, 255, 136, 0.05)",
                  border: "1px solid rgba(0, 255, 136, 0.2)",
                }}
              >
                <FileText size={14} />
                <span>Resume.pdf</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-xs text-green transition-all"
                style={{
                  background: "rgba(0, 255, 136, 0.05)",
                  border: "1px solid rgba(0, 255, 136, 0.2)",
                }}
              >
                <Send size={14} />
                <span>Contact.exe</span>
              </motion.a>
            </div>
          </div>

          {/* Blinking terminal cursor */}
          <motion.div
            className="absolute bottom-4 right-4 pointer-events-none"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="font-mono text-green text-sm">_</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
