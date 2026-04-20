import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · Hello Human",
  description: "Esta página no existe.",
};

export default function NotFound() {
  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--v-sans)" }}>
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "rgba(182,255,60,0.06)", filter: "blur(100px)", top: -100, left: -100, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(80px)", bottom: 0, right: 0, pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, letterSpacing: "0.18em", color: "#b6ff3c", marginBottom: 24 }}>
          [ ERROR 404 ]
        </div>

        <div style={{ fontSize: "clamp(80px, 15vw, 160px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "#fff", opacity: 0.06, userSelect: "none" }}>
          404
        </div>

        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.035em", margin: "-0.3em 0 16px" }}>
          Página no encontrada.
        </h1>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.6, maxWidth: 360, margin: "0 auto 40px" }}>
          La URL que buscas no existe o fue movida. Vuelve al inicio o lee el blog.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "13px 28px", borderRadius: 999, background: "#b6ff3c", color: "#080a0e", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "-0.01em" }}>
            Ir al inicio
          </Link>
          <Link href="/blog" style={{ padding: "13px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>
            Ver el blog
          </Link>
        </div>
      </div>
    </main>
  );
}
