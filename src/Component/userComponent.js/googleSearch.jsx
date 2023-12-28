import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; 

const GoogleSearch = ({ onLocationSelect, prevLocation }) => {
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!geocoderRef.current) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiaXJmYW4zNzQiLCJhIjoiY2xwZmlqNzVyMWRuMDJpbmszdGszazMwaCJ9.7wdXsKdpOXmDR9l_ISdIqA',
        mapboxgl: mapboxgl,
        flyTo: false,
      });

      geocoderRef.current.addTo(geocoderContainerRef.current);

      geocoderRef.current.on('result', (event) => {
        onLocationSelect(event.result);
      });
    }

    // Check if geocoderRef.current is defined before setting the input
    if (geocoderRef.current && prevLocation) {
      // Set the value of the input manually
      inputRef.current.value = prevLocation;
    }
  }, [onLocationSelect, prevLocation]);

  const handleInputChange = () => {
    // Trigger the Mapbox Geocoder search on input change
    geocoderRef.current.query(inputRef.current.value);
  };

  return (
    <div className='mt-2'>
      <div
        ref={geocoderContainerRef}
        className="geocoder-container w-64 md:h-10 max-w-xs sm:h-20 mediumSm:h-12 mediumSm:w-60"
        style={{ zIndex: -1 }}
      ></div>
      {/* Regular input field for customization */}
      {prevLocation ? (
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter location..."
          className="custom-input"
          onChange={handleInputChange}
          style={{ zIndex:-1  }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default GoogleSearch;
