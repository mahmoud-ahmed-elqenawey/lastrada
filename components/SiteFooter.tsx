"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { ExternalLink, Mail, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  itemReveal,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

const footerAnchors = {
  services: "#services",
  company: "#about",
  resources: "#portfolio",
  industries: "#contact",
};

export function SiteFooter() {
  const { content } = useLaStradaContent();
  const { brand, footer, sourceSite } = content;
  const legalLinks = Object.values(footer.legal);
  const shouldReduceMotion = useReducedMotion();

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="relative overflow-hidden bg-black px-5 pb-8 pt-20 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(113,88,166,0.16),transparent_28rem),radial-gradient(circle_at_84%_94%,rgba(48,169,220,0.14),transparent_30rem)]" />
      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.07))}
      >
        <motion.div
          className="grid gap-12 border-y border-white/12 py-12 lg:grid-cols-[1.1fr_1.4fr]"
          variants={cardReveal(0, 28)}
        >
          <motion.div variants={staggerContainer(0.04, 0.055)}>
            <motion.div variants={itemReveal(0, 16)}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={220}
                height={225}
                sizes="4rem"
                className="h-16 w-auto opacity-90"
              />
            </motion.div>
            <motion.h2 className="mt-7 text-3xl font-black text-white" variants={itemReveal()}>
              {footer.brandName}
            </motion.h2>
            <motion.p className="mt-7 max-w-xl text-base leading-7 text-white/62" variants={itemReveal()}>
              {footer.brandDescription}
            </motion.p>
            <motion.div
              className="mt-8 space-y-3 text-sm text-white/58"
              variants={staggerContainer(0.08, 0.045)}
            >
              <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${sourceSite.email}`}>
                <Mail aria-hidden="true" size={18} className="text-[var(--brand-cyan)]" />
                {sourceSite.email}
              </a>
              <p className="flex items-center gap-3">
                <MapPin aria-hidden="true" size={18} className="text-[var(--brand-red)]" />
                {sourceSite.office.country} - {sourceSite.office.address}
              </p>
            </motion.div>

            <motion.div className="mt-9 border-t border-white/12 pt-8" variants={itemReveal(0.08, 18)}>
              <h3 className="text-lg font-black text-white">{footer.stayUpdated}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/48">
                {footer.newsletterSubtitle}
              </p>
              <form className="mt-5 flex max-w-md" onSubmit={handleNewsletterSubmit}>
                <input
                  className="min-w-0 flex-1 rounded-s-[8px] border border-white/12 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[var(--brand-cyan)]"
                  placeholder={footer.emailPlaceholder}
                  type="email"
                />
                <button
                  className="grid w-12 place-items-center rounded-e-[8px] border border-s-0 border-white/12 bg-white text-black transition hover:bg-[var(--brand-yellow)]"
                  type="submit"
                  aria-label={footer.stayUpdated}
                >
                  <Send aria-hidden="true" size={17} />
                </button>
              </form>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.1, 0.045)}
          >
            {Object.entries(footer.categoryTitles).map(([key, title]) => {
              const list = footer.links[key as keyof typeof footer.links];
              const href = footerAnchors[key as keyof typeof footerAnchors];

              return (
                <motion.div key={key} variants={itemReveal()}>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/46">
                    {title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {list.map((item) => (
                      <li key={item}>
                        <a className="text-sm text-white/56 transition hover:text-white" href={href}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 pt-7 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between"
          variants={itemReveal(0.08, 16)}
        >
          <p>{footer.copyright}</p>
          {footer.creditLabel ? (
            <a
              className="inline-flex w-fit items-center gap-2 transition hover:text-white"
              href="https://www.geeks-code.com"
              target="_blank"
              rel="noreferrer"
            >
              {footer.madeWith} {footer.creditLabel}
              <ExternalLink aria-hidden="true" size={15} />
            </a>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/5 pt-5"
          variants={staggerContainer(0.1, 0.035)}
        >
          {legalLinks.map((label) => (
            <motion.a
              key={label}
              className="text-xs text-white/34 transition hover:text-white/72"
              href="#contact"
              variants={chipReveal()}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
}
