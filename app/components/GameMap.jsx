'use client';
import React, { useEffect, useState } from 'react';

const GameMap = ({ locations = [], currentLocation, unlockedLocations = [], onLocationClick }) => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const processedLocations = locations.map((location, index) => ({
      name: location,
      isUnlocked: unlockedLocations.includes(location),
      isCurrent: location === currentLocation,
    }));
    setMapData(processedLocations);
    console.log("Processed locations:", processedLocations);
  }, [locations, currentLocation, unlockedLocations]);

  const handleLocationClick = (location) => {
    console.log("Location clicked:", location);
    if (location.isUnlocked && !location.isCurrent) {
      console.log("Calling onLocationClick with:", location.name);
      onLocationClick(location.name);
    }
  };

  if (mapData.length === 0) {
    return <div>No locations available</div>;
  }

  return (
    <div className="border-2 border-gray-300 p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Game Map</h2>
      <div className="grid grid-cols-2 gap-4">
        {mapData.map((location, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(location)}
            className={`p-2 rounded cursor-pointer ${
              location.isCurrent
                ? 'bg-blue-500 text-white'
                : location.isUnlocked
                ? 'bg-gray-200 hover:bg-gray-300'
                : 'bg-gray-400 text-gray-600'
            }`}
          >
            {location.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameMap;