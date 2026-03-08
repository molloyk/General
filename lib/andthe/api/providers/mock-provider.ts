import { AIProvider, AITextRequest, AITextResponse } from '../types';

export class MockAIProvider implements AIProvider {
  async generateText(input: AITextRequest): Promise<AITextResponse> {
    const userPrompt = input.messages.find((m) => m.role === 'user')?.content ?? '';
    return {
      text: `[mock-ai:${input.useCase}] ${userPrompt}`,
      provider: 'mock',
      model: 'mock-v1'
    };
  }
}
