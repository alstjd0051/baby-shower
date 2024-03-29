import React from "react";
import HamsterSpinner from "../items/loading/hamster";
import { useGuestBook } from "@/components/hooks/firebase/Guestbook";

type Props = {};

const CommentList = ({}: Props) => {
  const { getData, getLoading } = useGuestBook();

  return (
    <div className="space-y-5 max-w-4xl mx-auto relative">
      {getLoading && (
        <div className="">
          <HamsterSpinner />
        </div>
      )}
      {getData?.map(({ message, name, timestamp }, idx) => (
        <div
          key={idx}
          className=" gap-x-5 bg-gray-400/40 px-5 py-2 rounded-lg "
        >
          <p className="text-pretty">{message}</p>
          <div className="flex flex-col items-end">
            <h3>{name}</h3>
            <p>{timestamp}</p>
          </div>
        </div>
      ))}
      {getData?.length === 0 && (
        <div className="bg-gray-400/40 py-4 text-center rounded-lg">
          <h1>등록된 방명록이 없습니다.</h1>
        </div>
      )}
    </div>
  );
};

export default CommentList;
