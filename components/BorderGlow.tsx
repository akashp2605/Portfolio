"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BorderGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function BorderGlow({ children, color = "#00e5ff", className = "" }: BorderGlowProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${color}00, ${color}40, ${color}00)`,
          filter: "blur(20px)",
          zIndex: -1,
        }}
        animate={{
          background: [
            `linear-gradient(45deg, ${color}00, ${color}40, ${color}00)`,
            `linear-gradient(225deg, ${color}00, ${color}40, ${color}00)`,
            `linear-gradient(45deg, ${color}00, ${color}40, ${color}00)`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Border */}
      <motion.div
        className="absolute -inset-[1px] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${color}00, ${color}60, ${color}00)`,
          backgroundSize: "200% 200%",
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {children}
    </div>
  );
}
