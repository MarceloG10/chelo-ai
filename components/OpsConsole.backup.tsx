"use client";

import { useEffect, useRef, useState } from "react";

const OPS_EVENTS = [
  { t: 'Lead calificado de <b>WhatsApp</b> → pasado a CRM', badge: "ok", label: "LEAD" },
  { t: "Agente respondió a consulta de precios (3.2s)", badge: "ok", label: "REPLY" },
  { t: 'Cita agendada · <b>Clínica Estética</b> · mañana 10:00', badge: "ok", label: "BOOK" },
  { t: "Resumen diario enviado a dirección@empresa", badge: "info", label: "REPORT" },
  { t: 'Carrito abandonado recuperado · <b>€ 284</b>', badge: "ok", label: "SALE" },
  { t: 'Webhook recibido de <b>Stripe</b> → pago confirmado', badge: "info", label: "HOOK" },
  { t: "Objeción respondida · lead continuó conversación", badge: "ok", label: "NURTURE" },
  { t: "Seguimiento post-venta enviado a 12 clientes", badge: "info", label: "FOLLOW" },
  { t: 'Sync HubSpot · 842 contactos actualizados', badge: "info", label: "SYNC" },
  { t: 'Nuevo lead inbound · "quiero info" · calificando…', badge: "ok", label: "LEAD" },
  { t: "FAQ respondida · envíos internacionales", badge: "ok", label: "REPLY" },
  { t: "Transcripción de llamada guardada en Notion", badge: "info", label: "NOTE" },
];

type OpsRow = { time: string; text: string; badge: string; label: string; id: number };

function nowTime() {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export default function OpsConsole() {
  const [rows, setRows] = useState<OpsRow[]>([]);
  const [msgs, setMsgs] = useState(1247);
  const [leads, setLeads] = useState(89);
  const idRef = useRef(0);

  function pushRow() {
    const ev = OPS_EVENTS[Math.floor(Math.random() * OPS_EVENTS.length)];
    const row: OpsRow = { time: nowTime(), text: ev.t, badge: ev.badge, label: ev.label, id: idRef.current++ };
    setRows((prev) => [row, ...prev].slice(0, 10));
    setMsgs((m) => m + 1);
    if (ev.label === "LEAD") setLeads((l) => l + 1);
  }

  useEffect(() => {
    for (let i = 0; i < 5; i++) pushRow();
    const timer = setInterval(pushRow, 2600);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="demo" className="demo-panel ops-panel">
      <div className="demo-head">
        <div className="dots"><span /><span /><span /></div>
        <span className="demo-title">ops.hello-human.ai</span>
        <span className="demo-live">LIVE</span>
      </div>
      <div className="ops-stats">
        <div className="ops-stat">
          <span className="ops-stat-label">Mensajes hoy</span>
          <span className="ops-stat-value">{msgs.toLocaleString("en-US")}</span>
          <span className="ops-stat-delta">↑ 12%</span>
        </div>
        <div className="ops-stat">
          <span className="ops-stat-label">Leads</span>
          <span className="ops-stat-value">{leads}</span>
          <span className="ops-stat-delta">↑ 8%</span>
        </div>
        <div className="ops-stat">
          <span className="ops-stat-label">Uptime</span>
          <span className="ops-stat-value">99.9%</span>
          <span className="ops-stat-delta">30d</span>
        </div>
      </div>
      <div className="ops-feed-head">
        <span>EVENT FEED</span>
        <span className="ops-dot" />
      </div>
      <div className="ops-feed">
        {rows.map((row) => (
          <div key={row.id} className="ops-row">
            <span className="ops-time">{row.time}</span>
            <span className="ops-text" dangerouslySetInnerHTML={{ __html: row.text }} />
            <span className={`ops-badge ${row.badge}`}>{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
