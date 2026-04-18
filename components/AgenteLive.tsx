"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "client" | "agent"; text: string };

const SCRIPT: Array<
  | { kind: "msg"; from: "client" | "agent"; text: string; feature: number; pause: number }
  | { kind: "typing"; pause: number }
> = [
  { kind: "msg",    from: "client", text: "Hola! Me interesa saber sobre la limpieza facial 😊",                                              feature: 0, pause: 900 },
  { kind: "typing", pause: 1600 },
  { kind: "msg",    from: "agent",  text: "¡Hola! La limpieza profunda incluye extracción, hidratación y mascarilla. Dura 60 min. ¿Te gustaría saber el precio?", feature: 1, pause: 1000 },
  { kind: "msg",    from: "client", text: "Sí, ¿cuánto cuesta?",                                                                              feature: 1, pause: 900 },
  { kind: "typing", pause: 1500 },
  { kind: "msg",    from: "agent",  text: "Son €65. Tengo disponibilidad esta semana. ¿Cuándo te viene bien?",                                 feature: 2, pause: 1100 },
  { kind: "msg",    from: "client", text: "El jueves por la tarde 🙏",                                                                         feature: 2, pause: 900 },
  { kind: "typing", pause: 1400 },
  { kind: "msg",    from: "agent",  text: "✅ ¡Cita confirmada! Jueves 17:00. Te aviso el día antes 🎉",                                       feature: 3, pause: 3200 },
];

const FEATURES = [
  { num: "01", title: "Entiende lenguaje natural",       desc: "No hay que hablarle como robot." },
  { num: "02", title: "Consulta tus sistemas",            desc: "CRM, calendario, stock. Datos reales." },
  { num: "03", title: "Ejecuta acciones",                 desc: "Agenda citas, cobra, envía. No solo responde, hace." },
  { num: "04", title: "Avisa al equipo cuando importa",   desc: "Detecta cuándo escalar a una persona." },
];

export default function AgenteLive() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scrollBottom() {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }

  function run(idx: number) {
    if (idx >= SCRIPT.length) {
      timerRef.current = setTimeout(() => {
        setMsgs([]);
        setTyping(false);
        setActiveFeature(0);
        run(0);
      }, 1000);
      return;
    }
    const step = SCRIPT[idx];
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
    run(0);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { scrollBottom(); }, [msgs, typing]);

  return (
    <section className="section" id="agente" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">[ 02 · Agente en vivo ]</div>
          <h2 className="section-h2">Mira un agente <em>cerrando una venta</em>.</h2>
        </div>

        <div className="agente-grid reveal">
          {/* Phone */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="phone">
              <div className="phone-screen">
                <div className="wa-header">
                  <div className="wa-avatar">H</div>
                  <div>
                    <div className="wa-name">Clínica Hello · Agente IA</div>
                    <div className="wa-status">en línea</div>
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

          {/* Features */}
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
