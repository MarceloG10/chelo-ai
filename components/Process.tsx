export default function Process() {
  return (
    <section className="section" id="proceso" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-label">[ 04 · Cómo trabajamos contigo ]</div>
          <h2 className="section-h2">De la idea al deploy en <em>semanas</em>, no meses.</h2>
        </div>
        <div className="process reveal">
          <div className="step">
            <div className="step-n">01 / DISCOVERY</div>
            <h3 className="step-title">Conversamos.</h3>
            <p className="step-desc">Una llamada de 30 min. Me cuentas tu problema, tu proceso, tu sueño. Sin tecnicismos. Sin formularios interminables.</p>
            <span className="step-time">→ Día 1</span>
          </div>
          <div className="step">
            <div className="step-n">02 / BUILD</div>
            <h3 className="step-title">Construimos.</h3>
            <p className="step-desc">Diseño + desarrollo en paralelo, con IA acelerando cada paso. Prototipo funcional, no mockups. Tú lo pruebas mientras lo hacemos.</p>
            <span className="step-time">→ Semanas 1–2</span>
          </div>
          <div className="step">
            <div className="step-n">03 / LAUNCH</div>
            <h3 className="step-title">Lanzamos.</h3>
            <p className="step-desc">Deploy a producción, conexión a tus canales, monitoreo. Resultados desde el primer día. Iteración continua según feedback real.</p>
            <span className="step-time">→ Semana 4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
