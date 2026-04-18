"use client";

import { useEffect, useRef, useState } from "react";

/* ── Orbit ─────────────────────────────────────────────── */
const ORBIT_LABELS = ["CRM", "WA", "DB", "API"];
function OrbitVisual() {
  return (
    <div className="bv-orbit">
      <div className="bv-core" />
      {ORBIT_LABELS.map((lbl, i) => (
        <div key={lbl} className={`bv-dot bv-dot-${i + 1}`} data-label={lbl} />
      ))}
    </div>
  );
}

/* ── Sliders ────────────────────────────────────────────── */
function SlidersVisual() {
  return (
    <div className="bv-sliders">
      {["Tono", "Idioma", "Límites"].map((lbl, i) => (
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

/* ── Bars ───────────────────────────────────────────────── */
function BarsVisual() {
  return (
    <div className="bv-bars">
      {["A", "B", "C"].map((lbl, i) => (
        <div key={lbl} className="bv-bar-row">
          <div className="bv-bar-lbl">{lbl}</div>
          <div className="bv-bar-track">
            <div className="bv-bar-fill" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        </div>
      ))}
      <div className="bv-learning">aprendiendo<span className="bv-learning-dot" /></div>
    </div>
  );
}

/* ── Metrics ────────────────────────────────────────────── */
function MetricsVisual() {
  const [vals, setVals] = useState([1247, 89, 99.9, 3.2]);
  const [flipIdx, setFlipIdx] = useState(-1);
  const cycleRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      const idx = cycleRef.current % 4;
      cycleRef.current++;
      setFlipIdx(idx);
      setVals((prev) => {
        const next = [...prev];
        if (idx === 0) next[0] = prev[0] + Math.floor(Math.random() * 4) + 1;
        if (idx === 1) next[1] = prev[1] + 1;
        if (idx === 3) next[3] = parseFloat((Math.random() * 1 + 2.4).toFixed(1));
        return next;
      });
      setTimeout(() => setFlipIdx(-1), 380);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const display = [
    vals[0] >= 1000 ? `${(vals[0] / 1000).toFixed(1)}k` : String(vals[0]),
    String(vals[1]),
    "99.9%",
    `${vals[3]}s`,
  ];
  const labels = ["msgs/día", "leads", "uptime", "respuesta"];

  return (
    <div className="bv-metrics">
      {display.map((v, i) => (
        <div key={labels[i]} className="bv-metric">
          <div className={`bv-metric-val${flipIdx === i ? " flipping" : ""}`}>{v}</div>
          <div className="bv-metric-lbl">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Builder ────────────────────────────────────────────── */
const CARDS = [
  { num: "01 / CONECTA", title: "Tus fuentes\nde datos.",    Visual: OrbitVisual  },
  { num: "02 / DEFINE",  title: "Tono y\npersonalidad.",     Visual: SlidersVisual },
  { num: "03 / ENTRENA", title: "Con tu\nnegocio real.",     Visual: BarsVisual   },
  { num: "04 / LANZA",   title: "En producción.\n24/7.",     Visual: MetricsVisual },
];

export default function Builder() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % CARDS.length), 2500);
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
          {CARDS.map(({ num, title, Visual }, i) => (
            <div key={i} className={`builder-card bstep${active === i ? " active" : ""}`}>
              <div className="builder-n">{num}</div>
              <h4 className="builder-title">
                {title.split("\n").map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </h4>
              <div className="builder-visual">
                <Visual />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
