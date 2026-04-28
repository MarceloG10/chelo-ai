"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function StepItem({
  step,
  index,
  isLast,
}: {
  step: { number: string; title: string; description: string; detail: string };
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-8 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`,
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-violet-500/40 flex items-center justify-center bg-violet-500/5 group-hover:border-violet-500/80 group-hover:bg-violet-500/10 transition-all duration-300">
          <span className="text-violet-400 font-bold text-sm">{step.number}</span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-4 bg-gradient-to-b from-violet-500/20 to-transparent min-h-[60px]" />
        )}
      </div>
      <div className="pb-12">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-100 transition-colors duration-200">
          {step.title}
        </h3>
        <p className="text-white/45 leading-relaxed mb-3">{step.description}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-violet-500/70 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 inline-block" />
          {step.detail}
        </span>
      </div>
    </div>
  );
}

function TerminalCard({ termLines, inProgress }: {
  termLines: { type: string; text: string }[];
  inProgress: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typed, setTyped] = useState<string[]>(termLines.map(() => ""));
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= termLines.length) return;
    const line = termLines[visibleCount];
    if (line.type === "bar") { setVisibleCount((c) => c + 1); return; }
    const fullText = line.text;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped((prev) => {
        const next = [...prev];
        next[visibleCount] = fullText.slice(0, i);
        return next;
      });
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setVisibleCount((c) => c + 1), 180);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [started, visibleCount, termLines]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 80) { clearInterval(interval); return 80; }
          return p + 1;
        });
      }, 22);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, [started]);

  const filled = Math.round((progress / 100) * 10);
  const bar = "█".repeat(filled) + "░".repeat(10 - filled);

  return (
    <div
      ref={ref}
      className="mt-10 rounded-xl border border-violet-500/40 bg-black overflow-hidden"
      style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-violet-500/20 bg-violet-950/30">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-violet-400/60 tracking-widest">agent.init</span>
      </div>
      <div className="p-5 space-y-2 text-sm min-h-[180px]">
        {termLines.map((line, i) => {
          if (i >= visibleCount && !(i === visibleCount && line.type !== "bar")) return null;
          if (line.type === "bar") {
            return (
              <div key={i} className="pt-1 space-y-1">
                <span className="text-violet-400">{bar}</span>
                <span className="text-white/40 ml-2 text-xs">
                  {progress < 80 ? `${progress}%` : inProgress}
                </span>
              </div>
            );
          }
          const isTyping = i === visibleCount;
          const text = isTyping ? typed[i] : line.text;
          return (
            <div key={i} className="flex items-start gap-2">
              {line.type === "cmd" ? (
                <span className="text-violet-400 select-none">{">"}</span>
              ) : (
                <span className="text-green-400 select-none">✓</span>
              )}
              <span className={line.type === "cmd" ? "text-violet-300" : "text-green-300"}>
                {text}
                {isTyping && (
                  <span className="inline-block w-[2px] h-[1em] bg-violet-400 ml-0.5 align-middle animate-pulse" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HowItWorksHeader({
  badge, titlePrefix, titleAccent, titleSuffix, sub, termLines, inProgress,
}: {
  badge: string; titlePrefix: string; titleAccent: string; titleSuffix: string;
  sub: string; termLines: { type: string; text: string }[]; inProgress: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const item = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <div ref={ref} className="lg:sticky lg:top-28">
      <span className="badge mb-6 inline-block" style={item(0)}>{badge}</span>
      <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight" style={item(0.1)}>
        {titlePrefix}
        <br />
        <span className="text-violet-400">{titleAccent}</span>
        <br />
        {titleSuffix}
      </h2>
      <p className="text-white/40 mt-6 text-lg leading-relaxed" style={item(0.2)}>{sub}</p>
      <div style={item(0.3)}>
        <TerminalCard termLines={termLines} inProgress={inProgress} />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { number: "01", title: t("s1Title"), description: t("s1Desc"), detail: t("s1Detail") },
    { number: "02", title: t("s2Title"), description: t("s2Desc"), detail: t("s2Detail") },
    { number: "03", title: t("s3Title"), description: t("s3Desc"), detail: t("s3Detail") },
  ];

  const termLines = [
    { type: "cmd", text: t("termInit") },
    { type: "ok",  text: t("termAnalyze") },
    { type: "ok",  text: t("termConnect") },
    { type: "ok",  text: t("termTrain") },
    { type: "cmd", text: t("termConfig") },
    { type: "bar", text: "" },
  ];

  return (
    <section id="como-funciona" className="relative py-28 px-6">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <HowItWorksHeader
            badge={t("badge")}
            titlePrefix={t("titlePrefix")}
            titleAccent={t("titleAccent")}
            titleSuffix={t("titleSuffix")}
            sub={t("sub")}
            termLines={termLines}
            inProgress={t("termInProgress")}
          />
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
