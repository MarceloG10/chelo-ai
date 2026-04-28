const WA_LINK = "https://wa.me/34617700922";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-deco d1">[ v2026.04 ]</div>
        <div className="hero-deco d2">Barcelona · 41.38°N 2.17°E</div>

        <div className="hero-full">
          <div className="eyebrow">Agentes de IA · Apps · Dashboards con IA</div>
          <h1 className="hero-h1">
            Software a velocidad <em>imposible</em>.
          </h1>
          <p className="hero-sub">
            <strong>Humanos + IA.</strong> Construimos agentes, apps y sistemas que antes tomaban meses, ahora en días. Sin equipos gigantes. Sin burocracia. Sin humo.
          </p>
          <div className="hero-actions">
            <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Empieza un proyecto
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#proyectos" className="btn btn-ghost-outline">
              Ver proyectos →
            </a>
          </div>
          <div className="hero-meta">
            <div><b>4 sem</b>de idea<br />a producción</div>
            <div><b>10×</b>más rápido que una<br />agencia tradicional</div>
            <div><b>24/7</b>agentes<br />trabajando</div>
          </div>
        </div>
      </div>
    </section>
  );
}
