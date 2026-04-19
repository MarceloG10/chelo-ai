"use client";

import { useState } from "react";

const WA_LINK = "https://wa.me/34617700922";
const EMAIL = "Marcelo@hhtech.dev";

export default function CTASection() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    const fd = new FormData(form);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      service: fd.get("service"),
      msg: fd.get("msg"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        throw new Error("fail");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const btnLabel =
    status === "sending" ? "Enviando…" :
    status === "ok" ? "Enviado ✓" :
    status === "error" ? "Error · usa WhatsApp" : "Enviar";

  return (
    <section className="cta-section" id="contacto">
      <div className="wrap">
        <div className="cta-inner reveal">
          <div>
            <h2 className="cta-h2">¿Tienes una idea? <em>Hagámosla real esta semana.</em></h2>
            <p className="cta-sub">
              Escríbenos por WhatsApp para una respuesta instantánea, o déjanos un mensaje si prefieres el correo tradicional. La primera conversación siempre es gratis y directa al grano.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <a href={WA_LINK} className="btn-wa" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn"
                style={{
                  background: "color-mix(in srgb, var(--v-bg) 10%, transparent)",
                  color: "var(--v-bg)",
                  border: "1px solid color-mix(in srgb, var(--v-bg) 20%, transparent)",
                }}
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {status === "ok" ? (
            <div className="form-success">
              <div className="success-check">
                <svg viewBox="0 0 52 52" fill="none">
                  <circle className="check-circle" cx="26" cy="26" r="24" stroke="var(--v-accent)" strokeWidth="2" />
                  <path className="check-mark" d="M14 26l9 9 15-15" stroke="var(--v-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="success-title">¡Mensaje recibido!</h3>
              <p className="success-sub">Te contactamos antes de <strong>24 horas</strong>.<br />Mantén un ojo en tu bandeja de entrada.</p>
              <div style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.45, marginTop: 24, letterSpacing: ".1em" }}>
                EQUIPO HELLO HUMAN · BARCELONA
              </div>
            </div>
          ) : (
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="Nuevo contacto desde Hello Human · hhtech.dev" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <div className="form-row">
              <label>Nombre</label>
              <input name="name" required placeholder="¿Cómo te llamas?" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input name="email" type="email" required placeholder="tu@email.com" />
            </div>
            <div className="form-row">
              <label>¿Qué necesitas?</label>
              <select name="service">
                <option>Un agente de IA</option>
                <option>Una app o web</option>
                <option>Digitalizar un proceso</option>
                <option>Aún no lo sé, ayudadme</option>
              </select>
            </div>
            <div className="form-row">
              <label>Cuéntame más (opcional)</label>
              <textarea name="msg" placeholder="Describe brevemente tu proyecto…" />
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="btn-accent"
                disabled={status === "sending"}
                style={
                  status === "error" ? { background: "#ff4545", color: "#fff" } : {}
                }
              >
                {btnLabel}
                {status === "idle" && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <span style={{ fontFamily: "var(--v-mono)", fontSize: 11, opacity: 0.5 }}>RESPUESTA EN &lt; 24H</span>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
