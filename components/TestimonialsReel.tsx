"use client";

import type { CSSProperties } from "react";
import { Quote, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type Testimonial } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

function accentStyle(accent: Testimonial["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function TestimonialsReel() {
  const { content, direction } = useLaStradaContent();
  const { testimonials } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA client success stories"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_70%,rgba(249,167,43,0.13),transparent_31rem),radial-gradient(circle_at_82%_22%,rgba(48,169,220,0.16),transparent_32rem),linear-gradient(180deg,#050505,#0b0b0a_54%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <motion.div
            className="lg:sticky lg:top-24 lg:h-fit"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
          >
            <motion.div
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[var(--brand-yellow)]"
              variants={iconReveal()}
            >
              <Quote aria-hidden="true" size={24} />
            </motion.div>
            <motion.h2
              className="max-w-xl text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-6xl"
              variants={headingReveal(direction)}
            >
              {testimonials.title}{" "}
              <span className="text-[var(--brand-cyan)]">{testimonials.titleHighlight}</span>
            </motion.h2>
            <motion.p className="mt-6 max-w-md text-lg leading-8 text-white/62" variants={itemReveal(0.08, 18)}>
              {testimonials.subtitle}
            </motion.p>
          </motion.div>

          <div className="border-y border-white/12">
            {testimonials.items.map((item, index) => (
              <motion.article
                key={item.author}
                className="kinetic-card border-t border-white/12 py-10 first:border-t-0"
                style={accentStyle(item.accent)}
                {...revealMotion(shouldReduceMotion, cardReveal(index * 0.045, 26), itemViewport)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              >
                <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-end">
                  <div>
                    <motion.div
                      className="mb-7 flex gap-1 text-[var(--brand-yellow)]"
                      aria-label="Five star rating"
                      variants={staggerContainer(0.04, 0.025)}
                    >
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <motion.span key={starIndex} variants={chipReveal()}>
                          <Star aria-hidden="true" size={18} fill="currentColor" />
                        </motion.span>
                      ))}
                    </motion.div>

                    <blockquote className="max-w-5xl text-balance text-2xl font-black leading-tight text-white sm:text-4xl">
                      &quot;{item.content}&quot;
                    </blockquote>
                  </div>

                  <div className="rounded-[8px] border border-white/12 bg-white/[0.03] p-5">
                    <p className="font-mono text-xs text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-5 text-2xl font-black text-white">{item.author}</p>
                    <p className="mt-3 text-sm font-bold uppercase leading-6 tracking-[0.14em] text-[var(--accent)]">
                      {item.role}
                    </p>
                    <p className="mt-3 text-base leading-7 text-white/52">{item.company}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="border-t border-white/12 py-7">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white/38">
                {testimonials.trustedByTitle}
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                {...revealMotion(shouldReduceMotion, staggerContainer(0.02, 0.035))}
              >
                {testimonials.items.map((item) => (
                  <motion.span
                    key={item.company}
                    className="rounded-full border border-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/56"
                    variants={chipReveal()}
                  >
                    {item.company}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
