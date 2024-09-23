import React, { useState } from "react";
import { motion } from "framer-motion";
import CharacterProfile from "./CharacterProfile";
import EvidenceLog from "./EvidenceLog";
import GameMap from "./GameMap";
import PlayerActions from "./PlayerActions";

const GameInterface = ({ gameState, onAction }) => {
  const [aiResponse, setAiResponse] = useState("");

  const handleAction = async (action) => {
    setAiResponse("Processing your action...");
    try {
      const response = await onAction(action);
      setAiResponse(
        response.storyUpdate || "Action processed, but no specific update."
      );
    } catch (error) {
      setAiResponse("Error processing action. Please try again.");
    }
  };

  const handleLocationChange = (newLocation) => {
    handleAction(`Move to ${newLocation}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-4 flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">Interactive Murder Mystery</h1>
        <div className="flex items-center space-x-4">
          <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Score: {gameState.score}
          </motion.p>
        </div>
      </motion.header>
      <main className="flex-grow flex">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-1/4 bg-gray-100 p-4 overflow-y-auto"
        >
          <CharacterProfile
            characters={gameState.storyElements.suspects}
            interviewedSuspects={gameState.playerProgress.interviewedSuspects}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-1/2 flex flex-col"
        >
          <div className="flex-grow p-4 bg-white overflow-y-auto">
            <GameMap
              locations={gameState.storyElements.locations || []}
              currentLocation={gameState.playerProgress.currentLocation}
              unlockedLocations={
                gameState.playerProgress.unlockedLocations || []
              }
              onLocationClick={handleLocationChange}
            />
            <div className="mt-4 p-4 bg-purple-100 rounded">
              <h3 className="font-bold mb-2 text-purple-700">AI Response:</h3>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          </div>
          <div className="h-1/3 bg-gray-200 p-4">
            <PlayerActions onAction={handleAction} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-1/4 bg-gray-100 p-4 overflow-y-auto"
        >
          <EvidenceLog evidence={gameState.playerProgress.collectedEvidence} />
        </motion.div>
      </main>
    </div>
  );
};

export default GameInterface;
