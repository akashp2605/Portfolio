"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0, raf: number, t = 0;
    const mouse = { x: W / 2, y: H / 2 };
    const mouseTarget = { x: W / 2, y: H / 2 };

    // ── Resize ─────────────────────────────────────────────
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      mouse.x = mouseTarget.x = W / 2;
      mouse.y = mouseTarget.y = H / 2;
      initParticles();
    };

    // ── Perspective grid ───────────────────────────────────
    const drawGrid = () => {
      const horizon = H * 0.48;
      const vp = { x: W / 2 + (mouse.x - W / 2) * 0.04, y: horizon };
      const cols = 18, rows = 14;
      const spread = W * 1.1;

      ctx.lineWidth = 0.6;

      // Vertical lines converging to vanishing point
      for (let i = 0; i <= cols; i++) {
        const bx = -spread / 2 + (spread / cols) * i;
        const alpha = 0.04 + 0.02 * Math.sin(t * 0.3 + i * 0.4);
        ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(W / 2 + bx, H + 60);
        ctx.stroke();
      }

      // Horizontal lines with perspective spacing
      for (let j = 1; j <= rows; j++) {
        const progress = j / rows;
        const ease = progress * progress;
        const y = horizon + (H - horizon + 60) * ease;
        const xLeft  = vp.x + (W / 2 - spread / 2 - vp.x) * ease;
        const xRight = vp.x + (W / 2 + spread / 2 - vp.x) * ease;
        const alpha = 0.035 + 0.025 * ease * Math.sin(t * 0.2 + j);
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.beginPath(); ctx.moveTo(xLeft, y); ctx.lineTo(xRight, y); ctx.stroke();
      }
    };

    // ── Light beams ────────────────────────────────────────
    interface Beam {
      x: number; angle: number; width: number;
      color: string; speed: number; phase: number;
    }
    const beams: Beam[] = [
      { x: 0.2, angle: -0.3, width: 130, color: "0,255,136",  speed: 0.004, phase: 0 },
      { x: 0.7, angle:  0.2, width: 100, color: "0,229,255",  speed: 0.003, phase: 2 },
      { x: 0.5, angle:  0.0, width: 80,  color: "139,92,246", speed: 0.005, phase: 4 },
    ];
    const drawBeams = () => {
      beams.forEach((b) => {
        const cx = W * b.x + Math.sin(t * b.speed + b.phase) * W * 0.15;
        const alpha = 0.04 + 0.02 * Math.sin(t * b.speed * 2 + b.phase);
        const grad = ctx.createLinearGradient(cx, 0, cx + Math.tan(b.angle) * H, H);
        grad.addColorStop(0, `rgba(${b.color},0)`);
        grad.addColorStop(0.4, `rgba(${b.color},${alpha})`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        ctx.save();
        ctx.translate(cx, 0);
        ctx.rotate(b.angle);
        ctx.fillStyle = grad;
        ctx.fillRect(-b.width / 2, 0, b.width, H * 1.5);
        ctx.restore();
      });
    };

    // ── Particle network ───────────────────────────────────
    interface NetParticle {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string;
    }
    let netParticles: NetParticle[] = [];
    const initParticles = () => {
      const count = Math.min(60, Math.floor((W * H) / 18000));
      netParticles = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.5,
        color: ["0,255,136", "0,229,255", "139,92,246"][Math.floor(Math.random() * 3)],
      }));
    };
    const drawNetwork = () => {
      const CONNECT_DIST = 160;
      netParticles.forEach((p) => {
        // Gentle mouse attraction
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 250) { p.vx += dx / d * 0.008; p.vy += dy / d * 0.008; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},0.45)`; ctx.fill();
      });
      // Connection lines
      for (let i = 0; i < netParticles.length; i++) {
        for (let j = i + 1; j < netParticles.length; j++) {
          const a = netParticles[i], b = netParticles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
    };

    // ── Holographic scan wave ──────────────────────────────
    let scanY = -H * 0.1;
    const drawScanWave = () => {
      scanY += 0.5;
      if (scanY > H * 1.1) scanY = -H * 0.1;
      ctx.strokeStyle = "rgba(0,229,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();
      const grad = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      grad.addColorStop(0,   "rgba(0,229,255,0)");
      grad.addColorStop(0.5, "rgba(0,229,255,0.035)");
      grad.addColorStop(1,   "rgba(0,229,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 50, W, 100);
    };

    // ── Mouse spotlight ────────────────────────────────────
    const drawSpotlight = () => {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 420);
      grad.addColorStop(0,   "rgba(0,255,136,0.06)");
      grad.addColorStop(0.5, "rgba(0,229,255,0.02)");
      grad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    };

    // ── Ambient gradient blobs ─────────────────────────────
    const drawBlobs = () => {
      const blobs = [
        { x: W * 0.15, y: H * 0.2,  r: W * 0.38, color: "0,255,136",  a: 0.028 },
        { x: W * 0.85, y: H * 0.7,  r: W * 0.32, color: "139,92,246", a: 0.032 },
        { x: W * 0.5,  y: H * 0.5,  r: W * 0.42, color: "0,229,255",  a: 0.02  },
      ];
      blobs.forEach((b) => {
        const pulse = b.a + Math.sin(t * 0.008 + b.x) * 0.008;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${b.color},${pulse})`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      });
    };

    // ── Glitch flash ───────────────────────────────────────
    let glitchTimer = 0;
    let glitchActive = false;
    const drawGlitch = () => {
      glitchTimer++;
      if (glitchTimer > 300 && Math.random() < 0.004) {
        glitchActive = true; glitchTimer = 0;
      }
      if (glitchActive) {
        const slices = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < slices; i++) {
          const sy = Math.random() * H;
          const sh = 1 + Math.random() * 3;
          const offset = (Math.random() - 0.5) * 10;
          ctx.save();
          ctx.globalAlpha = 0.07;
          ctx.drawImage(canvas, offset, sy, W, sh, 0, sy, W, sh);
          ctx.restore();
        }
        if (Math.random() < 0.3) glitchActive = false;
      }
    };

    // ── Main loop ──────────────────────────────────────────
    const draw = () => {
      t++;
      // Smooth mouse
      mouse.x += (mouseTarget.x - mouse.x) * 0.06;
      mouse.y += (mouseTarget.y - mouse.y) * 0.06;

      ctx.clearRect(0, 0, W, H);

      // Layer order: blobs → grid → beams → network → scan → spotlight → glitch
      drawBlobs();
      drawGrid();
      drawBeams();
      drawNetwork();
      drawScanWave();
      drawSpotlight();
      drawGlitch();

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouseTarget.x = e.clientX; mouseTarget.y = e.clientY; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  );
}
