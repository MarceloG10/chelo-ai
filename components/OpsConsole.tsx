"use client";
import { useEffect, useRef, useState } from "react";

// ─── Datos ───────────────────────────────────────────────────────────────────

const CX = 200, CY = 158; // centro del SVG

const AGENTS = [
  {
    id: "ARIA", emoji: "🎯", role: "Estrategia",
    color: "#e879f9",
    cx: 200, cy: 55,
    tasks: ["Diseñando el producto", "Planificando funciones", "Analizando al usuario", "Creando la experiencia"],
  },
  {
    id: "MAX", emoji: "⚡", role: "Desarrollo",
    color: "#38bdf8",
    cx: 52, cy: 158,
    tasks: ["Construyendo el sistema", "Integrando los pagos", "Creando el panel", "Conectando las APIs"],
  },
  {
    id: "LEA", emoji: "🔍", role: "Calidad",
    color: "#34d399",
    cx: 348, cy: 158,
    tasks: ["Revisando la calidad", "Probando los flujos", "Validando el sistema", "Asegurando todo"],
  },
  {
    id: "NEO", emoji: "🚀", role: "Lanzamiento",
    color: "#fb923c",
    cx: 200, cy: 261,
    tasks: ["Publicando en vivo", "Optimizando la carga", "Configurando la nube", "Desplegando versión"],
  },
] as const;

type AgentId = typeof AGENTS[number]["id"];

const ACTIVITIES = [
  { agent: "ARIA" as AgentId, color: "#e879f9", text: "Diseñó el flujo de usuario en 2 min" },
  { agent: "MAX"  as AgentId, color: "#38bdf8", text: "Sistema de pagos integrado y activo" },
  { agent: "LEA"  as AgentId, color: "#34d399", text: "47 puntos de calidad validados" },
  { agent: "NEO"  as AgentId, color: "#fb923c", text: "Versión 2.4 publicada sin cortes" },
  { agent: "ARIA" as AgentId, color: "#e879f9", text: "Experiencia de usuario optimizada" },
  { agent: "MAX"  as AgentId, color: "#38bdf8", text: "Panel de administración creado" },
  { agent: "LEA"  as AgentId, color: "#34d399", text: "Todos los flujos críticos probados" },
  { agent: "NEO"  as AgentId, color: "#fb923c", text: "Desplegado en 3 regiones globales" },
  { agent: "MAX"  as AgentId, color: "#38bdf8", text: "Chat de atención al cliente listo" },
  { agent: "ARIA" as AgentId, color: "#e879f9", text: "Estrategia de onboarding definida" },
];

type ActivityRow = typeof ACTIVITIES[0] & { id: number };

const CIRCUM = 2 * Math.PI * 38; // radio 38 → circunferencia ~238.9

// ─── Componente ──────────────────────────────────────────────────────────────

export default function OpsConsole() {
  const [tick,       setTick]       = useState(0);
  const [taskTick,   setTaskTick]   = useState(0);
  const [progress,   setProgress]   = useState(44);
  const [done,       setDone]       = useState(18);
  const [activities, setActivities] = useState<ActivityRow[]>([]);

  const actIdRef  = useRef(0);
  const actIdxRef = useRef(0);

  // Rota agente activo cada 2.6s
  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setTaskTick(t => t + 1);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Progress bar se llena lentamente, luego reinicia
  useEffect(() => {
    const id = setInterval(() => setProgress(p => (p >= 97 ? 44 : p + 1)), 380);
    return () => clearInterval(id);
  }, []);

  // Contador de tareas completadas
  useEffect(() => {
    const id = setInterval(() => setDone(d => d + 1), 4200);
    return () => clearInterval(id);
  }, []);

  // Feed de actividad
  useEffect(() => {
    function push() {
      const a = ACTIVITIES[actIdxRef.current % ACTIVITIES.length];
      actIdxRef.current++;
      setActivities(prev => [{ ...a, id: actIdRef.current++ }, ...prev].slice(0, 3));
    }
    push();
    const id = setInterval(push, 3400);
    return () => clearInterval(id);
  }, []);

  const activeAgent = AGENTS[tick % AGENTS.length];

  return (
    <div id="demo" className="demo-panel fw-panel">

      {/* Header */}
      <div className="demo-head">
        <div className="dots"><span /><span /><span /></div>
        <span className="demo-title">equipo.hello-human.ai</span>
        <span className="demo-live">LIVE</span>
      </div>

      {/* Progress row */}
      <div className="fw-prog-row">
        <span className="fw-prog-label">Construyendo tu producto</span>
        <div className="fw-prog-track">
          <div className="fw-prog-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="fw-prog-num">{progress}%</span>
        <span className="fw-prog-done">{done} tareas ✓</span>
      </div>

      {/* Orbital SVG */}
      <div className="fw-orbital">
        <svg
          style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
          viewBox="-40 -20 480 356"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Paths agent → center para animateMotion */}
            {AGENTS.map(a => (
              <path key={a.id} id={`fwp-${a.id}`}
                d={`M ${a.cx} ${a.cy} L ${CX} ${CY}`}
              />
            ))}
          </defs>

          {/* Anillos de atmósfera */}
          <circle cx={CX} cy={CY} r={96}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r={140}
            fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>

          {/* Líneas de conexión */}
          {AGENTS.map(a => (
            <line key={a.id}
              x1={a.cx} y1={a.cy} x2={CX} y2={CY}
              stroke={a.color}
              strokeWidth={a.id === activeAgent.id ? "2" : "1.5"}
              strokeOpacity={a.id === activeAgent.id ? "0.55" : "0.16"}
              strokeDasharray="5 7"
            />
          ))}

          {/* Partículas viajando de cada agente al centro */}
          {AGENTS.flatMap(a =>
            [0, 0.75, 1.5].map((delay, i) => (
              <circle key={`fp-${a.id}-${i}`}
                r={a.id === activeAgent.id ? 4.5 : 2.5}
                fill={a.color}
                opacity={a.id === activeAgent.id ? 0.95 : 0.38}
              >
                <animateMotion
                  dur={a.id === activeAgent.id ? "1.4s" : "2.3s"}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#fwp-${a.id}`} />
                </animateMotion>
              </circle>
            ))
          )}

          {/* ── Nodo central (producto) ── */}
          {/* Pulso exterior */}
          <circle cx={CX} cy={CY} r={50}
            fill="rgba(255,255,255,0.025)"
            stroke="rgba(255,255,255,0.05)" strokeWidth="1">
            <animate attributeName="r" values="46;54;46" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
          </circle>
          {/* Track del progress ring */}
          <circle cx={CX} cy={CY} r={38}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4.5"/>
          {/* Progress ring */}
          <circle cx={CX} cy={CY} r={38}
            fill="none" stroke="white" strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * CIRCUM} ${CIRCUM}`}
            transform={`rotate(-90 ${CX} ${CY})`}
            opacity={0.88}
          />
          {/* Relleno central */}
          <circle cx={CX} cy={CY} r={30}
            fill="#0d1117" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          {/* Emoji producto */}
          <text x={CX} y={CY + 1}
            textAnchor="middle" fontSize="20" dominantBaseline="middle">🚀</text>
          <text x={CX} y={CY + 20}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="7" fontWeight="700"
            fill="rgba(255,255,255,0.45)"
            letterSpacing="0.15em"
          >PRODUCTO</text>

          {/* ── Agentes ── */}
          {AGENTS.map(a => {
            const isActive = a.id === activeAgent.id;
            const task     = a.tasks[taskTick % a.tasks.length];

            // Posición de etiquetas según posición del agente
            const isTop    = a.id === "ARIA";
            const isBottom = a.id === "NEO";
            const isLeft   = a.id === "MAX";
            const isRight  = a.id === "LEA";

            // Labels siempre hacia el exterior (lejos de las líneas al centro)
            const labelX      = isLeft  ? a.cx - 26 : isRight ? a.cx + 26 : a.cx;
            const labelAnchor = isLeft  ? "end"      : isRight ? "start"    : "middle";
            const idY         = isTop   ? a.cy - 36 : isBottom ? a.cy + 26 : a.cy - 4;
            const roleY       = isTop   ? a.cy - 24 : isBottom ? a.cy + 38 : a.cy + 9;
            const taskY       = isTop   ? a.cy - 50 : isBottom ? a.cy + 50 : a.cy + 22;

            return (
              <g key={a.id}>
                {/* Glow pulsante cuando activo */}
                <circle cx={a.cx} cy={a.cy} r={isActive ? 28 : 20}
                  fill={a.color}
                  opacity={isActive ? 0.18 : 0.07}
                  style={{ transition: "r 0.5s, opacity 0.5s" }}>
                  {isActive && <animate attributeName="r"       values="24;34;24" dur="2s" repeatCount="indefinite"/>}
                  {isActive && <animate attributeName="opacity" values="0.18;0.3;0.18" dur="2s" repeatCount="indefinite"/>}
                </circle>

                {/* Círculo principal */}
                <circle cx={a.cx} cy={a.cy} r={19}
                  fill={a.color}
                  opacity={isActive ? 1 : 0.42}
                  style={{ transition: "opacity 0.6s" }}
                />

                {/* Emoji del agente */}
                <text x={a.cx} y={a.cy + 1}
                  textAnchor="middle"
                  fontSize="14"
                  dominantBaseline="middle"
                  opacity={isActive ? 1 : 0.65}
                >{a.emoji}</text>

                {/* Nombre del agente */}
                <text x={labelX} y={idY}
                  textAnchor={labelAnchor}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="10.5" fontWeight="800"
                  fill={a.color}
                  opacity={isActive ? 1 : 0.5}
                  style={{ transition: "opacity 0.6s" }}
                >{a.id}</text>

                {/* Rol */}
                <text x={labelX} y={roleY}
                  textAnchor={labelAnchor}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="8.5"
                  fill="rgba(255,255,255,0.38)"
                >{a.role}</text>

                {/* Tarea activa (solo agente activo) */}
                {isActive && (
                  <text x={labelX} y={taskY}
                    textAnchor={labelAnchor}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="8"
                    fill="rgba(255,255,255,0.78)"
                  >{task}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Feed de actividad */}
      <div className="fw-feed">
        {activities.map((a, idx) => (
          <div key={a.id} className={`fw-act ${idx === 0 ? "fresh" : ""}`}>
            <span className="fw-act-check">✓</span>
            <span className="fw-act-who" style={{ color: a.color }}>{a.agent}</span>
            <span className="fw-act-msg">{a.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
