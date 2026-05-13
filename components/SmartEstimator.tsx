"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, CheckCircle2, Zap } from "lucide-react";
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

type EstimatorKey = "projectType" | "complexity" | "timeline" | "teamSize";
type Selections = Record<EstimatorKey, string>;

const projectBase: Record<string, number> = {
  "web-app": 18000,
  "mobile-app": 26000,
  "ai-solution": 34000,
  "custom-software": 42000,
};

const complexityMultiplier: Record<string, number> = {
  simple: 1,
  medium: 1.45,
  complex: 2.1,
};

const timelineMultiplier: Record<string, number> = {
  urgent: 1.35,
  normal: 1,
  flexible: 0.9,
};

const teamMultiplier: Record<string, number> = {
  small: 1,
  medium: 1.35,
  large: 1.85,
};

function fieldOptions(options: Record<EstimatorKey, EstimatorOption[]>, key: EstimatorKey) {
  return options[key];
}

export function SmartEstimator() {
  const { content, direction, language } = useLaStradaContent();
  const { aiDemo } = content;
  const shouldReduceMotion = useReducedMotion();
  const [showEstimate, setShowEstimate] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [selections, setSelections] = useState<Selections>({
    projectType: aiDemo.options.projectType[0]?.value ?? "web-app",
    complexity: aiDemo.options.complexity[1]?.value ?? "medium",
    timeline: aiDemo.options.timeline[1]?.value ?? "normal",
    teamSize: aiDemo.options.teamSize[0]?.value ?? "small",
  });

  const estimate = useMemo(() => {
    const raw =
      (projectBase[selections.projectType] ?? projectBase["web-app"]) *
      (complexityMultiplier[selections.complexity] ?? 1) *
      (timelineMultiplier[selections.timeline] ?? 1) *
      (teamMultiplier[selections.teamSize] ?? 1);

    return Math.round(raw / 500) * 500;
  }, [selections]);

  const formattedEstimate = new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US").format(estimate);

  const fields: EstimatorKey[] = ["projectType", "complexity", "timeline", "teamSize"];

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
      aria-label="LA STRADA smart project cost estimator"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(113,88,166,0.22),transparent_31rem),radial-gradient(circle_at_84%_78%,rgba(239,70,57,0.14),transparent_33rem),linear-gradient(180deg,#050505,#0b0b0a_55%,#050505)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div
          {...revealMotion(shouldReduceMotion, staggerContainer(0.04, 0.08))}
        >
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
            {fields.map((field) => (
              <div key={field}>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white/42">
                  {aiDemo.labels[field]}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {fieldOptions(aiDemo.options, field).map((option) => {
                    const isActive = selections[field] === option.value;

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
                          setSelections((current) => ({ ...current, [field]: option.value }));
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

            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/36">
              {aiDemo.calculateButton} / {aiDemo.calculating}
            </p>

            <div className="soft-row p-5" aria-live="polite">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/38">
                {aiDemo.estimatedCost}
              </p>
              <p className="mt-3 overflow-hidden text-4xl font-black leading-none text-[var(--brand-yellow)] sm:text-5xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={showEstimate ? formattedEstimate : "empty-estimate"}
                    className="block"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.28, ease: motionEase }}
                  >
                    {showEstimate ? `${formattedEstimate} ${aiDemo.currency}` : `- ${aiDemo.currency}`}
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
