import { NextRequest, NextResponse } from "next/server";
import { generateGeminiJson } from "@/lib/server/gemini";

type QuizDifficulty = "Easy" | "Depth" | "Exam Level" | "Extreme";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[ai-quiz] Missing GEMINI_API_KEY");
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const { text, difficulty, count } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text' field." }, { status: 400 });
    }

    const diff: QuizDifficulty = ["Easy", "Depth", "Exam Level", "Extreme"].includes(difficulty)
      ? difficulty
      : "Depth";

    const n = typeof count === "number" ? Math.min(Math.max(count, 5), 50) : 20;

    const prompt = `
You are an AI quiz generator for a study assistant. Read the notes and create multiple-choice questions in JSON.

Return ONLY valid JSON with this exact TypeScript shape and nothing else:
{
  "questions": {
    "id": string,
    "prompt": string,
    "options": [string, string, string, string],
    "correctIndex": 0 | 1 | 2 | 3
  }[]
}

Requirements:
- Use difficulty level: "${diff}".
- Number of questions: ${n}.
- Make questions non-repetitive and based on the provided notes.
- Use clear exam-style language where appropriate.

Notes:
${text}
`;

    const { parsed, modelUsed } = await generateGeminiJson(apiKey, prompt);
    const questions = parsed?.questions;

    if (!Array.isArray(questions) || questions.length === 0) {
      console.error("[ai-quiz] Invalid quiz payload", { modelUsed, parsedPreview: JSON.stringify(parsed).slice(0, 600) });
      return NextResponse.json({ error: "Gemini returned invalid quiz schema." }, { status: 502 });
    }

    const normalized = questions
      .map((q: any, index: number) => ({
        id: typeof q?.id === "string" && q.id.trim() ? q.id : `q_${index + 1}`,
        prompt: typeof q?.prompt === "string" ? q.prompt : "",
        options: Array.isArray(q?.options) ? q.options.slice(0, 4) : [],
        correctIndex: q?.correctIndex,
      }))
      .filter(
        (q: any) =>
          q.prompt &&
          q.options.length === 4 &&
          [0, 1, 2, 3].includes(q.correctIndex)
      );

    if (!normalized.length) {
      console.error("[ai-quiz] Normalization dropped all questions", { modelUsed });
      return NextResponse.json({ error: "Gemini quiz questions were not usable." }, { status: 502 });
    }

    return NextResponse.json({ questions: normalized, modelUsed });
  } catch (error) {
    console.error("[ai-quiz] Unexpected error", { message: (error as Error).message });
    return NextResponse.json(
      { error: "Unexpected error while generating quiz.", details: (error as Error).message },
      { status: 500 }
    );
  }
}

