"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { useRouter } from "next/navigation";

type Props = {};

const Map = (props: Props) => {
  const blueIcon = icon({
    iconUrl: "/assets/BlueIcon.svg",
    iconSize: [30, 90],
  });
  const router = useRouter();

  return (
    <MapContainer
      center={[37.577079, 127.19151]}
      zoom={20}
      zoomAnimationThreshold={18}
      zoomAnimation={true}
      zoomControl={false}
      scrollWheelZoom={false}
      className="w-full h-full z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={blueIcon} position={[37.577079, 127.19151]}>
        <Popup>
          <button
            onClick={() =>
              router.push(
                "https://map.kakao.com/link/map/별이보러가는길,37.577079,127.19151"
              )
            }
          >
            Kakao
          </button>
        </Popup>
        <Tooltip>온파티 하남</Tooltip>
      </Marker>
      {/* <MapMarker /> */}
    </MapContainer>
  );
};

export default Map;
