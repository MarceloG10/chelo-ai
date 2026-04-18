"use client";

import { useEffect } from "react";

export default function CoordsParallax() {
  useEffect(() => {
    const el = document.getElementById("coords");
    if (!el) return;
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
