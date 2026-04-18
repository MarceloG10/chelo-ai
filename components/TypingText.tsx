"use client";

import { useEffect, useState } from "react";

const phrases = [
  "cierra ventas mientras duermes.",
  "responde clientes en segundos.",
  "genera reportes automáticos.",
  "escala sin contratar más personal.",
  "trabaja 24/7 sin descanso.",
];

export default function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      const timeout = setTimeout(() => {
        setDisplayed((d) => d.slice(0, -1));
      }, 28);
      return () => clearTimeout(timeout);
    }

    if (displayed.length < current.length) {
      const timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 52);
      return () => clearTimeout(timeout);
    } else {
      setIsPaused(true);
    }
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <span className="text-violet-400">
      {displayed}
      <span className="animate-blink text-violet-500 font-thin">|</span>
    </span>
  );
}
