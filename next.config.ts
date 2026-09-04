import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["10.117.148.210"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
