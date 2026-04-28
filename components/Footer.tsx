import { getTranslations } from "next-intl/server";

const EMAIL = "Marcelo@hhtech.dev";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer>
      <div className="wrap foot">
        <div className="brand">
          <span className="brand-dot" />
          Hello Human<span style={{ opacity: 0.4 }}>.</span>
        </div>
        <div className="foot-mini">
          {t("copy")} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="foot-mini">{t("tagline")}</div>
      </div>
    </footer>
  );
}
