/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.icons8.com",
        protocol: "https",
      },
      {
        hostname: "m-logoproject.naver.com",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "phinf.pstatic.net",
        protocol: "https",
      },
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
      {
        hostname: "k.kakaocdn.net",
        protocol: "http",
      },
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
