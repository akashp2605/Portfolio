"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contact } from "@/lib/data";
import { externalLinkProps } from "@/lib/links";

const SOCIAL = [
  { label: "github",   href: contact.github,   color: "#f0f0f0" },
  { label: "linkedin", href: contact.linkedin,  color: "#00e5ff" },
  { label: "resume",   href: contact.resumeUrl, color: "#00ff88" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || data.message || "Failed to send");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-16 max-w-7xl mx-auto pb-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-xs text-green tracking-widest">// 07_CONTACT</span>
        <div className="flex-1 h-px bg-line-bright max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans font-bold text-4xl md:text-5xl text-text mb-4"
      >
        Get In <span className="text-green glow-green">Touch</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted text-sm mb-12 max-w-md"
      >
        Open to opportunities, collaborations, and interesting problems. Let's build something great.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="p-6 rounded-xl border border-white/8 font-mono text-sm mb-8"
            style={{ background: "rgba(12,15,12,0.85)", backdropFilter: "blur(24px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            <div className="text-dim mb-4 text-xs">$ cat contact.json</div>
            <div className="space-y-2 text-xs">
              <div><span className="text-green">"email"</span><span className="text-dim">:</span> <span className="text-cyan">"{contact.email}"</span></div>
              <div><span className="text-green">"github"</span><span className="text-dim">:</span> <span className="text-cyan">"{contact.github}"</span></div>
              <div><span className="text-green">"linkedin"</span><span className="text-dim">:</span> <span className="text-cyan">"{contact.linkedin}"</span></div>
              <div><span className="text-green">"status"</span><span className="text-dim">:</span> <span className="text-green">"available"</span></div>
            </div>
          </div>

          <div className="space-y-3">
            {SOCIAL.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                {...externalLinkProps(s.href)}
                whileHover={{ x: 6, color: s.color }}
                className="flex items-center gap-3 font-mono text-sm text-muted transition-colors"
              >
                <span className="text-green-dim">&gt;</span>
                <span>{s.label}</span>
                <span className="text-dim text-xs ml-auto">↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/8 overflow-hidden"
          style={{ background: "rgba(12,15,12,0.88)", backdropFilter: "blur(24px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
            <span className="w-2.5 h-2.5 rounded-full bg-red/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
            <span className="ml-3 font-mono text-[11px] text-dim">send_message.sh</span>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="font-mono text-green glow-green text-lg mb-2">MESSAGE_SENT ✓</div>
                  <div className="font-mono text-xs text-muted">I&apos;ll get back to you soon.</div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {(["name", "email"] as const).map((field) => (
                    <div key={field}>
                      <label className="font-mono text-[11px] text-dim block mb-1.5">
                        <span className="text-green-dim">$</span> {field}
                      </label>
                      <input
                        required
                        type={field === "email" ? "email" : "text"}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        className="w-full bg-bg border rounded px-3 py-2.5 font-mono text-sm text-text outline-none transition-all"
                        style={{
                          borderColor: focused === field ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.08)",
                          boxShadow: focused === field ? "0 0 16px rgba(0,255,136,0.15)" : "none",
                          background: "rgba(6,8,6,0.8)",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-mono text-[11px] text-dim block mb-1.5">
                      <span className="text-green-dim">$</span> message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-bg border rounded px-3 py-2.5 font-mono text-sm text-text outline-none transition-all resize-none"
                      style={{
                        borderColor: focused === "message" ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.08)",
                        boxShadow: focused === "message" ? "0 0 16px rgba(0,255,136,0.15)" : "none",
                        background: "rgba(6,8,6,0.8)",
                      }}
                    />
                  </div>
                  {error && (
                    <p className="font-mono text-xs text-red-400 text-center">{error}</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 28px rgba(0,255,136,0.45), 0 0 60px rgba(0,255,136,0.15)" } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full py-3 font-mono text-sm font-bold text-bg bg-green rounded transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "SENDING..." : "./send_message.sh"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
