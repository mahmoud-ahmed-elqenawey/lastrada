"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Check, Crown, Rocket, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type PricingPlan } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  motionEase,
  revealMotion,
  sectionReveal,
  staggerContainer,
} from "@/lib/motion-presets";

type Billing = "monthly" | "yearly";

function accentStyle(accent: PricingPlan["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function formatPrice(price: string, billing: Billing) {
  const numeric = Number(price.replace(/[^\d]/g, ""));
  if (!numeric) return price;

  const value = billing === "yearly" ? numeric * 10 : numeric;
  return `$${new Intl.NumberFormat("en-US").format(value)}`;
}

export function PricingSequence() {
  const { content, direction } = useLaStradaContent();
  const { pricing, contactSection } = content;
  const shouldReduceMotion = useReducedMotion();
  const [billing, setBilling] = useState<Billing>("monthly");

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
              className="mt-7 inline-flex rounded-full border border-white/12 bg-white/[0.03] p-1"
              variants={itemReveal(0.12, 16)}
            >
              {(["monthly", "yearly"] as Billing[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={billing === option}
                  className={`relative overflow-hidden rounded-full px-5 py-2 text-sm font-black transition ${
                    billing === option ? "text-black" : "text-white/52 hover:text-white"
                  }`}
                  onClick={() => setBilling(option)}
                >
                  {billing === option ? (
                    <motion.span
                      layoutId="pricing-billing-active"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ duration: 0.24, ease: motionEase }}
                    />
                  ) : null}
                  <span className="relative z-10">{option === "monthly" ? pricing.monthly : pricing.yearly}</span>
                  {option === "yearly" ? (
                    <span className="relative z-10 ms-2 rounded-full bg-[rgba(57,181,74,0.18)] px-2 py-0.5 text-[0.68rem] text-[var(--brand-green)]">
                      {pricing.save}
                    </span>
                  ) : null}
                </button>
              ))}
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
                  <p className="text-5xl font-black leading-none text-[var(--accent)]">
                    {formatPrice(plan.price, billing)}
                  </p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/38">
                    / {billing === "monthly" ? pricing.perMonth : pricing.perYear}
                  </p>
                </div>
              ) : (
                <div className="soft-row px-5 py-6">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                    {pricing.monthly} / {pricing.yearly}
                  </p>
                  <p className="mt-3 text-3xl font-black leading-none text-white sm:text-4xl">
                    {pricing.perMonth} / {pricing.perYear}
                  </p>
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

              <a className="cinema-button cinema-button-muted mt-8 w-full" href={contactSection.emailHref}>
                {pricing.getStarted}
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="soft-panel mt-10 grid gap-7 rounded-[8px] px-5 py-10 sm:px-7 md:grid-cols-[1fr_auto] md:items-center lg:px-8"
          {...revealMotion(shouldReduceMotion, sectionReveal(0), itemViewport)}
        >
          <div>
            <h3 className="text-3xl font-black text-white sm:text-4xl">{pricing.customTitle}</h3>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/60">{pricing.customSubtitle}</p>
          </div>
          <a className="cinema-button cinema-button-primary" href={contactSection.emailHref}>
            {pricing.contactSales}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
