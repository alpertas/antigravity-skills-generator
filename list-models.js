
const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const aiV1 = new GoogleGenAI({ apiKey, apiVersion: 'v1' });

async function listModels() {
    try {
        console.log("Listing available models...");
        const response = await ai.models.list();
        // The structure might vary, logging full response to inspect
        // Pager<types.Model>
        for await (const model of response) {
             console.log(`- ${model.name} (${model.displayName}): ${model.supportedGenerationMethods?.join(', ')}`);
        }
    } catch (error) {
        console.error("Error listing models (v1beta):", error);
    }
    
    try {
        console.log("\nListing available models (v1)...");
        const responseV1 = await aiV1.models.list();
        for await (const model of responseV1) {
             console.log(`- ${model.name}`);
        }
    } catch (error) {
        console.error("Error listing models (v1):", error);
    }
}

listModels();
