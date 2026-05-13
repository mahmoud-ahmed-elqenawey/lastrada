"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, ExternalLink, Mail, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  headingReveal,
  itemReveal,
  lineReveal,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

export function ContactGateway() {
  const { content, direction } = useLaStradaContent();
  const { contactSection, sourceSite } = content;
  const shouldReduceMotion = useReducedMotion();
  const [showNotice, setShowNotice] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowNotice(true);
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="Contact LA STRADA"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(48,169,220,0.17),transparent_28rem),radial-gradient(circle_at_82%_68%,rgba(239,70,57,0.16),transparent_30rem),linear-gradient(180deg,#050505,#0a0a09_52%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <motion.div className="h-px w-28 bg-white/38" variants={lineReveal(direction)} />
            <motion.h2
              className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={headingReveal(direction)}
            >
              {contactSection.title}{" "}
              <span className="text-[var(--brand-red)]">{contactSection.titleHighlight}</span>
            </motion.h2>
            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl sm:leading-9"
              variants={itemReveal(0.08, 20)}
            >
              {contactSection.body}
            </motion.p>
            <motion.div className="mt-10 flex flex-col gap-4 sm:flex-row" variants={itemReveal(0.12, 18)}>
              <a className="cinema-button cinema-button-primary" href={contactSection.emailHref}>
                {contactSection.ctaLabel}
                <Send aria-hidden="true" size={18} />
              </a>
              {contactSection.socialLabel ? (
                <a
                  className="cinema-button cinema-button-muted"
                  href={contactSection.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactSection.socialLabel}
                  <ExternalLink aria-hidden="true" size={18} />
                </a>
              ) : null}
            </motion.div>
          </div>

          <motion.div className="soft-panel rounded-[8px] p-5 sm:p-7" variants={cardReveal(0.1, 28)}>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white/38">
              {contactSection.getInTouch}
            </p>
            <a
              href={contactSection.emailHref}
              className="group grid gap-4 rounded-[8px] bg-white/[0.025] p-4 transition hover:bg-white/[0.04] sm:grid-cols-[3rem_1fr_2rem] sm:items-center"
            >
              <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-cyan)]">
                <Mail aria-hidden="true" size={22} />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                  {contactSection.emailLabel}
                </span>
                <span className="mt-2 block text-xl font-black text-white sm:text-2xl">
                  {sourceSite.email}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className={`text-white/42 transition group-hover:-translate-y-0.5 group-hover:text-white ${
                  direction === "rtl"
                    ? "-scale-x-100 group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
                size={22}
              />
            </a>

            <div className="mt-3 grid gap-4 rounded-[8px] bg-white/[0.018] p-4 sm:grid-cols-[3rem_1fr] sm:items-center">
              <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-red)]">
                <MapPin aria-hidden="true" size={22} />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                  {contactSection.visitLabel}
                </span>
                <span className="mt-2 block text-xl font-black text-white sm:text-2xl">
                  {sourceSite.office.country}
                </span>
                <span className="mt-1 block text-base leading-7 text-white/58">
                  {sourceSite.office.address}
                </span>
              </span>
            </div>

            {contactSection.businessHours ? (
              <div className="mt-3 grid gap-4 rounded-[8px] bg-white/[0.018] p-4 sm:grid-cols-[3rem_1fr] sm:items-center">
                <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-yellow)]">
                  <Clock3 aria-hidden="true" size={22} />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                    {contactSection.businessHoursLabel}
                  </span>
                  <span className="mt-2 block text-xl font-black text-white sm:text-2xl">
                    {contactSection.businessHours}
                  </span>
                </span>
              </div>
            ) : null}
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div className="soft-panel rounded-[8px] p-5 sm:p-7" variants={cardReveal(0.14, 28)}>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white/38">
              {contactSection.globalPresence}
            </p>
            <div className="space-y-4">
              {contactSection.offices.map((office) => (
                <div key={`${office.country}-${office.address}`} className="soft-row p-5">
                  <p className="text-xl font-black text-white">{office.country}</p>
                  <p className="mt-2 text-sm leading-6 text-white/54">{office.address}</p>
                </div>
              ))}
            </div>

            <p className="mb-5 mt-9 text-sm font-black uppercase tracking-[0.18em] text-white/38">
              {contactSection.form.service}
            </p>
            <motion.div className="flex flex-wrap gap-2" variants={staggerContainer(0.03, 0.03)}>
              {contactSection.services.map((service) => (
                <motion.span
                  key={service}
                  className="rounded-full bg-white/[0.035] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]"
                  variants={chipReveal()}
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>

            <p className="mb-5 mt-9 text-sm font-black uppercase tracking-[0.18em] text-white/38">
              {contactSection.form.budgetRange}
            </p>
            <motion.div className="flex flex-wrap gap-2" variants={staggerContainer(0.03, 0.03)}>
              {contactSection.budgets.map((budget) => (
                <motion.span
                  key={budget}
                  className="rounded-full bg-white/[0.035] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]"
                  variants={chipReveal()}
                >
                  {budget}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            className="soft-panel rounded-[8px] p-5 sm:p-8"
            onSubmit={handleSubmit}
            variants={cardReveal(0.18, 32)}
          >
            <h3 className="mb-7 text-3xl font-black leading-none text-white sm:text-4xl">
              {contactSection.startProject}
            </h3>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                  {contactSection.form.name}
                </span>
                <input
                  className="w-full rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--brand-cyan)]"
                  name="name"
                  placeholder={contactSection.form.namePlaceholder}
                  required
                  type="text"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                  {contactSection.form.email}
                </span>
                <input
                  className="w-full rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--brand-cyan)]"
                  name="email"
                  placeholder={contactSection.form.emailPlaceholder}
                  required
                  type="email"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                {contactSection.form.company}
              </span>
              <input
                className="w-full rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--brand-cyan)]"
                name="company"
                placeholder={contactSection.form.companyPlaceholder}
                type="text"
              />
            </label>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                  {contactSection.form.service}
                </span>
                <select
                  className="w-full rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[var(--brand-cyan)]"
                  name="service"
                  required
                  defaultValue=""
                >
                  <option className="bg-[#050505]" value="" disabled>
                    {contactSection.form.selectService}
                  </option>
                  {contactSection.services.map((service) => (
                    <option className="bg-[#050505]" key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                  {contactSection.form.budgetRange}
                </span>
                <select
                  className="w-full rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[var(--brand-cyan)]"
                  name="budget"
                  defaultValue=""
                >
                  <option className="bg-[#050505]" value="" disabled>
                    {contactSection.form.selectBudget}
                  </option>
                  {contactSection.budgets.map((budget) => (
                    <option className="bg-[#050505]" key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em] text-white/48">
                {contactSection.form.projectDetails}
              </span>
              <textarea
                className="min-h-36 w-full resize-none rounded-[8px] border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--brand-cyan)]"
                name="message"
                placeholder={contactSection.form.detailsPlaceholder}
                required
              />
            </label>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button className="cinema-button cinema-button-primary" type="submit">
                {contactSection.form.sendMessage}
                <Send aria-hidden="true" size={18} />
              </button>

              {contactSection.form.localNotice ? (
                <p className="max-w-md text-sm leading-6 text-white/44">
                  {contactSection.form.localNotice}
                </p>
              ) : null}
            </div>

            {showNotice && contactSection.form.localNotice ? (
              <motion.p
                className="mt-5 flex items-center gap-2 rounded-[8px] border border-[rgba(57,181,74,0.34)] bg-[rgba(57,181,74,0.1)] px-4 py-3 text-sm font-bold text-white/76"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                <CheckCircle2 aria-hidden="true" size={18} className="text-[var(--brand-green)]" />
                {contactSection.form.localNotice}
              </motion.p>
            ) : null}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
