import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  // //! Map
  // const [map, setMap] = useState(null);

  // const displayMap = useMemo(
  //     () => (
  //     <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} whenCreated={setMap}>
  //         <TileLayer
  //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         />
  //         {/* Loop through all countries and draw circles on map */}
  //         {showDataOnMap(countries, casesType)}
  //     </MapContainer>
  //     ),
  //     [casesType, center, zoom, countries],
  // );

  useEffect(() => {
    showDataOnMap(countries, casesType)
  }, [countries, casesType]);

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default Map;
