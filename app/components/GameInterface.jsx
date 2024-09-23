import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CharacterProfile from "./CharacterProfile";
import EvidenceLog from "./EvidenceLog";
import GameMap from "./GameMap";
import PlayerActions from "./PlayerActions";
import Tutorial from "./Tutorial";

const GameInterface = ({ gameState, onAction }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    console.log("Story title:", gameState.storyElements?.title);
  }, [gameState.storyElements?.title]);

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

  const toggleTutorial = () => {
    setShowTutorial(!showTutorial);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  const fallbackTitle = "Untitled Mystery";

  return (
    <div className="flex flex-col h-screen mb-12">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-theme px-8 py-4 flex justify-between items-center"
      >
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold mr-4">Murder Mystery ~</h1>
          {(gameState.storyElements?.title || fallbackTitle) && (
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-purple-300 text-3xl font-bold italic"
            >
              {gameState.storyElements?.title || fallbackTitle}
            </motion.h2>
          )}
        </div>
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md mx-4"
            onClick={toggleTutorial}
          >
            Show Tutorial
          </motion.button>
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white"
          >
            Score: {gameState.score}
          </motion.p>
        </div>
      </motion.header>
      <main className="flex-grow flex">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-80 ml-5 mr-2 bg-theme p-4 mt-2 overflow-y-auto rounded"
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
          <div className="flex-grow p-2 ml-2 rounded overflow-y-auto mt-2">
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
          <div className="bg-gray-200 p-4 ml-2 rounded">
            <PlayerActions onAction={handleAction} />
          </div>
        </motion.div>
        <div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-80 ml-4 mt-2 bg-theme p-4 h-1/2 rounded flex flex-col"
        >
          <EvidenceLog evidence={gameState.playerProgress.collectedEvidence} />
        </motion.div>
        <div className="w-80 ml-4 mt-4 bg-theme px-4 rounded pb-4">
          <h2 className="text-xl font-bold mb-2 text-center text-purple-700 pt-4">
            Crime Scene Description
          </h2>
          <p className="text-sm text-gray-600">
            {gameState.storyElements.crimeSceneDescription ||
              "No description available."}
          </p>
        </div>
        </div>
      </main>
      {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
    </div>
  );
};

export default GameInterface;
