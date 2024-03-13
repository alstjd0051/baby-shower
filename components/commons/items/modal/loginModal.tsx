"use client";
import { useIcons } from "@/components/hooks/icons";
import { useSignInModal } from "@/components/hooks/modal";
import { XIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const LoginModal = (props: Props) => {
  const { isModalOpen, setCloseModal } = useSignInModal();
  const { getIcons, Icon } = useIcons();
  useEffect(() => {
    getIcons(["google", "naver"]);
  }, [getIcons]);

  return (
    isModalOpen && (
      <div className="fixed max-w-3xl bg-white h-52 top-1/2 left-1/2 -translate-x-1/2 space-y-10 -translate-y-1/2">
        <XIcon
          className="float-right cursor-pointer"
          onClick={() => setCloseModal(!isModalOpen)}
        />
        <div className="flex flex-col gap-y-5">
          {Icon?.map(({ iconUrl, title }, idx) => (
            <div
              key={idx}
              onClick={() => signIn(title)}
              className="flex items-center cursor-pointer"
            >
              <Image
                src={iconUrl}
                alt={`${title} image`}
                width={500}
                height={500}
                className="size-10 hidden md:block"
              />
              <button className="p-3 text-2xl">Sign in with {title}</button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default LoginModal;
