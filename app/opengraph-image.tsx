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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top row — logo + tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#b6ff3c",
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Hello Human
          </span>
          <div
            style={{
              marginLeft: 12,
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            AGENTES IA · APPS · DASHBOARDS
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Software a
          </span>
          <span
            style={{
              color: "#b6ff3c",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            velocidad imposible.
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 28,
              fontWeight: 400,
              marginTop: 24,
              letterSpacing: "-0.01em",
            }}
          >
            Humanos + IA. Sin equipos gigantes. Sin burocracia.
          </span>
        </div>

        {/* Bottom row — URL */}
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 20,
            letterSpacing: "0.06em",
            display: "flex",
          }}
        >
          WWW.HHTECH.DEV
        </div>
      </div>
    ),
    { ...size }
  );
}
