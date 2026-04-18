"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    label: "Venden",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    headline: "Tu mejor vendedor nunca descansa.",
    description:
      "Califica leads, responde objeciones y cierra ventas — las 24 horas, los 7 días. Sin intervención humana.",
    stat: "24/7",
    statLabel: "disponible",
  },
  {
    label: "Reportan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-3-3-4 4" />
      </svg>
    ),
    headline: "Decisiones más rápidas, con datos frescos.",
    description:
      "Recibe resúmenes automáticos de ventas, alertas clave y métricas importantes — directo a tu WhatsApp o email, cuando los necesitas.",
    stat: "<1min",
    statLabel: "tiempo de respuesta",
  },
  {
    label: "Ejecutan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    headline: "Tu equipo enfocado en lo que importa.",
    description:
      "El agente se encarga de lo repetitivo — procesos, seguimientos, integraciones — para que tu equipo use su tiempo en lo que realmente mueve el negocio.",
    stat: "∞",
    statLabel: "tareas simultáneas",
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 flex flex-col gap-5 group border border-violet-500/20 hover:border-violet-500/40 transition-colors duration-300"
      style={{
        backgroundColor: "#1e1040",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors duration-300">
          {pillar.icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{pillar.stat}</div>
          <div className="text-xs text-white/30 mt-0.5">{pillar.statLabel}</div>
        </div>
      </div>

      {/* Label */}
      <div>
        <span className="text-xs uppercase tracking-widest text-violet-500 font-semibold">
          {pillar.label}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-semibold text-white leading-snug">
        {pillar.headline}
      </h3>

      {/* Description */}
      <p className="text-white/45 text-sm leading-relaxed">
        {pillar.description}
      </p>
    </div>
  );
}

function PillarsHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-16">
      <span
        className="badge mb-4 inline-block"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0s, transform 0.6s ease 0s",
        }}
      >
        Elige tu agente
      </span>
      <h2
        className="text-4xl sm:text-5xl font-bold text-white tracking-tight mt-4"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}
      >
        Cada objetivo,{" "}
        <span className="text-violet-400">su propio agente.</span>
      </h2>
      <p
        className="text-white/40 mt-5 max-w-xl mx-auto text-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        Hecho a tu medida. Listo para trabajar.
      </p>
    </div>
  );
}

export default function Pillars() {
  return (
    <section id="pilares" className="relative pt-14 pb-28 px-6">
      <div className="max-w-6xl mx-auto">
        <PillarsHeader />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.label} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
