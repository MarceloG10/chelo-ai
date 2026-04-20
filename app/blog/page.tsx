import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Hello Human",
  description: "Artículos sobre agentes IA, desarrollo de software y automatización de negocios.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#fff" }}>
      <div className="wrap" style={{ paddingTop: 120, paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: "0.1em", textDecoration: "none", fontFamily: "var(--v-mono)" }}>
            ← HELLO HUMAN
          </Link>
          <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.035em", marginTop: 24, marginBottom: 12 }}>
            Blog
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, maxWidth: 480 }}>
            Ideas, casos de uso y guías sobre IA, automatización y desarrollo de software.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--v-mono)", fontSize: 14 }}>
            Próximamente...
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    padding: "32px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 40,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "3px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(182,255,60,0.25)",
                            color: "#b6ff3c",
                            fontSize: 11,
                            fontFamily: "var(--v-mono)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10, color: "#fff" }}>
                      {post.title}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.6, maxWidth: 600 }}>
                      {post.description}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, fontFamily: "var(--v-mono)", marginBottom: 6 }}>
                      {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "var(--v-mono)" }}>
                      {post.readingTime}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
