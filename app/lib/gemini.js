import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables"
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

function cleanupJSON(jsonString) {
  // Remove any text before the first {
  const startIndex = jsonString.indexOf("{");
  if (startIndex !== -1) {
    jsonString = jsonString.slice(startIndex);
  }

  // Remove any text after the last }
  const endIndex = jsonString.lastIndexOf("}");
  if (endIndex !== -1) {
    jsonString = jsonString.slice(0, endIndex + 1);
  }

  // Replace any unescaped newlines, which are invalid in JSON
  jsonString = jsonString.replace(/([^\\])\\\n/g, "$1\\n");

  return jsonString;
}

export async function generateStoryElements() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a murder mystery scenario including:
  1. A catchy title for the mystery
  2. A brief description of the crime scene
  3. A list of 3-5 suspects with short descriptions
  4. A list of 5-7 key pieces of evidence
  5. A list of 4-6 locations relevant to the case
  6. The solution to the mystery (who did it and why)

  Format the output as a JSON object with the following structure:
  {
    "title": "string",
    "crimeScene": "string",
    "suspects": [{"name": "string", "description": "string"}],
    "evidence": [{"item": "string", "description": "string"}],
    "locations": ["string"],
    "solution": {"culprit": "string", "motive": "string"}
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedJSON = cleanupJSON(text);

    try {
      return JSON.parse(cleanedJSON);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      console.log("Received text:", text);
      console.log("Cleaned JSON:", cleanedJSON);
      throw new Error(
        "Failed to parse generated content as JSON. Please try again."
      );
    }
  } catch (error) {
    console.error("Error generating story elements:", error);
    throw new Error(
      "Failed to generate story elements. Please try again later."
    );
  }
}

export async function processPlayerAction(gameState, action) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Given the current game state and player action, generate the next story beat and any updates to the game state.
  
  Current game state:
  ${JSON.stringify(gameState)}
  
  Player action:
  ${action}
  
  Respond with a JSON object containing:
  1. "storyUpdate": A short paragraph describing what happens next
  2. "gameStateUpdates": An object with any changes to the game state
  
  Format the output as a JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedJSON = cleanupJSON(text);

    try {
      return JSON.parse(cleanedJSON);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      console.log("Received text:", text);
      console.log("Cleaned JSON:", cleanedJSON);
      throw new Error(
        "Failed to parse generated content as JSON. Please try again."
      );
    }
  } catch (error) {
    console.error("Error processing player action:", error);
    throw new Error("Failed to process player action. Please try again later.");
  }
}
