import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = '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';

export async function POST(req: Request) {
    try {
        const { prompt, systemPrompt, history = [] } = await req.json();

        const messages = [
            { "role": "system", "content": systemPrompt || "You are a professional assistant." },
            ...history,
            { "role": "user", "content": prompt }
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://protoolsfaska.com",
                "X-Title": "protoolsFaska",
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo",
                "messages": messages,
            })
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("AI API Error:", error);
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
