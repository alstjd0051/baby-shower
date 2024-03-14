"use client";
import React, { useEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { CakeLoading } from "../commons/items/spinner/CakeLoading";

type Props = {};

const MainWrapper = (props: Props) => {
  return (
    <section className="h-dvh">
      <CakeLoading />
      <RightTiele />
    </section>
  );
};

export default MainWrapper;
