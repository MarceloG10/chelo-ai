"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Msg = { from: "out" | "in"; text: string };

export default function AgenteLive() {
  const t = useTranslations("AgenteLive");

  const SCRIPT = [
    { kind: "msg" as const, from: "out" as const, text: t("msg1"), feature: 0, pause: 900 },
    { kind: "typing" as const, pause: 1600 },
    { kind: "msg" as const, from: "in" as const,  text: t("msg2"), feature: 1, pause: 1000 },
    { kind: "msg" as const, from: "out" as const, text: t("msg3"), feature: 1, pause: 900 },
    { kind: "typing" as const, pause: 1500 },
    { kind: "msg" as const, from: "in" as const,  text: t("msg4"), feature: 2, pause: 1100 },
    { kind: "msg" as const, from: "out" as const, text: t("msg5"), feature: 2, pause: 900 },
    { kind: "typing" as const, pause: 1400 },
    { kind: "msg" as const, from: "in" as const,  text: t("msg6"), feature: 3, pause: 3200 },
  ];

  const FEATURES = [
    { num: "01", title: t("f1Title"), desc: t("f1Desc") },
    { num: "02", title: t("f2Title"), desc: t("f2Desc") },
    { num: "03", title: t("f3Title"), desc: t("f3Desc") },
    { num: "04", title: t("f4Title"), desc: t("f4Desc") },
  ];

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scriptRef = useRef(SCRIPT);

  function scrollBottom() {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }

  function run(idx: number) {
    const script = scriptRef.current;
    if (idx >= script.length) {
      timerRef.current = setTimeout(() => {
        setMsgs([]);
        setTyping(false);
        setActiveFeature(0);
        run(0);
      }, 1000);
      return;
    }
    const step = script[idx];
    if (step.kind === "typing") {
      setTyping(true);
      scrollBottom();
      timerRef.current = setTimeout(() => {
        setTyping(false);
        run(idx + 1);
      }, step.pause);
    } else {
      setMsgs((prev) => [...prev, { from: step.from, text: step.text }]);
      setActiveFeature(step.feature);
      scrollBottom();
      timerRef.current = setTimeout(() => run(idx + 1), step.pause);
    }
  }

  useEffect(() => {
    scriptRef.current = SCRIPT;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    run(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { scrollBottom(); }, [msgs, typing]);

  return (
    <section className="section" id="agente" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-h2">
            {t("titlePrefix")} <em>{t("titleEm")}</em>.
          </h2>
        </div>

        <div className="agente-grid reveal">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="phone">
              <div className="phone-screen">
                <div className="wa-header">
                  <div className="wa-avatar">H</div>
                  <div>
                    <div className="wa-name">{t("waName")}</div>
                    <div className="wa-status">{t("waStatus")}</div>
                  </div>
                </div>
                <div className="wa-body" ref={bodyRef}>
                  {msgs.map((m, i) => (
                    <div key={i} className={`wa-msg ${m.from}`}>{m.text}</div>
                  ))}
                  {typing && (
                    <div className="wa-typing">
                      <span /><span /><span />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="agente-features">
            {FEATURES.map((f, i) => (
              <div key={i} className={`agente-feat${activeFeature === i ? " active" : ""}`}>
                <div className="agente-feat-num">{f.num}</div>
                <div className="agente-feat-title">{f.title}</div>
                <div className="agente-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
