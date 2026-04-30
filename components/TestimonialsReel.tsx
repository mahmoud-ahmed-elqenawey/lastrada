"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type Testimonial } from "@/lib/la-strada-i18n";

function accentStyle(accent: Testimonial["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function TestimonialsReel() {
  const { content, direction } = useLaStradaContent();
  const { testimonials } = content;
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = testimonials.items[activeIndex];

  const move = (step: number) => {
    setActiveIndex((current) => (current + step + testimonials.items.length) % testimonials.items.length);
  };

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
            initial={shouldReduceMotion ? false : { opacity: 1, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14% 0px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[var(--brand-yellow)]">
              <Quote aria-hidden="true" size={24} />
            </div>
            <h2 className="max-w-xl text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-6xl">
              {testimonials.title}{" "}
              <span className="text-[var(--brand-cyan)]">{testimonials.titleHighlight}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/62">
              {testimonials.subtitle}
            </p>
          </motion.div>

          <div className="border-y border-white/12">
            <motion.article
              key={activeItem.content}
              className="py-10"
              style={accentStyle(activeItem.accent)}
              initial={shouldReduceMotion ? false : { opacity: 1, y: 22 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex gap-1 text-[var(--brand-yellow)]" aria-label="Five star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} aria-hidden="true" size={20} fill="currentColor" />
                ))}
              </div>

              <blockquote className="max-w-5xl text-balance text-3xl font-black leading-tight text-white sm:text-5xl">
                &quot;{activeItem.content}&quot;
              </blockquote>

              <div className="mt-10 grid gap-6 border-t border-white/12 pt-7 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-2xl font-black text-white">{activeItem.author}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {activeItem.role}
                  </p>
                  <p className="mt-2 text-base leading-7 text-white/52">{activeItem.company}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-white/34 hover:text-white"
                    onClick={() => move(direction === "rtl" ? 1 : -1)}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft aria-hidden="true" size={21} className={direction === "rtl" ? "rotate-180" : ""} />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.items.map((item, index) => (
                      <button
                        key={item.author}
                        type="button"
                        className={`h-2.5 rounded-full transition ${
                          index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/24"
                        }`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/70 transition hover:border-white/34 hover:text-white"
                    onClick={() => move(direction === "rtl" ? -1 : 1)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight aria-hidden="true" size={21} className={direction === "rtl" ? "rotate-180" : ""} />
                  </button>
                </div>
              </div>
            </motion.article>

            <div className="border-t border-white/12 py-7">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white/38">
                {testimonials.trustedByTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {testimonials.items.map((item) => (
                  <button
                    key={item.author}
                    type="button"
                    className="rounded-full border border-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/56 transition hover:border-white/32 hover:text-white"
                    onClick={() => setActiveIndex(testimonials.items.indexOf(item))}
                  >
                    {item.company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
