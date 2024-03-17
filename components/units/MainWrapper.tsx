"use client";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import RightTiele from "../commons/items/framer/rightTiele";
import { useMainImage, useMainSorage } from "../hooks/admin/storage";
import MainImages from "../commons/items/main/images";
import Carousel from "../commons/items/swiper/carousel";
import DateAndLocation from "../commons/items/main/dlocation";
import { CakeLoading } from "../commons/items/loading/CakeLoading";
import { useSession } from "next-auth/react";

type Props = {};

const MainWrapper = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000);

    if (loading) {
      timer;
    }

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <section className="min-h-screen relative mx-auto grid grid-cols-1 items-center gap-y-10 overflow-hidden pt-10">
      {loading && <CakeLoading />}
      <MainImages user={user} loading={loading} />
      <Suspense fallback={null}>
        <Carousel user={user} loading={loading} />
      </Suspense>
      <div className=" absolute top-10 right-5 md:right-20">
        <RightTiele loading={loading} />
        <DateAndLocation loading={loading} />
      </div>
    </section>
  );
};

export default MainWrapper;
