"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, CheckCircle2, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type EstimatorOption } from "@/lib/la-strada-i18n";

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
  const { content, language } = useLaStradaContent();
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
          initial={shouldReduceMotion ? false : { opacity: 1, y: 32 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-14% 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--brand-purple)]">
            <Zap aria-hidden="true" size={16} />
            {aiDemo.badge}
          </div>
          <h2 className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl">
            {aiDemo.title} <span className="text-[var(--brand-purple)]">{aiDemo.titleHighlight}</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/64 sm:text-xl sm:leading-9">
            {aiDemo.subtitle}
          </p>

          <div className="mt-10 space-y-4">
            {aiDemo.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-white/68">
                <CheckCircle2 aria-hidden="true" size={20} className="text-[var(--brand-green)]" />
                <span className="text-base font-bold">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-[8px] border border-white/12 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 sm:p-8"
          initial={shouldReduceMotion ? false : { opacity: 1, y: 32 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-14% 0px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-[var(--brand-cyan)]">
              <Calculator aria-hidden="true" size={22} />
            </span>
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
                      <button
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
                      >
                        {option.label}
                      </button>
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

            <div className="rounded-[8px] border border-white/12 bg-black/28 p-5" aria-live="polite">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/38">
                {aiDemo.estimatedCost}
              </p>
              <p className="mt-3 text-4xl font-black leading-none text-[var(--brand-yellow)] sm:text-5xl">
                {showEstimate ? `${formattedEstimate} ${aiDemo.currency}` : "-"}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/46">{aiDemo.disclaimer}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
