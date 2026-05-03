"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Globe2, MessageCircle, PhoneCall } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLaStradaContent } from "@/lib/la-strada-i18n";
import {
  chipReveal,
  entranceMotion,
  heroTitleReveal,
  itemReveal,
  motionEase,
  staggerContainer,
} from "@/lib/motion-presets";
import { isDevLightMode } from "@/lib/runtime-flags";

export function CinematicHero() {
  const { content, direction, languageSwitchHref } = useLaStradaContent();
  const { brand, hero, media, sourceSite, servicesIntro } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.16]);

  const showVideo = Boolean(videoSrc) && !videoFailed && !shouldReduceMotion && !isDevLightMode;

  useEffect(() => {
    if (shouldReduceMotion || isDevLightMode) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncVideoSource = () => {
      setVideoSrc(mediaQuery.matches ? media.heroVideoMobile : media.heroVideo);
      setVideoFailed(false);
    };
    const animationFrame = window.requestAnimationFrame(syncVideoSource);

    mediaQuery.addEventListener("change", syncVideoSource);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      mediaQuery.removeEventListener("change", syncVideoSource);
    };
  }, [media.heroVideo, media.heroVideoMobile, shouldReduceMotion]);

  useEffect(() => {
    if (!showVideo) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => undefined);
  }, [showVideo]);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative isolate flex min-h-[100svh] overflow-hidden bg-black px-5 py-5 text-white sm:px-8 lg:px-12"
      aria-label="LA STRADA cinematic introduction"
    >
      <motion.div
        className="hero-video-poster absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${media.heroPoster})`,
          scale: mediaScale,
        }}
      />
      {showVideo ? (
        <motion.video
          key={videoSrc}
          ref={videoRef}
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          style={{ scale: mediaScale }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: motionEase }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.heroPoster}
          onCanPlay={() => {
            void videoRef.current?.play().catch(() => undefined);
          }}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc ?? media.heroVideo} type="video/mp4" />
        </motion.video>
      ) : null}
      <motion.div
        className={`hero-video-overlay absolute inset-0 ${isDevLightMode ? "hero-video-overlay-lite" : ""}`}
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
      />

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
              sizes="(min-width: 640px) 3.5rem, 3rem"
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
    </section>
  );
}
