import type { Metadata } from "next";
import { brand, getLaStradaContent, sourceSite } from "@/lib/la-strada-content";
import { defaultLocale, getLocalePath, type Locale } from "@/lib/locales";

export const siteUrl = "https://www.lastrada.agency";

type SeoService = {
  name: string;
  description: string;
};

type LocalizedSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  alternateLocale: string;
  imageTitle: string;
  imageSubtitle: string;
  imageDescription: string;
  imageAlt: string;
  servicesLabel: string;
  services: SeoService[];
};

function getKeywords(keywords: string) {
  return keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function getSeoServices(locale: Locale): SeoService[] {
  return getLaStradaContent(locale).solutionPillars.map((service) => ({
    name: service.title,
    description: service.description,
  }));
}

const arContent = getLaStradaContent("ar");
const enContent = getLaStradaContent("en");

const localizedSeo: Record<Locale, LocalizedSeo> = {
  ar: {
    title: arContent.meta.title,
    description: arContent.meta.description,
    keywords: getKeywords(arContent.meta.keywords),
    ogLocale: "ar_JO",
    alternateLocale: "en_US",
    imageTitle: "لاسترادا",
    imageSubtitle: "وكالة الحلول الإبداعية",
    imageDescription: "شريكك في التسويق والعلامة التجارية والاستراتيجية الرقمية",
    imageAlt: "لاسترادا وكالة الحلول الإبداعية",
    servicesLabel: "خدمات لاسترادا",
    services: getSeoServices("ar"),
  },
  en: {
    title: enContent.meta.title,
    description: enContent.meta.description,
    keywords: getKeywords(enContent.meta.keywords),
    ogLocale: "en_US",
    alternateLocale: "ar_JO",
    imageTitle: "LA STRADA",
    imageSubtitle: "Creative Solutions",
    imageDescription: "Marketing, branding, digital strategy, premium advertising, and high-end creative direction.",
    imageAlt: "LA STRADA creative solutions agency",
    servicesLabel: "LA STRADA services",
    services: getSeoServices("en"),
  },
};

export const seo = {
  title: localizedSeo.en.title,
  template: "%s | LA STRADA",
  description: localizedSeo.en.description,
  arabicDescription: localizedSeo.ar.description,
  keywords: [...localizedSeo.en.keywords, ...localizedSeo.ar.keywords],
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function getLocalizedSeo(locale: Locale) {
  return localizedSeo[locale];
}

export function getLanguageAlternates() {
  return {
    ar: absoluteUrl(getLocalePath("ar")),
    en: absoluteUrl(getLocalePath("en")),
    "x-default": absoluteUrl(getLocalePath(defaultLocale)),
  };
}

export function getLocalizedMetadata(locale: Locale): Metadata {
  const page = localizedSeo[locale];
  const path = getLocalePath(locale);
  const ogImage = `${path}/opengraph-image`;
  const twitterImage = `${path}/twitter-image`;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: "LA STRADA",
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: "LA STRADA", url: siteUrl }],
    creator: "LA STRADA",
    publisher: "LA STRADA",
    category: "Marketing Agency",
    alternates: {
      canonical: absoluteUrl(path),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(path),
      siteName: "LA STRADA",
      type: "website",
      locale: page.ogLocale,
      alternateLocale: [page.alternateLocale],
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [
        {
          url: absoluteUrl(twitterImage),
          alt: page.imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: absoluteUrl("/brand/lastrada-logo.png"),
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
  };
}

export function getJsonLd(locale: Locale) {
  const page = localizedSeo[locale];
  const path = getLocalePath(locale);
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MarketingAgency",
        "@id": `${siteUrl}/#organization`,
        name: "LA STRADA",
        alternateName: ["LASTRADA AGENCY", "لاسترادا"],
        url: siteUrl,
        logo: absoluteUrl(brand.logo),
        image: absoluteUrl(`${path}/opengraph-image`),
        email: sourceSite.email,
        telephone: sourceSite.phone.href.replace("tel:", ""),
        description: page.description,
        slogan:
          locale === "ar"
            ? "حلول تسويقية وإبداعية برؤية سينمائية."
            : "Marketing and creative solutions with a cinematic point of view.",
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
          telephone: sourceSite.phone.href.replace("tel:", ""),
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
        sameAs: sourceSite.socialLinks.map((link) => link.href),
        knowsAbout: page.services.map((service) => service.name),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "LA STRADA",
        url: siteUrl,
        inLanguage: ["ar", "en"],
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(`${path}/opengraph-image`),
          width: 1200,
          height: 630,
        },
        inLanguage: locale,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#services`,
        name: page.servicesLabel,
        itemListElement: page.services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        })),
      },
    ],
  };
}
