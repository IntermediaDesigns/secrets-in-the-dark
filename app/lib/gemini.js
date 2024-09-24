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
    "crimeSceneDescription": "string",
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

  // Prepare a summary of established facts and existing evidence
  const context = prepareContext(gameState);

  const prompt = `You are assisting in an interactive murder mystery game. Maintain strict consistency with the following established facts and existing evidence:

${context}

Given the current game state and player action, generate the next story beat. If the action could result in finding a clue, include only one new piece of evidence (if appropriate and consistent with established facts). Do not duplicate or contradict existing evidence. If no new clue is found or the action would contradict established facts, don't include any new evidence.

Current game state:
${JSON.stringify(gameState)}

Player action:
${action}

Respond with a JSON object containing:
1. "storyUpdate": A short paragraph describing what happens next, ensuring consistency with established facts and existing evidence
2. "newEvidence": Either null or an object with "item" and "description" if a new, consistent clue is found. Ensure this is not a duplicate of existing evidence.

Format the output as a JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw AI response:", text);

    const cleanedJSON = cleanupJSON(text);
    console.log("Cleaned JSON:", cleanedJSON);

    const parsedResult = JSON.parse(cleanedJSON);
    console.log("Parsed result:", parsedResult);

    // Verify consistency
    if (isConsistentWithFacts(parsedResult, gameState)) {
      return parsedResult;
    } else {
      throw new Error(
        "Generated content is inconsistent with established facts or existing evidence."
      );
    }
  } catch (error) {
    console.error("Error processing player action:", error);
    throw new Error(
      "Failed to process player action consistently. Please try again."
    );
  }
}

function prepareContext(gameState) {
  let context = `Crime Scene: ${gameState.storyElements.crimeSceneDescription}\n\n`;
  context += "Existing Evidence:\n";
  gameState.playerProgress.collectedEvidence.forEach((evidence) => {
    context += `- ${evidence.item}: ${evidence.description}\n`;
  });
  // Add any other relevant facts from the game state
  return context;
}

function isConsistentWithFacts(generatedContent, gameState) {
  // Implement more rigorous consistency checks
  const storyLower = generatedContent.storyUpdate.toLowerCase();

  // Check for contradictions with existing evidence
  for (let evidence of gameState.playerProgress.collectedEvidence) {
    if (
      storyLower.includes(evidence.item.toLowerCase()) &&
      !storyLower.includes(evidence.description.toLowerCase())
    ) {
      return false; // Contradiction found
    }
  }

  // Check if new evidence is actually new
  if (generatedContent.newEvidence) {
    const isDuplicate = gameState.playerProgress.collectedEvidence.some(
      (existing) =>
        existing.item.toLowerCase() ===
          generatedContent.newEvidence.item.toLowerCase() ||
        existing.description
          .toLowerCase()
          .includes(generatedContent.newEvidence.description.toLowerCase())
    );
    if (isDuplicate) {
      return false; // Duplicate evidence found
    }
  }

  return true;
}
