"use client";

const WA_LINK = "https://wa.me/34617700922";

const navLinks = [
  { label: "Servicios",  href: "#servicios" },
  { label: "Demo",       href: "#agente" },
  { label: "Proyectos",  href: "#proyectos" },
  { label: "Proceso",    href: "#proceso" },
  { label: "Contacto",   href: "#contacto" },
];

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="brand">
          <span className="brand-dot" />
          Hello Human<span style={{ opacity: 0.4 }}>.</span>
        </a>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a href={WA_LINK} className="nav-cta" target="_blank" rel="noopener noreferrer">
          Conversemos
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3v6H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
