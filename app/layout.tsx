import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/commons/layout/LayoutWrapper";
import Header from "@/components/commons/layout/header";
import NextAuthContext from "@/components/context/next-auth";
import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/commons/items/modal/loginModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "송한별 돌잔치",
  description: "송한별 돌잔치에 오신것을 환영합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} scroll-smooth`}>
        <NextAuthContext>
          <LayoutWrapper>
            <Header />
            <>{children}</>
            <LoginModal />
            <Toaster position="top-right" />
          </LayoutWrapper>
        </NextAuthContext>
      </body>
    </html>
  );
}
