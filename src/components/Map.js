// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import MapUpdater from "./MapUpdater";

// // Fix for Leaflet icon not showing
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const Map = ({ location }) => {
//   const zoomLevel = 15; // Define your zoom level here

//   return (
//     <MapContainer
//       center={location}
//       zoom={zoomLevel}
//       style={{ height: "100vh", width: "100%" }}
//     >
//      <TileLayer
//   url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
//   attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
// />

//       <Marker position={location}>
//         <Popup>Current Location</Popup>
//       </Marker>
//       {/* Include MapUpdater to handle zooming and centering */}
//       <MapUpdater location={location} zoomLevel={zoomLevel} />
//     </MapContainer>
//   );
// };

// export default Map;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapUpdater from "./MapUpdater";

// Fix for Leaflet icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = ({ location }) => {
  const zoomLevel = 15; // Define your zoom level here
  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      /> */}

      <TileLayer
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={location}>
        <Popup>Current Location</Popup>
      </Marker>

      <MapUpdater location={location} zoomLevel={zoomLevel} />
    </MapContainer>
  );
};

export default Map;
