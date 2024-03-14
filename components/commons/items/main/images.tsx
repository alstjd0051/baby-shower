import { IAdminStorage } from "@/typing";
import Image from "next/image";
import React from "react";

interface Props {
  getAdmin: IAdminStorage[] | undefined;
  getLoading: boolean;
}

const MainImages = ({ getAdmin, getLoading }: Props) => {
  return (
    <div id="wrapper" className="left-24 ">
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
