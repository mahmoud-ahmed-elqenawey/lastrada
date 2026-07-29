"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  X,
} from "lucide-react";
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
  const { content, direction, language } = useLaStradaContent();
  const { contactSection, sourceSite } = content;
  const shouldReduceMotion = useReducedMotion();
  const [showNotice, setShowNotice] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successCopy =
    language === "ar"
      ? {
          title: "تم وصول رسالتك بنجاح",
          body: "استلمنا طلبك، وفريق لاسترادا هيتواصل معاك قريباً لمراجعة التفاصيل والخطوة التالية.",
          close: "تمام",
        }
      : {
          title: "Your message has been received",
          body: "We received your request. The LA STRADA team will contact you soon to review the details and next step.",
          close: "Done",
        };

  useEffect(() => {
    if (!showNotice) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showNotice]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setShowNotice(false);
    setSubmitError("");
    setIsSubmitting(true);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
      sourceLocale: language,
      pagePath: window.location.pathname,
    };
    try {
      const response = await fetch("/api/project-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "تعذر حفظ الطلب.");
      }

      setShowNotice(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : language === "ar"
            ? "تعذر إرسال الطلب. حاول مرة أخرى."
            : "Could not submit the request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#050505] px-5 pb-28 pt-20 text-white sm:px-8 lg:px-12 lg:pb-36 lg:pt-24"
      aria-label="Contact LA STRADA"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(48,169,220,0.17),transparent_28rem),radial-gradient(circle_at_82%_68%,rgba(239,70,57,0.16),transparent_30rem),linear-gradient(180deg,#050505,#0a0a09_52%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <motion.div className="h-px w-28 bg-white/38" variants={lineReveal(direction)} />
            <motion.h2
              className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-7xl lg:text-8xl"
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
              <a
                className="cinema-button cinema-button-primary"
                href={sourceSite.phone.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                {contactSection.ctaLabel}
                <MessageCircle aria-hidden="true" size={18} />
              </a>
              {sourceSite.phone.whatsappHref ? (
                <a
                  className="cinema-button cinema-button-muted"
                  href={sourceSite.phone.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {sourceSite.phone.whatsappLabel}
                  <MessageCircle aria-hidden="true" size={18} />
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

            <a
              href={sourceSite.phone.href}
              className="group mt-3 grid gap-4 rounded-[8px] bg-white/[0.018] p-4 transition hover:bg-white/[0.035] sm:grid-cols-[3rem_1fr_2rem] sm:items-center"
            >
              <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-green)]">
                <PhoneCall aria-hidden="true" size={22} />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                  {sourceSite.phone.callLabel}
                </span>
                <span className="mt-2 block text-xl font-black text-white sm:text-2xl">
                  {sourceSite.phone.display}
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

            <a
              href={sourceSite.phone.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 grid gap-4 rounded-[8px] bg-white/[0.018] p-4 transition hover:bg-white/[0.035] sm:grid-cols-[3rem_1fr_2rem] sm:items-center"
            >
              <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-green)]">
                <MessageCircle aria-hidden="true" size={22} />
              </span>
              <span>
                <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                  {sourceSite.phone.whatsappLabel}
                </span>
                <span className="mt-2 block text-xl font-black text-white sm:text-2xl">
                  {sourceSite.phone.display}
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

            {sourceSite.socialLinks.length ? (
              <div className="mt-3 rounded-[8px] bg-white/[0.018] p-4">
                <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white/38">
                  {contactSection.socialLabel}
                </span>
                <div className="mt-4 flex flex-wrap gap-3">
                  {sourceSite.socialLinks.map((link) => (
                    <a
                      key={link.href}
                      className="inline-flex items-center gap-2 rounded-full bg-white/[0.045] px-4 py-2 text-sm font-bold text-white/68 transition hover:bg-white/10 hover:text-white"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" size={15} />
                    </a>
                  ))}
                </div>
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
              <button className="cinema-button cinema-button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (language === "ar" ? "جار الإرسال" : "Sending") : contactSection.form.sendMessage}
                <Send aria-hidden="true" size={18} />
              </button>

              {contactSection.form.localNotice ? (
                <p className="max-w-md text-sm leading-6 text-white/44">
                  {contactSection.form.localNotice}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <motion.p
                className="mt-5 rounded-[8px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-bold leading-6 text-red-100"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.p>
            ) : null}

          </motion.form>
        </div>
      </motion.div>

      {showNotice ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 px-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <motion.div
            className="soft-panel relative w-full max-w-lg rounded-[8px] p-6 text-center shadow-[0_32px_120px_rgba(0,0,0,0.55)] sm:p-8"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
          >
            <button
              type="button"
              className="soft-icon absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/56 transition hover:text-white"
              onClick={() => setShowNotice(false)}
              aria-label={language === "ar" ? "إغلاق" : "Close"}
            >
              <X aria-hidden="true" size={18} />
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(57,181,74,0.12)] text-[var(--brand-green)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <CheckCircle2 aria-hidden="true" size={30} />
            </span>
            <h2 id="contact-success-title" className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl">
              {successCopy.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/64 sm:text-lg">{successCopy.body}</p>
            <button
              type="button"
              className="cinema-button cinema-button-primary mx-auto mt-7"
              onClick={() => setShowNotice(false)}
            >
              {successCopy.close}
            </button>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
