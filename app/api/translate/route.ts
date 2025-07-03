import { NextRequest, NextResponse } from 'next/server';
import { APIService } from '@/lib/api-service';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const translatedText = await APIService.translateText(text, targetLang || 'es');
    
    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText: translatedText,
      targetLanguage: targetLang || 'es',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}