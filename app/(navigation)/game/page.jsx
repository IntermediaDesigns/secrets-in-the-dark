"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import GameInterface from "../../components/GameInterface";
import Footer from "../../components/Footer";
import Tutorial from "../../components/Tutorial";
import GameSetup from "../../components/GameSetup";
import { initializeGame, performAction } from "../../lib/gameLogic";
import {
  loadSavedGames,
  isAuthenticated,
  getCurrentUser,
} from "../../lib/appwrite";
import { checkAchievements } from "../../lib/achievements";

const GamePage = () => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await isAuthenticated();
        if (!auth) {
          router.push("/login");
          return;
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setError("Failed to authenticate. Please try logging in again.");
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleStartGame = useCallback(async (difficulty) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("No user found");

      const initialGameState = await initializeGame(user.$id, difficulty);
      setGameState(initialGameState);
      setShowSetup(false);
      setShowTutorial(true);
    } catch (err) {
      console.error("Error starting game:", err);
      setError(err.message || "Failed to start the game. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAction = useCallback(
    async (action) => {
      if (!gameState) return;

      setLoading(true);
      try {
        const { updatedGameState, storyUpdate } = await performAction(
          gameState.userId,
          gameState,
          action
        );
        setGameState(updatedGameState);
        // Handle storyUpdate (e.g., display it to the user)
      } catch (err) {
        console.error("Error processing action:", err);
        setError(err.message || "Failed to process action. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [gameState]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundImage: "url('/bkg.png')" }}>
        <iframe
          src="https://lottie.host/embed/df38b62f-5fac-4390-96d5-7c21dc4932b2/toBniWeTO7.lottie"
          className="w-96 h-96"
        ></iframe>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const updateGameState = (newAction) => {
    // Update the game state based on the new action
    setGameState((prevState) => ({
      ...prevState,
      // Update the relevant parts of the game state
    }));
  };

  return (
    <div
      className="flex flex-col min-h-screen pt-36"
      style={{ backgroundImage: "url('/bkg.png')" }}
    >
      <main
        className={`flex-grow`}
      >
        {showSetup && <GameSetup onStartGame={handleStartGame} />}
        {showTutorial && <Tutorial onComplete={() => setShowTutorial(false)} />}
        {gameState && (
          <GameInterface
            gameState={gameState}
            onAction={updateGameState}
            updateGameState={updateGameState}
          />
        )}
      </main>
      {gameState && <Footer gameState={gameState} />}
    </div>
  );
};

export default GamePage;
