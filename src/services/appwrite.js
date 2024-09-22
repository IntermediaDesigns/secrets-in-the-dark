/* eslint-disable no-undef */
// src/services/appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

// Appwrite configuration
const APPWRITE_ENDPOINT = process.env.REACT_APP_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = process.env.REACT_APP_APPWRITE_COLLECTION_ID;

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const appwriteService = {
    createGame: async (gameData) => {
        try {
            const response = await databases.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                'unique()',
                gameData
            );
            return response;
        } catch (error) {
            console.error('Appwrite service error: createGame', error);
            throw error;
        }
    },

    getGame: async (gameId) => {
        try {
            const response = await databases.getDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                gameId
            );
            return response;
        } catch (error) {
            console.error('Appwrite service error: getGame', error);
            throw error;
        }
    },

    updateGame: async (gameId, gameData) => {
        try {
            const response = await databases.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                gameId,
                gameData
            );
            return response;
        } catch (error) {
            console.error('Appwrite service error: updateGame', error);
            throw error;
        }
    },

    deleteGame: async (gameId) => {
        try {
            await databases.deleteDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                gameId
            );
        } catch (error) {
            console.error('Appwrite service error: deleteGame', error);
            throw error;
        }
    }
};