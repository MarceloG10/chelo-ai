export default function Projects() {
  return (
    <section className="section" id="proyectos" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">[ 03 · En construcción ]</div>
          <h2 className="section-h2">Tres proyectos. <em>Todos</em> cocinándose ahora mismo.</h2>
        </div>

        <div className="projects">
          <article className="project clubma reveal">
            <div className="project-bg">
              <svg viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1" />
                <circle cx="100" cy="100" r="20" fill="white" opacity={0.4} />
              </svg>
            </div>
            <div style={{ position: "relative" }}>
              <div className="project-tag">En desarrollo</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>WEB · APP · PLATAFORMA</div>
              <h3 className="project-title">Clubma</h3>
              <p className="project-desc">Plataforma completa para la gestión inteligente de clubes y comunidades. Miembros, eventos, pagos y métricas en un solo lugar.</p>
              <div className="project-meta"><span>Próx · Q3 26</span><span>Full-stack</span></div>
            </div>
          </article>

          <article className="project tourmate reveal">
            <div className="project-bg">
              <svg viewBox="0 0 200 200" fill="none">
                <path d="M20,150 Q60,100 100,120 T180,80" stroke="white" strokeWidth="2" />
                <path d="M20,170 Q80,130 140,150 T180,120" stroke="white" strokeWidth="2" opacity={0.5} />
                <circle cx="100" cy="120" r="4" fill="white" />
                <circle cx="180" cy="80" r="4" fill="white" />
              </svg>
            </div>
            <div style={{ position: "relative" }}>
              <div className="project-tag">En desarrollo</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>APP · IA · VIAJES</div>
              <h3 className="project-title">Tourmate</h3>
              <p className="project-desc">La app que convierte cada viaje en una experiencia guiada por IA. Itinerarios inteligentes, compañero de viaje virtual, descubrimientos en tiempo real.</p>
              <div className="project-meta"><span>Próx · Q2 26</span><span>Mobile + AI</span></div>
            </div>
          </article>

          <article className="project clinica reveal">
            <div className="project-bg">
              <svg viewBox="0 0 200 200" fill="none">
                <g stroke="white" strokeWidth="1">
                  <circle cx="100" cy="80" r="40" opacity={0.6} />
                  <path d="M60,140 Q100,120 140,140 L140,180 L60,180 Z" opacity={0.4} />
                </g>
                <circle cx="150" cy="40" r="6" fill="white" />
              </svg>
            </div>
            <div style={{ position: "relative" }}>
              <div className="project-tag">En desarrollo</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>AGENTE IA · SALUD</div>
              <h3 className="project-title">Clínica<br />Estética</h3>
              <p className="project-desc">Agente de IA que gestiona reservas, responde consultas sobre tratamientos, recuerda citas y hace seguimiento post-procedimiento. 24/7 por WhatsApp.</p>
              <div className="project-meta"><span>Próx · Q2 26</span><span>WhatsApp Agent</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
