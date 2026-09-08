import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.137.1"],
  images: {
    qualities: [75, 90],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
