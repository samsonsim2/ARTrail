import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import Map from "./components/Map";
const App = () => {
  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location (Singapore)
  const mapRef = useRef(null);
  const circleRef = useRef(null);

  // Centers map to marker
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
          console.log("set view");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }, [map, location]);
    return null;
  };

  // Initialise watching of user's location
  useEffect(() => {
    console.log("test");
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleClick = () => {
    window.location.href =
      "https://camerakit-web-w-recordfeature-bbei.vercel.app/";
  };
  return (
    // Initialise Map

    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <MapContainer
        center={location}
        zoom={18}
        style={{
          height: "100%",
          width: "100",
          postion: "relative",
          top: 0,

          zIndex: 10,
        }}
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

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(86, 86, 86, 0.5)",
          padding: "10px",
          zIndex: 1000, // Ensure it’s on top of the map
        }}
      >
        <button onClick={handleClick}>Launch AR</button>
      </div>
    </div>
  );
};

export default App;
