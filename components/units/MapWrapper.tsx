"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import Map from "../commons/maps/map";
import { Yatra_One, Bagel_Fat_One } from "next/font/google";
import { Link } from "lucide-react";
import { useIcons } from "../hooks/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const permanentMarker = Yatra_One({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});
const bagelFatOne = Bagel_Fat_One({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

type Props = {};

const MapWrapper = (props: Props) => {
  const { getIcons, Icon } = useIcons();
  const router = useRouter();
  useEffect(() => {
    getIcons(["navermap", "tmap", "kakaomap", "googlemap"]);
  }, [getIcons]);

  return (
    <section
      id="map"
      className="min-h-dvh w-full overflow-hidden space-y-10 px-10 "
    >
      <div className="mx-auto max-w-fit text-orange-600/60">
        <p className={`${bagelFatOne.className} text-center text-[3vw] `}>
          오시는 길
        </p>
      </div>
      <div className="w-full block border-4 border-white border-solid h-[50dvh]  ">
        <Suspense fallback={<div>Loading...</div>}>
          <Map />
        </Suspense>
      </div>
      <div className="flex items-center justify-center gap-5 flex-wrap">
        {Icon?.map(({ iconUrl, title, description }, idx) => (
          <div key={idx}>
            <Image
              src={iconUrl}
              alt={`${title} image`}
              width={500}
              height={500}
              onClick={() => router.push(description!)}
              className="size-10 md:size-20 rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MapWrapper;
