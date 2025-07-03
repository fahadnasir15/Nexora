"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square,
  Sparkles,
  Zap,
  Code,
  Image as ImageIcon,
  Globe,
  BarChart,
  Languages,
  Brain,
  Video,
  Music,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface CleanChatProps {
  activeFeature: string;
  onSidebarToggle: () => void;
}

const featureConfigs = {
  chat: { 
    title: "Chat Assistant", 
    placeholder: "Ask anything...",
    icon: Sparkles,
    model: "Advanced Language Model"
  },
  reasoning: { 
    title: "Deep Thinking", 
    placeholder: "Ask me to think through complex problems...",
    icon: Brain,
    model: "Reasoning Engine"
  },
  code: { 
    title: "Code Assistant", 
    placeholder: "Describe the code you want to create...",
    icon: Code,
    model: "Code Generation Model"
  },
  image: { 
    title: "Image Creator", 
    placeholder: "Describe the image you want to generate...",
    icon: ImageIcon,
    model: "Image Generation Model"
  },
  web: { 
    title: "Web Builder", 
    placeholder: "Describe the website you want to build...",
    icon: Globe,
    model: "Web Development AI"
  },
  analysis: { 
    title: "Data Analysis", 
    placeholder: "Upload data or describe analysis needed...",
    icon: BarChart,
    model: "Analytics Engine"
  },
  translate: { 
    title: "Translator", 
    placeholder: "Enter text to translate...",
    icon: Languages,
    model: "Neural Translation"
  },
  video: { 
    title: "Video Generator", 
    placeholder: "Describe the video you want to create...",
    icon: Video,
    model: "Video Generation AI"
  },
  music: { 
    title: "Music Creator", 
    placeholder: "Describe the music you want to compose...",
    icon: Music,
    model: "Music AI Composer"
  },
};

const suggestions = [
  "Create a modern website for a restaurant",
  "Explain quantum computing simply",
  "Write a Python script for data analysis",
  "Generate a professional logo design",
  "Plan a marketing strategy for startups",
  "Solve this math problem step by step"
];

export default function CleanChat({ activeFeature, onSidebarToggle }: CleanChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const config = featureConfigs[activeFeature as keyof typeof featureConfigs] || featureConfigs.chat;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      feature: activeFeature
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with feature-specific logic
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, activeFeature);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        feature: activeFeature
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (prompt: string, feature: string): string => {
    // Feature-specific AI responses
    switch (feature) {
      case 'reasoning':
        return `## Thinking Step by Step

Let me analyze your question: "${prompt}"

**Step 1: Understanding the Problem**
I need to break this down into manageable components and identify the key elements.

**Step 2: Analysis**
Based on the information provided, here are the main considerations:
- Primary factors involved
- Potential solutions or approaches
- Likely outcomes or implications

**Step 3: Conclusion**
After careful consideration, here's my comprehensive response with reasoning...

This approach ensures we've thoroughly examined all aspects of your question.`;

      case 'code':
        return `## Code Solution

Here's a complete implementation for your request:

\`\`\`javascript
// Professional, production-ready code
function generateSolution(requirements) {
  // Implementation based on your specific needs
  console.log("Building your solution...");
  
  // Feature implementation
  const result = processRequirements(requirements);
  
  return {
    success: true,
    data: result,
    message: "Solution implemented successfully"
  };
}

// Usage example
const solution = generateSolution("${prompt}");
console.log(solution);
\`\`\`

**Key Features:**
- Clean, maintainable code structure
- Error handling included
- Optimized for performance
- Ready for production use

Would you like me to explain any part or add additional features?`;

      case 'web':
        return `## Website Implementation

I'll create a complete, responsive website for: "${prompt}"

**🏗️ Project Structure:**
\`\`\`
project/
├── index.html
├── styles.css
├── script.js
├── assets/
└── README.md
\`\`\`

**🎨 Design Approach:**
- Modern, clean interface
- Mobile-first responsive design
- Optimized performance
- SEO-friendly structure

**💻 Technical Stack:**
- HTML5 semantic markup
- CSS3 with Flexbox/Grid
- Vanilla JavaScript (ES6+)
- Progressive Web App features

**🚀 Features Included:**
- Responsive navigation
- Interactive components
- Contact forms
- Performance optimization
- Cross-browser compatibility

The website will be fully functional and ready to deploy. Would you like me to start building specific sections?`;

      case 'image':
        return `## Image Generation

Creating a high-quality image based on: "${prompt}"

**🎨 Design Specifications:**
- Style: Professional, modern aesthetic
- Resolution: High-resolution (1024x1024)
- Format: PNG with transparency support
- Color palette: Carefully selected for impact

**🔧 Generation Parameters:**
- AI Model: Advanced diffusion model
- Quality: Maximum detail and clarity
- Aspect ratio: Optimized for your needs
- Post-processing: Enhanced for final use

**📋 Delivery:**
Your image will include multiple variations and formats for different use cases.

*Note: In a production environment, this would connect to image generation APIs like DALL-E, Midjourney, or Stable Diffusion.*`;

      case 'analysis':
        return `## Data Analysis Report

Analyzing your request: "${prompt}"

**📊 Analysis Overview:**
- Data processing methodology
- Statistical analysis approach
- Visualization recommendations
- Key insights discovery

**🔍 Findings:**
1. **Primary Patterns:** Identified key trends and correlations
2. **Statistical Significance:** Validated results with confidence intervals
3. **Anomaly Detection:** Highlighted outliers and unusual patterns
4. **Predictive Insights:** Future trend projections

**📈 Recommendations:**
Based on the analysis, here are actionable insights for decision-making...

**🛠️ Tools Used:**
- Advanced statistical algorithms
- Machine learning models
- Data visualization engines
- Predictive analytics frameworks`;

      case 'translate':
        return `## Translation Service

**Original Text:** "${prompt}"

**🌐 Multi-Language Translation:**

**Spanish:** [Spanish translation would appear here]
**French:** [French translation would appear here]  
**German:** [German translation would appear here]
**Chinese:** [Chinese translation would appear here]
**Japanese:** [Japanese translation would appear here]

**📝 Translation Notes:**
- Context-aware translation
- Cultural nuances preserved
- Formal/informal tone matching
- Regional variations considered

**🎯 Quality Assurance:**
- Neural machine translation
- Human-like fluency
- Grammar and syntax optimization
- Cultural appropriateness verified`;

      case 'video':
        return `## Video Production

Creating a video for: "${prompt}"

**🎬 Production Details:**
- **Duration:** 30-60 seconds (customizable)
- **Resolution:** 4K Ultra HD
- **Format:** MP4, optimized for all platforms
- **Style:** Professional cinematic quality

**🎭 Creative Elements:**
- Storyboard development
- Scene composition
- Smooth transitions
- Background music integration
- Text overlays and effects

**🔧 Technical Specs:**
- Frame rate: 60fps for smooth motion
- Color grading: Professional color correction
- Audio: Crystal clear sound mixing
- Compression: Optimized file sizes

**⏱️ Timeline:**
Video generation in progress... Estimated completion: 2-3 minutes

*Production note: Connecting to advanced video generation models for realistic output.*`;

      case 'music':
        return `## Music Composition

Composing music for: "${prompt}"

**🎵 Composition Details:**
- **Genre:** Tailored to your specifications
- **Duration:** 2-4 minutes (adjustable)
- **Key:** Harmonically optimized
- **Tempo:** Professionally paced
- **Instrumentation:** Full orchestral arrangement

**🎼 Musical Elements:**
- Melody: Memorable and engaging themes
- Harmony: Rich chord progressions
- Rhythm: Dynamic and compelling beats
- Structure: Verse-chorus-bridge format

**🎧 Production Quality:**
- Studio-grade mixing
- Professional mastering
- Multiple format exports (MP3, WAV, FLAC)
- Stems available for remixing

**🎹 Instruments Featured:**
Custom selection based on genre and mood requirements.

*Audio generation in progress using advanced AI composition models...*`;

      default:
        return `I understand you're asking about: "${prompt}"

Let me provide you with a comprehensive and helpful response:

This is a thoughtful question that requires careful consideration. Based on the information you've provided, I can offer several insights and practical suggestions.

**Key Points:**
- Detailed analysis of your specific situation
- Step-by-step recommendations
- Alternative approaches to consider
- Expected outcomes and benefits

**Next Steps:**
1. Immediate actions you can take
2. Medium-term planning considerations
3. Long-term strategic thinking

Is there any particular aspect you'd like me to explore in more detail?`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  if (messages.length === 0) {
    return (
      <div className="clean-main">
        <div className="clean-header">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <config.icon className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">{config.title}</h1>
            <Badge variant="secondary" className="text-xs">
              {config.model}
            </Badge>
          </div>
        </div>

        <div className="clean-welcome">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4">
              Where should we begin?
            </h2>
            <p className="text-muted-foreground">
              I'm your AI assistant, ready to help with any task. What would you like to work on today?
            </p>
          </div>

          <div className="clean-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => setInput(suggestion)}
                className="clean-suggestion"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        <div className="clean-input-area">
          <div className="clean-input-wrapper">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={config.placeholder}
              className="clean-input"
              rows={1}
            />
            <div className="absolute left-3 bottom-3 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${isListening ? 'text-red-500' : ''}`}
                onClick={toggleListening}
              >
                {isListening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="clean-send-button"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="clean-main">
      <div className="clean-header">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <config.icon className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold">{config.title}</h1>
          <Badge variant="secondary" className="text-xs">
            {config.model}
          </Badge>
        </div>
      </div>

      <div className="clean-chat">
        {messages.map((message) => (
          <div key={message.id} className="clean-message">
            {message.type === 'user' ? (
              <div className="clean-message-user">
                {message.content}
              </div>
            ) : (
              <div className="clean-message-ai">
                <ReactMarkdown
                  components={{
                    code: ({ node, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match;
                      return !isInline && match ? (
                        <SyntaxHighlighter
                          style={oneDark as any}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg my-4"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="clean-message">
            <div className="clean-message-ai">
              <div className="clean-typing">
                <div className="flex items-center gap-1">
                  <div className="clean-dot" style={{ animationDelay: '0ms' }} />
                  <div className="clean-dot" style={{ animationDelay: '150ms' }} />
                  <div className="clean-dot" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="clean-input-area">
        <div className="clean-input-wrapper">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={config.placeholder}
            className="clean-input"
            rows={1}
          />
          <div className="absolute left-3 bottom-3 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 ${isListening ? 'text-red-500' : ''}`}
              onClick={toggleListening}
            >
              {isListening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="clean-send-button"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}