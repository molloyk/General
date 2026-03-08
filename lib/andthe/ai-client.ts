import { AITextResponse } from './api/types';
import { outfitReasoningPrompt, shoppingPrompt } from './prompts';

async function generateViaApi(useCase: 'outfit-rationale' | 'shopping-rationale', context: string): Promise<AITextResponse> {
  const response = await fetch('/api/andthe/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      useCase,
      messages: [
        { role: 'system', content: useCase === 'outfit-rationale' ? outfitReasoningPrompt : shoppingPrompt },
        { role: 'user', content: context }
      ],
      temperature: 0.35,
      maxOutputTokens: 200
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`AI API request failed: ${detail}`);
  }

  return response.json() as Promise<AITextResponse>;
}

export async function explainOutfitRecommendation(context: string): Promise<string> {
  try {
    const result = await generateViaApi('outfit-rationale', context);
    return `[${result.provider}] ${result.text}`;
  } catch {
    return `[fallback] ${context}`;
  }
}

export async function recommendBrandsForIntent(context: string): Promise<string> {
  try {
    const result = await generateViaApi('shopping-rationale', context);
    return `[${result.provider}] ${result.text}`;
  } catch {
    return `[fallback] ${context}`;
  }
}
