"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Camera, Fingerprint, Share2, Target, Video } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type Direction, type SolutionPillar } from "@/lib/la-strada-i18n";

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
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="h-px w-24 bg-white/38" />
            <h2 className="mt-8 max-w-xl text-balance text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              {solutionPillarsIntro.title}
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/62">
              {solutionPillarsIntro.body}
            </p>
          </div>

          <div className="border-y border-white/12">
            {solutionPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon];

              return (
                <motion.article
                  key={pillar.title}
                  className="group relative overflow-hidden border-t border-white/12 px-5 py-8 first:border-t-0 sm:px-7 lg:px-8 lg:py-10"
                  style={accentStyle(pillar.accent, direction)}
                  initial={shouldReduceMotion ? false : { opacity: 1, y: 30 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-14% 0px" }}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--pillar-hover-x)_50%,var(--accent),transparent_34rem)] opacity-0 transition duration-500 group-hover:opacity-[0.08]" />
                  <div className="absolute inset-y-0 start-0 w-px bg-[linear-gradient(180deg,var(--accent),var(--accent),transparent)] opacity-0 transition duration-500 group-hover:opacity-80" />
                  <div className="grid gap-6 md:grid-cols-[6rem_1fr]">
                    <div>
                      <span className="font-mono text-sm text-white/36">{String(index + 1).padStart(2, "0")}</span>
                      <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[var(--accent)]">
                        <Icon aria-hidden="true" size={23} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-3xl font-black leading-none tracking-normal text-white sm:text-5xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-5 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                        {pillar.description}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {pillar.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-white/12 px-3 py-2 text-xs font-bold text-white/58 transition group-hover:border-[color:var(--accent)] group-hover:text-white/78"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
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
