"use server";
import { Client, Account, Databases, Query } from "appwrite";
import { cookies } from "next/headers";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export async function createGameSession(userId, initialGameState) {
  try {
    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      "unique()",
      {
        userId: userId,
        gameState: JSON.stringify(initialGameState),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return { ...result, gameState: JSON.parse(result.gameState) };
  } catch (error) {
    console.error("Error creating game session:", error);
    throw error;
  }
}

export async function loadGameSession(sessionId) {
  try {
    const result = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      sessionId
    );
    return { ...result, gameState: JSON.parse(result.gameState) };
  } catch (error) {
    console.error("Error loading game session:", error);
    throw error;
  }
}

export async function updateGameSession(sessionId, updatedGameState) {
  try {
    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      sessionId,
      {
        gameState: JSON.stringify(updatedGameState),
        updatedAt: new Date().toISOString(),
      }
    );
    return { ...result, gameState: JSON.parse(result.gameState) };
  } catch (error) {
    console.error("Error updating game session:", error);
    throw error;
  }
}

export async function saveGame(userId, gameState) {
  try {
    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID,
      "unique()",
      {
        userId: userId,
        storyElements: JSON.stringify(gameState.storyElements),
        currentLocation: gameState.playerProgress.currentLocation,
        interviewedSuspects: JSON.stringify(
          gameState.playerProgress.interviewedSuspects
        ),
        collectedEvidence: JSON.stringify(
          gameState.playerProgress.collectedEvidence
        ),
        playerNotes: gameState.playerProgress.playerNotes,
        gameStatus: gameState.gameStatus,
        score: gameState.score,
        turns: gameState.turns,
        difficulty: gameState.difficulty,
        savedAt: new Date().toISOString(),
      }
    );
    return result;
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
}

export async function loadSavedGames(userId) {
  try {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID,
      [Query.equal("userId", userId), Query.orderDesc("savedAt")]
    );
    return result.documents.map((doc) => ({
      ...doc,
      storyElements: JSON.parse(doc.storyElements),
      playerProgress: {
        currentLocation: doc.currentLocation,
        interviewedSuspects: JSON.parse(doc.interviewedSuspects),
        collectedEvidence: JSON.parse(doc.collectedEvidence),
        playerNotes: doc.playerNotes,
      },
    }));
  } catch (error) {
    console.error("Error loading saved games:", error);
    throw error;
  }
}


export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    if (error.code === 401) {
      // User is not authenticated
      return null;
    }
    console.error("Error getting current user:", error);
    throw error;
  }
}

export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch {
    return false;
  }
}

export async function login(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export async function signUp(email, password, name) {
  try {
    const response = await account.create("unique()", email, password, name);
    return response;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
}

export async function loginWithGoogle() {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  account.createOAuth2Session("google", redirectUrl, redirectUrl);
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}