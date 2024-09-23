import React from 'react';

const CharacterProfile = ({ characters }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 text-center text-purple-700">Suspects</h2>
      {characters.map((character, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-purple-400">{character.name}</h3>
          <p className="text-sm text-gray-600">{character.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterProfile;