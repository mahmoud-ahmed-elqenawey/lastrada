import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CinematicHero } from "@/components/CinematicHero";
import { ScrollProgressChrome } from "@/components/ScrollProgressChrome";
import { LanguageProvider } from "@/lib/la-strada-i18n";
import { isLocale } from "@/lib/locales";
import { isDevLightMode } from "@/lib/runtime-flags";
import { getJsonLd } from "@/lib/seo";

const InteractionChrome = dynamic(() =>
  import("@/components/InteractionChrome").then((module) => module.InteractionChrome),
);
const SolutionPillars = dynamic(() =>
  import("@/components/SolutionPillars").then((module) => module.SolutionPillars),
);
const PortfolioShowcase = dynamic(() =>
  import("@/components/PortfolioShowcase").then((module) => module.PortfolioShowcase),
);
const AgencyStory = dynamic(() =>
  import("@/components/AgencyStory").then((module) => module.AgencyStory),
);
const TestimonialsReel = dynamic(() =>
  import("@/components/TestimonialsReel").then((module) => module.TestimonialsReel),
);
const SmartEstimator = dynamic(() =>
  import("@/components/SmartEstimator").then((module) => module.SmartEstimator),
);
const PricingSequence = dynamic(() =>
  import("@/components/PricingSequence").then((module) => module.PricingSequence),
);
const ContactGateway = dynamic(() =>
  import("@/components/ContactGateway").then((module) => module.ContactGateway),
);
const SiteFooter = dynamic(() =>
  import("@/components/SiteFooter").then((module) => module.SiteFooter),
);

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  setRequestLocale(localeParam);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLd(localeParam)).replace(/</g, "\\u003c"),
        }}
      />
      <LanguageProvider initialLanguage={localeParam}>
        <main id="top" className="relative isolate min-h-screen overflow-x-hidden bg-[#050505] text-white">
          {isDevLightMode ? null : <ScrollProgressChrome />}
          {isDevLightMode ? null : <InteractionChrome />}
          <CinematicHero />
          <SolutionPillars />
          <PortfolioShowcase />
          <AgencyStory />
          <TestimonialsReel />
          <SmartEstimator />
          <PricingSequence />
          <ContactGateway />
          <SiteFooter />
        </main>
      </LanguageProvider>
    </>
  );
}
