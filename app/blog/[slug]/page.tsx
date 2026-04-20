import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
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

  return (
    <main style={{ background: "#080a0e", minHeight: "100vh", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 24px 80px" }}>

        {/* Back */}
        <Link
          href="/blog"
          style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: "0.1em", textDecoration: "none", fontFamily: "var(--v-mono)" }}
        >
          ← BLOG
        </Link>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
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

        {/* Title */}
        <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 20, marginBottom: 16 }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display: "flex", gap: 20, color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "var(--v-mono)", marginBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 24 }}>
          <span>{new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {/* Content */}
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: 80, padding: 40, borderRadius: 20, background: "rgba(182,255,60,0.05)", border: "1px solid rgba(182,255,60,0.15)", textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>¿Querés implementar esto en tu negocio?</p>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 24, fontSize: 15 }}>Construimos agentes, apps y dashboards en semanas.</p>
          <a
            href="/#contacto"
            style={{ display: "inline-block", padding: "14px 32px", borderRadius: 999, background: "#b6ff3c", color: "#080a0e", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
          >
            Conversemos →
          </a>
        </div>

      </div>
    </main>
  );
}
