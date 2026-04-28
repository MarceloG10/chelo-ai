import { getTranslations } from "next-intl/server";

export default async function Projects() {
  const t = await getTranslations("Projects");

  return (
    <section className="section" id="proyectos" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-h2">
            {t("titlePrefix")} <em>{t("titleEm")}</em> {t("titleSuffix")}
          </h2>
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
              <div className="project-tag">{t("inDev")}</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>{t("clubmaCategory")}</div>
              <h3 className="project-title">Clubma</h3>
              <p className="project-desc">{t("clubmaDesc")}</p>
              <div className="project-meta"><span>{t("clubmaMeta")}</span><span>Full-stack</span></div>
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
              <div className="project-tag">{t("inDev")}</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>{t("tourmateCategory")}</div>
              <h3 className="project-title">Tourmate</h3>
              <p className="project-desc">{t("tourmateDesc")}</p>
              <div className="project-meta"><span>{t("tourmateMeta")}</span><span>Mobile + AI</span></div>
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
              <div className="project-tag">{t("inDev")}</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.7, letterSpacing: "0.12em" }}>{t("clinicaCategory")}</div>
              <h3 className="project-title">Clínica<br />Estética</h3>
              <p className="project-desc">{t("clinicaDesc")}</p>
              <div className="project-meta"><span>{t("clinicaMeta")}</span><span>WhatsApp Agent</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
