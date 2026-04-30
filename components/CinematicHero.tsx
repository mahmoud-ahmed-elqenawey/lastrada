"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Globe2, MessageCircle, PhoneCall } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";

export function CinematicHero() {
  const { content, direction, toggleLanguage } = useLaStradaContent();
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.16]);
  const frameOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.28]);

  const showVideo = !videoFailed && !shouldReduceMotion;
  const featuredServices = content.services.slice(0, 5);

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
      <motion.div className="hero-frame" aria-hidden="true" style={{ opacity: frameOpacity }} />
      <motion.div className="hero-chromatic-wash" aria-hidden="true" style={{ opacity: frameOpacity }} />
      <div className="hero-letterbox" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="film-grain absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[calc(100svh-2.5rem)] w-full flex-col">
        <header className="hero-header">
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
            <button
              type="button"
              className="cinema-button cinema-button-muted min-h-11 px-4"
              onClick={toggleLanguage}
              aria-label="Switch language"
            >
              <Globe2 aria-hidden="true" size={17} />
              {hero.languageLabel}
            </button>
            <a className="cinema-button cinema-button-ghost hidden lg:inline-flex" href={hero.ctaHref}>
              {hero.ctaLabel}
              <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
            </a>
          </div>
        </header>

        <motion.div
          className="hero-composition"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="hero-copy">
            <h1 className="hero-title text-balance">
              {hero.brandName}
            </h1>
            <p className="hero-tagline">
              {hero.tagline}
            </p>
            <p className="hero-subtitle">
              {hero.agencyLabel} / {hero.subtitle}
            </p>
            <div className="hero-cta-row">
              <a className="cinema-button cinema-button-primary" href={hero.ctaHref}>
                {hero.ctaLabel}
                <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={19} />
              </a>
              <a className="cinema-button cinema-button-muted" href="#portfolio">
                {hero.secondaryLabel}
                <ArrowUpRight aria-hidden="true" className={direction === "rtl" ? "-scale-x-100" : ""} size={18} />
              </a>
            </div>
          </div>

          <aside className="hero-side-panel" aria-label={servicesIntro.subtitle}>
            <span className="hero-panel-line" />
            <p>{servicesIntro.subtitle}</p>
            <div className="hero-service-rail">
              {featuredServices.map((service) => (
                <span key={service.shortTitle}>{service.shortTitle}</span>
              ))}
            </div>
          </aside>
        </motion.div>

        <div className="hero-bottom">
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
        </div>
      </div>

      {showVideo ? (
        <motion.video
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          style={{ scale: mediaScale }}
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
