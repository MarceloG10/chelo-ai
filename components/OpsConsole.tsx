"use client";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENT_CFG = [
  { id: "ARCH", label: "Arquitecto", color: "#c792ea" },
  { id: "CODE", label: "Developer",  color: "#34d399" },
  { id: "TEST", label: "QA Agent",   color: "#82aaff" },
  { id: "SHIP", label: "DevOps",     color: "#fb923c" },
] as const;
type AgentId = "ARCH" | "CODE" | "TEST" | "SHIP";

const SNIPPETS: { agent: AgentId; file: string; lines: string[] }[] = [
  {
    agent: "CODE", file: "checkout.service.ts",
    lines: [
      "export async function createCheckout(",
      "  items: CartItem[]",
      "): Promise<Session> {",
      "  const s = await stripe",
      "    .checkout.sessions.create({",
      "      mode: 'payment',",
      "      line_items: items.map(toLine),",
      "      success_url: '/success',",
      "    });",
      "  return s;",
      "}",
    ],
  },
  {
    agent: "CODE", file: "auth.middleware.ts",
    lines: [
      "export const authGuard = async (",
      "  req: Request,",
      "  res: Response,",
      "  next: NextFunction,",
      ") => {",
      "  const token = req.headers",
      "    .authorization?.split(' ')[1];",
      "  const user = await jwt.verify(token!);",
      "  req.user = user;",
      "  next();",
      "};",
    ],
  },
  {
    agent: "TEST", file: "checkout.spec.ts",
    lines: [
      "describe('CheckoutService', () => {",
      "  it('creates session', async () => {",
      "    const items = mockCart(3);",
      "    const s = await createCheckout(items);",
      "    expect(s.url).toBeDefined();",
      "    expect(s.mode).toBe('payment');",
      "  });",
      "  it('rejects empty cart', () => {",
      "    expect(() => createCheckout([]))",
      "      .toThrow('EmptyCart');",
      "  });",
      "});",
    ],
  },
  {
    agent: "ARCH", file: "schema.prisma",
    lines: [
      "model Order {",
      "  id        String   @id @default(cuid())",
      "  userId    String",
      "  status    Status   @default(PENDING)",
      "  total     Decimal",
      "  items     Item[]",
      "  createdAt DateTime @default(now())",
      "  updatedAt DateTime @updatedAt",
      "",
      "  user      User     @relation(...)",
      "}",
    ],
  },
];

const COMMS: { from: AgentId; to: string; msg: string }[] = [
  { from: "ARCH", to: "CODE", msg: "implementa rate limiting en /api/auth" },
  { from: "CODE", to: "TEST", msg: "PR #47 listo · 4 archivos" },
  { from: "TEST", to: "SHIP", msg: "142 tests ✓ · 98.4% coverage" },
  { from: "SHIP", to: "ALL",  msg: "v2.4.1 live en producción ✓" },
  { from: "ARCH", to: "CODE", msg: "añade validación con Zod" },
  { from: "CODE", to: "TEST", msg: "endpoint /checkout implementado" },
  { from: "TEST", to: "CODE", msg: "edge case falla: carrito vacío" },
  { from: "CODE", to: "TEST", msg: "fix subido · re-ejecuta suite" },
  { from: "SHIP", to: "ALL",  msg: "staging OK · pasando a producción" },
  { from: "ARCH", to: "ALL",  msg: "nueva feature: checkout multi-step" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type CommRow = { from: AgentId; to: string; msg: string; id: number };

interface TypingState {
  snippetIdx: number;
  lineIdx: number;
  charIdx: number;
  visibleLines: string[];
  pausing: boolean;
  nextTickAt: number;
}

// ─── Syntax highlight ────────────────────────────────────────────────────────

function hi(line: string): string {
  if (!line.trim()) return "&nbsp;";
  let s = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  s = s.replace(
    /\b(export|async|function|const|return|await|model|default|describe|it|expect)\b/g,
    '<span class="af-kw">$1</span>',
  );
  s = s.replace(
    /\b(string|number|boolean|String|Promise|Request|Response|NextFunction|Decimal|DateTime|Session|CartItem|Status|Item|User)\b/g,
    '<span class="af-type">$1</span>',
  );
  s = s.replace(/('[^']*')/g, '<span class="af-str">$1</span>');
  s = s.replace(/(@\w+)/g, '<span class="af-deco">$1</span>');
  return s;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function OpsConsole() {
  // Pipeline — derived from pipeT (0-159, ticks every 100ms = 16s cycle)
  const [pipeT, setPipeT] = useState(0);

  // Comms feed
  const [comms, setComms] = useState<CommRow[]>([]);
  const commIdRef  = useRef(0);
  const commIdxRef = useRef(0);

  // Stats
  const [commits,      setCommits]      = useState(24);
  const [linesWritten, setLinesWritten] = useState(1847);

  // Typing engine via ref + force render (avoids stale closure issues)
  const [, forceRender] = useState(0);
  const typingRef = useRef<TypingState>({
    snippetIdx: 0, lineIdx: 0, charIdx: 0,
    visibleLines: [], pausing: false,
    nextTickAt: Date.now() + 600,
  });

  const codeAreaRef = useRef<HTMLDivElement>(null);

  // ── Pipeline tick
  useEffect(() => {
    const id = setInterval(() => setPipeT(t => (t + 1) % 160), 100);
    return () => clearInterval(id);
  }, []);

  // ── Commit counter when pipeline goes live
  useEffect(() => {
    if (pipeT === 104) setCommits(c => c + 1);
  }, [pipeT]);

  // ── Typing engine (~60fps polling)
  useEffect(() => {
    const id = setInterval(() => {
      const s   = typingRef.current;
      const now = Date.now();

      if (s.pausing) {
        if (now >= s.nextTickAt) {
          typingRef.current = {
            snippetIdx: (s.snippetIdx + 1) % SNIPPETS.length,
            lineIdx: 0, charIdx: 0, visibleLines: [],
            pausing: false, nextTickAt: now + 50,
          };
          forceRender(n => n + 1);
        }
        return;
      }

      if (now < s.nextTickAt) return;

      const lines = SNIPPETS[s.snippetIdx].lines;

      if (s.lineIdx >= lines.length) {
        typingRef.current.pausing   = true;
        typingRef.current.nextTickAt = now + 2400;
        return;
      }

      const line = lines[s.lineIdx];

      if (s.charIdx < line.length) {
        typingRef.current.charIdx++;
        typingRef.current.nextTickAt = now + 26 + Math.random() * 22;
        forceRender(n => n + 1);
      } else {
        typingRef.current.visibleLines = [...s.visibleLines, line].slice(-20);
        typingRef.current.lineIdx++;
        typingRef.current.charIdx   = 0;
        typingRef.current.nextTickAt = now + (line === "" ? 55 : 140);
        setLinesWritten(l => l + 1);
        forceRender(n => n + 1);
      }
    }, 16);
    return () => clearInterval(id);
  }, []);

  // ── Auto-scroll code area
  useEffect(() => {
    if (codeAreaRef.current) {
      codeAreaRef.current.scrollTop = codeAreaRef.current.scrollHeight;
    }
  });

  // ── Comms feed
  useEffect(() => {
    function push() {
      const c = COMMS[commIdxRef.current % COMMS.length];
      commIdxRef.current++;
      setComms(prev => [{ ...c, id: commIdRef.current++ }, ...prev].slice(0, 5));
    }
    push();
    const id = setInterval(push, 3400);
    return () => clearInterval(id);
  }, []);

  // ── Derived pipeline state
  const buildPct    = pipeT < 50 ? pipeT * 2 : 100;
  const testCount   = pipeT < 52 ? 0 : pipeT < 84 ? Math.floor(((pipeT - 52) / 32) * 142) : 142;
  const deployPhase = pipeT < 52 ? "build"
                    : pipeT < 84 ? "test"
                    : pipeT < 104 ? "deploy"
                    : "live";

  // ── Typing render state
  const ts      = typingRef.current;
  const snippet = SNIPPETS[ts.snippetIdx];
  const currentLineText =
    !ts.pausing && ts.lineIdx < snippet.lines.length
      ? snippet.lines[ts.lineIdx].slice(0, ts.charIdx)
      : "";

  const activeAgent = snippet.agent;
  const agentColor  = (id: AgentId) => AGENT_CFG.find(a => a.id === id)!.color;

  return (
    <div id="demo" className="demo-panel af-panel">
      {/* ── Header */}
      <div className="demo-head">
        <div className="dots"><span /><span /><span /></div>
        <span className="demo-title">forge.hello-human.ai</span>
        <span className="demo-live">LIVE</span>
      </div>

      {/* ── Agent bar */}
      <div className="af-agents">
        {AGENT_CFG.map(a => (
          <div
            key={a.id}
            className={`af-agent ${a.id === activeAgent ? "active" : "idle"}`}
            style={{ "--ac": a.color } as React.CSSProperties}
          >
            <span className="af-agent-dot" />
            <span className="af-agent-id">{a.id}</span>
            <span className="af-agent-lbl">{a.label}</span>
          </div>
        ))}
        <div className="af-mini-stats">
          <span><b>{commits}</b> commits</span>
          <span><b>{linesWritten.toLocaleString()}</b> lines</span>
        </div>
      </div>

      {/* ── Body */}
      <div className="af-body">

        {/* Terminal */}
        <div className="af-terminal">
          <div className="af-term-bar">
            <span style={{ color: agentColor(activeAgent), fontFamily: "var(--v-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em" }}>
              {activeAgent}-01
            </span>
            <span className="af-term-file">{snippet.file}</span>
          </div>
          <div className="af-code-area" ref={codeAreaRef}>
            {ts.visibleLines.map((line, i) => (
              <div
                key={i}
                className="af-line"
                dangerouslySetInnerHTML={{ __html: hi(line) }}
              />
            ))}
            {!ts.pausing && ts.lineIdx < snippet.lines.length && (
              <div className="af-line af-line-active">
                <span dangerouslySetInnerHTML={{ __html: hi(currentLineText) }} />
                <span className="af-cur" />
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="af-right">

          {/* Pipeline */}
          <div className="af-pipe-box">
            <div className="af-box-label">PIPELINE</div>
            <div className="af-stages">
              {/* BUILD */}
              <div className={`af-stage ${deployPhase === "build" && buildPct > 0 ? "running" : buildPct === 100 ? "done" : ""}`}>
                <span className="af-stage-dot" />
                <span className="af-stage-name">BUILD</span>
                <div className="af-stage-right">
                  {deployPhase === "build" && buildPct > 0 && buildPct < 100 && (
                    <div className="af-prog-track">
                      <div className="af-prog-fill" style={{ width: `${buildPct}%` }} />
                    </div>
                  )}
                  {buildPct === 100 && <span className="af-ok">compilado ✓</span>}
                </div>
              </div>

              {/* TEST */}
              <div className={`af-stage ${deployPhase === "test" ? "running" : testCount === 142 ? "done" : ""}`}>
                <span className="af-stage-dot" />
                <span className="af-stage-name">TEST</span>
                <div className="af-stage-right">
                  {deployPhase === "test" && testCount < 142 && (
                    <span className="af-running">{testCount}/142</span>
                  )}
                  {testCount === 142 && <span className="af-ok">142 pasados ✓</span>}
                </div>
              </div>

              {/* DEPLOY */}
              <div className={`af-stage ${deployPhase === "deploy" ? "running" : deployPhase === "live" ? "done" : ""}`}>
                <span className="af-stage-dot" />
                <span className="af-stage-name">DEPLOY</span>
                <div className="af-stage-right">
                  {deployPhase === "deploy" && <span className="af-running">subiendo…</span>}
                  {deployPhase === "live" && (
                    <span className="af-ok">v2.4.{commits % 9 + 1} live ✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comms */}
          <div className="af-comms-box">
            <div className="af-box-label">AGENT COMMS</div>
            <div className="af-comms-feed">
              {comms.map((c, idx) => (
                <div key={c.id} className={`af-comm ${idx === 0 ? "fresh" : ""}`}>
                  <span className="af-comm-from" style={{ color: agentColor(c.from) }}>{c.from}</span>
                  <span className="af-comm-arr">→</span>
                  <span className="af-comm-to">{c.to}</span>
                  <span className="af-comm-msg">{c.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
