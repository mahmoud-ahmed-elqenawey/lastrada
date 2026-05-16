"use client";

import { useLocale, useMessages } from "next-intl";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  defaultLocale,
  getAlternateLocale,
  getDirection,
  getLocalePath,
  isLocale,
  type Direction,
  type Locale,
} from "@/lib/locales";

export type { Direction };
export type Language = Locale;
export type Accent = "blue" | "cyan" | "green" | "yellow" | "red" | "purple";

export type Service = {
  title: string;
  shortTitle: string;
  description: string;
  accent: Accent;
  icon: "camera" | "film" | "sparkles" | "scissors" | "pen" | "share" | "code" | "megaphone";
};

export type SolutionPillar = {
  title: string;
  description: string;
  features: string[];
  accent: Accent;
  icon: "fingerprint" | "share" | "video" | "camera" | "target";
  image?: string;
};

export type ReelChapter = {
  frame: string;
  title: string;
  service: string;
  body: string;
  accent: Accent;
};

export type AgencyStat = {
  value: string;
  label: string;
  accent: Accent;
};

export type AgencyValue = {
  title: string;
  description: string;
  accent: Accent;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  accent: Accent;
  image?: string;
};

export type PortfolioFilter = {
  key: string;
  label: string;
};

export type PortfolioMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  label?: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  summary?: string;
  type: string;
  accent: Accent;
  cover?: PortfolioMedia;
  media?: PortfolioMedia[];
  caseStudy?: {
    overviewTitle: string;
    challengeTitle: string;
    challenge: string;
    solutionTitle: string;
    solution: string;
    deliverablesTitle: string;
    deliverables: string[];
    galleryTitle: string;
    videoTitle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
  };
};

export type Testimonial = {
  content: string;
  author: string;
  role: string;
  company: string;
  accent: Accent;
};

export type EstimatorOption = {
  value: string;
  label: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  accent: Accent;
  featured?: boolean;
  features: string[];
};

export type LaStradaContent = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  brand: {
    name: string;
    logo: string;
  };
  media: {
    heroVideo: string;
    heroVideoMobile: string;
    heroPoster: string;
  };
  sourceSite: {
    url: string;
    email: string;
    facebook: string;
    instagram: string;
    socialLinks: Array<{
      label: string;
      href: string;
    }>;
    phone: {
      display: string;
      href: string;
      whatsappLabel: string;
      whatsappHref: string;
      callLabel: string;
    };
    office: {
      country: string;
      address: string;
    };
  };
  hero: {
    brandName: string;
    agencyLabel: string;
    subtitle: string;
    tagline: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryLabel: string;
    scrollHint: string;
    sideNote: string;
    languageLabel: string;
  };
  servicesIntro: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  services: Service[];
  reelChapters: ReelChapter[];
  solutionPillarsIntro: {
    title: string;
    body: string;
  };
  solutionPillars: SolutionPillar[];
  agencyStory: {
    title: string;
    titleHighlight: string;
    body: string;
    valuesTitle: string;
    valuesBody: string;
    visionTitle: string;
    vision: string;
    stats: AgencyStat[];
    values: AgencyValue[];
  };
  team: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    members: TeamMember[];
  };
  portfolio: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    filters: PortfolioFilter[];
    projects: PortfolioProject[];
  };
  testimonials: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    trustedByTitle: string;
    items: Testimonial[];
  };
  aiDemo: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    features: string[];
    calculatorTitle: string;
    labels: {
      projectType: string;
      complexity: string;
      timeline: string;
      teamSize: string;
    };
    options: {
      projectType: EstimatorOption[];
      complexity: EstimatorOption[];
      timeline: EstimatorOption[];
      teamSize: EstimatorOption[];
    };
    calculateButton: string;
    calculating: string;
    estimatedCost: string;
    currency: string;
    disclaimer: string;
  };
  pricing: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    save: string;
    perMonth: string;
    perYear: string;
    getStarted: string;
    customTitle: string;
    customSubtitle: string;
    contactSales: string;
    plans: PricingPlan[];
  };
  contactSection: {
    title: string;
    titleHighlight: string;
    body: string;
    ctaLabel: string;
    getInTouch: string;
    emailLabel: string;
    visitLabel: string;
    businessHoursLabel: string;
    businessHours: string;
    globalPresence: string;
    startProject: string;
    socialLabel: string;
    services: string[];
    budgets: string[];
    offices: Array<{
      country: string;
      address: string;
    }>;
    form: {
      name: string;
      email: string;
      company: string;
      service: string;
      budgetRange: string;
      projectDetails: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      companyPlaceholder: string;
      detailsPlaceholder: string;
      selectService: string;
      selectBudget: string;
      sendMessage: string;
      localNotice: string;
    };
    emailHref: string;
    facebookHref: string;
  };
  finalCta: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  footer: {
    brandName: string;
    brandDescription: string;
    stayUpdated: string;
    newsletterSubtitle: string;
    emailPlaceholder: string;
    madeWith: string;
    creditLabel: string;
    copyright: string;
    categoryTitles: {
      services: string;
      company: string;
      resources: string;
      industries: string;
    };
    links: {
      services: string[];
      company: string[];
      resources: string[];
      industries: string[];
    };
    legal: {
      privacyPolicy: string;
      termsOfService: string;
      cookiePolicy: string;
      gdprCompliance: string;
    };
  };
};

type LaStradaMessages = {
  content: LaStradaContent;
};

type LanguageContextValue = {
  hash: string;
};

type LaStradaContentValue = {
  language: Language;
  direction: Direction;
  content: LaStradaContent;
  alternateLanguage: Language;
  languageSwitchHref: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const [hash, setHash] = useState("");
  const direction = getDirection(initialLanguage);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({ hash }), [hash]);

  return (
    <LanguageContext.Provider value={value}>
      <div dir={direction} lang={initialLanguage}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLaStradaContent(): LaStradaContentValue {
  const context = useContext(LanguageContext);
  const locale = useLocale();
  const messages = useMessages() as unknown as LaStradaMessages;
  const language = isLocale(locale) ? locale : defaultLocale;
  const direction = getDirection(language);
  const alternateLanguage = getAlternateLocale(language);
  const languageSwitchHref = `${getLocalePath(alternateLanguage)}${context?.hash ?? ""}`;

  return useMemo<LaStradaContentValue>(
    () => ({
      language,
      direction,
      content: messages.content,
      alternateLanguage,
      languageSwitchHref,
    }),
    [alternateLanguage, direction, language, languageSwitchHref, messages.content],
  );
}
