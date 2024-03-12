import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Socials } from "@/components/assets/socialLogin";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";
import { useUsers } from "@/components/hooks/users";

type Props = {
  session: Session | null;
};

const SocialLogin = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUsers({ id: session?.user.id! });

  return (
    <div>
      {session ? (
        <AnimatePresence>
          <div className="flex items-center gap-x-3 relative">
            <Image
              src={session.user.image!}
              width={500}
              onClick={() => setIsOpen(!isOpen)}
              alt="profile"
              height={500}
              className="size-10 rounded-full cursor-pointer"
            />
            <h1 className="text-pretty">{data?.name}</h1>

            {isOpen && (
              <>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: 50 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="absolute bg-gray-400 px-4 py-2"
                >
                  <button className="" onClick={() => signOut()}>
                    LogOut
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </AnimatePresence>
      ) : (
        <div className="flex items-center gap-x-3">
          {Socials.map(({ icon, name, url }, idx) => (
            <Image
              src={icon}
              key={idx}
              width={500}
              alt={name}
              height={500}
              onClick={() => signIn(url)}
              className="text-white size-10 cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
