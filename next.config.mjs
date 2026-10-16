import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site builds to ./out and can be hosted anywhere.
  // Remove `output: 'export'` if you add server features (API routes, ISR).
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
