"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "button" | "card" | "text" | "input";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
}

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // ── State ──────────────────────────────────────────────
    const mouse   = { x: -200, y: -200 };
    const spring  = { x: -200, y: -200 };   // lagged position for outer ring
    const vel     = { x: 0, y: 0 };
    let   state: CursorState = "default";
    let   lockProgress = 0;                  // 0→1 lock-on animation
    let   rotation = 0;
    let   scanAngle = 0;
    let   raf: number;
    const particles: Particle[] = [];
    const COLORS = ["#00ff88", "#00e5ff", "#8b5cf6"];

    // ── Resize ─────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ─────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Emit particles proportional to speed
      if (speed > 4 && Math.random() < 0.4) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: mouse.x, y: mouse.y,
          vx: (Math.random() - 0.5) * 1.5 - dx * 0.05,
          vy: (Math.random() - 0.5) * 1.5 - dy * 0.05,
          life: 1, maxLife: 1,
          size: Math.random() * 2 + 0.5,
          color,
        });
        if (particles.length > 60) particles.shift();
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // ── State detection ────────────────────────────────────
    const getState = (el: Element | null): CursorState => {
      if (!el) return "default";
      if (el.closest("button, a, [data-cursor='button']")) return "button";
      if (el.closest("[data-cursor='card']"))              return "card";
      if (el.closest("input, textarea"))                   return "input";
      if (el.closest("p, h1, h2, h3, h4, span"))          return "text";
      return "default";
    };
    const onOver = (e: MouseEvent) => { state = getState(e.target as Element); };
    window.addEventListener("mouseover", onOver);

    // ── Click ripple ───────────────────────────────────────
    const ripples: { x: number; y: number; r: number; alpha: number }[] = [];
    const onClick = () => {
      ripples.push({ x: mouse.x, y: mouse.y, r: 0, alpha: 0.6 });
    };
    window.addEventListener("click", onClick);

    // ── Draw helpers ───────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const drawCrosshair = (x: number, y: number, size: number, alpha: number, color: string) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      const gap = size * 0.35;
      const len = size * 0.55;
      // horizontal
      ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x - gap, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + gap, y);  ctx.lineTo(x + size, y); ctx.stroke();
      // vertical
      ctx.beginPath(); ctx.moveTo(x, y - size); ctx.lineTo(x, y - gap); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + gap);  ctx.lineTo(x, y + size); ctx.stroke();
      // center dot
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.restore();
      void len;
    };

    const drawCornerBrackets = (x: number, y: number, size: number, alpha: number, color: string, rounded = false) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      const s = size;
      const arm = s * 0.38;
      const corners = [
        [-s, -s,  arm,  0,  0,  arm],
        [ s, -s, -arm,  0,  0,  arm],
        [-s,  s,  arm,  0,  0, -arm],
        [ s,  s, -arm,  0,  0, -arm],
      ];
      corners.forEach(([cx, cy, ax, ay, bx, by]) => {
        ctx.beginPath();
        if (rounded) {
          ctx.moveTo(x + cx + ax, y + cy + ay);
          ctx.arcTo(x + cx, y + cy, x + cx + bx, y + cy + by, 4);
          ctx.lineTo(x + cx + bx, y + cy + by);
        } else {
          ctx.moveTo(x + cx + ax, y + cy + ay);
          ctx.lineTo(x + cx, y + cy);
          ctx.lineTo(x + cx + bx, y + cy + by);
        }
        ctx.stroke();
      });
      ctx.restore();
    };

    const drawHexReticle = (x: number, y: number, r: number, alpha: number, rot: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(rot);
      // outer hex
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 1;
      ctx.stroke();
      // inner hex (counter-rotate)
      ctx.rotate(-rot * 2);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        i === 0 ? ctx.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55)
                : ctx.lineTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55);
      }
      ctx.closePath();
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    };

    const drawRadarSweep = (x: number, y: number, r: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.5;
      ctx.translate(x, y);
      // sweep wedge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, scanAngle, scanAngle + 1.2);
      ctx.closePath();
      ctx.fillStyle = "rgba(0,255,136,0.18)";
      ctx.fill();
      // ring
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,255,136,0.25)"; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.restore();
    };

    const drawLockOn = (x: number, y: number, progress: number) => {
      const r = lerp(28, 18, progress);
      const alpha = progress;
      // animated arc segments
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      const segments = 4;
      for (let i = 0; i < segments; i++) {
        const start = (Math.PI * 2 / segments) * i + rotation * 2;
        const end   = start + (Math.PI * 2 / segments) * 0.6;
        ctx.beginPath(); ctx.arc(x, y, r, start, end); ctx.stroke();
      }
      // center crosshair grows in
      ctx.globalAlpha = alpha * 0.8;
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 1;
      const cSize = lerp(0, 6, progress);
      ctx.beginPath(); ctx.moveTo(x - cSize, y); ctx.lineTo(x + cSize, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - cSize); ctx.lineTo(x, y + cSize); ctx.stroke();
      // lock text
      if (progress > 0.7) {
        ctx.globalAlpha = (progress - 0.7) / 0.3;
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 7px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("LOCK", x, y - r - 6);
      }
      ctx.restore();
    };

    const drawSquareFrame = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 1;
      // dashed square
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x - size, y - size, size * 2, size * 2);
      ctx.setLineDash([]);
      // solid corners
      drawCornerBrackets(x, y, size, 1, "#00e5ff");
      ctx.restore();
    };

    const drawInputCursor = (x: number, y: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      // I-beam
      ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 4, y - 10); ctx.lineTo(x + 4, y - 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 4, y + 10); ctx.lineTo(x + 4, y + 10); ctx.stroke();
      ctx.restore();
    };

    // ── Main render loop ───────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotation  += 0.012;
      scanAngle += 0.04;

      // Spring physics for outer element
      const stiffness = 0.14, damping = 0.72;
      vel.x = (vel.x + (mouse.x - spring.x) * stiffness) * damping;
      vel.y = (vel.y + (mouse.y - spring.y) * stiffness) * damping;
      spring.x += vel.x;
      spring.y += vel.y;

      // Lock-on progress
      lockProgress = lerp(lockProgress, state === "button" ? 1 : 0, 0.1);

      const mx = mouse.x, my = mouse.y;
      const sx = spring.x, sy = spring.y;

      // ── Particles ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94;
        p.life -= 0.04;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // ── Click ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3; rp.alpha -= 0.025;
        if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      // ── Render by state ──
      if (state === "button") {
        // Hex reticle at spring position + lock-on at mouse
        drawHexReticle(sx, sy, 22, 0.5 * (1 - lockProgress * 0.5), rotation);
        drawLockOn(mx, my, lockProgress);
        drawCrosshair(mx, my, 8, 0.9, "#00ff88");

      } else if (state === "card") {
        // Square targeting frame at spring, crosshair at mouse
        drawSquareFrame(sx, sy, 26, 0.6);
        drawCrosshair(mx, my, 7, 0.9, "#00e5ff");

      } else if (state === "input") {
        drawInputCursor(mx, my, 0.9);
        drawRadarSweep(sx, sy, 20, 0.4);

      } else if (state === "text") {
        // Minimal: just crosshair + faint hex
        drawCrosshair(mx, my, 6, 0.7, "#888");
        drawHexReticle(sx, sy, 16, 0.2, rotation);

      } else {
        // Default: hex reticle (spring) + crosshair (mouse) + radar sweep
        drawHexReticle(sx, sy, 20, 0.55, rotation);
        drawCrosshair(mx, my, 8, 0.85, "#00ff88");
        drawRadarSweep(sx, sy, 20, 0.3);
        // Corner brackets at spring position
        drawCornerBrackets(sx, sy, 18, 0.25, "#00e5ff");
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden
    />
  );
}
