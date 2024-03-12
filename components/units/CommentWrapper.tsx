"use client";
import React from "react";
import GuestForm from "@/components/commons/items/form";
import { useGuestBook } from "@/components/hooks/firebase/useGuestbook";
import CommentList from "../commons/comments/commentList";

type Props = {};

const CommentWrapper = (props: Props) => {
  const { getData } = useGuestBook();

  return (
    <section className="h- my-10  relative space-y-10  " id="comment">
      <CommentList getData={getData} />
      <GuestForm />
    </section>
  );
};

export default CommentWrapper;
