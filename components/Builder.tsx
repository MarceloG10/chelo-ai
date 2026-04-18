"use client";

import { useEffect, useState } from "react";

const CARDS = [
  {
    num: "01 / CONECTA",
    title: "Tus fuentes\nde datos.",
    visual: "orbit",
  },
  {
    num: "02 / DEFINE",
    title: "Tono y\npersonalidad.",
    visual: "sliders",
  },
  {
    num: "03 / ENTRENA",
    title: "Con tu\nnegocio real.",
    visual: "bars",
  },
  {
    num: "04 / LANZA",
    title: "En producción.\n24/7.",
    visual: "metrics",
  },
];

const ORBIT_LABELS = ["CRM", "WA", "DB", "API"];

function OrbitVisual() {
  return (
    <div className="bv-orbit">
      <div className="bv-core" />
      {ORBIT_LABELS.map((lbl, i) => (
        <div
          key={lbl}
          className={`bv-dot bv-dot-${i + 1}`}
          data-label={lbl}
          style={{ animationDelay: `${-i}s` }}
        />
      ))}
    </div>
  );
}

function SlidersVisual() {
  const labels = ["Tono", "Idioma", "Límites"];
  return (
    <div className="bv-sliders">
      {labels.map((lbl, i) => (
        <div key={lbl} className="bv-slider-row">
          <div className="bv-slider-label">{lbl}</div>
          <div className="bv-slider-track">
            <div className={`bv-slider-fill bv-fill-${i + 1}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarsVisual() {
  const labels = ["A", "B", "C"];
  return (
    <div className="bv-bars">
      {labels.map((lbl, i) => (
        <div key={lbl} className="bv-bar-row">
          <div className="bv-bar-lbl">{lbl}</div>
          <div className="bv-bar-track">
            <div
              className="bv-bar-fill"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          </div>
        </div>
      ))}
      <div style={{ fontFamily: "var(--v-mono)", fontSize: 10, color: "var(--v-accent)", marginTop: 6 }}>
        aprendiendo…
      </div>
    </div>
  );
}

function MetricsVisual() {
  const metrics = [
    { val: "1.2k", lbl: "msgs/día" },
    { val: "89",   lbl: "leads" },
    { val: "99%",  lbl: "uptime" },
    { val: "3s",   lbl: "respuesta" },
  ];
  return (
    <div className="bv-metrics">
      {metrics.map((m) => (
        <div key={m.lbl} className="bv-metric">
          <div className="bv-metric-val">{m.val}</div>
          <div className="bv-metric-lbl">{m.lbl}</div>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  orbit: OrbitVisual,
  sliders: SlidersVisual,
  bars: BarsVisual,
  metrics: MetricsVisual,
};

export default function Builder() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section" id="builder" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">[ 03 · Cómo lo construimos ]</div>
          <h2 className="section-h2">Cuatro pasos. <em>Siete días.</em></h2>
        </div>

        <div className="builder-grid reveal">
          {CARDS.map((card, i) => {
            const Visual = VISUALS[card.visual];
            return (
              <div key={i} className={`builder-card${active === i ? " active" : ""}`}>
                <div className="builder-n">{card.num}</div>
                <h3 className="builder-title">
                  {card.title.split("\n").map((line, j) => (
                    <span key={j}>{line}{j === 0 && <br />}</span>
                  ))}
                </h3>
                <div className="builder-visual">
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
