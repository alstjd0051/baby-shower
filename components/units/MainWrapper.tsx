"use client";
import React from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { CakeLoading } from "../commons/items/spinner/CakeLoading";
import { useMainSorage } from "../hooks/admin/storage";

type Props = {};

const MainWrapper = (props: Props) => {
  const { getAdmin, getLoading } = useMainSorage("main");

  return (
    <section className="h-dvh">
      <CakeLoading getAdmin={getAdmin} getLoading={getLoading} />
      <RightTiele />
    </section>
  );
};

export default MainWrapper;
