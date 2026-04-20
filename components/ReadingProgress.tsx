"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress({ accent = "#b6ff3c" }: { accent?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 1000, background: "rgba(255,255,255,0.05)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(to right, ${accent}, ${accent}aa)`, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}
