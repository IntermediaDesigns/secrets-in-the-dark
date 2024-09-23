import React from 'react';

const CharacterProfile = ({ characters }) => {
  return (
    <div className="space-y-6 pb-4 bg-theme2 rounded">
      <h2 className="text-2xl font-bold pt-2 mb-2 text-center text-purple-700">Suspects</h2>
      {characters.map((character, index) => (
        <div key={index} className="bg-white p-4 rounded shadow mx-2">
          <h3 className="text-lg font-semibold text-purple-400">{character.name}</h3>
          <p className="text-sm text-gray-600">{character.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterProfile;