import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Mode 1: Architect
const ARCHITECT_PROMPT = `
### ROLE & OBJECTIVE
You are the **Antigravity Skill Architect**. Your goal is to convert user requirements into precise, production-ready \`SKILL.md\` files.

### OUTPUT FORMAT (Strict Markdown)
---
name: kebab-case-name
version: 1.0.0
description: Short summary
---

# 🎯 Goal
...

# 📋 Instructions
...

# 📦 Dependencies
...
`;

// Mode 2: Analyst
const ANALYST_PROMPT = `
### ROLE & OBJECTIVE
You are an **Expert Code Analyst** for Google Antigravity.
Your task: Analyze the provided code snippet deeply. Extract its coding conventions, naming patterns, library choices, and architectural style.

### OUTPUT GOAL
Create a \`SKILL.md\` file that teaches an AI agent how to reproduce this exact style.
- In 'Instructions', explicitly list the patterns found in the code.
- In 'Goal', write: 'Replicate the coding style and structure observed in the reference code.'
- Strictly follow the standard SKILL.md format.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt, mode } = body;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        if (prompt.length < 10 || prompt.length > 100000) {
            return NextResponse.json({ error: "Prompt must be between 10 and 100,000 characters." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const selectedSystemInstruction = mode === 'reverse' ? ANALYST_PROMPT : ARCHITECT_PROMPT;

        // Initialize SDK
        const ai = new GoogleGenAI({ apiKey });

        // Using gemini-2.0-flash for better stability and quota
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ],
            config: {
                systemInstruction: {
                    parts: [{ text: selectedSystemInstruction }]
                }
            }
        });

        // Get response
        const text = result.text || "No content";

        return NextResponse.json({ output: text });

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // Handle Rate Limiting (429)
        if (error.message?.includes("429") || error.status === 429) {
            return NextResponse.json(
                { error: "Google API Quota Exceeded. Please wait a minute and try again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Failed to generate skill" },
            { status: 500 }
        );
    }
}