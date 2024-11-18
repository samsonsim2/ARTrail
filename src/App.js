import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
function App() {
  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location (Singapore)
  const [distance, setDistance] = useState(null);
  const playAudio = () => {
    const audio = new Audio("/bell.mp3"); // Replace with your audio file path
    audio.play();
  };
 
  const targetLocation = { lat:    1.3180789479021646, lng:103.91234861705682 };
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        //calculate distance between current location and target location
        let currentLatLng  =L.latLng(position.coords.latitude,position.coords.longitude); 
        const targetLatLng = L.latLng(targetLocation.lat, targetLocation.lng);
        const calculatedDistance = currentLatLng.distanceTo(targetLatLng); // distance in meters
        console.log(calculatedDistance)
        setDistance(calculatedDistance);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="App">
      <div>
        <button style={{ display: distance <= 15 ? 'block' : 'none' }} onClick={playAudio}>Play Audio</button>
        {distance && <p>Distance to target: {distance.toFixed(2)} meters</p>}
      </div>
      <Map location={location} targetLocation={targetLocation} />
    </div>
  );
}

export default App;
