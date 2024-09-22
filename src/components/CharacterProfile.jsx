// frontend/src/components/CharacterProfile.jsx

const CharacterProfile = ({ characters, onInterrogate }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Suspects</h2>
      <ul className="space-y-2">
        {characters.map((character) => (
          <li key={character.name} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{character.name}</h3>
              <p className="text-sm text-gray-400">{character.description}</p>
            </div>
            <button
              onClick={() => onInterrogate(character.name)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Interrogate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

CharacterProfile.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onInterrogate: PropTypes.func.isRequired,
};

export default CharacterProfile;