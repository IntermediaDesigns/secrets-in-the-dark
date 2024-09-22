// frontend/src/components/InteractiveMap.jsx
import React, { useState } from 'react';

const InteractiveMap = ({ locations, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Crime Scene Map</h2>
      <div className="grid grid-cols-2 gap-4">
        {locations.map((location) => (
          <button
            key={location.name}
            onClick={() => handleLocationClick(location)}
            className={`p-4 rounded-lg text-left transition-colors ${
              selectedLocation === location
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-sm text-gray-300">{location.description}</p>
          </button>
        ))}
      </div>
      {selectedLocation && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2">{selectedLocation.name}</h3>
          <p className="text-sm">{selectedLocation.details}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;