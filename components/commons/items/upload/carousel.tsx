"use client";
import React from "react";

import UploadForm from "./form";
import dynamic from "next/dynamic";

type Props = {};
const Carousel = dynamic(() => import("../swiper/carousel"), { ssr: false });

const CarouselPage = (props: Props) => {
  return (
    <div>
      <Carousel />
      <UploadForm />
    </div>
  );
};

export default CarouselPage;
