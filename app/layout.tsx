import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
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
  title: "La Strada | Marketing & Creative Solutions",
  description:
    "La Strada is a marketing and creative solutions company specializing in content production, motion graphics, design, social media, web, and digital marketing.",
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
