import { AuthUser } from "./../../typing.d";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "./sanity/user";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
  interface Session {
    user: AuthUser & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
      async profile(profile) {
        const id = profile.sub;
        const name = profile.name;
        const image = profile.picture;
        const email = profile.email;
        const username = profile.name;
        try {
          const res = await addUser({
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
            selector: res.selector || "public",
          };
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NAVER_OAUTH_CLIENT_PW!,
      async profile(profile) {
        try {
          const res = await addUser({
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
            selector: res.selector || "public",
          };
        } catch (error) {
          throw error;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        try {
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

          return {
            id: String(profile.id),
            name: profile.properties.nickname,
            image: profile.properties.profile_image,
            email: profile.kakao_account?.email || "Anonymous",
            username: profile.properties.nickname,
            selector: res.selector || "public",
          };
        } catch (error) {
          throw error;
        }
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
      const user = session.user;
      try {
        if (session.user && token.selector) {
          session.user.selector = token.selector as "public" | "admin";
        }
        session.user = {
          ...user,
          id: (token.sub as string) || (token.id as string),
        };
        return session;
      } catch (error) {
        throw error;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }
        return { ...token, ...user };
      } catch (error) {
        throw error;
      }
    },
  },
};
