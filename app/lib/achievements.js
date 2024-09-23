import { databases } from './appwrite';

const achievements = {
  fastSolver: { name: "Fast Solver", description: "Solve the case in under 10 turns" },
  evidenceCollector: { name: "Evidence Collector", description: "Collect all pieces of evidence" },
  masterInterrogator: { name: "Master Interrogator", description: "Interview all suspects" },
  rookieDetective: { name: "Rookie Detective", description: "Solve your first case" },
  veteranSleuth: { name: "Veteran Sleuth", description: "Solve 10 cases" },
  hardcoreInvestigator: { name: "Hardcore Investigator", description: "Solve a case on hard difficulty" },
};

export async function checkAchievements(userId, gameState) {
  const userAchievements = await getUserAchievements(userId);
  const newAchievements = [];

  if (gameState.gameStatus === 'solved') {
    if (!userAchievements.includes('rookieDetective')) {
      newAchievements.push('rookieDetective');
    }
    
    if (gameState.turns < 10 && !userAchievements.includes('fastSolver')) {
      newAchievements.push('fastSolver');
    }
    
    if (gameState.playerProgress.collectedEvidence.length === gameState.storyElements.evidence.length && !userAchievements.includes('evidenceCollector')) {
      newAchievements.push('evidenceCollector');
    }
    
    if (gameState.playerProgress.interviewedSuspects.length === gameState.storyElements.suspects.length && !userAchievements.includes('masterInterrogator')) {
      newAchievements.push('masterInterrogator');
    }
    
    if (gameState.difficulty === 'hard' && !userAchievements.includes('hardcoreInvestigator')) {
      newAchievements.push('hardcoreInvestigator');
    }
    
    const solvedCases = await getSolvedCasesCount(userId);
    if (solvedCases >= 10 && !userAchievements.includes('veteranSleuth')) {
      newAchievements.push('veteranSleuth');
    }
  }

  if (newAchievements.length > 0) {
    await updateUserAchievements(userId, [...userAchievements, ...newAchievements]);
  }

  return newAchievements.map(a => achievements[a]);
}

async function getUserAchievements(userId) {
  // Implement this function to fetch user achievements from Appwrite
}

async function updateUserAchievements(userId, achievements) {
  // Implement this function to update user achievements in Appwrite
}

async function getSolvedCasesCount(userId) {
  // Implement this function to get the number of solved cases for a user from Appwrite
}

export function getAchievementDetails(achievementId) {
  return achievements[achievementId];
}