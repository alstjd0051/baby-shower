"use client";
import React, { useEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { CakeLoading } from "../commons/items/spinner/CakeLoading";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

type Props = {};

const MainWrapper = (props: Props) => {
  const { data } = useSession();

  return (
    <section className="h-dvh bg-[#ee9ca7]">
      <CakeLoading />
      <RightTiele />
    </section>
  );
};

export default MainWrapper;
