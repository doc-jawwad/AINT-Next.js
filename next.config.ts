import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aintfoundationcic.co.uk",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: true },
      { source: "/privacy-policy-2/", destination: "/privacy-policy", permanent: true },
      { source: "/book-individual", destination: "/book-private?session=individual", permanent: false },
      { source: "/book-couples", destination: "/book-private?session=couples", permanent: false },
      { source: "/book-children", destination: "/book-private?session=children", permanent: false },
      { source: "/book-group", destination: "/book-private?session=group", permanent: false },
      { source: "/book", destination: "/booking", permanent: true },
    ];
  },
};

export default nextConfig;
