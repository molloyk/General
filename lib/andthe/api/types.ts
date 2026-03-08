export type AIUseCase = 'outfit-rationale' | 'shopping-rationale';

export interface AIMessage {
  role: 'system' | 'user';
  content: string;
}

export interface AITextRequest {
  useCase: AIUseCase;
  messages: AIMessage[];
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AITextResponse {
  text: string;
  provider: string;
  model: string;
}

export interface AIProvider {
  generateText(input: AITextRequest): Promise<AITextResponse>;
}
