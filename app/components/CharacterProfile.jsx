import React from "react";

const CharacterProfile = ({ characters }) => {
  return (
    <>
      <h2 className="text-2xl font-bold p-4 mb-2 text-center text-purple-700">
        Suspects
      </h2>
      <div className="space-y-6 py-4 bg-theme2 rounded">
        {characters.map((character, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-lg mx-2">
            <h3 className="text-lg font-semibold text-black">
              {character.name}
            </h3>
            <p className="text-sm text-gray-600">{character.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterProfile;
