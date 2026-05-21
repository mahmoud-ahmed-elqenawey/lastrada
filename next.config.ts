import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { defaultLaStradaMediaBaseUrl } from "./lib/media-url";

const withNextIntl = createNextIntlPlugin();
const laStradaMediaBaseUrl = process.env.NEXT_PUBLIC_LA_STRADA_MEDIA_BASE_URL ?? defaultLaStradaMediaBaseUrl;
const laStradaMediaUrl = new URL(laStradaMediaBaseUrl);

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: laStradaMediaUrl.protocol.replace(":", "") as "http" | "https",
        hostname: laStradaMediaUrl.hostname,
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
