"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Globe2, MessageCircle, PhoneCall } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";
import {
  chipReveal,
  entranceMotion,
  heroTitleReveal,
  itemReveal,
  lineReveal,
  motionEase,
  sideReveal,
  staggerContainer,
} from "@/lib/motion-presets";

export function CinematicHero() {
  const { content, direction, languageSwitchHref } = useLaStradaContent();
  const { brand, hero, media, sourceSite, servicesIntro } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.12]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 42]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -46]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 62]);
  const figureY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 34]);
  const figureScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.16]);
  const frameOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.28]);

  const showVideo = !videoFailed && !shouldReduceMotion;
  const featuredServices = content.solutionPillars;

  return (
    <section
      ref={sectionRef}
      className="hero-section relative isolate flex min-h-[100svh] overflow-hidden bg-black px-5 py-5 text-white sm:px-8 lg:px-12"
      aria-label="LA STRADA cinematic introduction"
    >
      <motion.div
        className="hero-media absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${media.heroPoster})`,
          scale: mediaScale,
          y: mediaY,
        }}
      />
      <motion.div
        className="hero-moon-fallback pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{ scale: mediaScale, y: mediaY }}
      >
        <motion.div className="hero-stars" style={{ y: starsY }} />
        <motion.div className="hero-moon-halo" style={{ y: moonY }} />
        <motion.div className="hero-moon" style={{ y: moonY }} />
        <motion.div className="hero-light-beam hero-light-beam-one" style={{ y: moonY }} />
        <motion.div className="hero-light-beam hero-light-beam-two" style={{ y: moonY }} />
        <motion.div className="hero-figure" style={{ y: figureY, scale: figureScale }} />
        <div className="hero-ground" />
        <div className="hero-reel-lines absolute inset-0" />
      </motion.div>
      <motion.div className="hero-frame" aria-hidden="true" style={{ opacity: frameOpacity }} />
      <motion.div className="hero-chromatic-wash" aria-hidden="true" style={{ opacity: frameOpacity }} />
      <div className="hero-letterbox" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="film-grain absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(100svh-2.5rem)] w-full flex-col">
        <motion.header
          className="hero-header"
          {...entranceMotion(shouldReduceMotion, itemReveal(0.02, 12))}
        >
          <a href="#top" className="focus-ring inline-flex shrink-0" aria-label="LA STRADA home">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={220}
              height={225}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </a>
          <div className="hero-actions">
            <a
              className="cinema-button cinema-button-muted min-h-11 px-3 sm:px-4"
              href={sourceSite.phone.href}
              aria-label={`${sourceSite.phone.callLabel} ${sourceSite.phone.display}`}
            >
              <PhoneCall aria-hidden="true" size={17} />
              <span className="hidden md:inline">{sourceSite.phone.display}</span>
              <span className="md:hidden">{sourceSite.phone.callLabel}</span>
            </a>
            <a
              className="cinema-button cinema-button-whatsapp min-h-11 px-3 sm:px-4"
              href={sourceSite.phone.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={sourceSite.phone.whatsappLabel}
            >
              <MessageCircle aria-hidden="true" size={17} />
              <span className="hidden sm:inline">{sourceSite.phone.whatsappLabel}</span>
            </a>
            <a
              className="cinema-button cinema-button-muted min-h-11 px-4"
              href={languageSwitchHref}
              aria-label="Switch language"
            >
              <Globe2 aria-hidden="true" size={17} />
              {hero.languageLabel}
            </a>
            <a className="cinema-button cinema-button-ghost hidden lg:inline-flex" href={hero.ctaHref}>
              {hero.ctaLabel}
              <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
            </a>
          </div>
        </motion.header>

        <motion.div
          className="hero-composition"
          style={{ y: contentY, opacity: contentOpacity }}
          {...entranceMotion(shouldReduceMotion, staggerContainer(0.1, 0.09))}
        >
          <motion.div className="hero-copy" variants={staggerContainer(0.08, 0.08)}>
            <motion.h1 className="hero-title text-balance" variants={heroTitleReveal()}>
              {hero.brandName}
            </motion.h1>
            <motion.p className="hero-tagline" variants={itemReveal(0.02, 24)}>
              {hero.tagline}
            </motion.p>
            <motion.p className="hero-subtitle" variants={itemReveal(0.04, 18)}>
              {hero.agencyLabel} / {hero.subtitle}
            </motion.p>
            <motion.div className="hero-cta-row" variants={staggerContainer(0.04, 0.06)}>
              <motion.a className="cinema-button cinema-button-primary" href={hero.ctaHref} variants={chipReveal()}>
                {hero.ctaLabel}
                <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={19} />
              </motion.a>
              <motion.a className="cinema-button cinema-button-muted" href="#portfolio" variants={chipReveal()}>
                {hero.secondaryLabel}
                <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.aside className="hero-side-panel" aria-label={servicesIntro.subtitle} variants={sideReveal(direction, 0.18)}>
            <motion.span className="hero-panel-line" variants={lineReveal(direction, 0.08)} />
            <motion.p variants={itemReveal(0.12, 18)}>{servicesIntro.subtitle}</motion.p>
            <motion.div className="hero-service-rail" variants={staggerContainer(0.16, 0.045)}>
              {featuredServices.map((service) => (
                <motion.span key={service.title} variants={chipReveal()}>
                  {service.title}
                </motion.span>
              ))}
            </motion.div>
          </motion.aside>
        </motion.div>

        <motion.div
          className="hero-bottom"
          {...entranceMotion(shouldReduceMotion, itemReveal(0.55, 14))}
        >
          <a
            href="#services"
            className="group flex w-fit items-center gap-3 text-sm font-semibold text-white/64 transition hover:text-white"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/18">
              <ChevronDown className="transition group-hover:translate-y-0.5" aria-hidden="true" size={18} />
            </span>
            {servicesIntro.titleHighlight}
          </a>
          <div className="hidden items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/34 md:flex">
            <span className="h-px w-16 bg-white/24" />
            {hero.scrollHint}
          </div>
        </motion.div>
      </div>

      {showVideo ? (
        <motion.video
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          style={{ scale: mediaScale }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 0.78 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: motionEase }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.heroPoster}
          onError={() => setVideoFailed(true)}
        >
          <source src={media.heroVideo} type="video/mp4" />
        </motion.video>
      ) : null}
    </section>
  );
}
