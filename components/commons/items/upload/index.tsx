"use client";
import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useMainSorage } from "@/components/hooks/admin/storage";

type Props = {};

const MainUploadPage = (props: Props) => {
  const { POSTAdmin } = useMainSorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const images = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = async ({ slug, image }) => {
    await POSTAdmin({ image: images, slug: slug || "main" });
  };

  return (
    <div className="min-h-dvh">
      <form
        className="mx-auto max-w-xl space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className={`bg-white rounded-lg shadow-md cursor-pointer flex flex-col gap-5 items-center justify-center relative h-[50dvh] ${
            images
              ? "flex items-center"
              : "p-6 w-full  border-2 border-dashed border-[#cacaca]"
          } `}
        >
          {images?.length > 0 && (
            <div className="flex items-center flex-wrap overflow-hidden">
              {Object.keys(images).map((item, idx) => (
                <Image
                  key={idx}
                  src={URL.createObjectURL(images[item])}
                  alt={""}
                  className="w-full h-full md:size-32"
                  width={500}
                  height={500}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center">
            {images?.length < 1 && (
              <>
                <Image
                  src={"/assets/img/formImg.svg"}
                  alt="formImage"
                  width={500}
                  priority
                  height={500}
                  className="h-[80px] fill-[#4b5563]"
                />
              </>
            )}
          </div>
          <div className="flex items-center justify-center">
            {images?.length == 0 && (
              <span className="font-normal text-[#4b5563]">
                Click to upload image
              </span>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              {...register("image", {
                required: true,
              })}
            />
          </div>
        </label>
        <button
          type="submit"
          className="w-full py-5 rounded-lg font-semibold text-xl bg-blue-500 hover:bg-blue-300 z-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MainUploadPage;
