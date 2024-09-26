import { Client, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export const signUp = async (email, password, name) => {
  try {
    // First, create the user account
    const user = await account.create(ID.unique(), email, password, name);
    console.log("User created:", user);

    // Then, create a session for the new user
    try {
      const session = await account.createEmailSession(email, password);
      console.log("Session created:", session);
      return { user, session };
    } catch (sessionError) {
      console.error("Error creating session:", sessionError);
      // Return the user even if session creation fails
      return { user, sessionError };
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    console.log("Session created:", session);

    // Verify the session was created
    const user = await account.get();
    console.log("User logged in:", user);

    return { user, session };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log("Current user:", user);
    return user;
  } catch (error) {
    if (error.code === 401) {
      console.log("No authenticated user found");
      return null;
    }
    console.error("Error getting current user:", error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return user !== null;
};

export const loginWithGoogle = () => {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  account.createOAuth2Session("google", redirectUrl, redirectUrl);
};