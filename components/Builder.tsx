"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function OrbitVisual() {
  const ORBIT_LABELS = ["CRM", "WA", "DB", "API"];
  return (
    <div className="bv-orbit">
      <div className="bv-core" />
      {ORBIT_LABELS.map((lbl, i) => (
        <div key={lbl} className={`bv-dot bv-dot-${i + 1}`} data-label={lbl} />
      ))}
    </div>
  );
}

function ChipsVisual({ chipTone, chipLang, chipLimits }: {
  chipTone: string; chipLang: string; chipLimits: string;
}) {
  const CHIP_ROWS = [
    { label: chipTone,   chips: ["formal", "casual", "técnico"] },
    { label: chipLang,   chips: ["ES", "EN", "CA"] },
    { label: chipLimits, chips: ["suave", "estricto"] },
  ];
  const [actives, setActives] = useState([0, 0, 0]);
  useEffect(() => {
    const t = setInterval(() => {
      const row = Math.floor(Math.random() * CHIP_ROWS.length);
      setActives((prev) => {
        const next = [...prev];
        next[row] = (prev[row] + 1) % CHIP_ROWS[row].chips.length;
        return next;
      });
    }, 1200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bv-chips">
      {CHIP_ROWS.map((row, i) => (
        <div key={row.label} className="bv-chip-row">
          <div className="bv-chip-label">{row.label}</div>
          <div className="bv-chip-group">
            {row.chips.map((chip, j) => (
              <span key={chip} className={`bv-chip${actives[i] === j ? " active" : ""}`}>{chip}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const STREAM_LINES = [
  "> processing batch 1/12",
  "> tokens: 4,821",
  "> acc: 0.94",
  "> embedding docs…",
  "> processing batch 2/12",
  "> tokens: 9,340",
  "> acc: 0.96",
  "> indexing chunks…",
  "> processing batch 3/12",
  "> tokens: 14,203",
  "> acc: 0.97",
  "> fine-tuning…",
];

function BarsVisual({ learning }: { learning: string }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => o + 1), 900);
    return () => clearInterval(t);
  }, []);
  const visible = Array.from({ length: 6 }, (_, i) => STREAM_LINES[(offset + i) % STREAM_LINES.length]);
  return (
    <div className="bv-bars-wrap">
      <div className="bv-stream" aria-hidden="true">
        {visible.map((line, i) => (
          <div key={i} className="bv-stream-line">{line}</div>
        ))}
      </div>
      <div className="bv-bars">
        {["A", "B", "C"].map((lbl, i) => (
          <div key={lbl} className="bv-bar-row">
            <div className="bv-bar-lbl">{lbl}</div>
            <div className="bv-bar-track">
              <div className="bv-bar-fill" style={{ animationDelay: `${i * 0.5}s` }} />
            </div>
          </div>
        ))}
        <div className="bv-learning">{learning}<span className="bv-learning-dot" /></div>
      </div>
    </div>
  );
}

function MetricsVisual() {
  const [vals, setVals] = useState([1247, 89, 99.9, 3.2]);
  const [flipIdx, setFlipIdx] = useState(-1);
  const cycleRef = useRef(0);
  const labels = ["msgs/día", "leads", "uptime", "respuesta"];

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

export default function Builder() {
  const t = useTranslations("Builder");
  const [active, setActive] = useState(0);

  const CARDS = [
    { num: t("c1Num"), title: t("c1Title"), Visual: () => <OrbitVisual /> },
    { num: t("c2Num"), title: t("c2Title"), Visual: () => <ChipsVisual chipTone={t("chipTone")} chipLang={t("chipLang")} chipLimits={t("chipLimits")} /> },
    { num: t("c3Num"), title: t("c3Title"), Visual: () => <BarsVisual learning={t("learning")} /> },
    { num: t("c4Num"), title: t("c4Title"), Visual: () => <MetricsVisual /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => setActive((a) => (a + 1) % CARDS.length), 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section" id="builder" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-h2">
            {t("titlePrefix")} <em>{t("titleEm")}</em>
          </h2>
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
