"use client";

import Image from "next/image";
import Link from "next/link";
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
import { getProjectCover, getProjectPath, getProjectSummary, getProjectTitle } from "@/lib/portfolio-projects";

function accentStyle(accent: PortfolioProject["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

function ProjectCoverPreview({ project, index }: { project: PortfolioProject; index: number }) {
  const cover = getProjectCover(project);
  const previewSrc = cover?.type === "video" ? cover.poster : cover?.src;

  if (cover && previewSrc) {
    return (
      <motion.div
        className="soft-frame relative aspect-[4/5] w-full max-w-[13rem] overflow-hidden rounded-[8px] bg-[#0b0b0b]"
        variants={iconReveal(0.06)}
      >
        <Image
          src={previewSrc}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 11rem, (min-width: 768px) 10rem, 52vw"
          className="object-cover transition duration-700 group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.58))]" />
        <span className="absolute start-3 top-3 font-mono text-xs text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        {cover.type === "video" ? (
          <span className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
            <Play aria-hidden="true" size={13} fill="currentColor" />
          </span>
        ) : null}
        {cover.label ? (
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-black/44 px-3 py-2 text-center text-[0.64rem] font-black uppercase tracking-[0.13em] text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
            {cover.label}
          </span>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="soft-frame relative h-24 w-full overflow-hidden rounded-[8px] md:h-28"
      variants={iconReveal(0.06)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,var(--accent),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_48%)] opacity-55" />
      <div className="absolute inset-x-3 bottom-3 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]" />
      <span className="absolute start-3 top-3 font-mono text-xs text-white/44">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="soft-icon absolute bottom-3 end-3 flex h-8 w-8 items-center justify-center rounded-full text-[var(--accent)]">
        <Play aria-hidden="true" size={14} fill="currentColor" />
      </span>
    </motion.div>
  );
}

export function PortfolioShowcase() {
  const { content, direction, language } = useLaStradaContent();
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
              className="soft-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full text-[var(--brand-purple)]"
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
          className="mt-12 flex flex-wrap gap-2"
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

        <div className="mt-7 space-y-3">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => {
              const projectTitle = getProjectTitle(project);

              return (
                <motion.article
                  key={`${project.slug}-${activeFilter}`}
                  className="kinetic-card soft-row group overflow-hidden"
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
                  <Link
                    href={getProjectPath(language, project)}
                    className="grid gap-6 px-5 py-8 outline-none md:grid-cols-[10rem_minmax(0,1fr)_3.5rem] md:items-center sm:px-7 lg:px-8 lg:py-10"
                    aria-label={`${projectTitle} case study`}
                  >
                    <ProjectCoverPreview project={project} index={index} />

                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em]">
                        <span className="text-[var(--accent)]">{project.type}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                        <span className="text-white/38">{project.client}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                        <span className="font-mono text-white/34">{project.category}</span>
                      </div>
                      <h3 className="mt-4 text-3xl font-black leading-none tracking-normal text-white sm:text-5xl">
                        {projectTitle}
                      </h3>
                      <p className="mt-4 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                        {getProjectSummary(project)}
                      </p>
                    </div>

                    <div className="flex justify-start md:justify-end">
                      <span className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-white/60 transition group-hover:text-[var(--accent)]">
                        <ArrowUpRight
                          aria-hidden="true"
                          className={direction === "rtl" ? "-scale-x-100" : ""}
                          size={21}
                        />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
