"use client";

import type { CSSProperties } from "react";
import { UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLaStradaContent, type TeamMember } from "@/lib/la-strada-i18n";

function memberStyle(accent: TeamMember["accent"]): CSSProperties {
  return { "--accent": `var(--brand-${accent})` } as CSSProperties;
}

export function TeamSpotlight() {
  const { content } = useLaStradaContent();
  const { team } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      className="relative isolate overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
      aria-label="LA STRADA team"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(48,169,220,0.14),transparent_30rem),radial-gradient(circle_at_78%_80%,rgba(249,167,43,0.12),transparent_30rem)]" />
      <div className="film-grain absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-white/[0.03]">
              <UserRound aria-hidden="true" className="text-white/76" size={24} />
            </div>
            <h2 className="max-w-lg text-balance text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl">
              {team.title} <span className="text-[var(--brand-cyan)]">{team.titleHighlight}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/62">
              {team.subtitle}
            </p>
          </div>

          <div className="border-y border-white/12">
            {team.members.map((member, index) => (
              <motion.article
                key={member.name}
                className="grid gap-5 border-t border-white/12 py-8 first:border-t-0 sm:grid-cols-[5rem_0.62fr_1fr] sm:items-start"
                style={memberStyle(member.accent)}
                initial={shouldReduceMotion ? false : { opacity: 1, y: 26 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-3xl font-black leading-none text-white sm:text-4xl">
                    {member.name}
                  </h3>
                  <p className="mt-4 text-sm font-bold uppercase leading-6 tracking-[0.12em] text-[var(--accent)]">
                    {member.role}
                  </p>
                </div>
                <p className="text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                  {member.bio}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
