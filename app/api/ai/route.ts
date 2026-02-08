import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

        if (!OPENROUTER_API_KEY) {
            console.error("❌ API Error: OPENROUTER_API_KEY is missing in environment variables.");
            return NextResponse.json(
                { error: "Configuration Error: API Key is missing on server." }, 
                { status: 500 }
            );
        }

        const body = await req.json();
        const { prompt, systemPrompt, history = [] } = body;

        const messages = [
            { "role": "system", "content": systemPrompt || "You are a professional assistant." },
            ...history,
            { "role": "user", "content": prompt }
        ];

        console.log("🚀 Sending request to OpenRouter...");

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://protoolsfaska.com",
                "X-Title": "protoolsFaska",
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free", // Use free model to avoid credit issues
                "messages": messages,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ OpenRouter API Error (${response.status}):`, errorText);
            return NextResponse.json(
                { error: `Provider Error: ${response.statusText}`, details: errorText }, 
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("💥 Unhandled AI API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
    }
}
