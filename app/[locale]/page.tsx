import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CinematicHero } from "@/components/CinematicHero";
import { ScrollProgressChrome } from "@/components/ScrollProgressChrome";
import { LanguageProvider } from "@/lib/la-strada-i18n";
import { getFeaturedBrands } from "@/lib/featured-brands-data";
import { isLocale } from "@/lib/locales";
import { getPortfolioProjects } from "@/lib/portfolio-project-data";
import { isDevLightMode } from "@/lib/runtime-flags";
import { getJsonLd } from "@/lib/seo";
import { getClientTestimonials } from "@/lib/testimonials-data";

const InteractionChrome = dynamic(() =>
  import("@/components/InteractionChrome").then((module) => module.InteractionChrome),
);
const SolutionPillars = dynamic(() =>
  import("@/components/SolutionPillars").then((module) => module.SolutionPillars),
);
const PortfolioShowcase = dynamic(() =>
  import("@/components/PortfolioShowcase").then((module) => module.PortfolioShowcase),
);
const FeaturedBrands = dynamic(() =>
  import("@/components/FeaturedBrands").then((module) => module.FeaturedBrands),
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
const TeamSection = dynamic(() =>
  import("@/components/TeamSection").then((module) => module.TeamSection),
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

export const revalidate = 60;

export default async function Home({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  setRequestLocale(localeParam);
  const portfolioProjects = await getPortfolioProjects(localeParam);
  const featuredBrands = await getFeaturedBrands();
  const clientTestimonials = await getClientTestimonials(localeParam);

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
          <ScrollProgressChrome />
          {isDevLightMode ? null : <InteractionChrome />}
          <CinematicHero />
          <AgencyStory />
          <SolutionPillars />
          <PortfolioShowcase projectsOverride={portfolioProjects} />
          <FeaturedBrands brandsOverride={featuredBrands} />
          <TestimonialsReel itemsOverride={clientTestimonials} />
          <SmartEstimator />
          <PricingSequence />
          <TeamSection />
          <ContactGateway />
          <SiteFooter />
        </main>
      </LanguageProvider>
    </>
  );
}
