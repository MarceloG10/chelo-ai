"use client";
import { useState } from "react";

const WA_LINK = "https://wa.me/34617700922";

const navLinks = [
  { label: "Servicios",  href: "#servicios" },
  { label: "Proyectos",  href: "#proyectos" },
  { label: "Proceso",    href: "#proceso" },
  { label: "Contacto",   href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav" style={{ zIndex: 51 }}>
        <div className="wrap nav-inner">
          <a href="#" className="brand" onClick={close}>
            <span className="brand-dot" />
            Hello Human<span style={{ opacity: 0.4 }}>.</span>
          </a>

          <div className="nav-links">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={WA_LINK} className="nav-cta" target="_blank" rel="noopener noreferrer">
              Conversemos
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3l6 6M9 3v6H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <button
              className={`nav-burger ${open ? "open" : ""}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Menú"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mob-menu ${open ? "open" : ""}`}>
        <div className="mob-menu-inner">
          {navLinks.map(l => (
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
            Conversemos →
          </a>
        </div>
      </div>
    </>
  );
}
