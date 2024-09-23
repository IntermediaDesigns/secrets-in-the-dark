import React, { useState } from 'react';

const GameSetup = ({ onStartGame }) => {
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartGame = () => {
    onStartGame(difficulty);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Start New Game</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="difficulty">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={handleStartGame}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;