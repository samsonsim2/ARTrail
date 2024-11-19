import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
function App() {
  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location (Singapore)
  const [distance, setDistance] = useState(null);
  const [nearestStop, setNearestStop] = useState(null);
  const [distanceToNearestStop, setDistanceToNearestStop] = useState(null);

  const busStopCoordinates = [
    [1.3188789857353413, 103.91209273798522],
    [1.3188789857353413, 103.91209273798522],
    [1.3177595605005266, 103.90641570712782],
    [1.3157134731537563, 103.89549407600624],
    [1.313640259357745, 103.88488969728098],
    [1.3099505070731365, 103.87184343323136],
    [1.3092399112341206, 103.86356943577235],
    // Add more coordinates as needed
  ];
  const playAudio = () => {
    const audio = new Audio("/bell.mp3"); // Replace with your audio file path
    audio.play();
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const targetLocation = { lat: 1.3188734907137656, lng: 103.91210266711957 };
  useEffect(() => {
    console.log("test");
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        //calculate distance between current location and target location
        let currentLatLng = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const targetLatLng = L.latLng(targetLocation.lat, targetLocation.lng);
        const calculatedDistance = currentLatLng.distanceTo(targetLatLng); // distance in meters
        console.log(calculatedDistance);
        setDistance(calculatedDistance);

        // Find the nearest bus stop and calculate the distance
        let closestStop = null;
        let closestDistance = Infinity;
        const { latitude, longitude } = position.coords;
        busStopCoordinates.forEach((stop) => {
          let currentLatLng = L.latLng(
            position.coords.latitude,
            position.coords.longitude
          );
          const targetLatLng = L.latLng(targetLocation.lat, targetLocation.lng);
          const distance = currentLatLng.distanceTo(targetLatLng); // distance in meters
          if (distance < closestDistance) {
            closestDistance = distance;
            closestStop = stop;
          }
        });

        setNearestStop(closestStop);
        setDistanceToNearestStop(closestDistance.toFixed(2)); // Rounded to 2 decimal
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="App">
      <div>
        <button
          style={{ display: distanceToNearestStop <= 5 ? "block" : "none" }}
          onClick={playAudio}
        >
          Play Audio
        </button>
        {distance && <p>Distance to target: {distance.toFixed(2)} meters</p>}
        {distanceToNearestStop}
      </div>
      <Map
        location={location}
        targetLocation={targetLocation}
        busStopCoordinates={busStopCoordinates}
      />
    </div>
  );
}

export default App;
