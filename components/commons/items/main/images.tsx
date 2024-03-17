import { IAdminStorage } from "@/typing";
import Image from "next/image";
import React from "react";

interface Props {
  getAdmin: IAdminStorage[] | undefined;

  loading: boolean;
}

const MainImages = ({ getAdmin, loading }: Props) => {
  return (
    <div
      className={` ${
        loading ? "invisible" : "visible"
      } mx-auto overflow-hidden max-w-[279px] max-h-[568px] md:max-w-[379px] md:max-h-[568px] shadow-xl -rotate-2 border-[10px] border-solid border-white`}
    >
      {getAdmin && (
        <Image
          priority
          src={getAdmin?.[0]?.url ?? ""}
          alt={`${getAdmin?.[0]?.name}Image`}
          className="dust"
          width={1000}
          height={1000}
        />
      )}
    </div>
  );
};

export default MainImages;
