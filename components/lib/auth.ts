import { AuthProfile, AuthUser } from "./../../typing.d";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "./sanity/user";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
  interface Profile extends AuthProfile {}
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NAVER_OAUTH_CLIENT_PW!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (!user.email) return false;
      if (account?.provider === "naver") {
        await addUser({
          id: user.id,
          name: profile?.response?.name || "Anonymous",
          image: profile?.response?.profile_image || "",
          email: user.email || "Anonymous",
          username: user.email.split("@")[0] || "",
          phone: profile?.response?.mobile || "",
        });
      } else {
        await addUser({
          id: user.id,
          name: user.name || "Anonymous",
          image: user.image || "",
          email: user.email || "Anonymous",
          username: user.email.split("@")[0] || "",
        });
      }

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      const user = session.user;
      const { sub } = token;

      session.user = {
        ...user,
        username: user.name || user.email?.split("@")[0],
        id: (token.id as string) || (sub as string),
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
