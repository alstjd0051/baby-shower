"use client";
import { Socials } from "@/components/assets/socialLogin";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUsers } from "@/components/hooks/users";
import { Fira_Code } from "next/font/google";
import SocialLogin from "../items/socialLogin";
import ThemeSwitch from "./themeSwitch";

const filraCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {};

const Header = (props: Props) => {
  const [scrolled, setScrolled] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    const listenScrollEvent = () => {
      window.scrollY >= 50
        ? setScrolled("")
        : setScrolled("text-white block shadow-md z-50");
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header
      className={`${
        !scrolled &&
        "fixed top-0 shadow-md z-50 bg-white text-black fill-yellow-600"
      } top-0 w-full flex items-center justify-between gap-x-10 px-10 py-5`}
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
