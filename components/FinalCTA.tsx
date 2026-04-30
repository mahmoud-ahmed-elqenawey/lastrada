"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";

export function FinalCTA() {
  const { content } = useLaStradaContent();
  const { brand, finalCta, services } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="Start a LA STRADA project"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(48,169,220,0.18),transparent_30rem),radial-gradient(circle_at_76%_80%,rgba(239,70,57,0.18),transparent_32rem)]" />
      <div className="film-grain absolute inset-0 opacity-20" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl border-y border-white/14 py-14 sm:py-20"
        initial={shouldReduceMotion ? false : { opacity: 1, y: 34 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-18% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Image
              src={brand.logo}
              alt={brand.name}
              width={260}
              height={266}
              className="h-20 w-auto opacity-90"
            />
            <div className="mt-10 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service.title}
                  className="rounded-full border border-white/12 px-3 py-2 text-xs font-bold text-white/58"
                >
                  {service.shortTitle}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">
              {finalCta.title}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl sm:leading-9">
              {finalCta.body}
            </p>
            <a className="cinema-button cinema-button-primary mt-10" href={finalCta.ctaHref}>
              {finalCta.ctaLabel}
              <ArrowUpRight aria-hidden="true" size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
