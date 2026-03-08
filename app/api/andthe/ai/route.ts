import { NextRequest, NextResponse } from 'next/server';
import { createAIProvider } from '@/lib/andthe/api/client';
import { AITextRequest } from '@/lib/andthe/api/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as AITextRequest & { mode?: 'mock' | 'gemini' };
    const provider = createAIProvider(body.mode ?? 'mock');
    const result = await provider.generateText(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
