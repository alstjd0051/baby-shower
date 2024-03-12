"use client";
import React from "react";
import GuestForm from "@/components/commons/items/form";
import { useGuestBook } from "@/components/hooks/firebase/useGuestbook";
import CommentList from "../commons/comments/commentList";

type Props = {};

const CommentWrapper = (props: Props) => {
  const { getData } = useGuestBook();

  return (
    <section
      className="my-10 max-w-2xl mx-auto  relative space-y-10  "
      id="comment"
    >
      <div className="">
        <h1>방명록</h1>
      </div>
      <GuestForm />
      <CommentList getData={getData} />
    </section>
  );
};

export default CommentWrapper;
