"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";

const ringRadius = 24;
const ringCircumference = 2 * Math.PI * ringRadius;

export function ScrollProgressChrome() {
  const { direction, language } = useLaStradaContent();
  const shouldReduceMotion = useReducedMotion() === true;
  const { scrollY, scrollYProgress } = useScroll();
  const [pastHero, setPastHero] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 150,
    damping: shouldReduceMotion ? 100 : 36,
    mass: 0.22,
  });

  const ringOffset = useTransform(smoothProgress, [0, 1], [ringCircumference, 0]);
  const playheadInline = useTransform(
    smoothProgress,
    [0, 1],
    direction === "rtl" ? ["100%", "0%"] : ["0%", "100%"],
  );

  useEffect(() => {
    const updatePastHero = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.72);
    };

    updatePastHero();
    window.addEventListener("resize", updatePastHero);

    return () => window.removeEventListener("resize", updatePastHero);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setPastHero(latest > window.innerHeight * 0.72);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <motion.div
        aria-hidden="true"
        data-scroll-progress="track"
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[5px] bg-black/35 backdrop-blur-md"
        initial={false}
        animate={{ opacity: pastHero ? 1 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
      >
        <motion.div
          data-scroll-progress="bar"
          className={`h-full bg-[linear-gradient(90deg,var(--brand-blue),var(--brand-cyan),var(--brand-green),var(--brand-yellow),var(--brand-red),var(--brand-purple))] shadow-[0_0_24px_rgba(48,169,220,0.45)] ${
            direction === "rtl" ? "origin-right" : "origin-left"
          }`}
          style={{ scaleX: smoothProgress }}
        />
        <motion.div
          className="absolute top-0 h-full w-28 -translate-x-1/2 bg-white/55 blur-md"
          style={{ left: playheadInline }}
        />
      </motion.div>

      <motion.button
        type="button"
        aria-label={language === "ar" ? "الرجوع للأعلى" : "Back to top"}
        data-scroll-progress="top-button"
        className="group fixed bottom-5 end-5 z-[80] grid h-14 w-14 place-items-center rounded-full border border-white/14 bg-black/55 text-white shadow-2xl shadow-black/35 backdrop-blur-xl transition hover:border-white/34 hover:bg-white/10 sm:bottom-7 sm:end-7 sm:h-16 sm:w-16"
        initial={false}
        animate={{
          opacity: pastHero ? 1 : 0,
          y: pastHero ? 0 : 16,
          scale: pastHero ? 1 : 0.9,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: pastHero ? "auto" : "none" }}
        onClick={scrollToTop}
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" />
          <motion.circle
            cx="32"
            cy="32"
            r={ringRadius}
            fill="none"
            stroke="url(#scroll-progress-gradient)"
            strokeLinecap="round"
            strokeWidth="3"
            strokeDasharray={ringCircumference}
            style={{ strokeDashoffset: ringOffset }}
          />
          <defs>
            <linearGradient id="scroll-progress-gradient" x1="8" x2="56" y1="8" y2="56">
              <stop offset="0%" stopColor="var(--brand-cyan)" />
              <stop offset="32%" stopColor="var(--brand-green)" />
              <stop offset="58%" stopColor="var(--brand-yellow)" />
              <stop offset="78%" stopColor="var(--brand-red)" />
              <stop offset="100%" stopColor="var(--brand-purple)" />
            </linearGradient>
          </defs>
        </svg>
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-black transition group-hover:scale-95 sm:h-10 sm:w-10">
          <ArrowUp aria-hidden="true" size={18} strokeWidth={2.5} />
        </span>
      </motion.button>
    </>
  );
}
