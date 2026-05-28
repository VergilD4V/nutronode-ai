import { NextRequest, NextResponse } from "next/server";
import { generateGeminiJson } from "@/lib/server/gemini";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[ai-summary] Missing GEMINI_API_KEY");
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text' field." }, { status: 400 });
    }

    const prompt = `
You are an AI study assistant. Read the student's notes and produce a structured JSON summary optimised for exam preparation.

Return ONLY valid JSON with this exact TypeScript shape, no extra commentary:
{
  "title": string,
  "overview": string,
  "keyConcepts": string[],
  "definitions": { "term": string, "meaning": string }[],
  "simplified": string[],
  "examFocus": string[],
  "quickRecall": string[]
}

Notes:
${text}
`;

    const { parsed, modelUsed } = await generateGeminiJson(apiKey, prompt);

    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      typeof parsed.overview !== "string" ||
      !Array.isArray(parsed.keyConcepts) ||
      !Array.isArray(parsed.definitions) ||
      !Array.isArray(parsed.simplified) ||
      !Array.isArray(parsed.examFocus) ||
      !Array.isArray(parsed.quickRecall)
    ) {
      console.error("[ai-summary] Invalid schema from Gemini", { modelUsed, parsedPreview: JSON.stringify(parsed).slice(0, 600) });
      return NextResponse.json(
        { error: "Gemini returned invalid summary schema." },
        { status: 502 }
      );
    }

    return NextResponse.json({ summary: parsed, modelUsed });
  } catch (error) {
    console.error("[ai-summary] Unexpected error", { message: (error as Error).message });
    return NextResponse.json(
      { error: "Unexpected error while generating summary.", details: (error as Error).message },
      { status: 500 }
    );
  }
}

