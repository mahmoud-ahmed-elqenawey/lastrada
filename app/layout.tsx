import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { absoluteUrl, seo, siteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arabicBody = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-body",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const arabicDisplay = Noto_Kufi_Arabic({
  variable: "--font-arabic-display",
  subsets: ["arabic"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "LA STRADA",
  title: {
    default: seo.title,
    template: seo.template,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: "LA STRADA", url: siteUrl }],
  creator: "LA STRADA",
  publisher: "LA STRADA",
  category: "Marketing Agency",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: "LA STRADA",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_JO"],
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: "LA STRADA marketing and creative solutions agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: seo.twitterImage,
        alt: "LA STRADA marketing and creative solutions agency",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${arabicBody.variable} ${arabicDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
