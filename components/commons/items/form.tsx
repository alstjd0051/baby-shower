"use client";
import { useGuestBook } from "@/components/hooks/firebase/Guestbook";
import { useSession } from "next-auth/react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "@/components/style/form.css";
import { textareaAutosize } from "@/components/hooks/form/overflow";
import { useSignInModal } from "@/components/hooks/modal";

type Props = {};

const GuestForm = ({}: Props) => {
  const { data: session } = useSession();
  const { setOpenModal, isModalOpen } = useSignInModal();
  const { postData } = useGuestBook();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const onVlaidateForm = () => {
    if (!session) {
      setError("name", {
        message: "로그인이 필요합니다.",
      });
      setOpenModal(!isModalOpen);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data: Object) => {
    if (!session) {
      setError("name", {
        message: "로그인이 필요합니다.",
      });
    }
    try {
      await postData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-black ">
      <input
        type="text"
        className="disabled:bg-gray-200 "
        {...register("name", {
          required: "이름을 입력해주세요.",
          disabled: !session?.user,
          validate: (value: string) => value.length > 2,
          maxLength: 15,
        })}
        placeholder={session ? "이름을 입력해주세요" : "로그인을 해주세요"}
      />

      {errors.name && (
        <p className="text-red-500">{`${errors.name.message}`}</p>
      )}

      <textarea
        {...register("message", {
          required: "메시지를 입력해주세요",
          validate: (value: string) => value.length > 2,
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
        onClick={onVlaidateForm}
      >
        {session ? "작성" : "로그인"}
      </button>
    </form>
  );
};

export default GuestForm;
