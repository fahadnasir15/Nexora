import { NextRequest, NextResponse } from 'next/server';
import { APIService } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const audioUrl = await APIService.generateSpeech(text, voiceId);
    
    return NextResponse.json({
      success: true,
      audioUrl: audioUrl,
      text: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Speech generation API error:', error);
    return NextResponse.json(
      { error: 'Speech generation failed' },
      { status: 500 }
    );
  }
}