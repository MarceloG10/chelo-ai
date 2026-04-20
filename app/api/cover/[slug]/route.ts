import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getAccent(tags: string[]): { a: string; b: string } {
  const map: Record<string, { a: string; b: string }> = {
    "agente IA":      { a: "#b6ff3c", b: "#4ade80" },
    "automatización": { a: "#38bdf8", b: "#818cf8" },
    "desarrollo":     { a: "#f472b6", b: "#c084fc" },
    "dashboard":      { a: "#fb923c", b: "#fbbf24" },
    "SEO":            { a: "#34d399", b: "#2dd4bf" },
    "apps":           { a: "#a78bfa", b: "#60a5fa" },
  };
  for (const tag of tags) {
    if (map[tag]) return map[tag];
  }
  return { a: "#b6ff3c", b: "#4ade80" };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const { a, b } = getAccent(post.tags);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#080a0e",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Glow A */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `${a}20`, filter: "blur(80px)", top: -150, left: -80, display: "flex" }} />
        {/* Glow B */}
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `${b}18`, filter: "blur(70px)", bottom: -100, right: -60, display: "flex" }} />

        {/* Dot grid */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px", display: "flex" }} />

        {/* Diagonal lines */}
        <div style={{ position: "absolute", width: 2, height: 900, background: `linear-gradient(to bottom, transparent, ${a}30, transparent)`, transform: "rotate(25deg)", top: -100, left: 820, display: "flex" }} />
        <div style={{ position: "absolute", width: 1, height: 900, background: `linear-gradient(to bottom, transparent, ${a}15, transparent)`, transform: "rotate(25deg)", top: -100, left: 860, display: "flex" }} />

        {/* Content */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, padding: "56px 72px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: a, display: "flex" }} />
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, fontWeight: 600 }}>Hello Human · Blog</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {post.tags.slice(0, 2).map((tag) => (
                <div key={tag} style={{ padding: "5px 14px", borderRadius: 999, border: `1px solid ${a}40`, color: a, fontSize: 13, letterSpacing: "0.06em", display: "flex" }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Title block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 880 }}>
            <div style={{ width: 48, height: 3, background: `linear-gradient(to right, ${a}, ${b})`, borderRadius: 999, display: "flex" }} />
            <span style={{ color: "#ffffff", fontSize: post.title.length > 50 ? 54 : 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {post.title}
            </span>
            <span style={{ color: "rgba(255,255,255,0.42)", fontSize: 21, lineHeight: 1.5 }}>
              {post.description.length > 110 ? post.description.slice(0, 110) + "…" : post.description}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 13, letterSpacing: "0.12em" }}>WWW.HHTECH.DEV</span>
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 13 }}>{post.readingTime}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
