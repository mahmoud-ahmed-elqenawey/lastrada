"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Sparkles, UserRound } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useLaStradaContent, type AgencyStat, type AgencyValue, type TeamMember } from "@/lib/la-strada-i18n";
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

function statStyle(accent: AgencyStat["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function valueStyle(accent: AgencyValue["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function memberStyle(accent: TeamMember["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function parseStatValue(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) {
    return { prefix: "", numeric: 0, suffix: value, canAnimate: false };
  }

  return {
    prefix: match[1],
    numeric: Number(match[2].replace(/[^\d]/g, "")),
    suffix: match[3],
    canAnimate: true,
  };
}

function AnimatedStatValue({ value, language }: { value: string; language: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!parsed.canAnimate || !isInView || shouldReduceMotion) {
      return;
    }

    const controls = animate(0, parsed.numeric, {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimatedValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, parsed.canAnimate, parsed.numeric, shouldReduceMotion]);

  const formatter = useMemo(
    () => new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US"),
    [language],
  );

  if (!parsed.canAnimate) {
    return (
      <p ref={ref} className="text-4xl font-black leading-none text-[var(--accent)] sm:text-5xl">
        {value}
      </p>
    );
  }

  const displayValue = shouldReduceMotion ? parsed.numeric : animatedValue;

  return (
    <p ref={ref} className="text-4xl font-black leading-none text-[var(--accent)] sm:text-5xl">
      {parsed.prefix}
      {formatter.format(displayValue)}
      {parsed.suffix}
    </p>
  );
}

export function AgencyStory() {
  const { content, direction, language } = useLaStradaContent();
  const { agencyStory, team } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="About LA STRADA"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_76%,rgba(249,167,43,0.13),transparent_30rem),radial-gradient(circle_at_84%_18%,rgba(113,88,166,0.18),transparent_32rem)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
          >
            <motion.div
              className="soft-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full"
              variants={iconReveal()}
            >
              <Sparkles aria-hidden="true" className="text-[var(--brand-yellow)]" size={24} />
            </motion.div>
            <motion.h2
              className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={headingReveal(direction)}
            >
              {agencyStory.title}{" "}
              <span className="text-[var(--brand-yellow)]">{agencyStory.titleHighlight}</span>
            </motion.h2>
            <motion.p className="mt-8 max-w-3xl text-xl leading-9 text-white/66" variants={itemReveal(0.08, 22)}>
              {agencyStory.body}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.08, 0.055))}
          >
            {agencyStory.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="soft-panel rounded-[8px] p-5 sm:p-7"
                style={statStyle(stat.accent)}
                variants={cardReveal(index * 0.04, 20)}
              >
                <AnimatedStatValue value={stat.value} language={language} />
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-white/48">
                  {stat.label}
                </p>
                <span className="sr-only">Stat number {index + 1}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.38fr_1fr]">
          <div>
            <div className="h-px w-20 bg-white/34" />
            <h3 className="mt-7 text-3xl font-black tracking-normal text-white sm:text-4xl">
              {agencyStory.valuesTitle}
            </h3>
            {agencyStory.valuesBody ? (
              <p className="mt-5 max-w-sm text-base leading-7 text-white/56">
                {agencyStory.valuesBody}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            {agencyStory.values.map((value, index) => (
              <motion.article
                key={value.title}
                className="kinetic-card soft-row grid gap-5 px-5 py-7 sm:grid-cols-[5rem_0.5fr_1fr] sm:items-start sm:px-7"
                style={valueStyle(value.accent)}
                {...revealMotion(shouldReduceMotion, cardReveal(index * 0.045, 26), itemViewport)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              >
                <span className="font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-2xl font-black leading-none text-white sm:text-3xl">
                  {value.title}
                </h4>
                <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.38fr_1fr]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="soft-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full">
              <UserRound aria-hidden="true" className="text-white/76" size={24} />
            </div>
            <h3 className="max-w-lg text-balance text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl">
              {team.title} <span className="text-[var(--brand-cyan)]">{team.titleHighlight}</span>
            </h3>
            {team.subtitle ? (
              <p className="mt-6 max-w-md text-lg leading-8 text-white/62">
                {team.subtitle}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            {team.members.map((member, index) => (
              <motion.article
                key={member.name}
                className={`kinetic-card soft-row grid gap-5 px-5 py-8 sm:items-start sm:px-7 ${
                  member.bio
                    ? "sm:grid-cols-[5rem_0.62fr_1fr] lg:grid-cols-[5rem_0.52fr_0.88fr_10rem]"
                    : "sm:grid-cols-[5rem_1fr_12rem]"
                }`}
                style={memberStyle(member.accent)}
                {...revealMotion(shouldReduceMotion, cardReveal(index * 0.055, 28), itemViewport)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              >
                <span className="font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-3xl font-black leading-none text-white sm:text-4xl">
                    {member.name}
                  </h4>
                  {member.role ? (
                    <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[0.12em] text-[var(--accent)]">
                      {member.role}
                    </p>
                  ) : null}
                </div>
                {member.bio ? (
                  <p className="text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                    {member.bio}
                  </p>
                ) : null}
                {member.image ? (
                  <motion.div
                    className={`soft-frame relative min-h-64 overflow-hidden rounded-[8px] lg:min-h-52 ${
                      member.bio ? "sm:col-span-3 lg:col-span-1" : ""
                    }`}
                    variants={cardReveal(0.12, 22)}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 10rem, (min-width: 640px) 80vw, 92vw"
                      className="object-cover object-top opacity-[0.82] saturate-[1.02] transition duration-700 hover:scale-105 hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(0,0,0,0.52)),radial-gradient(circle_at_22%_14%,var(--accent),transparent_42%)] opacity-[0.34]" />
                    <div className="absolute inset-x-4 bottom-4 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-75" />
                  </motion.div>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="soft-panel mt-20 grid gap-10 rounded-[8px] px-5 py-12 sm:px-7 lg:grid-cols-[0.34fr_1fr] lg:items-end lg:px-8 lg:py-16"
          {...revealMotion(shouldReduceMotion, sectionReveal(0), itemViewport)}
        >
          <div>
            <div className="soft-icon flex h-14 w-14 items-center justify-center rounded-full text-[var(--brand-yellow)]">
              <Compass aria-hidden="true" size={24} />
            </div>
            <p className="mt-7 font-mono text-sm font-black uppercase tracking-[0.2em] text-white/38">
              {agencyStory.visionTitle}
            </p>
          </div>

          <p className="max-w-5xl text-balance text-4xl font-black leading-tight text-white sm:text-6xl">
            {agencyStory.vision}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
