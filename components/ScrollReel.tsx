"use client";

import type { CSSProperties } from "react";
import type { MotionValue } from "motion";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLaStradaContent, type ReelChapter } from "@/lib/la-strada-i18n";

type ChapterFrameProps = {
  chapter: ReelChapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isCompact: boolean;
};

function accentStyle(accent: ReelChapter["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function useCompactReel() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

function ChapterFrame({ chapter, index, total, progress, isCompact }: ChapterFrameProps) {
  const shouldReduceMotion = useReducedMotion();
  const step = total > 1 ? 1 / (total - 1) : 1;
  const peak = Math.min(1, index * step);
  const start = index === 0 ? 0 : Math.max(0, peak - step * 0.68);
  const end = index === total - 1 ? 1 : Math.min(1, peak + step * 0.68);
  const holdPoint =
    index === 0 ? step * 0.24 : index === total - 1 ? 1 - step * 0.24 : peak;
  const input = [start, holdPoint, end];
  const opacityOutput = index === 0 ? [1, 1, 0] : index === total - 1 ? [0, 1, 1] : [0, 1, 0];
  const yOutput = index === 0 ? [0, 0, -28] : index === total - 1 ? [28, 0, 0] : [32, 0, -32];
  const scaleOutput = index === 0 ? [1, 1, 0.985] : index === total - 1 ? [0.985, 1, 1] : [0.985, 1, 0.985];
  const filterOutput =
    index === 0
      ? ["blur(0px)", "blur(0px)", "blur(0px)"]
      : index === total - 1
        ? ["blur(0px)", "blur(0px)", "blur(0px)"]
        : ["blur(0px)", "blur(0px)", "blur(0px)"];

  const opacity = useTransform(progress, input, opacityOutput);
  const y = useTransform(progress, input, yOutput);
  const scale = useTransform(progress, input, scaleOutput);
  const filter = useTransform(progress, input, filterOutput);

  return (
    <motion.article
      className="relative mb-12 flex flex-col justify-center border-b border-white/10 pb-10 last:mb-0 last:border-b-0 last:pb-0 md:absolute md:inset-0 md:mb-0 md:border-b-0 md:pb-0"
      style={{
        ...accentStyle(chapter.accent),
        opacity: isCompact ? 1 : opacity,
        y: shouldReduceMotion || isCompact ? 0 : y,
        scale: shouldReduceMotion || isCompact ? 1 : scale,
        filter: shouldReduceMotion || isCompact ? "none" : filter,
      }}
    >
      <p className="text-sm font-semibold text-[var(--accent)]">{chapter.frame}</p>
      <h2 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
        {chapter.title}
      </h2>
      <p className="mt-6 max-w-xl text-base font-semibold text-[var(--accent)] sm:text-lg">
        {chapter.service}
      </p>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
        {chapter.body}
      </p>
    </motion.article>
  );
}

export function ScrollReel() {
  const { content } = useLaStradaContent();
  const { reelChapters } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useCompactReel();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0.55, 1, 1, 0.68]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="reel"
      ref={sectionRef}
      className="relative bg-black text-white md:min-h-[330vh]"
      aria-label="LA STRADA cinematic scroll reel"
    >
      <div className="relative flex min-h-0 items-start overflow-visible px-5 py-24 sm:px-8 md:sticky md:top-0 md:min-h-screen md:items-center md:overflow-hidden md:py-14 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(47,65,151,0.22),transparent_32rem),radial-gradient(circle_at_86%_78%,rgba(249,167,43,0.14),transparent_30rem),linear-gradient(180deg,#050505,#0b0b0a_50%,#050505)]" />
        <div className="film-grain absolute inset-0 opacity-20" aria-hidden="true" />

        <motion.div
          className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]"
          style={{
            opacity: frameOpacity,
            scale: shouldReduceMotion ? 1 : frameScale,
          }}
        >
          <div className="relative min-h-0 overflow-visible border-y border-white/14 py-8 md:min-h-[30rem] md:overflow-hidden lg:min-h-[34rem]">
            <div className="absolute left-0 top-0 h-px bg-white/40" style={{ width: "7rem" }} />
            <div className="absolute bottom-0 right-0 h-px bg-white/40" style={{ width: "7rem" }} />
            {reelChapters.map((chapter, index) => (
              <ChapterFrame
                key={chapter.frame}
                chapter={chapter}
                index={index}
                total={reelChapters.length}
                progress={scrollYProgress}
                isCompact={isCompact}
              />
            ))}
          </div>

          <aside className="hidden flex-col justify-between gap-8 border-l border-white/12 pl-6 md:flex">
            <div>
              <p className="text-sm font-semibold text-white/52">Scroll timeline</p>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-white"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {reelChapters.map((chapter) => (
                <div
                  key={chapter.frame}
                  className="group border-t border-white/10 pt-4"
                  style={accentStyle(chapter.accent)}
                >
                  <p className="text-xs font-bold text-[var(--accent)]">{chapter.frame}</p>
                  <p className="mt-1 text-sm font-semibold text-white/68">{chapter.service}</p>
                </div>
              ))}
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
