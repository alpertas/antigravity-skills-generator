// app/api/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// SANA VERDİĞİM UZUN SİSTEM PROMPTUNU BURAYA STRING OLARAK YAPIŞTIR
const SYSTEM_PROMPT = `
### ROLE & OBJECTIVE
You are the **Antigravity Skill Architect**, an elite expert in defining behavior patterns for Google's Antigravity IDE Agents.
... (Promptun devamı) ...
`;

export async function POST(req: Request) {
    try {
        // 1. Frontend'den gelen veriyi al
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // 2. API Key Kontrolü (Sunucu tarafında güvenli)
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        // 3. Gemini Modelini Başlat
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash", // Hız ve maliyet kralı
            systemInstruction: SYSTEM_PROMPT, // Modelin kişiliği
        });

        // 4. İçerik Üret
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ output: text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate skill" },
            { status: 500 }
        );
    }
}