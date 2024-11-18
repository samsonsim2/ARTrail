import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";
 
function App() {
  const [location, setLocation] =useState([1.3521, 103.8198]); // Default location (Singapore)

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="App">
     
      <Map location={location} />
    </div>
  );
}

export default App;
