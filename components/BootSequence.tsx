"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQUENCE = [
  { text: "INITIALIZING SYSTEM...",        delay: 0 },
  { text: "LOADING MODULES...",            delay: 300 },
  { text: "DECRYPTING ASSETS...",          delay: 600 },
  { text: "ESTABLISHING CONNECTION...",    delay: 900 },
  { text: "COMPILING PORTFOLIO...",        delay: 1200 },
  { text: "ACCESS GRANTED.",              delay: 1500 },
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    SEQUENCE.forEach((s, i) => {
      setTimeout(() => {
        setStep(i + 1);
        setProgress(Math.round(((i + 1) / SEQUENCE.length) * 100));
      }, s.delay);
    });
    setTimeout(() => setDone(true), 2000);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center px-6"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 font-mono text-2xl font-bold text-green glow-green tracking-widest"
          >
            &gt;_ PORTFOLIO.EXE
          </motion.div>

          {/* Terminal lines */}
          <div className="w-full max-w-lg space-y-2 mb-8">
            {SEQUENCE.slice(0, step).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 font-mono text-xs"
              >
                <span className="text-green-dim">$</span>
                <span className={i === step - 1 ? "text-green glow-green" : "text-muted"}>
                  {s.text}
                </span>
                {i === step - 1 && i < SEQUENCE.length - 1 && (
                  <span className="inline-block w-1.5 h-3.5 bg-green blink" />
                )}
                {i < step - 1 && (
                  <span className="text-green-dim ml-auto text-[10px]">OK</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-lg">
            <div className="flex justify-between font-mono text-[10px] text-dim mb-2">
              <span>LOADING</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px bg-line-bright w-full overflow-hidden">
              <motion.div
                className="h-full bg-green"
                style={{ boxShadow: "0 0 8px #00ff88" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-dim">SYS_BOOT v2.4.1</div>
          <div className="absolute top-6 right-6 font-mono text-[10px] text-dim">NODE_ENV: PRODUCTION</div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-dim">MEM: 0xDEADBEEF</div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-dim">STATUS: ONLINE</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
