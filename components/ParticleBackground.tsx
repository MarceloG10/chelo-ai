"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width  = window.innerWidth  * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const ctx = canvas.getContext("2d")!;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const NODE_COUNT = 18;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf: number;

    function draw() {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.012;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = w * 0.22;
          if (dist > maxDist) continue;
          const op = (1 - dist / maxDist) * 0.07;
          ctx.strokeStyle = `rgba(182,255,60,${op})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Nodes
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6 + pulse * 6);
        grd.addColorStop(0, `rgba(182,255,60,${0.06 + pulse * 0.04})`);
        grd.addColorStop(1, "rgba(182,255,60,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6 + pulse * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(182,255,60,${0.35 + pulse * 0.25})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
