"use client";
import { useGuestBook } from "@/components/hooks/firebase/useGuestbook";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "@/components/style/form.css";
import useAutoResizeTextarea from "@/components/hooks/form/overflow";

type Props = {};

const GuestForm = (props: Props) => {
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const { postData } = useGuestBook();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // await postData(data);
  };

  const { textareaRef } = useAutoResizeTextarea();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-gray-500/60 rounded-lg p-5 space-y-5 text-black "
      >
        <input
          type="text"
          {...register("name", {
            required: true,
            value: session?.user?.name,
            validate: (value) => value.length > 2,
          })}
          placeholder="name"
        />
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}

        <textarea
          {...register("message", {
            required: "메시지를 입력해주세요",
          })}
          ref={textareaRef}
          placeholder="축하의 말을 작성해주세요."
          className="w-full overflow-auto min-h-32 will-change-scroll max-h-none rounded-lg border resize-none px-2 pt-2 "
        />
        {errors.message && (
          <p className="text-red-500">{`${errors.message.message}`}</p>
        )}

        <button
          type="submit"
          className="text-white bg-[#222] w-full uppercase py-4 rounded-md mt-2 hover:bg-black transition-all duration-300 ease-in-out text-xl"
          onClick={handleSubmit(onSubmit)}
        >
          작성
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
