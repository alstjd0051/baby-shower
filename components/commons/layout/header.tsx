"use client";
import { Socials } from "@/components/assets/socialLogin";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUsers } from "@/components/hooks/users";
import { Fira_Code } from "next/font/google";
import SocialLogin from "../items/socialLogin";

const filraCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {};

const Header = (props: Props) => {
  const [scrolled, setScrolled] = useState<string>(
    "*:text-white shadow-md z-50"
  );
  const { data: session } = useSession();
  useEffect(() => {
    const listenScrollEvent = () => {
      window.scrollY >= 150
        ? setScrolled(
            "fixed top-0 shadow-md z-50 bg-transparent z-50 bg-white text-black"
          )
        : setScrolled("block shadow-md z-50 ");
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header
      className={`${scrolled} top-0 w-full flex items-center justify-between px-10 py-5`}
    >
      <Link href={"/"} className={`text-xl font-bold ${filraCode.className} `}>
        Byul
      </Link>
      <SocialLogin session={session} />
    </header>
  );
};

export default Header;
