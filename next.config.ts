import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // This option allows you to ignore TypeScript errors during the build process.
    // It should only be used as a temporary workaround and not as a permanent solution.
    // More info: https://nextjs.org/docs/messages/typescript-ignored-errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
