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
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_SECRET_SANITY_SECRET_TOKEN:
      process.env.NEXT_SECRET_SANITY_SECRET_TOKEN,
    NEXT_SECRET_GOOGLE_OAUTH_ID: process.env.NEXT_SECRET_GOOGLE_OAUTH_ID,
    NEXT_SECRET_GOOGLE_OAUTH_SECRET:
      process.env.NEXT_SECRET_GOOGLE_OAUTH_SECRET,
    NEXT_SECRET_NAVER_OAUTH_CLIENT_ID:
      process.env.NEXT_SECRET_NAVER_OAUTH_CLIENT_ID,
    NEXT_SECRET_NAVER_OAUTH_CLIENT_PW:
      process.env.NEXT_SECRET_NAVER_OAUTH_CLIENT_PW,
    NEXT_SECRET_KAKAO_CLIENT_ID: process.env.NEXT_SECRET_KAKAO_CLIENT_ID,
    NEXT_SECRET_KAKAO_CLIENT_SECRET:
      process.env.NEXT_SECRET_KAKAO_CLIENT_SECRET,
    NEXT_SECRET_FIREBASE_API_KEY: process.env.NEXT_SECRET_FIREBASE_API_KEY,
    NEXT_SECRET_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_SECRET_FIREBASE_AUTH_DOMAIN,
    NEXT_SECRET_FIREBASE_PROJECT_ID:
      process.env.NEXT_SECRET_FIREBASE_PROJECT_ID,
    NEXT_SECRET_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_SECRET_FIREBASE_STORAGE_BUCKET,
    NEXT_SECRET_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_SECRET_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_SECRET_FIREBASE_APP_ID: process.env.NEXT_SECRET_FIREBASE_APP_ID,
    NEXT_SECRET_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_SECRET_FIREBASE_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
