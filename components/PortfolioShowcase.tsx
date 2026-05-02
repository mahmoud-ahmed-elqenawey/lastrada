"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { ArrowUpRight, Layers3, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type PortfolioProject } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  motionEase,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

function accentStyle(accent: PortfolioProject["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function PortfolioShowcase() {
  const { content, direction } = useLaStradaContent();
  const { portfolio } = content;
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return portfolio.projects;

    const matches = portfolio.projects.filter((project) => project.category === activeFilter);
    return matches.length > 0 ? matches : portfolio.projects;
  }, [activeFilter, portfolio.projects]);

  return (
    <section
      id="portfolio"
      className="relative isolate overflow-hidden bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA featured work"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(113,88,166,0.22),transparent_31rem),radial-gradient(circle_at_88%_74%,rgba(48,169,220,0.15),transparent_34rem),linear-gradient(180deg,#050505,#090909_52%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
          {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
        >
          <div>
            <motion.div
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-[var(--brand-purple)]"
              variants={iconReveal()}
            >
              <Layers3 aria-hidden="true" size={24} />
            </motion.div>
            <motion.h2
              className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={headingReveal(direction)}
            >
              {portfolio.title}{" "}
              <span className="text-[var(--brand-yellow)]">{portfolio.titleHighlight}</span>
            </motion.h2>
          </div>

          <motion.p
            className="max-w-2xl text-lg leading-8 text-white/64 sm:text-xl sm:leading-9"
            variants={itemReveal(0.08, 20)}
          >
            {portfolio.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap gap-2 border-y border-white/12 py-5"
          {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.035), itemViewport)}
        >
          {portfolio.filters.map((filter) => {
            const isActive = filter.key === activeFilter;

            return (
              <motion.button
                key={filter.key}
                type="button"
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/12 text-white/56 hover:border-white/34 hover:text-white"
                }`}
                onClick={() => setActiveFilter(filter.key)}
                variants={chipReveal()}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="border-b border-white/12">
          <AnimatePresence initial={false} mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={`${project.title}-${activeFilter}`}
              className="kinetic-card group grid gap-6 border-t border-white/12 py-8 md:grid-cols-[7rem_1fr_0.55fr] md:items-center lg:py-10"
              style={accentStyle(project.accent)}
              layout
              {...revealMotion(shouldReduceMotion, cardReveal(index * 0.045, 28), itemViewport)}
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -18,
                      transition: { duration: 0.22, ease: motionEase },
                    }
              }
              whileHover={shouldReduceMotion ? undefined : { x: direction === "rtl" ? -6 : 6 }}
            >
              <motion.div
                className="relative h-24 w-full overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.03] md:h-28"
                variants={iconReveal(0.06)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,var(--accent),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_48%)] opacity-55" />
                <div className="absolute inset-x-3 bottom-3 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
                <span className="absolute start-3 top-3 font-mono text-xs text-white/44">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-3 end-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/16 text-[var(--accent)]">
                  <Play aria-hidden="true" size={14} fill="currentColor" />
                </span>
              </motion.div>

              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em]">
                  <span className="text-[var(--accent)]">{project.type}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                  <span className="text-white/38">{project.client}</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                  <span className="font-mono text-white/34">{project.category}</span>
                </div>
                <h3 className="mt-4 text-3xl font-black leading-none tracking-normal text-white sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                  {project.description}
                </p>
              </div>

              <div className="flex justify-start md:justify-end">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-white/60 transition group-hover:border-[color:var(--accent)] group-hover:text-[var(--accent)]">
                  <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={21} />
                </span>
              </div>
            </motion.article>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
