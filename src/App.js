import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import Map from "./components/Map";
const App = () => {
  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location (Singapore)
  const mapRef = useRef(null);
  const circleRef = useRef(null);

  const getPostiion = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        setLocation([position.coords.latitude, position.coords.longitude]);
        console.log("your location is");
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  const CenterToLocation = () => {
    const map = useMap();

    useEffect(() => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 18);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }, [map,location]);

    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPostiion();
  
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    // Initialise Map
    <MapContainer
      center={location}
      zoom={18}
      style={{ height: "100vh", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <CenterToLocation />
      <Marker position={location}></Marker>
      <Circle ref={circleRef} center={location}></Circle>
    </MapContainer>
  );
};

export default App;
