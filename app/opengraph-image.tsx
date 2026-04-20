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
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Glow verde bottom-left */}
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(182,255,60,0.13)",
            filter: "blur(90px)",
            bottom: -180,
            left: -80,
            display: "flex",
          }}
        />

        {/* Glow azul/índigo top-right */}
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.12)",
            filter: "blur(80px)",
            top: -140,
            right: -60,
            display: "flex",
          }}
        />

        {/* Dot grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            display: "flex",
          }}
        />

        {/* Línea divisora vertical */}
        <div
          style={{
            position: "absolute",
            left: 680,
            top: 60,
            bottom: 60,
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
            display: "flex",
          }}
        />

        {/* Contenido principal */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: "56px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#b6ff3c",
                boxShadow: "0 0 12px rgba(182,255,60,0.8)",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Hello Human
            </span>
            <div
              style={{
                marginLeft: 8,
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                letterSpacing: "0.12em",
              }}
            >
              HUMANOS + IA
            </span>
          </div>

          {/* Cuerpo: headline izq + cards der */}
          <div style={{ display: "flex", gap: 0, alignItems: "center" }}>

            {/* LEFT — headline */}
            <div
              style={{
                width: 580,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 92,
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                }}
              >
                Software
              </span>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 92,
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                }}
              >
                a velocidad
              </span>
              <div
                style={{
                  display: "flex",
                  marginTop: 4,
                }}
              >
                <span
                  style={{
                    color: "#080a0e",
                    fontSize: 92,
                    fontWeight: 800,
                    lineHeight: 0.92,
                    letterSpacing: "-0.045em",
                    background: "#b6ff3c",
                    padding: "4px 16px 8px",
                  }}
                >
                  imposible.
                </span>
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 19,
                  marginTop: 28,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}
              >
                Construimos en días lo que otros{"\n"}tardan meses. Sin equipos gigantes.
              </span>
            </div>

            {/* RIGHT — service cards */}
            <div
              style={{
                marginLeft: 68,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
              }}
            >
              {/* Card 1 */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    color: "#b6ff3c",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  01
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ color: "#ffffff", fontSize: 17, fontWeight: 700 }}>
                    Agentes de IA
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>
                    WhatsApp · CRM · Atención 24/7
                  </span>
                </div>
              </div>

              {/* Card 2 — highlighted */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "rgba(182,255,60,0.07)",
                  border: "1.5px solid rgba(182,255,60,0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    color: "#b6ff3c",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  02
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ color: "#ffffff", fontSize: 17, fontWeight: 700 }}>
                    Apps y Webs
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>
                    MVP en 2–4 semanas · iOS · Android
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    color: "#b6ff3c",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  03
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ color: "#ffffff", fontSize: 17, fontWeight: 700 }}>
                    Dashboards con IA
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>
                    CRM · ERP · APIs · Tiempo real
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: 14,
                letterSpacing: "0.14em",
              }}
            >
              WWW.HHTECH.DEV
            </span>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              {["Agentes IA", "Apps", "Dashboards"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    display: "flex",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
