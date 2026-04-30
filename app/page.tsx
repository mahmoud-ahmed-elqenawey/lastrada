import { AgencyStory } from "@/components/AgencyStory";
import { CinematicHero } from "@/components/CinematicHero";
import { ContactGateway } from "@/components/ContactGateway";
import { InteractionChrome } from "@/components/InteractionChrome";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { PricingSequence } from "@/components/PricingSequence";
import { ScrollProgressChrome } from "@/components/ScrollProgressChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { SmartEstimator } from "@/components/SmartEstimator";
import { SolutionPillars } from "@/components/SolutionPillars";
import { TestimonialsReel } from "@/components/TestimonialsReel";
import { LanguageProvider } from "@/lib/la-strada-i18n";
import { jsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LanguageProvider>
        <main id="top" className="relative isolate min-h-screen overflow-x-hidden bg-[#050505] text-white">
          <ScrollProgressChrome />
          <InteractionChrome />
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
