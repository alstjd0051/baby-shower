"use client";
import React, { useEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { useMainSorage } from "../hooks/admin/storage";
import MainImages from "../commons/items/main/images";
import Carousel from "../commons/items/swiper/carousel";

type Props = {};

const MainWrapper = (props: Props) => {
  const { getAdmin, getLoading } = useMainSorage("main");
  const { getAdmin: getCarousel } = useMainSorage("carousel");
  const [loading, setLoading] = useState(false);

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
    <section className="h-dvh relative max-w-screen-xl mx-auto">
      {/* {loading && <CakeLoading />} */}

      <div className="relative flex flex-col">
        <MainImages
          getAdmin={getAdmin}
          getLoading={getLoading}
          loading={loading}
        />
        <Carousel getAdmin={getCarousel} loading={loading} />
      </div>
      <RightTiele />
    </section>
  );
};

export default MainWrapper;
