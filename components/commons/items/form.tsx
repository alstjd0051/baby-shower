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
    setValue,
    getValues,
    getFieldState,
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
    try {
      if (!session) {
        setError("name", {
          message: "로그인이 필요합니다.",
        });
        setOpenModal(!isModalOpen);
      } else {
        setValue("name", session.user.name ?? session.user.username);
        const newData = {
          name: session.user.name ?? session.user.username,
          message: (data as { message: string }).message,
        };
        await postData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(getFieldState("name"));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 *:pl-5 *:py-3 text-black "
    >
      <input
        type="text"
        className="disabled:bg-gray-200"
        {...register("name", {
          required: "이름을 입력해주세요.",
          disabled: !session?.user,
          validate: (session) => session?.user,
          maxLength: 15,
          minLength: 2,
        })}
        placeholder={session ? "이름을 입력해주세요" : "로그인을 해주세요"}
      />

      {errors.name && (
        <p className="text-red-500">{`${errors.name.message}`}</p>
      )}

      <textarea
        {...register("message", {
          required: "메시지를 입력해주세요",
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
