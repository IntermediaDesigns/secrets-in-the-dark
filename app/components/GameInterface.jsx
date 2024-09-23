import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CharacterProfile from "./CharacterProfile";
import EvidenceLog from "./EvidenceLog";
import GameMap from "./GameMap";
import PlayerActions from "./PlayerActions";
import Tutorial from "./Tutorial";

const GameInterface = ({ gameState, onAction }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [localGameState, setLocalGameState] = useState(gameState);
  const [newEvidence, setNewEvidence] = useState(null);

  useEffect(() => {
    setLocalGameState(gameState);
  }, [gameState]);

  const handleAction = async (action) => {
    setIsLoading(true);
    setAiResponse("Processing your action...");
    setNewEvidence(null);
    try {
      console.log("GameInterface: Submitting action:", action);
      const response = await onAction(action);
      console.log("GameInterface: Response from onAction:", response);

      if (response && response.storyUpdate) {
        setAiResponse(response.storyUpdate);
        if (response.updatedGameState) {
          setLocalGameState(response.updatedGameState);
          if (response.newEvidenceAdded) {
            const newEvidenceCount =
              response.updatedGameState.playerProgress.collectedEvidence.length;
            setNewEvidence(
              response.updatedGameState.playerProgress.collectedEvidence[
                newEvidenceCount - 1
              ]
            );
          }
        }
      } else {
        setAiResponse("Action processed, but no specific update.");
      }
    } catch (error) {
      console.error("GameInterface: Error processing action:", error);
      setAiResponse("Error processing action. Please try again.");
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-col min-h-screen mb-24">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-theme px-8 py-4 flex justify-between items-center"
      >
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold mr-4">
            Murder Mystery ~
          </h1>
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
              locations={localGameState.storyElements.locations || []}
              currentLocation={localGameState.playerProgress.currentLocation}
              unlockedLocations={
                localGameState.playerProgress.unlockedLocations || []
              }
              onLocationClick={handleLocationChange}
            />
            <div className="mt-4 p-4 bg-purple-100 rounded">
              <h3 className="font-bold mb-2 text-purple-700">AI Response:</h3>
              <p className="text-gray-700">
                {isLoading ? "Processing your action..." : aiResponse}
              </p>
              {newEvidence && (
                <div className="mt-2 p-2 bg-yellow-100 rounded">
                  <p className="font-bold text-yellow-700">
                    New Evidence Found:
                  </p>
                  <p>
                    {newEvidence.item}: {newEvidence.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-200 p-4 ml-2 rounded">
            <PlayerActions onAction={handleAction} isLoading={isLoading} />
          </div>
        </motion.div>
        <div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-80 ml-4 mr-4 mt-2 bg-theme p-4 h-1/2 rounded flex flex-col"
          >
            <EvidenceLog
              evidence={localGameState.playerProgress.collectedEvidence}
              newEvidence={newEvidence}
            />
          </motion.div>
          <div className="w-80 ml-4 mt-4 bg-theme px-4 rounded pb-4 h-auto">
            <h2 className="text-xl font-bold mb-2 text-center text-purple-700 pt-4">
              Crime Scene Description
            </h2>
            <p className="text-md text-theme text-center tracking-wide bg-theme2 p-4 rounded">
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
