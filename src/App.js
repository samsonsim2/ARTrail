import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";
 
function App() {
  const [location, setLocation] = useState([1.3521, 103.8198]); // Default location: Singapore
  const [permissionError, setPermissionError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          setLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionError("Location access denied by user.");
          } else {
            setPermissionError("Error accessing location services.");
          }
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setPermissionError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="App">
     
      {permissionError ? (
        <p style={{ color: 'red' }}>{permissionError}</p>
      ) : (
        <Map location={location} />
      )}
    </div>
  );
}

export default App;
