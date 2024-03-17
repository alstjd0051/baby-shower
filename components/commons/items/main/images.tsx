import { IAdminStorage } from "@/typing";
import Image from "next/image";
import React from "react";

interface Props {
  getAdmin: IAdminStorage[] | undefined;

  loading: boolean;
}

const MainImages = ({ getAdmin, loading }: Props) => {
  console.log(getAdmin);
  return (
    <div
      id="wrapper"
      className={` ${
        loading ? "invisible" : "visible"
      } mx-auto overflow-hidden max-w-[379px] max-h-[568px] shadow-xl -rotate-2 border-[10px] border-solid border-white `}
    >
      {getAdmin && (
        <Image
          src={getAdmin?.[0]?.url ?? ""}
          alt={`${getAdmin?.[0]?.name}Image`}
          className="dust"
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export default MainImages;
