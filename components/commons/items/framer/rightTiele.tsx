"use client";
import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Noto_Serif_KR, Nanum_Pen_Script, Gaegu } from "next/font/google";
const NotoSerif = Noto_Serif_KR({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  style: ["normal", "normal"],
  subsets: ["latin"],
});
const Nanumfont = Nanum_Pen_Script({
  weight: ["400"],
  subsets: ["latin"],
});

type Props = {
  loading: boolean;
  windowSize: {
    width: number;
    height: number;
  };
};

const RightTiele = ({ loading, windowSize }: Props) => {
  return (
    <div
      className={`${
        loading ? "invisible" : "visible"
      } *:font-normal  text-[#624f3c] top-10 right-10 text-[2em] *:md:text-[4em] *:text-center md:leading-[6rem] ${
        Nanumfont.className
      }`}
    >
      <p>송한별</p>
      <p>첫 생일</p>
    </div>
  );
};

export default RightTiele;
