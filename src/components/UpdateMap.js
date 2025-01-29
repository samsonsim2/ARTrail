import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const UpdateMap= ({ location, zoomLevel }) => {
  const map = useMap();
 
  useEffect(() => {
    if (location) {
      map.flyTo(location, 18, { duration: 1 });
    }
  }, [location, zoomLevel, map]);

  return null; // This component doesn't render anything visible
};

export default UpdateMap;