import { getTranslations } from "next-intl/server";

export default async function Services() {
  const t = await getTranslations("Services");

  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-h2">
            {t("titlePrefix")} <em>{t("titleEm")}</em> {t("titleSuffix")}
          </h2>
        </div>

        <div className="services">
          {/* Desarrollo / Apps */}
          <div className="service reveal">
            <div className="service-visual viz-apps">
              <div className="dev-laptop">
                <div className="dev-screen">
                  <div className="dev-bar" />
                  <div className="dev-content">
                    <div className="dev-row" style={{ width: "76%" }} />
                    <div className="dev-row" style={{ width: "54%" }} />
                    <div className="dev-row" style={{ width: "88%" }} />
                    <div className="dev-row" style={{ width: "44%" }} />
                  </div>
                  <span className="dev-cursor" />
                </div>
                <div className="dev-chin" />
              </div>
              <div className="dev-phone">
                <div className="dev-screen">
                  <div className="dev-bar" />
                  <div className="dev-content">
                    <div className="dev-row" style={{ width: "82%" }} />
                    <div className="dev-row" style={{ width: "62%" }} />
                    <div className="dev-row" style={{ width: "74%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="service-num">{t("s1Num")}</div>
            <h3 className="service-title">{t("s1Title")}</h3>
            <p className="service-desc">{t("s1Desc")}</p>
            <div className="service-list">
              <span>{t("s1f1")}</span>
              <span>{t("s1f2")}</span>
              <span>{t("s1f3")}</span>
              <span>{t("s1f4")}</span>
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
            <div className="service-num">{t("s2Num")}</div>
            <h3 className="service-title">{t("s2Title")}</h3>
            <p className="service-desc">{t("s2Desc")}</p>
            <div className="service-list">
              <span>{t("s2f1")}</span>
              <span>{t("s2f2")}</span>
              <span>{t("s2f3")}</span>
              <span>{t("s2f4")}</span>
            </div>
          </div>

          {/* Automatización */}
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
            <div className="service-num">{t("s3Num")}</div>
            <h3 className="service-title">{t("s3Title")}</h3>
            <p className="service-desc">{t("s3Desc")}</p>
            <div className="service-list">
              <span>{t("s3f1")}</span>
              <span>{t("s3f2")}</span>
              <span>{t("s3f3")}</span>
              <span>{t("s3f4")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
