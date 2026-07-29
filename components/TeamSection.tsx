"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLaStradaContent, type TeamMember } from "@/lib/la-strada-i18n";
import { cardReveal, headingReveal, iconReveal, itemReveal, itemViewport, revealMotion, staggerContainer } from "@/lib/motion-presets";

function memberStyle(accent: TeamMember["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function TeamSection() {
  const { content, direction } = useLaStradaContent();
  const { team } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      className="relative isolate overflow-hidden bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA team"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(48,169,220,0.15),transparent_30rem),radial-gradient(circle_at_84%_72%,rgba(57,181,74,0.12),transparent_32rem),linear-gradient(180deg,#050505,#070706_50%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
        >
          <motion.div
            className="soft-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full"
            variants={iconReveal()}
          >
            <UserRound aria-hidden="true" className="text-white/76" size={24} />
          </motion.div>
          <motion.h2
            className="text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-6xl lg:text-7xl"
            variants={headingReveal(direction)}
          >
            {team.title} <span className="text-[var(--brand-cyan)]">{team.titleHighlight}</span>
          </motion.h2>
          {team.subtitle ? (
            <motion.p className="mt-6 max-w-2xl text-lg leading-8 text-white/62" variants={itemReveal(0.08, 18)}>
              {team.subtitle}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          className="relative mt-14 min-w-0 sm:mt-16"
          {...revealMotion(shouldReduceMotion, cardReveal(0.08, 28), itemViewport)}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-black to-transparent sm:w-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-black to-transparent sm:w-20"
            aria-hidden="true"
          />
          <Swiper
            dir={direction}
            modules={shouldReduceMotion ? [] : [Autoplay]}
            loop={team.members.length > 3}
            speed={shouldReduceMotion ? 0 : 850}
            autoplay={
              shouldReduceMotion
                ? false
                : {
                    delay: 1700,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            grabCursor
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              700: { slidesPerView: 1.45, spaceBetween: 16 },
              960: { slidesPerView: 2.15, spaceBetween: 18 },
              1280: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="!overflow-hidden"
          >
            {team.members.map((member) => (
              <SwiperSlide key={member.name} className="!h-auto">
                <motion.article
                  className="group kinetic-card soft-panel flex h-full min-h-[43rem] flex-col overflow-hidden rounded-[8px] p-4 sm:min-h-[45rem]"
                  style={memberStyle(member.accent)}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                >
                  <div className="relative h-[23rem] overflow-hidden rounded-[8px] bg-white/[0.035] sm:h-[25rem]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1500px) 22vw, (min-width: 1280px) 28vw, (min-width: 900px) 42vw, (min-width: 640px) 65vw, 92vw"
                        className="object-cover object-top opacity-[0.9] saturate-[1.02] transition duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.72)),radial-gradient(circle_at_22%_16%,var(--accent),transparent_45%)] opacity-[0.34]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex grow flex-col px-1 pt-6">
                    <h3 className="text-3xl font-black leading-none text-white sm:text-4xl">{member.name}</h3>
                    {member.role ? (
                      <p className="mt-4 text-xs font-black uppercase leading-6 tracking-[0.12em] text-[var(--accent)]">
                        {member.role}
                      </p>
                    ) : null}
                    {member.bio ? (
                      <p className="mt-5 line-clamp-6 text-base leading-7 text-white/60">{member.bio}</p>
                    ) : null}
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
