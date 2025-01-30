import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import Map from "./components/Map";
const App = () => {
  const geoFences = [
    {
      id: 1,
      name: "Location A",
      lat: 1.3188734907137656,
      lng: 103.91210266711957,
      radius: 500,
    }, // San Francisco
    {
      id: 2,
      name: "Location B",
      lat: 1.3177262923880713,
      lng: 103.91245801321173,
      radius: 700,
    }, // Los Angeles
  ];

  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location (Singapore)
  const mapRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distanceToNearestStop, setDistanceToNearestStop] = useState(0);
  const [nameOfNearestStop, setNameOfNearestStop] = useState(null);
  //Sample Bus Stop
  const targetLocation = { lat: 1.3188734907137656, lng: 103.91210266711957 };

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
  //Check if user is near bustop
  const checkProximity = (lat, long) => {
    // let threshold = 50;
    // let currentLatLng = L.latLng(lat, long);
    // const targetLatLng = L.latLng(targetLocation.lat, targetLocation.lng);
    // const calculatedDistance = currentLatLng.distanceTo(targetLatLng); // distance in meters
    // setDistanceToNearestStop(calculatedDistance);
    // if (calculatedDistance < threshold) {
    //   console.log(calculatedDistance);
    //   setIsModalVisible(true);
    // } else {
    //   setIsModalVisible(false);
    // }

    let threshold = 60;
    let inside = false;
    let minDistance = Infinity;

    geoFences.forEach((fence) => {
      let currentLatLng = L.latLng(lat, long);
      let targetLatLng = L.latLng(fence.lat, fence.lng);
      let currentDistance = currentLatLng.distanceTo(targetLatLng); // distance in meters
  
      if (currentDistance < minDistance) {
        minDistance = currentDistance
        setNameOfNearestStop(fence.name);
        setDistanceToNearestStop(currentDistance);
      }

      // if (calculatedDistance < threshold) {
      //   inside = true;
      // }
    });
    console.log(nameOfNearestStop);
    if (inside) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  };

  // Initialise watching of user's location
  useEffect(() => {
    console.log("test");
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);

        checkProximity(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Redirect URL
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

        {/*Centers map on user location*/}
        <CenterToLocation />

        {/*User location*/}
        <Marker position={location}></Marker>
        <Circle center={location}></Circle>

        {/*Sample Bus Stop location*/}
        {geoFences?.map(({ lat, lng }, index) => (
          <Circle center={{ lat, lng }}></Circle>
        ))}
      </MapContainer>

      {/*Launch AR Modal*/}
      <motion.div
        initial={{ scale: 0, x: "-50%", y: "50%" }}
        animate={{ scale: isModalVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        translate=""
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",

          backgroundColor: "rgba(86, 86, 86, 0.5)",
          padding: "10px",
          zIndex: 1000, // Ensure it’s on top of the map
        }}
      >
        <button onClick={handleClick}>Launch AR</button>
      </motion.div>

      {/*debug distance*/}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50%",

          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(86, 86, 86, 0.5)",
          padding: "10px",
          zIndex: 1000, // Ensure it’s on top of the map
        }}
      >
        Distance to {nameOfNearestStop}: {distanceToNearestStop}
      </div>
    </div>
  );
};

export default App;
