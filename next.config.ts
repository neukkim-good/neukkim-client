import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // 빌드 시 ESLint 오류를 무시하도록 설정
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
