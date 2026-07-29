"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, CheckCircle2, Minus, Plus, Zap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type EstimatorOption } from "@/lib/la-strada-i18n";
import {
  cardReveal,
  chipReveal,
  headingReveal,
  iconReveal,
  itemReveal,
  motionEase,
  revealMotion,
  staggerContainer,
} from "@/lib/motion-presets";

type ServiceTrack = "programming" | "media";
type ProgrammingKey = "projectType" | "projectSize" | "timeline";
type ProgrammingSelections = Record<ProgrammingKey, string>;
type MediaItemKey = "reel" | "post" | "photoSession" | "productionSession";

const projectBase: Record<string, number> = {
  website: 700,
  "e-commerce": 1400,
  "web-app": 1800,
  "mobile-app": 2200,
};

const projectSizeMultiplier: Record<string, number> = {
  starter: 1,
  standard: 1.45,
  advanced: 2.2,
};

const timelineMultiplier: Record<string, number> = {
  flexible: 0.9,
  normal: 1,
  fast: 1.25,
};

const mediaItems: {
  key: MediaItemKey;
  price: number;
  label: Record<"ar" | "en", string>;
}[] = [
  { key: "reel", price: 40, label: { ar: "Reel / مونتاج قصير", en: "Reel / Short Edit" } },
  { key: "post", price: 10, label: { ar: "Post / تصميم منشور", en: "Post Design" } },
  { key: "photoSession", price: 100, label: { ar: "Photo Session (3 Hours)", en: "Photo Session (3 Hours)" } },
  {
    key: "productionSession",
    price: 250,
    label: { ar: "Production Session (3 Hours)", en: "Production Session (3 Hours)" },
  },
];

const socialManagementPrice = 100;

function fieldOptions(options: Record<ProgrammingKey, EstimatorOption[]>, key: ProgrammingKey) {
  return options[key];
}

function formatNumber(value: number, language: "ar" | "en") {
  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US").format(value);
}

export function SmartEstimator() {
  const { content, direction, language } = useLaStradaContent();
  const { aiDemo } = content;
  const shouldReduceMotion = useReducedMotion();
  const [serviceTrack, setServiceTrack] = useState<ServiceTrack>("programming");
  const [showEstimate, setShowEstimate] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [programmingSelections, setProgrammingSelections] = useState<ProgrammingSelections>({
    projectType: aiDemo.options.projectType[0]?.value ?? "website",
    projectSize: aiDemo.options.projectSize[1]?.value ?? "standard",
    timeline: aiDemo.options.timeline[1]?.value ?? "normal",
  });
  const [mediaQuantities, setMediaQuantities] = useState<Record<MediaItemKey, number>>({
    reel: 0,
    post: 0,
    photoSession: 0,
    productionSession: 0,
  });
  const [includeSocialManagement, setIncludeSocialManagement] = useState(false);

  const programmingEstimate = useMemo(() => {
    const raw =
      (projectBase[programmingSelections.projectType] ?? projectBase.website) *
      (projectSizeMultiplier[programmingSelections.projectSize] ?? 1) *
      (timelineMultiplier[programmingSelections.timeline] ?? 1);

    return Math.round(raw / 50) * 50;
  }, [programmingSelections]);

  const mediaEstimate = useMemo(() => {
    const itemsTotal = mediaItems.reduce((total, item) => total + mediaQuantities[item.key] * item.price, 0);
    return itemsTotal + (includeSocialManagement ? socialManagementPrice : 0);
  }, [includeSocialManagement, mediaQuantities]);

  const estimate = serviceTrack === "programming" ? programmingEstimate : mediaEstimate;
  const formattedEstimate = formatNumber(estimate, language);
  const programmingFields: ProgrammingKey[] = ["projectType", "projectSize", "timeline"];
  const serviceTrackOptions = aiDemo.options.serviceTrack;

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="ai-demo"
      className="relative isolate overflow-hidden bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA project cost calculator"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(113,88,166,0.22),transparent_31rem),radial-gradient(circle_at_84%_78%,rgba(239,70,57,0.14),transparent_33rem),linear-gradient(180deg,#050505,#0b0b0a_55%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--brand-purple)]"
            variants={chipReveal()}
          >
            <Zap aria-hidden="true" size={16} />
            {aiDemo.badge}
          </motion.div>
          <motion.h2
            className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl"
            variants={headingReveal(direction)}
          >
            {aiDemo.title} <span className="text-[var(--brand-purple)]">{aiDemo.titleHighlight}</span>
          </motion.h2>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-white/64 sm:text-xl sm:leading-9"
            variants={itemReveal(0.08, 20)}
          >
            {aiDemo.subtitle}
          </motion.p>

          <motion.div className="mt-10 space-y-4" variants={staggerContainer(0.12, 0.045)}>
            {aiDemo.features.map((feature) => (
              <motion.div key={feature} className="flex items-center gap-3 text-white/68" variants={itemReveal()}>
                <CheckCircle2 aria-hidden="true" size={20} className="text-[var(--brand-green)]" />
                <span className="text-base font-bold">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="soft-panel rounded-[8px] p-5 sm:p-8"
          {...revealMotion(shouldReduceMotion, cardReveal(0.1, 36))}
        >
          <div className="mb-8 flex items-center gap-3">
            <motion.span
              className="soft-icon flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-cyan)]"
              variants={iconReveal(0.08)}
            >
              <Calculator aria-hidden="true" size={22} />
            </motion.span>
            <h3 className="text-2xl font-black text-white sm:text-3xl">{aiDemo.calculatorTitle}</h3>
          </div>

          <div className="space-y-7">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                {aiDemo.labels.serviceTrack}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {serviceTrackOptions.map((option) => {
                  const typedValue = option.value as ServiceTrack;
                  const isActive = serviceTrack === typedValue;

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      aria-pressed={isActive}
                      className={`min-h-14 rounded-[8px] border px-4 text-start text-sm font-black transition ${
                        isActive
                          ? "border-[var(--brand-cyan)] bg-[rgba(48,169,220,0.12)] text-white"
                          : "border-white/12 text-white/52 hover:border-white/32 hover:text-white"
                      }`}
                      onClick={() => {
                        setServiceTrack(typedValue);
                        setShowEstimate(false);
                        setIsCalculating(false);
                      }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {serviceTrack === "programming" ? (
              <>
                {programmingFields.map((field) => (
                  <div key={field}>
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                      {aiDemo.labels[field]}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {fieldOptions(aiDemo.options, field).map((option) => {
                        const isActive = programmingSelections[field] === option.value;

                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            className={`min-h-12 rounded-[8px] border px-3 text-start text-sm font-black transition ${
                              isActive
                                ? "border-[var(--brand-cyan)] bg-[rgba(48,169,220,0.12)] text-white"
                                : "border-white/12 text-white/52 hover:border-white/32 hover:text-white"
                            }`}
                            onClick={() => {
                              setProgrammingSelections((current) => ({ ...current, [field]: option.value }));
                              setShowEstimate(false);
                              setIsCalculating(false);
                            }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                          >
                            {option.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                  {aiDemo.labels.mediaServices}
                </p>
                <div className="grid gap-3">
                  {mediaItems.map((item) => (
                    <div
                      key={item.key}
                      className="grid gap-3 rounded-[8px] border border-white/12 bg-white/[0.025] p-3 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <p className="text-sm font-black text-white">{item.label[language]}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/38">
                          {item.price} {aiDemo.currency}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="soft-icon flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white"
                          aria-label={language === "ar" ? `تقليل ${item.label.ar}` : `Decrease ${item.label.en}`}
                          onClick={() => {
                            setMediaQuantities((current) => ({
                              ...current,
                              [item.key]: Math.max(0, current[item.key] - 1),
                            }));
                            setShowEstimate(false);
                          }}
                        >
                          <Minus aria-hidden="true" size={16} />
                        </button>
                        <span className="min-w-8 text-center text-lg font-black text-white">
                          {formatNumber(mediaQuantities[item.key], language)}
                        </span>
                        <button
                          type="button"
                          className="soft-icon flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white"
                          aria-label={language === "ar" ? `زيادة ${item.label.ar}` : `Increase ${item.label.en}`}
                          onClick={() => {
                            setMediaQuantities((current) => ({ ...current, [item.key]: current[item.key] + 1 }));
                            setShowEstimate(false);
                          }}
                        >
                          <Plus aria-hidden="true" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    aria-pressed={includeSocialManagement}
                    className={`rounded-[8px] border p-3 text-start transition ${
                      includeSocialManagement
                        ? "border-[var(--brand-cyan)] bg-[rgba(48,169,220,0.12)]"
                        : "border-white/12 bg-white/[0.025] hover:border-white/32"
                    }`}
                    onClick={() => {
                      setIncludeSocialManagement((current) => !current);
                      setShowEstimate(false);
                    }}
                  >
                    <span className="block text-sm font-black text-white">Social Media Management</span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-white/38">
                      {socialManagementPrice} {aiDemo.currency}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              className="cinema-button cinema-button-primary w-full"
              disabled={isCalculating}
              onClick={() => {
                setIsCalculating(true);
                if (timerRef.current !== null) {
                  window.clearTimeout(timerRef.current);
                }
                timerRef.current = window.setTimeout(() => {
                  setShowEstimate(true);
                  setIsCalculating(false);
                }, shouldReduceMotion ? 0 : 420);
              }}
            >
              {isCalculating ? aiDemo.calculating : aiDemo.calculateButton}
              <Calculator aria-hidden="true" size={18} />
            </button>

            <div className="soft-row p-5" aria-live="polite">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/38">{aiDemo.estimatedCost}</p>
              <p className="mt-3 overflow-hidden text-4xl font-black leading-none text-[var(--brand-yellow)] sm:text-5xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={showEstimate ? formattedEstimate : "empty-estimate"}
                    className={showEstimate ? "block" : "block text-base leading-7 text-white/52 sm:text-lg"}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.28, ease: motionEase }}
                  >
                    {showEstimate
                      ? `${formattedEstimate} ${aiDemo.currency}`
                      : language === "ar"
                        ? "اضغط على زر الحساب لعرض التكلفة."
                        : "Press calculate to view the estimate."}
                  </motion.span>
                </AnimatePresence>
              </p>
              <p className="mt-4 text-sm leading-6 text-white/46">{aiDemo.disclaimer}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
