const ITEMS = [
  { t: "WHATSAPP BUSINESS", i: "◉" },
  { t: "CLAUDE / GPT-4 / GEMINI", i: "✦" },
  { t: "REACT NATIVE · iOS · ANDROID", i: "◆" },
  { t: "n8n · ZAPIER · MAKE", i: "▲" },
  { t: "HUBSPOT · SALESFORCE · NOTION", i: "●" },
  { t: "SUPABASE · POSTGRES · REDIS", i: "■" },
  { t: "STRIPE · PAYPAL · PAYMENTS", i: "◉" },
  { t: "VERCEL · AWS · DEPLOY", i: "✦" },
];

const doubled = [...ITEMS, ...ITEMS];

export default function MarqueeSection() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span style={{ color: "var(--v-accent)" }}>{item.i}</span> {item.t}
          </div>
        ))}
      </div>
    </div>
  );
}
