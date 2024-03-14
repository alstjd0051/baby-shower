import { AuthProfile, AuthUser } from "./../../typing.d";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "./sanity/user";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

import { cookies } from "next/headers";
import { writeFileSync } from "fs";

declare module "next-auth" {
  interface Session {
    user: AuthUser & DefaultSession["user"];
  }
  interface Profile extends AuthProfile {}
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
      async profile(profile) {
        writeFileSync("test/google.json", JSON.stringify(profile, null, 2));
        const id = profile.sub;
        const name = profile.name;
        const image = profile.picture;
        const email = profile.email;
        const username = profile.name;

        await addUser({
          id,
          name,
          image,
          email: email || "Anonymous",
          username,
          selector: "public",
          phone: "",
          provider: "google",
        });
        return {
          id,
          name,
          image,
          email,
          username,
          selector: "public",
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NAVER_OAUTH_CLIENT_PW!,
      async profile(profile) {
        await addUser({
          id: profile.response.id,
          name: profile.response.name,
          image: profile.response.profile_image,
          email: profile.response.email || "Anonymous",
          username: profile.response.name,
          selector: "public",
          phone: profile.response.mobile || "",
          provider: "naver",
        });
        return {
          id: profile.response.id,
          name: profile.response.name,
          image: profile.response.profile_image,
          email: profile.response.email,
          username: profile.response.name,
          selector: "public",
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        const res = await addUser({
          id: String(profile.id),
          name: profile.properties.nickname,
          image: profile.properties.profile_image,
          email: profile.kakao_account?.email || "Anonymous",
          username: profile.properties.nickname,
          selector: "public",
          phone: profile.kakao_account?.phone_number || "",
          provider: "kakao",
        });
        const data = await res.json();
        if (data) {
          const { accessToken, refreshToken } = data;
          cookies().set("accessToken", accessToken);
          cookies().set("refreshToken", refreshToken);
        }

        return {
          id: String(profile.id),
          name: profile.properties.nickname,
          image: profile.properties.profile_image,
          email: profile.kakao_account?.email || "Anonymous",
          username: profile.properties.nickname,
          selector: "public",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (!user.email) return false;

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && token.selector) {
        session.user.selector = token.selector as "public" | "master";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return { ...token, ...user };
    },
  },
};
