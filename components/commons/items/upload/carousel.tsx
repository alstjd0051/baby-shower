"use client";
import { useMainSorage } from "@/components/hooks/admin/storage";
import React from "react";

import UploadForm from "./form";
import dynamic from "next/dynamic";

type Props = {};
const Carousel = dynamic(() => import("../swiper/carousel"), { ssr: false });

const CarouselPage = (props: Props) => {
  const { getAdmin } = useMainSorage("carousel");

  return (
    <div>
      <Carousel getAdmin={getAdmin} />
      <UploadForm />
    </div>
  );
};

export default CarouselPage;
