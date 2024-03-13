"use client";
import React from "react";
import GuestForm from "@/components/commons/items/form";
import CommentList from "../commons/comments/commentList";
import Image from "next/image";

type Props = {};

const CommentWrapper = (props: Props) => {
  return (
    <section
      className="max-w-2xl mx-auto  relative space-y-10 mb-20 "
      id="comment"
    >
      <div className="flex flex-col items-center gap-y-10">
        <Image
          src={`/assets/img/flower.png`}
          alt="flowerImg"
          width={500}
          height={500}
          className="w-50"
        />
        <h1 className="text-5xl ">방명록</h1>
      </div>
      <GuestForm />
      <CommentList />
    </section>
  );
};

export default CommentWrapper;
