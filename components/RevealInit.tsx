"use client";

import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    // ── Auto-stagger grid children ───────────────────────────────────────────
    const STAGGER = [
      ".services .service",
      ".projects .project",
      ".builder-grid .builder-card",
      ".process .step",
    ];

    STAGGER.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const idx = Array.from(el.parentElement?.children ?? []).indexOf(el);
        (el as HTMLElement).style.transitionDelay = `${idx * 0.11}s`;
      });
    });

    // ── Hero: animar elementos en secuencia al cargar ───────────────────────
    const heroFull = document.querySelector(".hero-full");
    if (heroFull) {
      const slots = [
        heroFull.querySelector(".eyebrow"),
        heroFull.querySelector(".hero-h1"),
        heroFull.querySelector(".hero-sub"),
        heroFull.querySelector(".hero-actions"),
        heroFull.querySelector(".hero-meta"),
      ];
      slots.forEach((el, i) => {
        if (!el) return;
        el.classList.add("reveal");
        (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
      });
    }

    // ── Marquee ──────────────────────────────────────────────────────────────
    const marquee = document.querySelector(".marquee");
    if (marquee) marquee.classList.add("reveal");

    // ── Observer: threshold bajo + rootMargin para disparar al entrar ────────
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
