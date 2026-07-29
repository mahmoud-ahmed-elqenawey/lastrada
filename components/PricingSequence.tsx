"use client";

import type { CSSProperties } from "react";
import { Check, Crown, Rocket, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type PricingPlan } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  revealMotion,
  sectionReveal,
  staggerContainer,
} from "@/lib/motion-presets";

function accentStyle(accent: PricingPlan["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function PricingSequence() {
  const { content, direction } = useLaStradaContent();
  const { pricing, sourceSite } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA pricing plans"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(48,169,220,0.14),transparent_31rem),radial-gradient(circle_at_84%_74%,rgba(249,167,43,0.12),transparent_33rem),linear-gradient(180deg,#050505,#0b0b0a_54%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
          {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
        >
          <div>
            <motion.div
              className="soft-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full text-[var(--brand-yellow)]"
              variants={iconReveal()}
            >
              <Crown aria-hidden="true" size={24} />
            </motion.div>
            <motion.h2
              className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={headingReveal(direction)}
            >
              {pricing.title} <span className="text-[var(--brand-green)]">{pricing.titleHighlight}</span>
            </motion.h2>
          </div>

          <div>
            <motion.p
              className="max-w-2xl text-lg leading-8 text-white/64 sm:text-xl sm:leading-9"
              variants={itemReveal(0.08, 20)}
            >
              {pricing.subtitle}
            </motion.p>
            <motion.div
              className="mt-7 inline-flex rounded-full border border-white/12 bg-white/[0.03] px-5 py-2 text-sm font-black text-white/70"
              variants={itemReveal(0.12, 16)}
            >
              {pricing.monthly}
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              className={`kinetic-card soft-panel relative flex min-h-full flex-col overflow-hidden rounded-[8px] p-6 ${
                plan.featured ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_90px_rgba(0,0,0,0.25)]" : ""
              }`}
              style={accentStyle(plan.accent)}
              {...revealMotion(shouldReduceMotion, cardReveal(index * 0.06, 34), itemViewport)}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            >
              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-3xl font-black leading-none text-white">{plan.name}</h3>
                  <p className="mt-4 text-base leading-7 text-white/58">{plan.description}</p>
                </div>
                <span className="soft-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--accent)]">
                  {plan.featured ? <Sparkles aria-hidden="true" size={20} /> : <Rocket aria-hidden="true" size={20} />}
                </span>
              </div>

              {plan.price ? (
                <div className="soft-row px-5 py-6">
                  <p className="text-5xl font-black leading-none text-[var(--accent)]">{plan.price}</p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/38">{pricing.perMonth}</p>
                </div>
              ) : (
                <div className="soft-row px-5 py-6">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                    {pricing.monthly}
                  </p>
                  <p className="mt-3 text-3xl font-black leading-none text-white sm:text-4xl">{pricing.perMonth}</p>
                </div>
              )}

              <ul className="mt-7 grow space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-white/64">
                    <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                className="cinema-button cinema-button-muted mt-8 w-full"
                href={sourceSite.phone.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                {pricing.getStarted}
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="soft-panel mt-10 rounded-[8px] px-5 py-8 sm:px-7 lg:px-8"
          {...revealMotion(shouldReduceMotion, sectionReveal(0), itemViewport)}
        >
          <p className="max-w-5xl text-base leading-8 text-white/66 sm:text-lg">
            <span className="font-black text-white">{pricing.customTitle}: </span>
            {pricing.customSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
