import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import { IAdminStorage } from "@/typing";
import "@/components/style/EffectCards.css";
import "swiper/css";
import "swiper/css/effect-cards";

type Props = {
  getAdmin: IAdminStorage[] | undefined;
  loading: boolean;
};

const Carousel = ({ getAdmin, loading }: Props) => {
  return (
    !loading && (
      <div className="  ">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className=" max-w-[279px] max-h-[568px] md:max-w-[379px] md:max-h-[568px]"
          loop={getAdmin && getAdmin?.length > 0}
        >
          {getAdmin?.map(({ name, url }, idx) => (
            <SwiperSlide
              key={idx}
              className="flex items-center justify-center rounded-lg "
            >
              <Image
                src={url}
                priority
                loading="eager"
                alt={name}
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default Carousel;
