"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Map from "../commons/maps/map";
import { Yatra_One, Bagel_Fat_One } from "next/font/google";

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
  const { data } = useQuery({
    queryKey: ["getMap"],
    queryFn: async () => {
      const res = await fetch("/api/map");
      const data = await res.json();
      return data;
    },
  });

  return (
    <section id="map" className="h-dvh w-full overflow-hidden space-y-10 ">
      <div className="mx-auto max-w-fit text-orange-600/60">
        {/* Image */}

        <h1
          className={`${bagelFatOne.className} text-xl text-center md:text-[3vw] `}
        >
          오시는 길
        </h1>
      </div>
      <div className="w-full block border-4 border-white border-solid h-[50dvh]  ">
        <Suspense fallback={<div>Loading...</div>}>
          <Map />
        </Suspense>
      </div>
    </section>
  );
};

export default MapWrapper;
