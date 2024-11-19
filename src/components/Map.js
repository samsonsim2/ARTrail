import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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

const Map = ({ location, targetLocation, busStopCoordinates }) => {
  const zoomLevel = 18; // Define your zoom level here

  // Create a custom divIcon with a colored marker
  const customIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="background-color: red; width: 30px; height: 30px; border-radius: 50%;"></div>', // Customize color here
    iconSize: [30, 30],
    iconAnchor: [15, 15], // Position the icon correctly
  });


 
 const BusStopMarkers = ({ coordinates }) => (
    <Marker position={coordinates} icon={customIcon}>
      <Popup>Current Location</Popup>
    </Marker>
  );

  // Haversine formula to calculate distance between two coordinates
useEffect(()=>{
  console.log(busStopCoordinates)
})
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
   

      {busStopCoordinates?.map((coordinates, index) => (
        <BusStopMarkers key={index} coordinates={{lat:coordinates[0],lng:coordinates[1]}} />
      ))} 

      <Polyline
        positions={busStopCoordinates}
        pathOptions={{
          color: "blue",
          weight: 4,
          opacity: 0.7,
          // Optional: dashed line
        }}
      />
      <MapUpdater location={location} zoomLevel={zoomLevel} />
    </MapContainer>
  );
};

export default Map;
