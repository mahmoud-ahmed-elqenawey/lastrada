"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { Pause, Play, Quote, Video } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLaStradaContent, type Testimonial } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

function accentStyle(accent: Testimonial["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

type VideoTestimonialSlideProps = {
  item: Testimonial;
  index: number;
  total: number;
  videoLabel: string;
  transcriptLabel: string;
  unavailableLabel: string;
  shouldReduceMotion: boolean | null;
};

function pauseOtherVideos(currentVideo: HTMLVideoElement | null) {
  document.querySelectorAll<HTMLVideoElement>("video[data-testimonial-video]").forEach((video) => {
    if (video !== currentVideo) {
      video.pause();
    }
  });
}

function VideoTestimonialSlide({
  item,
  index,
  total,
  videoLabel,
  transcriptLabel,
  unavailableLabel,
  shouldReduceMotion,
}: VideoTestimonialSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState("9 / 16");

  const canPlayVideo = Boolean(item.videoSrc) && !hasVideoError;
  const mediaLabel = canPlayVideo ? videoLabel : unavailableLabel;

  async function toggleVideo() {
    const video = videoRef.current;
    if (!video || !canPlayVideo) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    pauseOtherVideos(video);

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setHasVideoError(true);
      setIsPlaying(false);
    }
  }

  return (
    <motion.article
      className="kinetic-card soft-row relative overflow-hidden p-4 sm:p-5 lg:p-6"
      style={accentStyle(item.accent)}
      {...revealMotion(shouldReduceMotion, cardReveal(index * 0.035, 24), itemViewport)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,var(--accent),transparent_29rem)] opacity-[0.1]"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1fr)] lg:items-stretch">
        <div className="relative flex justify-center lg:justify-end">
          <div
            className="relative h-[clamp(25rem,58vw,42rem)] max-h-[78vh] max-w-full overflow-hidden rounded-[8px] bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.12),transparent_18rem),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(0,0,0,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
            style={{ aspectRatio: videoAspectRatio }}
          >
            {item.videoSrc ? (
              <video
                ref={videoRef}
                data-testimonial-video
                src={item.videoSrc}
                poster={item.posterSrc}
                preload="metadata"
                playsInline
                className="h-full w-full object-contain"
                onLoadedMetadata={(event) => {
                  const video = event.currentTarget;
                  if (video.videoWidth && video.videoHeight) {
                    setVideoAspectRatio(`${video.videoWidth} / ${video.videoHeight}`);
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setHasVideoError(true);
                  setIsPlaying(false);
                }}
              />
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),transparent_34%,rgba(0,0,0,0.78))]" />

            {hasVideoError || !item.videoSrc ? (
              <div className="absolute inset-0 grid place-items-center px-8 text-center">
                <div>
                  <Video aria-hidden="true" className="mx-auto mb-5 text-[var(--accent)]" size={42} />
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-white/58">
                    {unavailableLabel}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-black text-white">{item.company}</p>
              </div>
              <button
                type="button"
                onClick={toggleVideo}
                disabled={!canPlayVideo}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-black transition hover:scale-105 hover:bg-[var(--brand-yellow)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 disabled:hover:scale-100"
                aria-label={mediaLabel}
              >
                {isPlaying ? <Pause aria-hidden="true" size={21} /> : <Play aria-hidden="true" size={21} fill="currentColor" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between py-2 lg:py-4">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/54">
                {mediaLabel}
              </span>
              <span className="rounded-full bg-[var(--accent)]/20 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                {item.duration}
              </span>
            </div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              {transcriptLabel}
            </p>
            <blockquote className="text-balance text-2xl font-black leading-tight text-white sm:text-4xl">
              &quot;{item.content}&quot;
            </blockquote>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-2xl font-black text-white">{item.author}</p>
            <p className="mt-3 text-sm font-bold uppercase leading-6 tracking-[0.14em] text-[var(--accent)]">
              {item.role}
            </p>
            <p className="mt-2 text-base leading-7 text-white/52">{item.company}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

type TestimonialsReelProps = {
  itemsOverride?: Testimonial[];
};

export function TestimonialsReel({ itemsOverride }: TestimonialsReelProps) {
  const { content, direction } = useLaStradaContent();
  const { testimonials } = content;
  const testimonialItems = itemsOverride ?? testimonials.items;
  const shouldReduceMotion = useReducedMotion();

  if (testimonialItems.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
      aria-label="LA STRADA client testimonials"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_70%,rgba(249,167,43,0.13),transparent_31rem),radial-gradient(circle_at_82%_22%,rgba(48,169,220,0.16),transparent_32rem),linear-gradient(180deg,#050505,#0b0b0a_54%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="flex flex-col items-center"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
          >
            <motion.div
              className="soft-icon mb-6 flex h-14 w-14 items-center justify-center rounded-full text-[var(--brand-yellow)]"
              variants={iconReveal()}
            >
              <Quote aria-hidden="true" size={24} />
            </motion.div>
            <motion.h2
              className="text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-6xl"
              variants={headingReveal(direction)}
            >
              {testimonials.title}{" "}
              <span className="text-[var(--brand-cyan)]">{testimonials.titleHighlight}</span>
            </motion.h2>
            <motion.p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg" variants={itemReveal(0.08, 18)}>
              {testimonials.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <motion.div className="mt-12 sm:mt-14" {...revealMotion(shouldReduceMotion, cardReveal(0.08, 24), itemViewport)}>
          <Swiper
            dir={direction}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              1024: { slidesPerView: 1.04, spaceBetween: 22 },
              1280: { slidesPerView: 1.08, spaceBetween: 24 },
            }}
            onSlideChange={() => pauseOtherVideos(null)}
            className="la-testimonials-swiper !overflow-visible !pb-14"
          >
            {testimonialItems.map((item, index) => (
              <SwiperSlide key={item.author} className="!h-auto">
                <VideoTestimonialSlide
                  item={item}
                  index={index}
                  total={testimonialItems.length}
                  videoLabel={testimonials.videoLabel}
                  transcriptLabel={testimonials.transcriptLabel}
                  unavailableLabel={testimonials.unavailableLabel}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
