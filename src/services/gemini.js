/* eslint-disable no-undef */
// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateStoryWithGemini() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a murder mystery scenario including:
  1. A brief description of the crime scene
  2. A list of 4 suspects with their names and brief descriptions
  3. A list of 5 pieces of evidence found at the crime scene
  4. The identity of the actual murderer (hidden in the response)
  Format the response as a JSON object.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text);
}

export async function processActionWithGemini(action, gameState) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Given the current game state:
  ${JSON.stringify(gameState)}
  
  The player has chosen to perform this action: ${action}
  
  Generate a response that includes:
  1. The result of the action
  2. Any new information or evidence discovered
  3. Any changes to the game state
  Format the response as a JSON object.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text);
}
