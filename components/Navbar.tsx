"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const WA_LINK = "https://wa.me/34617700922";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const navLinks = [
    { label: t("services"), href: "#servicios" },
    { label: t("projects"), href: "#proyectos" },
    { label: t("process"), href: "#proceso" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "#contacto" },
  ];

  return (
    <>
      <nav className="nav" style={{ zIndex: 51 }}>
        <div className="wrap nav-inner">
          <a href="#" className="brand" onClick={close}>
            <span className="brand-dot" />
            Hello Human<span style={{ opacity: 0.4 }}>.</span>
          </a>

          <div className="nav-links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LanguageSwitcher />
            <a href={WA_LINK} className="nav-cta" target="_blank" rel="noopener noreferrer">
              {t("cta")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3l6 6M9 3v6H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <button
              className={`nav-burger ${open ? "open" : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Menú"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob-menu ${open ? "open" : ""}`}>
        <div className="mob-menu-inner">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="mob-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a
            href={WA_LINK}
            className="mob-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            {t("cta")} →
          </a>
          <div style={{ marginTop: 16 }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
