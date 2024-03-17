import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Socials } from "@/components/assets/socialLogin";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";
import { useUsers } from "@/components/hooks/users";
import { useSignInModal } from "@/components/hooks/modal";
import { useRouter } from "next/navigation";

type Props = {
  session: Session | null;
};

const SocialLogin = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen, setOpenModal } = useSignInModal();
  const { data, Signout } = useUsers({ id: session?.user.id! });
  const router = useRouter();

  return (
    <>
      {session ? (
        <AnimatePresence>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-x-3 group relative cursor-pointer"
          >
            <Image
              src={data?.image || session.user.image!}
              width={500}
              alt="profile"
              height={500}
              priority
              className="size-10 rounded-full cursor-pointer"
            />

            {isOpen && (
              <>
                <motion.div
                  initial={{ y: 50, x: -10 }}
                  animate={{ y: 60, x: -10 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="absolute dark:bg-white *:dark:text-black bg-black *:text-white  rounded-lg px-4 py-2 shadow-md z-50"
                >
                  <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/3 -translate-x-1/2"></div>
                  <div className="space-y-2 hover:*:underline underline-offset-8">
                    {session.user.selector === "admin" && (
                      <button
                        className=""
                        onClick={() => router.push("/admin")}
                      >
                        Admin
                      </button>
                    )}
                    <button className="" onClick={() => Signout()}>
                      LogOut
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </AnimatePresence>
      ) : (
        <div className="flex items-center gap-x-3">
          <button onClick={() => setOpenModal(!isModalOpen)}>LogIn</button>
        </div>
      )}
    </>
  );
};

export default SocialLogin;
