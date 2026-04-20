import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Hello Human",
  description: "Artículos sobre agentes IA, desarrollo de software y automatización de negocios.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#fff", position: "relative", overflow: "hidden" }}>

      {/* Background glows */}
      <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", background: "rgba(182,255,60,0.06)", filter: "blur(100px)", top: -200, left: -100, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(80px)", bottom: 0, right: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap blog-wrap">

          {/* Header */}
          <div style={{ marginBottom: 72 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: "0.14em", textDecoration: "none", fontFamily: "var(--v-mono)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              ← HELLO HUMAN
            </Link>

            <div style={{ marginTop: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--v-mono)", fontSize: 12, letterSpacing: "0.14em", color: "#b6ff3c", marginBottom: 12 }}>
                  [ BLOG ]
                </div>
                <h1 style={{ fontSize: "clamp(52px, 7vw, 88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, margin: 0 }}>
                  Ideas que<br /><em style={{ color: "#b6ff3c", fontStyle: "normal" }}>funcionan.</em>
                </h1>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
                Casos reales, guías prácticas y reflexiones sobre IA, automatización y desarrollo de software a velocidad imposible.
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--v-mono)", fontSize: 14 }}>Próximamente...</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 32 }}>
                  <article className="blog-card blog-card-featured">
                    {/* Cover image */}
                    <div className="blog-card-cover">
                      <img
                        src={`/api/cover/${featured.slug}`}
                        alt={featured.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                    <div className="blog-card-body">
                      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(182,255,60,0.1)", color: "#b6ff3c", fontSize: 11, fontFamily: "var(--v-mono)", letterSpacing: "0.08em" }}>
                          DESTACADO
                        </span>
                        {featured.tags.map((tag) => (
                          <span key={tag} style={{ padding: "2px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "var(--v-mono)", letterSpacing: "0.06em" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12, color: "#fff" }}>
                        {featured.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                        {featured.description}
                      </p>
                      <div style={{ display: "flex", gap: 16, color: "rgba(255,255,255,0.25)", fontSize: 12, fontFamily: "var(--v-mono)", alignItems: "center" }}>
                        <span>{new Date(featured.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
                        <span>·</span>
                        <span>{featured.readingTime}</span>
                        <span style={{ marginLeft: "auto", color: "#b6ff3c", fontSize: 13 }}>Leer →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="blog-grid">
                  {rest.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                      <article className="blog-card">
                        <div className="blog-card-cover blog-card-cover-sm">
                          <img
                            src={`/api/cover/${post.slug}`}
                            alt={post.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        </div>
                        <div className="blog-card-body">
                          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                            {post.tags.map((tag) => (
                              <span key={tag} style={{ padding: "2px 8px", borderRadius: 999, border: "1px solid rgba(182,255,60,0.2)", color: "#b6ff3c", fontSize: 10, fontFamily: "var(--v-mono)", letterSpacing: "0.06em" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10, color: "#fff" }}>
                            {post.title}
                          </h2>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                            {post.description}
                          </p>
                          <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "var(--v-mono)" }}>
                            <span>{new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</span>
                            <span>·</span>
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
