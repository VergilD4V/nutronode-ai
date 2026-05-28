const PREFERRED_MODELS = [
  "models/gemini-2.5-flash",
  "models/gemini-2.0-flash",
  "models/gemini-3.5-flash",
  "models/gemini-flash-latest",
];

let cachedModelNames: string[] | null = null;

type GeminiResult = {
  text: string;
  modelUsed: string;
};

function extractJsonObject(text: string): string | null {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  // Fallback: grab the largest object-looking span.
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1).trim();
  }
  return null;
}

async function listAvailableModels(apiKey: string): Promise<string[]> {
  if (cachedModelNames) return cachedModelNames;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Model listing failed ${response.status} ${response.statusText}: ${text.slice(0, 500)}`);
  }

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Model listing returned invalid JSON: ${text.slice(0, 500)}`);
  }

  const names = Array.isArray(data?.models) ? data.models.map((m: any) => m?.name).filter(Boolean) : [];
  cachedModelNames = names;
  return names;
}

async function callGeminiModel(apiKey: string, modelName: string, prompt: string): Promise<GeminiResult> {
  const model = modelName.startsWith("models/") ? modelName.replace(/^models\//, "") : modelName;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.9,
        },
      }),
    }
  );

  const rawText = await response.text();
  if (!response.ok) {
    throw new Error(
      `Gemini upstream failed (${model}) ${response.status} ${response.statusText}: ${rawText.slice(0, 800)}`
    );
  }

  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`Gemini upstream returned non-JSON payload (${model}): ${rawText.slice(0, 800)}`);
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n") ??
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";

  if (!text) {
    throw new Error(`Gemini returned no text content (${model}). Payload: ${rawText.slice(0, 800)}`);
  }

  return { text, modelUsed: model };
}

export async function generateGeminiJson(apiKey: string, prompt: string): Promise<{ parsed: any; modelUsed: string }> {
  const available = await listAvailableModels(apiKey);
  const models = PREFERRED_MODELS.filter((m) => available.includes(m));
  if (!models.length) {
    throw new Error("No supported text generation models available for this API key.");
  }

  const errors: string[] = [];

  for (const model of models) {
    try {
      const { text, modelUsed } = await callGeminiModel(apiKey, model, prompt);
      const jsonString = extractJsonObject(text);
      if (!jsonString) {
        throw new Error(`No JSON object found in model response (${modelUsed}). Raw: ${text.slice(0, 800)}`);
      }
      const parsed = JSON.parse(jsonString);
      return { parsed, modelUsed };
    } catch (error) {
      const message = (error as Error).message;
      errors.push(`${model}: ${message}`);
      console.error("[gemini] model attempt failed", {
        model,
        message,
      });
    }
  }

  throw new Error(`Gemini generation failed for all models. Attempts: ${errors.join(" | ")}`);
}

