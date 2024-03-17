"use client";
import React, { Suspense, useEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { useMainSorage } from "../hooks/admin/storage";
import MainImages from "../commons/items/main/images";
import Carousel from "../commons/items/swiper/carousel";
import DateAndLocation from "../commons/items/main/dlocation";

type Props = {};

const MainWrapper = (props: Props) => {
  const { getAdmin } = useMainSorage("main");
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
    <section className="min-h-screen relative max-w-screen-xl mx-auto flex flex-col gap-y-10 overflow-hidden">
      {/* {loading && <CakeLoading />} */}

      <div className="w-full h-fit flex flex-wrap">
        <MainImages getAdmin={getAdmin} loading={loading} />
        <RightTiele />
      </div>

      <div className="relative flex items-center justify-end">
        <DateAndLocation />
        <Suspense fallback={null}>
          <Carousel getAdmin={getCarousel} loading={loading} />
        </Suspense>
      </div>
    </section>
  );
};

export default MainWrapper;
