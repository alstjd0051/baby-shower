"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { MapPin } from "lucide-react";

type Props = {};

const Map = (props: Props) => {
  const blueIcon = icon({
    iconUrl: "/assets/BlueIcon.svg",
    iconSize: [30, 90],
  });

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
          <button>Kakao</button>
          <button>Naver</button>
        </Popup>
        {/* <Tooltip>Tooltip for Marker</Tooltip> */}
      </Marker>
      {/* <MapMarker /> */}
    </MapContainer>
  );
};

export default Map;
