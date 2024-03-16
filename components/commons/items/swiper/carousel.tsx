import React from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "@/components/style/EffectCards.css";
import { IAdminStorage } from "@/typing";

type Props = {
  getAdmin: IAdminStorage[] | undefined;
  loading: boolean;
};

const Carousel = ({ getAdmin, loading }: Props) => {
  return (
    !loading && (
      <div className="">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className=" lg:max-w-lg"
          loop={true}
        >
          {/* {renderComponents()} */}
          {getAdmin?.map(({ name, url }, idx) => (
            <SwiperSlide
              key={idx}
              className="flex items-center justify-center rounded-lg "
            >
              <Image src={url} alt={name} width={500} height={500} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default Carousel;
