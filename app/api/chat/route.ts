import { NextRequest, NextResponse } from 'next/server';
import { APIService } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt, feature } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await APIService.generateAIResponse(prompt, feature || 'chat');
    
    return NextResponse.json({
      success: true,
      response: response,
      feature: feature,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}