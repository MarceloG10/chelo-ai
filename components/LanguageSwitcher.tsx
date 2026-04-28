"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

const LABELS: Record<string, string> = { es: "ES", en: "EN", ca: "CA" };
const LOCALES = ["es", "en", "ca"];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="lang-switcher" aria-label="Selector de idioma">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`lang-btn${locale === l ? " active" : ""}`}
          disabled={isPending || locale === l}
          aria-current={locale === l ? "true" : undefined}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
