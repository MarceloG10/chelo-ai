const STACK = [
  { name: "Claude",     tag: "AI MODEL" },
  { name: "GPT-4",      tag: "AI MODEL" },
  { name: "WhatsApp",   tag: "BUSINESS API" },
  { name: "n8n",        tag: "AUTOMATION" },
  { name: "React",      tag: "FRONTEND" },
  { name: "Next.js",    tag: "FRAMEWORK" },
  { name: "Supabase",   tag: "DATABASE" },
  { name: "Stripe",     tag: "PAYMENTS" },
  { name: "HubSpot",    tag: "CRM" },
  { name: "Twilio",     tag: "MESSAGING" },
  { name: "Figma",      tag: "DESIGN" },
  { name: "Vercel",     tag: "DEPLOY" },
];

export default function StackSection() {
  return (
    <section className="section" style={{ padding: "80px 0" }}>
      <div className="wrap">
        <div className="section-head reveal" style={{ gridTemplateColumns: "1fr", marginBottom: 40 }}>
          <div className="section-label">[ 04 · Stack &amp; Integraciones ]</div>
        </div>
        <div className="stack-grid reveal">
          {STACK.map((item) => (
            <div key={item.name} className="stack-cell">
              <strong>{item.name}</strong>
              <span>{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
