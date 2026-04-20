import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogCover from "@/components/BlogCover";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const accentColor: Record<string, string> = {
    "agente IA":      "#b6ff3c",
    "automatización": "#38bdf8",
    "desarrollo":     "#f472b6",
    "dashboard":      "#fb923c",
    "SEO":            "#34d399",
    "apps":           "#a78bfa",
  };
  const accent = accentColor[post.tags[0]] ?? "#b6ff3c";

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#fff" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(360px, 48vw, 520px)", overflow: "hidden" }}>

        {/* Animated canvas background */}
        <div style={{ position: "absolute", inset: 0 }}>
          <BlogCover tags={post.tags} />
        </div>

        {/* Gradient overlay — dark top + heavy dark bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(8,10,14,0.55) 0%, rgba(8,10,14,0) 35%, rgba(8,10,14,0.75) 70%, #080a0e 100%)",
        }} />

        {/* Top nav bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "clamp(20px,3vw,32px) clamp(20px,5vw,64px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link href="/blog" style={{
            color: "rgba(255,255,255,0.5)", fontSize: 12,
            letterSpacing: "0.14em", textDecoration: "none",
            fontFamily: "var(--v-mono)", display: "flex", alignItems: "center", gap: 8,
          }}>
            ← BLOG
          </Link>

          {/* Brand pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            border: `1px solid ${accent}33`,
            background: `${accent}0d`,
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}` }} />
            <span style={{ color: accent, fontSize: 11, fontFamily: "var(--v-mono)", letterSpacing: "0.12em" }}>
              CÁPSULAS · HELLO HUMAN
            </span>
          </div>
        </div>

        {/* Bottom: tags + title + description */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 clamp(20px,5vw,64px) clamp(32px,4vw,52px)",
          maxWidth: 900,
        }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                padding: "3px 10px", borderRadius: 999,
                border: `1px solid ${accent}44`,
                color: accent, fontSize: 11,
                fontFamily: "var(--v-mono)", letterSpacing: "0.08em",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(26px, 4.5vw, 56px)",
            fontWeight: 800, letterSpacing: "-0.035em",
            lineHeight: 1.08, margin: "0 0 14px",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}>
            {post.title}
          </h1>

          {/* Description */}
          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px, 1.6vw, 17px)",
            lineHeight: 1.55, margin: 0, maxWidth: 640,
            textShadow: "0 1px 10px rgba(0,0,0,0.5)",
          }}>
            {post.description}
          </p>
        </div>
      </div>

      {/* ── META BAR ─────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 760, margin: "0 auto",
        padding: "24px clamp(20px,5vw,40px)",
        display: "flex", gap: 24, alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, fontFamily: "var(--v-mono)", letterSpacing: "0.08em" }}>
          {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
        </span>
        <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, fontFamily: "var(--v-mono)" }}>
          {post.readingTime}
        </span>

        {/* Accent accent line */}
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}22, transparent)` }} />
      </div>

      {/* ── ARTICLE CONTENT ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "52px clamp(20px,5vw,40px) 100px" }}>
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* ── FOOTER CTA ───────────────────────────────────────────── */}
        <div style={{
          marginTop: 80,
          padding: "clamp(28px,4vw,48px)",
          borderRadius: 20,
          background: `${accent}08`,
          border: `1px solid ${accent}20`,
          position: "relative", overflow: "hidden",
        }}>
          {/* Glow */}
          <div style={{
            position: "absolute", top: -80, right: -80, width: 240, height: 240,
            borderRadius: "50%", background: `${accent}12`, filter: "blur(60px)", pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "3px 10px", borderRadius: 999,
              border: `1px solid ${accent}33`, marginBottom: 16,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
              <span style={{ color: accent, fontSize: 10, fontFamily: "var(--v-mono)", letterSpacing: "0.12em" }}>
                HELLO HUMAN
              </span>
            </div>

            <p style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>
              ¿Querés implementar esto en tu negocio?
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 28, fontSize: 15, lineHeight: 1.55 }}>
              Construimos agentes, apps y dashboards en semanas.
            </p>
            <a
              href="/#contacto"
              style={{
                display: "inline-block", padding: "13px 28px",
                borderRadius: 999, background: accent,
                color: "#080a0e", fontWeight: 700, fontSize: 14,
                textDecoration: "none", letterSpacing: "-0.01em",
              }}
            >
              Conversemos →
            </a>
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/blog" style={{
            color: "rgba(255,255,255,0.25)", fontSize: 12,
            letterSpacing: "0.12em", textDecoration: "none", fontFamily: "var(--v-mono)",
          }}>
            ← VOLVER AL BLOG
          </Link>
        </div>
      </div>
    </main>
  );
}
