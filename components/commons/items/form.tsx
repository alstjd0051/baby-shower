"use client";
import { useGuestBook } from "@/components/hooks/firebase/useGuestbook";
import { useSession } from "next-auth/react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
    await postData(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-gray-500/60 rounded-lg px-5 py-5 text-black "
      >
        <label htmlFor="name">
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
        </label>
        <label htmlFor="">
          <input
            type="text"
            {...register("message", {
              required: "메시지를 입력해주세요",
            })}
            placeholder="msg"
            className="w-full"
          />
          {errors.message && (
            <p className="text-red-500">{`${errors.message.message}`}</p>
          )}
        </label>
        <button
          type="submit"
          className="text-white bg-slate-700 w-full uppercase py-2 rounded-lg mt-2 hover:bg-slate-800 transition-all duration-300 ease-in-out"
          onClick={handleSubmit(onSubmit)}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
