import { getTranslations } from "next-intl/server";

const WA_LINK = "https://wa.me/34617700922";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-deco d1">[ v2026.04 ]</div>
        <div className="hero-deco d2">Barcelona · 41.38°N 2.17°E</div>

        <div className="hero-full">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1 className="hero-h1">
            {t("h1")} <em>{t("h1em")}</em>.
          </h1>
          <p className="hero-sub">
            <strong>{t("subStrong")}</strong> {t("sub")}
          </p>
          <div className="hero-actions">
            <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {t("ctaPrimary")}
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#proyectos" className="btn btn-ghost-outline">
              {t("ctaSecondary")}
            </a>
          </div>
          <div className="hero-meta">
            <div><b>{t("weeks")}</b>{t("weeksSub").split("\n")[0]}<br />{t("weeksSub").split("\n")[1]}</div>
            <div><b>{t("speed")}</b>{t("speedSub").split("\n")[0]}<br />{t("speedSub").split("\n")[1]}</div>
            <div><b>{t("agents")}</b>{t("agentsSub").split("\n")[0]}<br />{t("agentsSub").split("\n")[1]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
