import OpsConsole from "./OpsConsole";

const WA_LINK = "https://wa.me/34617700922";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-deco d1">[ v2026.04 ]</div>
        <div className="hero-deco d2">Barcelona · 41.38°N 2.17°E</div>

        <div className="hero-grid" id="heroGrid">
          <div className="hero-left">
            <div className="eyebrow">Agentes de IA · Apps · Digitalización</div>
            <h1 className="hero-h1">
              Software a velocidad <em>imposible</em>.
            </h1>
            <p className="hero-sub">
              <strong>Humanos + IA.</strong> Construimos agentes, apps y sistemas que antes tomaban meses — ahora en días. Sin equipos gigantes. Sin burocracia. Sin humo.
            </p>
            <div className="hero-actions">
              <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Empieza un proyecto
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#demo" className="btn btn-ghost-outline">
                Prueba el agente →
              </a>
            </div>
            <div className="hero-meta">
              <div><b>4 sem</b>de idea<br />a producción</div>
              <div><b>3</b>proyectos<br />en marcha</div>
              <div><b>24/7</b>agentes<br />trabajando</div>
            </div>
          </div>

          <div className="ops-col">
            <OpsConsole />
            <div className="ops-coords">Barcelona · 41.38°N 2.17°E</div>
          </div>

          <div className="hero-mosaic" aria-hidden="true">
            <div className="mos-card mos-1">
              <span className="mos-lbl">Especialidad</span>
              <span className="mos-big">Agentes<br />de IA.</span>
            </div>
            <div className="mos-card mos-2">
              <span className="mos-lbl">Entrega</span>
              <div>
                <span className="mos-big">4 sem</span>
                <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, color: "var(--v-muted)", marginTop: 6, letterSpacing: ".08em" }}>
                  DE IDEA A PRODUCCIÓN
                </div>
              </div>
            </div>
            <div className="mos-card mos-3">
              <span className="mos-lbl">Canales</span>
              <div className="chip-list">
                <span>WhatsApp</span>
                <span>Email / CRM</span>
                <span>Voz / teléfono</span>
                <span>Web / App</span>
              </div>
            </div>
            <div className="mos-card mos-4">
              <span className="mos-lbl">— Filosofía</span>
              <span className="mos-big">Menos humo.<br />Más <em>código funcionando</em>.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
