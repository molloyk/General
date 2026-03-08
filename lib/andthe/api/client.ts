import { GeminiAIProvider } from './providers/gemini-provider';
import { MockAIProvider } from './providers/mock-provider';
import { AIProvider } from './types';

export function createAIProvider(mode: 'mock' | 'gemini' = 'mock'): AIProvider {
  return mode === 'gemini' ? new GeminiAIProvider() : new MockAIProvider();
}

export const aiProvider = createAIProvider(
  process.env.NEXT_PUBLIC_AI_MODE === 'gemini' ? 'gemini' : 'mock'
);
