import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
