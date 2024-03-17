"use client";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { useMainSorage } from "../hooks/admin/storage";
import MainImages from "../commons/items/main/images";
import Carousel from "../commons/items/swiper/carousel";
import DateAndLocation from "../commons/items/main/dlocation";
import { CakeLoading } from "../commons/items/spinner/CakeLoading";

type Props = {};

const MainWrapper = (props: Props) => {
  const { getAdmin } = useMainSorage("main");
  const { getAdmin: getCarousel } = useMainSorage("carousel");
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000);

    if (loading) {
      timer;
    }

    return () => clearTimeout(timer);
  }, [loading]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen relative mx-auto grid grid-cols-1 items-center gap-y-10 overflow-hidden pt-10">
      {loading && <CakeLoading />}
      <MainImages getAdmin={getAdmin} loading={loading} />
      <Suspense fallback={null}>
        <Carousel getAdmin={getCarousel} loading={loading} />
      </Suspense>
      <div className=" absolute top-10 right-5 md:right-20">
        <RightTiele windowSize={windowSize} loading={loading} />
        <DateAndLocation windowSize={windowSize} loading={loading} />
      </div>
    </section>
  );
};

export default MainWrapper;
