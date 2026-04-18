export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">[ 01 · Servicios ]</div>
          <h2 className="section-h2">Tres maneras de darle <em>superpoderes</em> a tu negocio.</h2>
        </div>

        <div className="services">
          {/* Agentes */}
          <div className="service reveal">
            <div className="service-visual viz-agents">
              <svg viewBox="0 0 200 120">
                <g stroke="currentColor" strokeWidth="1" opacity="0.3">
                  <line x1="40" y1="60" x2="100" y2="30" />
                  <line x1="40" y1="60" x2="100" y2="90" />
                  <line x1="100" y1="30" x2="160" y2="60" />
                  <line x1="100" y1="90" x2="160" y2="60" />
                  <line x1="100" y1="30" x2="100" y2="90" />
                </g>
                <circle className="node" cx="40" cy="60" r="6" fill="var(--v-accent)" />
                <circle className="node" cx="100" cy="30" r="6" fill="var(--v-ink)" />
                <circle className="node" cx="100" cy="90" r="6" fill="var(--v-ink)" />
                <circle className="node" cx="160" cy="60" r="6" fill="var(--v-accent)" />
              </svg>
            </div>
            <div className="service-num">01 / Agentes de IA</div>
            <h3 className="service-title">Agentes que<br />no duermen.</h3>
            <p className="service-desc">
              Diseñamos agentes personalizados que venden, reportan, ejecutan. Integrados con tu WhatsApp, email, CRM o stack interno. Nada genérico.
            </p>
            <div className="service-list">
              <span>Atención 24/7</span>
              <span>Calificación de leads</span>
              <span>Automatización de backoffice</span>
              <span>Voz + WhatsApp + email</span>
            </div>
          </div>

          {/* Apps */}
          <div className="service reveal">
            <div className="service-visual viz-apps">
              <div className="frame" />
              <div className="frame" />
              <div className="frame" />
            </div>
            <div className="service-num">02 / Desarrollo</div>
            <h3 className="service-title">Apps y webs<br />hechas rápido.</h3>
            <p className="service-desc">
              MVPs en 2-4 semanas. Productos completos en meses, no años. Usamos IA en cada paso — desde el diseño hasta el deploy.
            </p>
            <div className="service-list">
              <span>Apps móviles (iOS / Android)</span>
              <span>Webs y dashboards</span>
              <span>Backend y APIs</span>
              <span>Diseño UX/UI incluido</span>
            </div>
          </div>

          {/* Datos */}
          <div className="service reveal">
            <div className="service-visual viz-datos">
              <svg viewBox="0 0 200 120" preserveAspectRatio="none">
                <rect x="20" y="70" width="24" height="40" fill="var(--v-accent)" opacity="0.7" className="bar-anim bar-1" />
                <rect x="56" y="50" width="24" height="60" fill="var(--v-accent)" opacity="0.85" className="bar-anim bar-2" />
                <rect x="92" y="30" width="24" height="80" fill="var(--v-accent)" className="bar-anim bar-3" />
                <rect x="128" y="55" width="24" height="55" fill="var(--v-accent)" opacity="0.8" className="bar-anim bar-4" />
                <polyline points="32,70 68,50 104,30 140,55 176,38" fill="none" stroke="var(--v-ink)" strokeWidth="1.5" opacity="0.5" className="sparkline" />
                <circle cx="176" cy="38" r="3" fill="var(--v-accent)" />
              </svg>
            </div>
            <div className="service-num">03 / Visualización de datos</div>
            <h3 className="service-title">Datos que<br />hablan claro.</h3>
            <p className="service-desc">
              Conectamos tus fuentes dispersas (CRM, ERP, Excel, APIs) y las convertimos en dashboards con IA que explica qué está pasando y qué hacer.
            </p>
            <div className="service-list">
              <span>Dashboards en tiempo real</span>
              <span>Alertas Slack/email</span>
              <span>Reportes que se explican solos</span>
              <span>KPIs + predicciones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
