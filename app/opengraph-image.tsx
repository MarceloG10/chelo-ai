import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hello Human · Agentes IA, Apps y Dashboards a velocidad imposible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#080a0e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Glow verde — centro izquierda */}
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "rgba(182,255,60,0.1)", filter: "blur(120px)", top: -100, left: -100, display: "flex" }} />
        {/* Glow índigo — centro derecha */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(100px)", bottom: -100, right: -60, display: "flex" }} />

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", display: "flex" }} />

        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #080a0e 100%)", display: "flex" }} />

        {/* Content — centered */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0 }}>

          {/* Brand label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#b6ff3c", boxShadow: "0 0 12px rgba(182,255,60,0.9)", display: "flex" }} />
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, letterSpacing: "0.18em", fontWeight: 500 }}>
              HELLO HUMAN
            </span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#b6ff3c", boxShadow: "0 0 12px rgba(182,255,60,0.9)", display: "flex" }} />
          </div>

          {/* Main headline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#ffffff", fontSize: 100, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.045em" }}>
              Software a
            </span>
            <span style={{ color: "#ffffff", fontSize: 100, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.045em" }}>
              velocidad
            </span>
            <div style={{ display: "flex", marginTop: 8 }}>
              <span style={{ color: "#080a0e", fontSize: 100, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.045em", background: "#b6ff3c", padding: "6px 20px 12px" }}>
                imposible.
              </span>
            </div>
          </div>

          {/* Tagline */}
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, marginTop: 32, letterSpacing: "-0.01em" }}>
            Agentes IA · Apps · Dashboards · hhtech.dev
          </span>
        </div>

        {/* Bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, transparent, rgba(182,255,60,0.6), rgba(99,102,241,0.5), transparent)", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
