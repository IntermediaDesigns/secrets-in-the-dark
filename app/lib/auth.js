import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export const signUp = async (email, password, name) => {
  try {
    const response = await account.create("unique()", email, password, name);
    return response;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    // If the error is due to the user not being logged in, return null instead of throwing an error
    if (error.code === 401) {
      return null;
    }
    console.error("Error getting current user:", error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch {
    return false;
  }
};

export const loginWithGoogle = () => {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  account.createOAuth2Session("google", redirectUrl, redirectUrl);
};
