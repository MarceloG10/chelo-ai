const EMAIL = "Marcelo@hhtech.dev";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div className="brand">
          <span className="brand-dot" />
          Hello Human<span style={{ opacity: 0.4 }}>.</span>
        </div>
        <div className="foot-mini">© 2026 · Barcelona, España · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        <div className="foot-mini">Hecho con humanos + IA</div>
      </div>
    </footer>
  );
}
