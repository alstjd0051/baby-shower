import { GuestBook } from "@/comment";
import React from "react";

type Props = {
  getData: GuestBook | undefined;
};

const CommentList = ({ getData }: Props) => {
  return (
    <div className="space-y-5 max-w-4xl mx-auto ">
      {getData?.comments?.map((item, idx) => (
        <div
          key={idx}
          className=" gap-x-5 bg-gray-400/40 px-5 py-2 rounded-lg "
        >
          <p className="text-pretty">{item.message}</p>
          <div className="flex items-center justify-between ">
            <h3>{item.name}</h3>
            <p>{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
