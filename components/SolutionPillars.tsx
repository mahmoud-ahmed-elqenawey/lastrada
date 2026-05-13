"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Camera, Fingerprint, Share2, Target, Video } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type Direction, type SolutionPillar } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  lineReveal,
  mediaReveal,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

const iconMap: Record<SolutionPillar["icon"], LucideIcon> = {
  fingerprint: Fingerprint,
  share: Share2,
  video: Video,
  camera: Camera,
  target: Target,
};

function accentStyle(accent: SolutionPillar["accent"], direction: Direction): CSSProperties {
  return {
    "--accent": `var(--brand-${accent})`,
    "--pillar-hover-x": direction === "rtl" ? "100%" : "0%",
  } as CSSProperties;
}

export function SolutionPillars() {
  const { content, direction } = useLaStradaContent();
  const { solutionPillars, solutionPillarsIntro } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA creative solution pillars"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(47,65,151,0.2),transparent_28rem),radial-gradient(circle_at_90%_42%,rgba(57,181,74,0.12),transparent_30rem),linear-gradient(180deg,#050505,#090908_48%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.68fr_1.32fr]">
          <motion.div
            className="lg:sticky lg:top-24 lg:h-fit"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.05, 0.08))}
          >
            <motion.div className="h-px w-24 bg-white/38" variants={lineReveal(direction)} />
            <motion.h2
              className="mt-8 max-w-xl text-balance text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl"
              variants={headingReveal(direction, 0.04)}
            >
              {solutionPillarsIntro.title}
            </motion.h2>
            <motion.p className="mt-7 max-w-lg text-lg leading-8 text-white/62" variants={itemReveal(0.1, 18)}>
              {solutionPillarsIntro.body}
            </motion.p>
          </motion.div>

          <div className="space-y-3">
            {solutionPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon];

              return (
                <motion.article
                  key={pillar.title}
                  className="kinetic-card soft-row group relative overflow-hidden px-5 py-8 sm:px-7 lg:px-8 lg:py-10"
                  style={accentStyle(pillar.accent, direction)}
                  {...revealMotion(shouldReduceMotion, cardReveal(index * 0.06, 34), itemViewport)}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--pillar-hover-x)_50%,var(--accent),transparent_34rem)] opacity-0 transition duration-500 group-hover:opacity-[0.08]" />
                  <div className="absolute inset-y-0 start-0 w-px bg-[linear-gradient(180deg,var(--accent),var(--accent),transparent)] opacity-0 transition duration-500 group-hover:opacity-80" />
                  <div className="grid gap-6 md:grid-cols-[6rem_1fr] xl:grid-cols-[6rem_minmax(0,1fr)_18rem] xl:items-center">
                    <div>
                      <span className="font-mono text-sm text-white/36">{String(index + 1).padStart(2, "0")}</span>
                      <motion.div
                        className="soft-icon mt-5 flex h-14 w-14 items-center justify-center rounded-full text-[var(--accent)]"
                        variants={iconReveal(0.08)}
                      >
                        <Icon aria-hidden="true" size={23} />
                      </motion.div>
                    </div>

                    <div>
                      <motion.h3
                        className="text-3xl font-black leading-none tracking-normal text-white sm:text-5xl"
                        variants={itemReveal(0.08, 18)}
                      >
                        {pillar.title}
                      </motion.h3>
                      <motion.p
                        className="mt-5 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8"
                        variants={itemReveal(0.12, 18)}
                      >
                        {pillar.description}
                      </motion.p>
                      <motion.div className="mt-7 flex flex-wrap gap-2" variants={staggerContainer(0.16, 0.035)}>
                        {pillar.features.map((feature) => (
                          <motion.span
                            key={feature}
                            className="rounded-full bg-white/[0.035] px-3 py-2 text-xs font-bold text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] transition group-hover:text-white/78"
                            variants={chipReveal()}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {pillar.image ? (
                      <motion.div
                        className="soft-frame relative min-h-48 overflow-hidden rounded-[8px] md:col-span-2 xl:col-span-1"
                        variants={mediaReveal(0.16)}
                      >
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          sizes="(min-width: 1280px) 18rem, (min-width: 768px) 70vw, 92vw"
                          className="object-cover opacity-80 saturate-[1.04] transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.48)),radial-gradient(circle_at_18%_18%,var(--accent),transparent_46%)] opacity-30" />
                        <div className="absolute inset-x-4 bottom-4 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-70" />
                      </motion.div>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
