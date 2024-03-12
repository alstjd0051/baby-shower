"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Map from "../commons/maps/map";

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
    <section id="map" className="h-dvh w-full overflow-hidden ">
      <div className="*:dark:text-white mx-auto max-w-fit">
        {/* Image */}
        <h1>location</h1>
        <h1>찾아오시는 길</h1>
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
