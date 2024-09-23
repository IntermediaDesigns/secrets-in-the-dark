import { generateStoryElements, processPlayerAction } from "./gemini";
import { saveGame } from "./appwrite";

const DEFAULT_LOCATIONS = [
  "Crime Scene",
  "Police Station",
  "Suspect's House",
  "Local Park",
  "City Hall",
];

const DEFAULT_STORY_TITLE = "The Unsolved Mystery";

const difficultySettings = {
  easy: {
    evidenceCount: 5,
    suspectCount: 3,
    turnLimit: 20,
    scoreMultiplier: 1,
  },
  medium: {
    evidenceCount: 7,
    suspectCount: 4,
    turnLimit: 15,
    scoreMultiplier: 1.5,
  },
  hard: {
    evidenceCount: 10,
    suspectCount: 5,
    turnLimit: 12,
    scoreMultiplier: 2,
  },
};

export async function initializeGame(userId, difficulty = "medium") {
  let retries = 3;
  while (retries > 0) {
    try {
      const storyElements = await generateStoryElements();

      // If locations are not provided, use default locations
      const locations =
        storyElements.locations && storyElements.locations.length > 0
          ? storyElements.locations
          : DEFAULT_LOCATIONS;

      // Ensure there's a title, use default if not provided
      const title = storyElements.title || DEFAULT_STORY_TITLE;

      const initialGameState = {
        userId,
        storyElements: {
          ...storyElements,
          locations, // Ensure locations are always present
          title, // Ensure title is always present
        },
        playerProgress: {
          currentLocation: locations[0],
          unlockedLocations: [locations[0]],
          interviewedSuspects: [],
          collectedEvidence: [],
          playerNotes: "",
        },
        gameStatus: "in_progress",
        score: 0,
        difficulty,
      };

      await saveGame(userId, initialGameState);
      return initialGameState;
    } catch (error) {
      console.error(
        `Error initializing game (${retries} retries left):`,
        error
      );
      retries--;
      if (retries === 0) {
        throw new Error(
          "Failed to initialize game after multiple attempts. Please try again later."
        );
      }
    }
  }
}

export async function performAction(userId, gameState, action) {
  try {
    console.log("Performing action:", action);

    if (action.startsWith("Move to ")) {
      const newLocation = action.replace("Move to ", "");
      console.log("Attempting to move to:", newLocation);
      
      if (gameState.playerProgress.unlockedLocations.includes(newLocation)) {
        console.log("Location is unlocked, updating game state");
        const updatedGameState = {
          ...gameState,
          playerProgress: {
            ...gameState.playerProgress,
            currentLocation: newLocation,
          },
        };
        await saveGame(userId, updatedGameState);
        return {
          updatedGameState,
          storyUpdate: `You have moved to ${newLocation}. ${getLocationDescription(newLocation)}`,
        };
      } else {
        console.log("Location is not unlocked");
        return {
          updatedGameState: gameState,
          storyUpdate: "You cannot move to that location yet. Try investigating your current location further or collecting more evidence.",
        };
      }
    }

    // For non-move actions, process with AI
    const result = await processPlayerAction(gameState, action);
    
    if (!result || !result.storyUpdate || !result.gameStateUpdates) {
      throw new Error("Invalid response from AI. Please try again.");
    }

    const updatedGameState = {
      ...gameState,
      ...result.gameStateUpdates,
      playerProgress: {
        ...gameState.playerProgress,
        ...result.gameStateUpdates.playerProgress,
      },
    };

    await saveGame(userId, updatedGameState);

    return {
      updatedGameState,
      storyUpdate: result.storyUpdate,
    };
  } catch (error) {
    console.error("Error performing action:", error);
    throw new Error("Failed to process action. Please try again later.");
  }
}

function getLocationDescription(location) {
  // You can expand this function to provide more detailed descriptions based on the location
  return `You look around ${location}. What would you like to do here?`;
}

export function checkGameCompletion(gameState) {
  const allEvidenceCollected =
    gameState.playerProgress.collectedEvidence.length ===
    gameState.storyElements.evidence.length;
  const allLocationsVisited =
    gameState.playerProgress.unlockedLocations.length ===
    gameState.storyElements.locations.length;
  const allSuspectsInterviewed =
    gameState.playerProgress.interviewedSuspects.length ===
    gameState.storyElements.suspects.length;

  if (allEvidenceCollected && allLocationsVisited && allSuspectsInterviewed) {
    return {
      isCompleted: true,
      score: calculateScore(gameState),
    };
  }

  return {
    isCompleted: false,
  };
}

function calculateScore(gameState) {
  const baseScore = 1000;
  const turnPenalty = gameState.turns * 10;
  const evidenceBonus = gameState.playerProgress.collectedEvidence.length * 50;
  const locationBonus = gameState.playerProgress.unlockedLocations.length * 30;
  const suspectBonus = gameState.playerProgress.interviewedSuspects.length * 40;

  return (
    (baseScore - turnPenalty + evidenceBonus + locationBonus + suspectBonus) *
    gameState.scoreMultiplier
  );
}
