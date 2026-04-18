export default function Services() {
  return (
    <section className="section reveal" id="servicios">
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
              Diseñamos agentes personalizados que venden, reportan, ejecutan. Integrados con tu WhatsApp, email, CRM o stack interno. Nada genérico: cada agente se entrena con tu negocio.
            </p>
            <div className="service-list">
              <span>Atención al cliente 24/7</span>
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
              MVPs en 2-4 semanas. Productos completos en meses, no años. Usamos IA en cada paso — desde el diseño hasta el deploy — para ir más rápido sin sacrificar calidad.
            </p>
            <div className="service-list">
              <span>Apps móviles (iOS / Android)</span>
              <span>Webs y dashboards</span>
              <span>Backend y APIs</span>
              <span>Diseño UX/UI incluido</span>
            </div>
          </div>

          {/* Digitalización */}
          <div className="service reveal">
            <div className="service-visual viz-digit">
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
            <div className="service-num">03 / Digitalización</div>
            <h3 className="service-title">Procesos<br />sin papel.</h3>
            <p className="service-desc">
              Convertimos tus procesos manuales en flujos digitales. Migración desde Excel, integración entre sistemas, automatización de tareas repetitivas que nadie quiere hacer.
            </p>
            <div className="service-list">
              <span>Integraciones (CRM, ERP)</span>
              <span>Automatización con n8n / Zapier</span>
              <span>Dashboards de datos</span>
              <span>Auditoría de procesos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
