import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "@/components/style/EffectCards.css";
import "swiper/css";
import "swiper/css/effect-cards";
import { useCarousel } from "@/components/hooks/admin/storage";
import HamsterSpinner from "../loading/hamster";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SquarePen } from "lucide-react";
import { AuthUser } from "@/typing";

type Props = {
  loading: boolean;
  user:
    | (AuthUser & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
};

const Carousel = ({ loading, user }: Props) => {
  // const { getAdmin: getCarousel } = useMainSorage("carousel");
  const { getCarousel, isLoading, changeData } = useCarousel();
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { watch, register, handleSubmit, getValues } = useForm();
  const image = watch("images");

  const handleModifyData = (key: number) => {
    if (selectedKey === key) {
      setSelectedKey(null);
      setIsSelected(false);
    } else {
      setSelectedKey(key);
      setIsSelected(true);
    }
  };

  const validateImage = ({ id, url }: { id: number; url: string }) => {
    const image = watch("images");
    if (image && image.length > 0 && id === selectedKey) {
      return URL?.createObjectURL(image[0]);
    } else {
      return url ?? "";
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({ images }) => {
    await changeData({
      image: images,
      carousel: getCarousel,
      key: selectedKey,
    });
    return;
  };

  return (
    !loading && (
      <div className="">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="max-w-[279px] max-h-[568px] md:max-w-[379px] md:max-h-[568px] relative"
          loop={true}
        >
          {isLoading && <HamsterSpinner />}
          {getCarousel &&
            getCarousel?.map(({ name, url }, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  className="flex items-center justify-center rounded-lg"
                >
                  <Image
                    src={validateImage({ id: idx, url })}
                    priority
                    loading="eager"
                    onClick={() => handleModifyData(idx)}
                    alt={name}
                    className={`${
                      user?.selector === "admin" && "cursor-pointer"
                    } object-cover`}
                    width={500}
                    height={500}
                  />
                  {user?.selector === "admin" &&
                    selectedKey === idx &&
                    isSelected && (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="px-5 flex items-center flex-wrap"
                      >
                        <label>
                          <SquarePen className="cursor-pointer size-7 " />
                          <input {...register("images")} type="file" hidden />
                        </label>
                        <button
                          className="bg-blue-500 hover:bg-blue-300 rounded-lg px-2 py-1"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    )
  );
};

export default Carousel;
