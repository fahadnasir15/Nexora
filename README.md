# Nexora AI - Advanced AI Platform with Real API Integration

A powerful AI platform featuring multiple AI capabilities including chat, code generation, image creation, web building, and more. Built with Next.js 15, TypeScript, and integrated with real AI APIs.

## 🚀 Features

### Core AI Features
- **Smart Chat**: OpenAI GPT-3.5/4 integration
- **Deep Thinking**: Advanced reasoning with chain-of-thought
- **Code Assistant**: Hugging Face CodeT5 for code generation
- **Image Creator**: Replicate Stable Diffusion integration
- **Voice AI**: ElevenLabs TTS + Web Speech API
- **Neural Translation**: Google Translate API + free alternatives
- **Data Analysis**: Advanced analytics with AI insights
- **Web Builder**: Complete website generation
- **Video Generator**: AI video creation planning
- **Music Creator**: AI music composition

## 🔧 API Setup Guide

### Required Free API Keys

1. **Hugging Face** (Free tier: 30,000 characters/month)
   - Go to: https://huggingface.co/settings/tokens
   - Create a new token
   - Add to `.env.local` as `NEXT_PUBLIC_HUGGING_FACE_API_KEY`

2. **OpenAI** (Free $5 credit for new accounts)
   - Go to: https://platform.openai.com/api-keys
   - Create a new API key
   - Add to `.env.local` as `NEXT_PUBLIC_OPENAI_API_KEY`

3. **Replicate** (Free tier available)
   - Go to: https://replicate.com/account/api-tokens
   - Create a new token
   - Add to `.env.local` as `NEXT_PUBLIC_REPLICATE_API_TOKEN`

4. **ElevenLabs** (Free tier: 10,000 characters/month)
   - Go to: https://elevenlabs.io/app/settings/api-keys
   - Create a new API key
   - Add to `.env.local` as `NEXT_PUBLIC_ELEVENLABS_API_KEY`

5. **Google Translate** (Optional - has free alternative)
   - Go to: https://console.cloud.google.com/apis/credentials
   - Create API key and enable Translate API
   - Add to `.env.local` as `NEXT_PUBLIC_GOOGLE_API_KEY`

### Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# Required for enhanced AI features
NEXT_PUBLIC_HUGGING_FACE_API_KEY=hf_your_token_here
NEXT_PUBLIC_OPENAI_API_KEY=sk-your_key_here
NEXT_PUBLIC_REPLICATE_API_TOKEN=r8_your_token_here
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_key_here

# Optional - For enhanced features
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_key_here
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key_here
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- API keys (see setup guide above)

### Installation

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd nexora-ai
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration Details

### Chat & Text Generation
- **Primary**: OpenAI GPT-3.5-turbo
- **Fallback**: Hugging Face DialoGPT
- **Features**: Conversational AI, reasoning, analysis

### Image Generation
- **Provider**: Replicate (Stable Diffusion)
- **Features**: Text-to-image, multiple styles
- **Fallback**: Placeholder images from Picsum

### Voice Features
- **TTS**: ElevenLabs API (premium) + Browser Speech API (free)
- **STT**: Web Speech API (completely free)
- **Features**: Natural voice synthesis, speech recognition

### Translation
- **Primary**: Google Translate API
- **Fallback**: Free Google Translate (no API key)
- **Features**: 100+ languages, context-aware

### Code Generation
- **Provider**: Hugging Face CodeT5
- **Features**: Multi-language code generation
- **Languages**: JavaScript, Python, React, etc.

## 💡 Usage Examples

### Basic Chat
```javascript
// The app automatically routes to /api/chat
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Explain quantum computing",
    feature: "chat"
  })
});
```

### Image Generation
```javascript
const response = await fetch('/api/generate-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "A futuristic city at sunset"
  })
});
```

### Voice Synthesis
```javascript
const response = await fetch('/api/generate-speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: "Hello, this is AI-generated speech",
    voiceId: "pNInz6obpgDQGcFmaJgB"
  })
});
```

## 🎯 Feature Status

| Feature | Status | API Provider | Free Tier |
|---------|--------|--------------|-----------|
| Chat | ✅ Working | OpenAI/HuggingFace | Yes |
| Code Generation | ✅ Working | Hugging Face | Yes |
| Image Generation | ✅ Working | Replicate | Yes |
| Voice TTS | ✅ Working | ElevenLabs/Browser | Yes |
| Voice STT | ✅ Working | Web Speech API | Yes |
| Translation | ✅ Working | Google/Free API | Yes |
| Reasoning | ✅ Working | OpenAI | Yes |
| Data Analysis | ✅ Working | OpenAI | Yes |
| Web Building | ✅ Working | OpenAI | Yes |
| Video Generation | 🚧 Planning | Custom | TBD |
| Music Generation | 🚧 Planning | Custom | TBD |

## 🔧 Customization

### Adding New AI Features

1. **Add API endpoint** in `app/api/your-feature/route.ts`
2. **Update APIService** in `lib/api-service.ts`
3. **Add to sidebar** in `components/advanced-sidebar.tsx`
4. **Configure chat** in `components/advanced-chat.tsx`

### Modifying AI Responses

Edit the `generateAIResponse` function in `lib/api-service.ts`:

```typescript
static async generateAIResponse(prompt: string, feature: string): Promise<string> {
  switch (feature) {
    case 'your-feature':
      return await this.yourCustomAPI(prompt);
    // ... other cases
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables in Production
Make sure to add all your API keys to your deployment platform's environment variables section.

## 📊 API Costs & Limits

### Free Tiers Available:
- **Hugging Face**: 30,000 characters/month
- **OpenAI**: $5 free credit (new accounts)
- **Replicate**: Free tier with limits
- **ElevenLabs**: 10,000 characters/month
- **Web Speech API**: Completely free (browser-based)
- **Google Translate**: Free tier available

### Cost Optimization:
- Use fallback APIs when primary APIs fail
- Implement caching for repeated requests
- Use browser APIs when possible (Speech, etc.)
- Monitor usage through API dashboards

## 🛠️ Troubleshooting

### Common Issues:

1. **API Key Errors**
   - Check `.env.local` file exists and has correct keys
   - Verify API keys are valid and have sufficient credits
   - Ensure environment variables are properly loaded

2. **CORS Errors**
   - API calls are made from server-side routes
   - Check Next.js API route configuration

3. **Rate Limiting**
   - Implement request queuing
   - Use multiple API providers as fallbacks
   - Cache responses when appropriate

### Debug Mode:
Enable detailed logging by adding to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your API integrations
4. Submit a pull request

---

**Built with ❤️ for the future of AI interfaces**

**Note**: This app includes real AI API integrations. Add your API keys to unlock full functionality!