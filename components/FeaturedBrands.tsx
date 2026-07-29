"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLaStradaContent, type FeaturedBrand } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  itemViewport,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

function brandStyle(accent: FeaturedBrand["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

type FeaturedBrandsProps = {
  brandsOverride?: FeaturedBrand[];
};

export function FeaturedBrands({ brandsOverride }: FeaturedBrandsProps) {
  const { content, direction } = useLaStradaContent();
  const { featuredBrands } = content;
  const brands = brandsOverride ?? featuredBrands.brands;
  const shouldReduceMotion = useReducedMotion();

  if (!brands.length) {
    return null;
  }

  return (
    <section
      id="featured-brands"
      className="relative isolate overflow-hidden bg-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
      aria-label="Featured LA STRADA brands"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(113,88,166,0.18),transparent_30rem),radial-gradient(circle_at_84%_74%,rgba(249,167,43,0.12),transparent_34rem),linear-gradient(180deg,#050505,#080807_50%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="flex flex-col items-center"
            {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
          >
            <motion.div
              className="soft-icon mb-6 flex h-14 w-14 items-center justify-center rounded-full text-[var(--brand-green)]"
              variants={iconReveal()}
            >
              <BadgeCheck aria-hidden="true" size={24} />
            </motion.div>
            <motion.h2
              className="text-balance text-5xl font-black leading-[0.94] tracking-normal sm:text-6xl lg:text-7xl"
              variants={headingReveal(direction)}
            >
              {featuredBrands.title}{" "}
              <span className="text-[var(--brand-yellow)]">{featuredBrands.titleHighlight}</span>
            </motion.h2>
            <motion.p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg" variants={itemReveal(0.08, 18)}>
              {featuredBrands.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-12 min-w-0 sm:mt-14 lg:mt-16"
          {...revealMotion(shouldReduceMotion, cardReveal(0.08, 28), itemViewport)}
        >
          <div className="relative overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)_48%,rgba(255,255,255,0.06))] px-4 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] ring-1 ring-white/8 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-28"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-28"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(48,169,220,0.14),transparent_22rem),radial-gradient(circle_at_82%_74%,rgba(249,167,43,0.11),transparent_24rem)]"
              aria-hidden="true"
            />
            <Swiper
              dir={direction}
              modules={shouldReduceMotion ? [] : [Autoplay]}
              loop={brands.length > 3}
              speed={shouldReduceMotion ? 0 : 850}
              autoplay={
                shouldReduceMotion
                  ? false
                  : {
                      delay: 1200,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
              }
              grabCursor
              spaceBetween={12}
              slidesPerView={1.45}
              breakpoints={{
                520: { slidesPerView: 2.2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 14 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
                1280: { slidesPerView: 4.45, spaceBetween: 18 },
              }}
              className="relative z-10 !overflow-visible"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.name} className="!h-auto">
                  <motion.div
                    className="group relative flex h-[7.5rem] items-center justify-center overflow-hidden rounded-[8px] bg-white/[0.045] px-7 py-7 ring-1 ring-white/8 transition duration-500 hover:bg-white/[0.075] sm:h-[8.5rem] sm:px-8 lg:h-36"
                    style={brandStyle(brand.accent)}
                    aria-label={`${brand.name} - ${brand.category}`}
                    whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent),transparent_70%)] opacity-0 transition duration-500 group-hover:opacity-20"
                      aria-hidden="true"
                    />
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={220}
                        height={110}
                        unoptimized
                        className="relative z-10 h-16 w-36 object-contain opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-20 sm:w-44"
                      />
                    ) : (
                      <span className="relative z-10 text-center text-2xl font-black leading-none text-white">
                        {brand.name}
                      </span>
                    )}
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
