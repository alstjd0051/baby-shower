import React, { useEffect, useState } from "react";
import { icon } from "leaflet";
import { Marker as LMakrer } from "react-leaflet";

type Props = {};

const MapMarker = (props: Props) => {
  const getProjectList = [{ x: 37.56, y: 126.97 }];
  const [mapMarker, setMapMarker] = useState<null | React.ReactElement>(null);

  const getDynamicMaker = () => {
    const blueIcon = icon({
      iconUrl: "/assets/BlueIcon.svg",
      iconSize: [30, 90],
    });

    setMapMarker(
      <>
        {getProjectList.map(({ x, y }, idx) => (
          <LMakrer alt="Here" key={idx} position={[x, y]} icon={blueIcon} />
        ))}
      </>
    );
  };

  useEffect(() => {
    getDynamicMaker();
  }, []);

  return mapMarker;
};

export default MapMarker;
