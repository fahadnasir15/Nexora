# Nexora AI - Advanced AI Platform

A clean, modern AI platform featuring multiple AI capabilities including chat, code generation, image creation, web building, and more. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core AI Features
- **Smart Chat**: Advanced conversational AI with context understanding
- **Deep Thinking**: Step-by-step reasoning and problem solving
- **Code Assistant**: Full-stack code generation and debugging
- **Image Creator**: AI-powered image generation
- **Web Builder**: Complete website creation from descriptions
- **Voice AI**: Voice-to-text and text-to-voice capabilities
- **Video Generator**: AI video creation and editing
- **Music Creator**: AI music composition and sound design
- **Data Analysis**: Advanced analytics and insights
- **Neural Translation**: 100+ language translation
- **Business Tools**: Professional productivity features

### Technical Features
- **Clean Interface**: Inspired by modern AI platforms
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: System-based theme switching
- **Real-time Chat**: Instant AI responses
- **Voice Recognition**: Built-in speech capabilities
- **File Upload**: Document and media processing
- **Export Options**: Download generated content

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React, Heroicons
- **Animations**: Framer Motion
- **AI Integration**: Ready for API connections
- **Deployment**: Vercel-optimized

## 📁 Project Structure

```
nexora-ai/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main application page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── clean-sidebar.tsx # Main navigation sidebar
│   ├── clean-chat.tsx    # Chat interface
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── lib/                  # Utility functions
│   └── utils.ts         # Helper utilities
├── public/              # Static assets
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexora-ai.git
   cd nexora-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Theme Customization

Edit `app/globals.css` to customize colors and themes:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  --primary: 262.1 83.3% 57.8%;
  /* ... more variables */
}
```

### Adding New Features

1. **Add to sidebar**: Edit `components/clean-sidebar.tsx`
   ```typescript
   const aiFeatures = [
     { id: "your-feature", label: "Your Feature", icon: YourIcon },
     // ... existing features
   ];
   ```

2. **Add feature logic**: Edit `components/clean-chat.tsx`
   ```typescript
   const featureConfigs = {
     "your-feature": { 
       title: "Your Feature", 
       placeholder: "Enter your prompt...",
       icon: YourIcon,
       model: "Your AI Model"
     },
     // ... existing configs
   };
   ```

3. **Add AI response logic**: In `generateAIResponse` function
   ```typescript
   case 'your-feature':
     return `Your AI response logic here`;
   ```

### Connecting Real AI APIs

To connect real AI models, edit the `generateAIResponse` function in `components/clean-chat.tsx`:

```typescript
const generateAIResponse = async (prompt: string, feature: string): Promise<string> => {
  // Replace with actual API calls
  switch (feature) {
    case 'code':
      // Connect to CodeT5, GPT-4, or other coding models
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      return await response.text();
    
    case 'image':
      // Connect to DALL-E, Midjourney, or Stable Diffusion
      const imageResponse = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      return await imageResponse.text();
    
    // ... other cases
  }
};
```

## 🎨 Customization Guide

### Changing Colors
- Edit CSS variables in `app/globals.css`
- Modify the color palette in `tailwind.config.ts`

### Adding Components
- Use shadcn/ui: `npx shadcn-ui@latest add component-name`
- Create custom components in `components/`

### Styling Updates
- Global styles: `app/globals.css`
- Component styles: Use Tailwind classes
- Custom utilities: Add to `@layer utilities` in CSS

### Layout Modifications
- Sidebar: `components/clean-sidebar.tsx`
- Main chat: `components/clean-chat.tsx`
- Overall layout: `app/page.tsx`

## 🔌 API Integration

### Adding AI Providers

1. **Create API routes** in `app/api/`
2. **Add environment variables** in `.env.local`
3. **Update response handlers** in components

Example API route structure:
```
app/api/
├── chat/route.ts
├── generate-code/route.ts
├── generate-image/route.ts
└── analyze-data/route.ts
```

### Environment Variables
Create `.env.local`:
```
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
REPLICATE_API_TOKEN=your_token_here
```

## 📱 Responsive Design

The app is fully responsive with:
- **Mobile**: Collapsible sidebar, touch-optimized
- **Tablet**: Adaptive layout
- **Desktop**: Full sidebar, optimized for large screens

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Works with static export
- **Railway**: Full-stack deployment
- **Docker**: Container-ready

## 🧩 Components Guide

### CleanSidebar
- Navigation and feature selection
- Theme toggle
- Recent chats
- User account section

### CleanChat
- Message display
- Input handling
- AI response generation
- Feature-specific interfaces

### ThemeProvider
- Dark/light mode switching
- System preference detection
- Persistent theme storage

## 🔧 Development

### File Modifications

**To change branding:**
- Logo: Update in `components/clean-sidebar.tsx`
- Title: Modify in `app/layout.tsx`
- Colors: Edit `app/globals.css`

**To add features:**
- Sidebar: `components/clean-sidebar.tsx`
- Chat logic: `components/clean-chat.tsx`
- API integration: Create routes in `app/api/`

**To modify styling:**
- Global: `app/globals.css`
- Components: Use Tailwind classes
- Theme: Update CSS variables

### Best Practices
- Use TypeScript for type safety
- Follow component composition patterns
- Implement proper error handling
- Optimize for performance
- Maintain accessibility standards

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Create a GitHub issue
- Check the documentation
- Review the code examples

---

**Built with ❤️ for the future of AI interfaces**