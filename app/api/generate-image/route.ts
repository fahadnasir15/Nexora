import { NextRequest, NextResponse } from 'next/server';
import { APIService } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const imageUrl = await APIService.generateImage(prompt);
    
    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      prompt: prompt,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Image generation API error:', error);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}