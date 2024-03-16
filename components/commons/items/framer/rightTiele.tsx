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

const RightTiele = (props: Props) => {
  return (
    <motion.div
      className={`absolute right-28 top-0 *:font-normal *:md:text-[3vw]  *:text-center ${NotoSerif.className}`}
      initial={{ x: 0, y: -10 }}
      whileInView={{ x: 0, y: 70 }}
    >
      <p>송한별</p>
      <p>첫 생일</p>
    </motion.div>
  );
};

export default RightTiele;
