import { AIProvider, AITextRequest, AITextResponse } from '../types';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash';
const GEMINI_ENDPOINT = process.env.GEMINI_API_URL ?? 'https://generativelanguage.googleapis.com/v1beta/models';

export class GeminiAIProvider implements AIProvider {
  async generateText(input: AITextRequest): Promise<AITextResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY environment variable.');
    }

    const prompt = input.messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    const response = await fetch(`${GEMINI_ENDPOINT}/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: input.temperature ?? 0.3,
          maxOutputTokens: input.maxOutputTokens ?? 220
        }
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Gemini request failed (${response.status}): ${detail}`);
    }

    const payload = await response.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return {
      text: text || 'No response generated.',
      provider: 'gemini',
      model: GEMINI_MODEL
    };
  }
}
