"use client";
import React from "react";
import { motion } from "framer-motion";
import { Noto_Serif_KR } from "next/font/google";

const NotoSerif = Noto_Serif_KR({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  style: ["normal", "normal"],
  subsets: ["latin"],
});

type Props = {};

const MainWrapper = (props: Props) => {
  return (
    <section className="h-dvh">
      <motion.div
        className={`float-right *:font-bold *:md:text-[3vw] *:text-center ${NotoSerif.className}`}
        initial={{ x: 0, y: 0 }}
        animate={{ x: 0, y: 40 }}
      >
        <div className="border-black rounded-full border-[4px]">
          <p>송한별</p>
          <p className="font-black">첫 생일</p>
        </div>
      </motion.div>
    </section>
  );
};

export default MainWrapper;
