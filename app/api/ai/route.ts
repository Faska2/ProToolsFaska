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

        const models = [
            "google/gemini-2.0-flash-lite-preview-02-05:free",
            "google/gemini-2.0-pro-exp-02-05:free",
            "google/gemini-2.0-flash-thinking-exp:free",
            "meta-llama/llama-3-8b-instruct:free",
            "mistralai/mistral-7b-instruct:free",
            "openrouter/free"
        ];

        let lastError = null;
        let lastStatus = 500;

        // Ensure headers are valid for OpenRouter
        const headers = {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://protoolsfaska.com", // Required by OpenRouter
            "X-Title": "ProTools Faska", // Required by OpenRouter
        };

        for (const model of models) {
            console.log(`🔄 Trying model: ${model}`);
            
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        "model": model,
                        "messages": messages,
                        // Add provider-specific options if needed, but keep it simple for now
                        "provider": { "ignore": ["Hyperbolic"] } // Optional: Ignore providers that might be unstable
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`✅ Success with model: ${model}`);
                    return NextResponse.json(data);
                }

                const errorText = await response.text();
                console.error(`⚠️ Model ${model} failed (${response.status}):`, errorText);
                lastError = errorText;
                lastStatus = response.status;

                // If authentication error, stop trying other models immediately
                if (response.status === 401) {
                    return NextResponse.json(
                        { error: "Authentication Error: Invalid API Key", details: errorText },
                        { status: 401 }
                    );
                }
                
                // If 402 (Payment Required) or 429 (Rate Limit), try next model
                // If 404 (Model not found), try next model
                
            } catch (err) {
                console.error(`⚠️ Network error with ${model}:`, err);
                lastError = String(err);
            }
        }

        console.error("❌ All models exhausted. Last error:", lastError);
        return NextResponse.json(
            { error: "All models failed", details: lastError, tried_models: models }, 
            { status: lastStatus }
        );

    } catch (error) {
        console.error("💥 Unhandled AI API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
    }
}
