"use client";
import { useIcons } from "@/components/hooks/icons";
import { useSignInModal } from "@/components/hooks/modal";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const LoginModal = (props: Props) => {
  const { isModalOpen, setCloseModal } = useSignInModal();
  const { getIcons, Icon } = useIcons();
  useEffect(() => {
    getIcons(["google", "naver", "kakao"]);
  }, [getIcons]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ y: "-50", x: "-50%" }}
          animate={{ y: "-50%", x: "-50%" }}
          exit={{ y: -1000, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed min-w-64 min-h-60 bg-white shadow-2xl rounded-lg  top-1/2 left-1/2 -translate-x-1/2 space-y-10 -translate-y-1/2 z-50 p-5"
        >
          <XIcon
            className="float-right cursor-pointer text-black"
            onClick={() => setCloseModal(!isModalOpen)}
          />
          <div className="flex flex-col gap-y-5 pb-6">
            {Icon?.map(({ iconUrl, title, description }, idx) => (
              <div
                key={idx}
                onClick={() => signIn(title)}
                className="flex items-center justify-center cursor-pointer "
              >
                <Image
                  src={iconUrl}
                  alt={`${title} image`}
                  width={500}
                  height={500}
                  className={description ? `size-10 block` : `w-full block`}
                />
                {description && (
                  <button className="p-3 text-black   md:text-[1.4vw]">
                    {description}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
