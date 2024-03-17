"use client";
import { useMainImage } from "@/components/hooks/admin/storage";
import { AuthUser } from "@/typing";
import { SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import HamsterSpinner from "../loading/hamster";

interface Props {
  loading: boolean;
  user:
    | (AuthUser & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
}

const MainImages = ({ loading, user }: Props) => {
  const [showPen, setShowPen] = useState(false);
  const { getMainImg, PUTAdmin, isLoading } = useMainImage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const valiidateUser = (user: AuthUser["selector"]) => {
    if (user === "admin") {
      return setShowPen(!showPen);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({ images, slug }) => {
    return await PUTAdmin({ image: images, slug: slug || "main" });
  };

  const validateImage = () => {
    const image = watch("images");
    console.log(image);
    if (image !== undefined && image.length > 0) {
      return URL.createObjectURL(image[0]);
    }
    return getMainImg.url ?? "";
  };

  if (isLoading)
    return (
      <div className="mx-auto">
        <HamsterSpinner />
      </div>
    );

  return (
    <div
      className={` ${
        loading ? "invisible" : "visible"
      } mx-auto overflow-hidden max-w-[279px] max-h-[568px] md:max-w-[379px] md:max-h-[568px] shadow-xl -rotate-2 border-[10px] border-solid border-white relative`}
    >
      {getMainImg && (
        <Image
          priority={true}
          src={validateImage()}
          alt={`${getMainImg?.name}Image`}
          className="dust"
          width={1000}
          height={1000}
          onClick={() => valiidateUser(user?.selector!)}
        />
      )}
      {user?.selector === "admin" && showPen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 flex items-center gap-x-5"
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
    </div>
  );
};

export default MainImages;
