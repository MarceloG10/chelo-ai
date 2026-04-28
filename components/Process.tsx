import { getTranslations } from "next-intl/server";

export default async function Process() {
  const t = await getTranslations("Process");

  return (
    <section className="section" id="proceso" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-h2">
            {t("titlePrefix")} <em>{t("titleEm")}</em>{t("titleSuffix")}
          </h2>
        </div>
        <div className="process reveal">
          <div className="step">
            <div className="step-n">{t("step1Num")}</div>
            <h3 className="step-title">{t("step1Title")}</h3>
            <p className="step-desc">{t("step1Desc")}</p>
            <span className="step-time">{t("step1Time")}</span>
          </div>
          <div className="step">
            <div className="step-n">{t("step2Num")}</div>
            <h3 className="step-title">{t("step2Title")}</h3>
            <p className="step-desc">{t("step2Desc")}</p>
            <span className="step-time">{t("step2Time")}</span>
          </div>
          <div className="step">
            <div className="step-n">{t("step3Num")}</div>
            <h3 className="step-title">{t("step3Title")}</h3>
            <p className="step-desc">{t("step3Desc")}</p>
            <span className="step-time">{t("step3Time")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
