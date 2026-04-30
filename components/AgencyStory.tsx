"use client";

import type { CSSProperties } from "react";
import { Compass, Sparkles, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
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

export function AgencyStory() {
  const { content, direction } = useLaStradaContent();
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
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03]"
              variants={iconReveal()}
            >
              <Sparkles aria-hidden="true" className="text-[var(--brand-yellow)]" size={24} />
            </motion.div>
            <motion.h2
              className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={headingReveal(direction)}
            >
              {agencyStory.title}
            </motion.h2>
            <motion.p className="mt-8 max-w-3xl text-xl leading-9 text-white/66" variants={itemReveal(0.08, 22)}>
              {agencyStory.body}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 border-y border-white/12"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.08, 0.055))}
          >
            {agencyStory.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="border-t border-white/12 p-5 first:border-t-0 odd:border-e odd:border-white/12 sm:p-7 [&:nth-child(2)]:border-t-0"
                style={statStyle(stat.accent)}
                variants={cardReveal(index * 0.04, 20)}
              >
                <p className="text-4xl font-black leading-none text-[var(--accent)] sm:text-5xl">
                  {stat.value}
                </p>
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

          <div className="border-y border-white/12">
            {agencyStory.values.map((value, index) => (
              <motion.article
                key={value.title}
                className="grid gap-5 border-t border-white/12 py-7 first:border-t-0 sm:grid-cols-[5rem_0.5fr_1fr] sm:items-start"
                style={valueStyle(value.accent)}
                {...revealMotion(shouldReduceMotion, cardReveal(index * 0.045, 26), itemViewport)}
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
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03]">
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

          <div className="border-y border-white/12">
            {team.members.map((member, index) => (
              <motion.article
                key={member.name}
                className="grid gap-5 border-t border-white/12 py-8 first:border-t-0 sm:grid-cols-[5rem_0.62fr_1fr] sm:items-start"
                style={memberStyle(member.accent)}
                {...revealMotion(shouldReduceMotion, cardReveal(index * 0.055, 28), itemViewport)}
              >
                <span className="font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-3xl font-black leading-none text-white sm:text-4xl">
                    {member.name}
                  </h4>
                  <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[0.12em] text-[var(--accent)]">
                    {member.role}
                  </p>
                </div>
                <p className="text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                  {member.bio}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 grid gap-10 border-y border-white/12 py-12 lg:grid-cols-[0.34fr_1fr] lg:items-end lg:py-16"
          {...revealMotion(shouldReduceMotion, sectionReveal(0), itemViewport)}
        >
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[var(--brand-yellow)]">
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
