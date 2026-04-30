import { brand, services, sourceSite } from "@/lib/la-strada-content";

export const siteUrl = "https://www.lastrada.agency";

export const seo = {
  title: "LA STRADA | Marketing & Creative Solutions Agency",
  template: "%s | LA STRADA",
  description:
    "LA STRADA is a creative marketing agency specializing in photography, content production, motion graphics, editing, graphic design, social media, web, and digital marketing.",
  arabicDescription:
    "لاسترادا للحلول التسويقية والإبداعية تقدم خدمات التصوير، صناعة المحتوى، الموشن جرافيك، المونتاج، التصميم، إدارة السوشيال ميديا، تصميم المواقع، والتسويق الإلكتروني.",
  keywords: [
    "LA STRADA",
    "LASTRADA Agency",
    "creative agency",
    "marketing agency",
    "content production",
    "photography",
    "motion graphics",
    "video editing",
    "graphic design",
    "social media management",
    "web design",
    "digital marketing",
    "لاسترادا",
    "شركة تسويق",
    "صناعة محتوى",
    "تصوير",
    "موشن جرافيك",
    "تصميم مواقع",
    "تسويق إلكتروني",
  ],
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MarketingAgency",
      "@id": `${siteUrl}/#organization`,
      name: "LA STRADA",
      alternateName: ["LASTRADA AGENCY", "لاسترادا"],
      url: siteUrl,
      logo: absoluteUrl(brand.logo),
      image: absoluteUrl(seo.ogImage),
      email: sourceSite.email,
      description: seo.description,
      slogan: "Marketing and creative solutions with a cinematic point of view.",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JO",
          addressLocality: "Irbid",
          streetAddress: sourceSite.office.address,
        },
      },
      areaServed: ["Jordan", "Middle East"],
      contactPoint: {
        "@type": "ContactPoint",
        email: sourceSite.email,
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
      },
      sameAs: [sourceSite.facebook],
      knowsAbout: services.map((service) => service.title),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "LA STRADA",
      url: siteUrl,
      inLanguage: ["en", "ar"],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: seo.title,
      description: seo.description,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(seo.ogImage),
        width: 1200,
        height: 630,
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "LA STRADA services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@id": `${siteUrl}/#organization`,
          },
        },
      })),
    },
  ],
};
