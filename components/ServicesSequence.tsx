"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  Camera,
  Code2,
  Film,
  Megaphone,
  PenTool,
  Scissors,
  Share2,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type Service } from "@/lib/la-strada-i18n";

const iconMap: Record<Service["icon"], LucideIcon> = {
  camera: Camera,
  film: Film,
  sparkles: Sparkles,
  scissors: Scissors,
  pen: PenTool,
  share: Share2,
  code: Code2,
  megaphone: Megaphone,
};

function serviceStyle(accent: Service["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function ServicesSequence() {
  const { content } = useLaStradaContent();
  const { services, servicesIntro } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA service sequence"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(57,181,74,0.12),transparent_30rem),radial-gradient(circle_at_92%_78%,rgba(113,88,166,0.15),transparent_34rem)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03]">
              <Aperture aria-hidden="true" className="text-white/78" size={24} />
            </div>
            <h2 className="max-w-lg text-balance text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl">
              {servicesIntro.title ? `${servicesIntro.title} ${servicesIntro.titleHighlight}` : servicesIntro.titleHighlight}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/62">
              {servicesIntro.subtitle}
            </p>
          </div>

          <div className="border-y border-white/12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];

              return (
                <motion.article
                  key={service.title}
                  className="group grid gap-5 border-t border-white/12 py-7 first:border-t-0 sm:grid-cols-[5rem_1fr_3rem] sm:items-start lg:py-9"
                  style={serviceStyle(service.accent)}
                  initial={shouldReduceMotion ? false : { opacity: 1, y: 28 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono text-sm text-white/38">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <h3 className="text-3xl font-black leading-none tracking-normal text-white sm:text-4xl">
                        {service.title}
                      </h3>
                      <span className="text-sm font-bold text-[var(--accent)]">{service.shortTitle}</span>
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-[var(--accent)] transition group-hover:border-[color:var(--accent)] group-hover:bg-white/[0.04]">
                    <Icon aria-hidden="true" size={21} />
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
