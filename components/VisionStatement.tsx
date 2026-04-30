"use client";

import { Compass } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";

export function VisionStatement() {
  const { content } = useLaStradaContent();
  const { agencyStory } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="vision"
      className="relative isolate overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
      aria-label="LA STRADA vision"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(249,167,43,0.16),transparent_32rem),radial-gradient(circle_at_78%_82%,rgba(113,88,166,0.18),transparent_34rem)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl gap-10 border-y border-white/12 py-12 lg:grid-cols-[0.34fr_1fr] lg:items-end lg:py-16"
        initial={shouldReduceMotion ? false : { opacity: 1, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-14% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[var(--brand-yellow)]">
            <Compass aria-hidden="true" size={24} />
          </div>
          <p className="mt-7 font-mono text-sm font-black uppercase tracking-[0.2em] text-white/38">
            {agencyStory.visionTitle}
          </p>
        </div>

        <p className="max-w-5xl text-balance text-4xl font-black leading-tight text-white sm:text-6xl">
          {agencyStory.vision}
        </p>
      </motion.div>
    </section>
  );
}
