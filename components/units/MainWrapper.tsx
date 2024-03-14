"use client";
import React, { useEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { CakeLoading } from "../commons/items/spinner/CakeLoading";
import { useMainSorage } from "../hooks/admin/storage";
import MainImages from "../commons/items/main/images";

type Props = {};

const MainWrapper = (props: Props) => {
  const { getAdmin, getLoading } = useMainSorage("main");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    if (loading) {
      timer;
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <section className="h-dvh relative">
      {loading ? (
        <CakeLoading />
      ) : (
        <MainImages getAdmin={getAdmin} getLoading={getLoading} />
      )}
      <RightTiele />
    </section>
  );
};

export default MainWrapper;
