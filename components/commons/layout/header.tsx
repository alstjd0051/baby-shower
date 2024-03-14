"use client";
import { Socials } from "@/components/assets/socialLogin";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fira_Code } from "next/font/google";
import SocialLogin from "../items/socialLogin";
import ThemeSwitch from "./themeSwitch";

const filraCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {};

const Header = (props: Props) => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState<boolean>();
  useEffect(() => {
    const listenScrollEvent = () => {
      window.scrollY > 100 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header
      className={`shadow-md bg-[#ee9ca7] dark:bg-[#ee9ca7]/20 ${
        scrolled
          ? "fixed top-0  bg-white/50 text-black fill-yellow-600"
          : "unset"
      }  w-full z-50 flex items-center justify-between gap-x-10 px-10 py-5`}
    >
      <Link href={"/"} className={`text-xl font-bold  ${filraCode.className} `}>
        Byul
      </Link>
      <div className="flex items-center gap-x-5">
        <SocialLogin session={session} />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
