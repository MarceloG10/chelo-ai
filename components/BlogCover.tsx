"use client";
import { useEffect, useRef } from "react";

type Props = { tags: string[]; className?: string };

function getColors(tags: string[]): { a: string; b: string; bg: string } {
  const map: Record<string, { a: string; b: string; bg: string }> = {
    "agente IA":      { a: "#b6ff3c", b: "#4ade80", bg: "#030f03" },
    "automatización": { a: "#38bdf8", b: "#818cf8", bg: "#03080f" },
    "desarrollo":     { a: "#f472b6", b: "#c084fc", bg: "#0f0308" },
    "dashboard":      { a: "#fb923c", b: "#fbbf24", bg: "#0f0600" },
    "SEO":            { a: "#34d399", b: "#2dd4bf", bg: "#020f0a" },
    "apps":           { a: "#a78bfa", b: "#60a5fa", bg: "#05030f" },
  };
  for (const tag of tags) {
    if (map[tag]) return map[tag];
  }
  return { a: "#b6ff3c", b: "#4ade80", bg: "#030f03" };
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// ── Neural network animation ──────────────────────────────────────────────────
function drawNeuralNet(canvas: HTMLCanvasElement, a: string, b: string, bg: string) {
  const ctx = canvas.getContext("2d")!;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const ca = hexToRgb(a), cb = hexToRgb(b);

  const NODE_COUNT = 14;
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: 0.1 * W + Math.random() * 0.8 * W,
    y: 0.1 * H + Math.random() * 0.8 * H,
    r: 3 + Math.random() * 5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    pulse: Math.random() * Math.PI * 2,
  }));

  // Particles traveling between connected nodes
  const particles: { from: number; to: number; t: number; speed: number }[] = [];
  for (let i = 0; i < 18; i++) {
    const from = Math.floor(Math.random() * NODE_COUNT);
    const to   = Math.floor(Math.random() * NODE_COUNT);
    if (from !== to) particles.push({ from, to, t: Math.random(), speed: 0.003 + Math.random() * 0.005 });
  }

  let raf: number;
  function draw() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Dot grid
    ctx.fillStyle = `rgba(255,255,255,0.04)`;
    for (let x = 20; x < W; x += 28) for (let y = 20; y < H; y += 28) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    }

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
      if (n.x < 20 || n.x > W - 20) n.vx *= -1;
      if (n.y < 20 || n.y > H - 20) n.vy *= -1;
    });

    // Draw connections
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (j <= i) return;
        const dist = Math.hypot(n.x - m.x, n.y - m.y);
        if (dist > W * 0.35) return;
        const op = (1 - dist / (W * 0.35)) * 0.18;
        ctx.strokeStyle = `rgba(${ca.r},${ca.g},${ca.b},${op})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
        ctx.setLineDash([]);
      });
    });

    // Draw particles
    particles.forEach(p => {
      p.t += p.speed;
      if (p.t >= 1) { p.t = 0; p.from = p.to; p.to = Math.floor(Math.random() * NODE_COUNT); }
      const fn = nodes[p.from], tn = nodes[p.to];
      const x = fn.x + (tn.x - fn.x) * p.t;
      const y = fn.y + (tn.y - fn.y) * p.t;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 6);
      grd.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},0.9)`);
      grd.addColorStop(1, `rgba(${ca.r},${ca.g},${ca.b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
    });

    // Draw nodes
    nodes.forEach(n => {
      const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
      // Outer glow
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4 + pulse * 8);
      grd.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},${0.15 + pulse * 0.1})`);
      grd.addColorStop(1, `rgba(${ca.r},${ca.g},${ca.b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4 + pulse * 8, 0, Math.PI * 2); ctx.fill();
      // Core
      ctx.fillStyle = `rgba(${ca.r},${ca.g},${ca.b},${0.6 + pulse * 0.4})`;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    });

    // Vignette
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, `${bg}ee`);
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    // Bottom accent
    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0,   "transparent");
    bar.addColorStop(0.3, `rgba(${ca.r},${ca.g},${ca.b},0.5)`);
    bar.addColorStop(0.7, `rgba(${cb.r},${cb.g},${cb.b},0.4)`);
    bar.addColorStop(1,   "transparent");
    ctx.fillStyle = bar;
    ctx.fillRect(0, H - 2, W, 2);

    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

// ── Particle field (default / SEO / apps) ────────────────────────────────────
function drawParticles(canvas: HTMLCanvasElement, a: string, b: string, bg: string) {
  const ctx = canvas.getContext("2d")!;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const ca = hexToRgb(a), cb = hexToRgb(b);

  const pts = Array.from({ length: 80 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: 1 + Math.random() * 2.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    op: 0.2 + Math.random() * 0.6,
    color: Math.random() > 0.5 ? ca : cb,
  }));

  // Big ambient circles
  const orbs = [
    { x: W * 0.25, y: H * 0.4, r: H * 0.55, c: ca },
    { x: W * 0.75, y: H * 0.6, r: H * 0.45, c: cb },
  ];

  let raf: number;
  function draw() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    orbs.forEach(o => {
      const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      grd.addColorStop(0, `rgba(${o.c.r},${o.c.g},${o.c.b},0.08)`);
      grd.addColorStop(1, `rgba(${o.c.r},${o.c.g},${o.c.b},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });

    // Grid
    ctx.strokeStyle = `rgba(255,255,255,0.04)`;
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Connect nearby
      pts.forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 80) {
          ctx.strokeStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${0.08 * (1 - d/80)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      });

      ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.op})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });

    const vig = ctx.createRadialGradient(W/2, H/2, H*0.15, W/2, H/2, H*0.9);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, `${bg}dd`);
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "transparent");
    bar.addColorStop(0.4, `rgba(${ca.r},${ca.g},${ca.b},0.5)`);
    bar.addColorStop(0.6, `rgba(${cb.r},${cb.g},${cb.b},0.4)`);
    bar.addColorStop(1, "transparent");
    ctx.fillStyle = bar;
    ctx.fillRect(0, H - 2, W, 2);

    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

// ── Dashboard bars ───────────────────────────────────────────────────────────
function drawDashboard(canvas: HTMLCanvasElement, a: string, b: string, bg: string) {
  const ctx = canvas.getContext("2d")!;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const ca = hexToRgb(a), cb = hexToRgb(b);

  const BAR_COUNT = 9;
  const targets = Array.from({ length: BAR_COUNT }, () => 0.2 + Math.random() * 0.7);
  const current = targets.map(t => t * 0.1);
  let tick = 0;

  let raf: number;
  function draw() {
    tick++;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Glow
    const grd = ctx.createRadialGradient(W/2, H, 0, W/2, H, H*1.2);
    grd.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},0.08)`);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    [0.2,0.4,0.6,0.8].forEach(ratio => {
      const y = H - ratio * H * 0.75 - H * 0.1;
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(W - 60, y); ctx.stroke();
    });

    const bw = (W - 120) / BAR_COUNT;
    const maxH = H * 0.72;

    // Update bars
    current.forEach((c, i) => {
      current[i] += (targets[i] - c) * 0.04;
      if (Math.abs(current[i] - targets[i]) < 0.002 && tick % 180 === 0) {
        targets[i] = 0.2 + Math.random() * 0.7;
      }
    });

    // Draw bars
    current.forEach((c, i) => {
      const bh = c * maxH;
      const x = 60 + i * bw + bw * 0.15;
      const bwActual = bw * 0.7;
      const isHighlight = i === 3 || i === 6;

      const barGrd = ctx.createLinearGradient(0, H - bh - H * 0.1, 0, H - H * 0.1);
      barGrd.addColorStop(0, `rgba(${isHighlight ? ca.r : cb.r},${isHighlight ? ca.g : cb.g},${isHighlight ? ca.b : cb.b},${isHighlight ? 0.7 : 0.3})`);
      barGrd.addColorStop(1, `rgba(${isHighlight ? ca.r : cb.r},${isHighlight ? ca.g : cb.g},${isHighlight ? ca.b : cb.b},0.05)`);

      ctx.fillStyle = barGrd;
      ctx.beginPath();
      ctx.roundRect(x, H - bh - H * 0.1, bwActual, bh, [6, 6, 0, 0]);
      ctx.fill();

      if (isHighlight) {
        ctx.fillStyle = `rgba(${ca.r},${ca.g},${ca.b},0.8)`;
        ctx.beginPath(); ctx.arc(x + bwActual / 2, H - bh - H * 0.1 - 5, 4, 0, Math.PI * 2); ctx.fill();
      }
    });

    // Trend line
    ctx.strokeStyle = `rgba(${ca.r},${ca.g},${ca.b},0.5)`;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    current.forEach((c, i) => {
      const bh = c * maxH;
      const x = 60 + i * bw + bw / 2;
      const y = H - bh - H * 0.1;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.9);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, `${bg}cc`);
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "transparent");
    bar.addColorStop(0.4, `rgba(${ca.r},${ca.g},${ca.b},0.5)`);
    bar.addColorStop(1, "transparent");
    ctx.fillStyle = bar;
    ctx.fillRect(0, H - 2, W, 2);

    raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

export default function BlogCover({ tags, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { a, b, bg } = getColors(tags);
  const tag = tags[0] ?? "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    });
    observer.observe(canvas);
    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let cleanup: (() => void) | undefined;

    if (tag === "dashboard") {
      cleanup = drawDashboard(canvas, a, b, bg);
    } else if (tag === "agente IA" || tag === "automatización") {
      cleanup = drawNeuralNet(canvas, a, b, bg);
    } else {
      cleanup = drawParticles(canvas, a, b, bg);
    }

    return () => { cleanup?.(); observer.disconnect(); };
  }, [tag, a, b, bg]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
