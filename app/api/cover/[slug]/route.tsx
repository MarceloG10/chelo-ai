import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { NextRequest } from "next/server";

type Theme = { a: string; b: string; c: string };

function getTheme(tags: string[]): Theme {
  const map: Record<string, Theme> = {
    "agente IA":      { a: "#b6ff3c", b: "#4ade80", c: "#064e3b" },
    "automatización": { a: "#38bdf8", b: "#818cf8", c: "#1e1b4b" },
    "desarrollo":     { a: "#f472b6", b: "#c084fc", c: "#2d1b69" },
    "dashboard":      { a: "#fb923c", b: "#fbbf24", c: "#431407" },
    "SEO":            { a: "#34d399", b: "#2dd4bf", c: "#064e3b" },
    "apps":           { a: "#a78bfa", b: "#60a5fa", c: "#1e1b4b" },
  };
  for (const tag of tags) {
    if (map[tag]) return map[tag];
  }
  return { a: "#b6ff3c", b: "#4ade80", c: "#064e3b" };
}

// Abstract illustration based on tag concept
function getIllustration(tags: string[], theme: Theme) {
  const tag = tags[0] ?? "";
  const { a, b } = theme;

  if (tag === "agente IA" || tag === "automatización") {
    // Network nodes illustration
    const nodes = [
      { x: 600, y: 315, r: 40, main: true },
      { x: 300, y: 160, r: 24, main: false },
      { x: 900, y: 160, r: 24, main: false },
      { x: 200, y: 400, r: 18, main: false },
      { x: 1000, y: 400, r: 18, main: false },
      { x: 460, y: 480, r: 20, main: false },
      { x: 750, y: 120, r: 16, main: false },
    ];
    const lines = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[1,3],[2,4],
    ];
    return (
      <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 } as React.CSSProperties}>
        {lines.map(([from, to], i) => (
          <line key={i}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke={a} strokeOpacity="0.2" strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 16} fill={a} fillOpacity={n.main ? "0.08" : "0.04"} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.main ? a : "none"} fillOpacity={n.main ? "0.15" : "0"} stroke={a} strokeOpacity={n.main ? "0.6" : "0.3"} strokeWidth={n.main ? "2" : "1"} />
          </g>
        ))}
        {/* Traveling dots */}
        <circle r="5" fill={a} fillOpacity="0.9">
          <animateMotion dur="3s" repeatCount="indefinite" path={`M${nodes[1].x},${nodes[1].y} L${nodes[0].x},${nodes[0].y}`} />
        </circle>
        <circle r="4" fill={b} fillOpacity="0.7">
          <animateMotion dur="2.5s" begin="1s" repeatCount="indefinite" path={`M${nodes[2].x},${nodes[2].y} L${nodes[0].x},${nodes[0].y}`} />
        </circle>
      </svg>
    );
  }

  if (tag === "desarrollo" || tag === "apps") {
    // Code/grid illustration
    const cols = 8, rows = 5;
    const rects = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const w = 80 + Math.sin(r * c) * 40;
        const opacity = 0.04 + Math.abs(Math.sin(r + c * 0.7)) * 0.12;
        rects.push({ x: 80 + c * 140, y: 80 + r * 100, w, opacity });
      }
    }
    return (
      <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 } as React.CSSProperties}>
        {/* Horizontal lines */}
        {[1,2,3,4].map(i => (
          <line key={i} x1="60" y1={i * 126} x2="1140" y2={i * 126} stroke={a} strokeOpacity="0.06" strokeWidth="1" />
        ))}
        {/* Code blocks */}
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={14} rx="4" fill={a} fillOpacity={r.opacity} />
        ))}
        {/* Bracket decoration */}
        <text x="100" y="340" fontSize="180" fontFamily="monospace" fill={a} fillOpacity="0.06" fontWeight="bold">{"{ }"}</text>
        {/* Accent lines */}
        <rect x="60" y="60" width="4" height="510" rx="2" fill={a} fillOpacity="0.3" />
        <rect x="1136" y="60" width="4" height="510" rx="2" fill={b} fillOpacity="0.2" />
      </svg>
    );
  }

  if (tag === "dashboard") {
    // Bar chart illustration
    const bars = [
      { h: 180, x: 120 }, { h: 280, x: 240 }, { h: 200, x: 360 },
      { h: 380, x: 480 }, { h: 260, x: 600 }, { h: 420, x: 720 },
      { h: 300, x: 840 }, { h: 460, x: 960 }, { h: 340, x: 1080 },
    ];
    return (
      <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 } as React.CSSProperties}>
        {/* Grid lines */}
        {[100,200,300,400,500].map(y => (
          <line key={y} x1="60" y1={y} x2="1140" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1" />
        ))}
        {/* Bars */}
        {bars.map((bar, i) => (
          <g key={i}>
            <rect x={bar.x - 40} y={560 - bar.h} width="80" height={bar.h} rx="8"
              fill={i === 5 || i === 7 ? a : b}
              fillOpacity={i === 5 || i === 7 ? "0.35" : "0.12"}
            />
          </g>
        ))}
        {/* Trend line */}
        <polyline
          points={bars.map(b => `${b.x},${560 - b.h}`).join(" ")}
          fill="none" stroke={a} strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Dots on trend */}
        {bars.map((bar, i) => (
          <circle key={i} cx={bar.x} cy={560 - bar.h} r="5" fill={a} fillOpacity="0.7" />
        ))}
      </svg>
    );
  }

  if (tag === "SEO") {
    // Magnifier + nodes
    return (
      <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 } as React.CSSProperties}>
        <circle cx="600" cy="280" r="180" fill="none" stroke={a} strokeOpacity="0.12" strokeWidth="40" />
        <circle cx="600" cy="280" r="180" fill="none" stroke={a} strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="600" cy="280" r="120" fill={a} fillOpacity="0.05" />
        <line x1="740" y1="420" x2="900" y2="540" stroke={a} strokeOpacity="0.4" strokeWidth="30" strokeLinecap="round" />
        {/* Rank dots */}
        {[1,2,3].map(i => (
          <g key={i}>
            <circle cx={300 + i * 180} cy={130} r={20 - i * 3} fill={a} fillOpacity={0.3 - i * 0.07} />
            <line x1={300 + i * 180} y1={110 - i * 8} x2={300 + i * 180} y2={80} stroke={a} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
          </g>
        ))}
      </svg>
    );
  }

  // Default — orbital rings
  return (
    <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 } as React.CSSProperties}>
      {[200, 280, 360, 440].map((r, i) => (
        <circle key={i} cx="600" cy="315" r={r} fill="none" stroke={a} strokeOpacity={0.06 + i * 0.02} strokeWidth={i === 2 ? "2" : "1"} strokeDasharray={i % 2 === 0 ? "none" : "8 8"} />
      ))}
      <circle cx="600" cy="315" r="60" fill={a} fillOpacity="0.08" stroke={a} strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="600" cy="315" r="20" fill={a} fillOpacity="0.3" />
      {[0,72,144,216,288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 600 + 280 * Math.cos(rad);
        const y = 315 + 280 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="10" fill={b} fillOpacity="0.35" />;
      })}
    </svg>
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const theme = getTheme(post.tags);
  const { a, b, c } = theme;

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, background: "#080a0e", display: "flex", position: "relative", overflow: "hidden" }}>

        {/* Base gradient */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 700px 500px at 50% 50%, ${c}88 0%, transparent 70%)`, display: "flex" }} />

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", display: "flex" }} />

        {/* Illustration */}
        {getIllustration(post.tags, theme) as React.ReactNode}

        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #080a0e 100%)`, display: "flex" }} />

        {/* Bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${a}60, ${b}60, transparent)`, display: "flex" }} />

        {/* Top-left dot */}
        <div style={{ position: "absolute", top: 28, left: 28, width: 10, height: 10, borderRadius: "50%", background: a, display: "flex" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
