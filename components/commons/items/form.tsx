"use client";
import { useGuestBook } from "@/components/hooks/firebase/useGuestbook";
import { useSession } from "next-auth/react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "@/components/style/form.css";
import { textareaAutosize } from "@/components/hooks/form/overflow";

type Props = {};

const GuestForm = (props: Props) => {
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();
  const { postData } = useGuestBook();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // await postData(data);
  };

  const msg = watch("message");
  console.log(msg);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-black ">
        <input
          type="text"
          {...register("name", {
            required: "이름을 입력해주세요.",
            value: session?.user?.name,
            validate: (value) => value.length > 2,
          })}
          placeholder="이름을 입력해주세요."
        />
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}

        <textarea
          {...register("message", {
            required: "메시지를 입력해주세요",
            validate: (value) => value.length > 5,
            onChange: textareaAutosize,
          })}
          placeholder="축하의 말을 작성해주세요."
        />
        {errors.message && (
          <p className="text-red-500">{`${errors.message.message}`}</p>
        )}

        <button
          type="submit"
          className="text-white bg-[#222] w-full uppercase py-4 rounded-md mt-2 hover:bg-black transition-all duration-300 ease-in-out text-xl"
        >
          작성
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
