"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square,
  Sparkles,
  Code,
  Image as ImageIcon,
  Globe,
  BarChart,
  Languages,
  Brain,
  Video,
  Music,
  Menu,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface AdvancedChatProps {
  activeFeature: string;
  onSidebarToggle: () => void;
  messages: Message[];
  onSendMessage: (content: string, feature: string) => void;
  isLoading: boolean;
}

const featureConfigs = {
  chat: { 
    title: "Smart Chat", 
    placeholder: "Ask me anything...",
    icon: Sparkles,
    model: "GPT-4 Level Intelligence",
    description: "Advanced conversational AI with reasoning capabilities"
  },
  reasoning: { 
    title: "Deep Thinking", 
    placeholder: "Present a complex problem for analysis...",
    icon: Brain,
    model: "Chain-of-Thought Reasoning",
    description: "Step-by-step logical analysis and problem solving"
  },
  code: { 
    title: "Code Generator", 
    placeholder: "Describe the code you need...",
    icon: Code,
    model: "Programming Expert",
    description: "Full-stack development in any language"
  },
  image: { 
    title: "Image Creator", 
    placeholder: "Describe the image you want to generate...",
    icon: ImageIcon,
    model: "DALL-E 3 Style Generator",
    description: "High-quality image generation from text"
  },
  web: { 
    title: "Website Builder", 
    placeholder: "Describe the website you want to build...",
    icon: Globe,
    model: "Full-Stack Web Developer",
    description: "Complete responsive websites with modern design"
  },
  analysis: { 
    title: "Data Analyst", 
    placeholder: "Upload data or describe analysis needed...",
    icon: BarChart,
    model: "Advanced Analytics Engine",
    description: "Statistical analysis and data insights"
  },
  translate: { 
    title: "Translator", 
    placeholder: "Enter text to translate...",
    icon: Languages,
    model: "Neural Machine Translation",
    description: "Professional translation in 100+ languages"
  },
  video: { 
    title: "Video Generator", 
    placeholder: "Describe the video you want to create...",
    icon: Video,
    model: "Sora-Style Video AI",
    description: "High-quality video generation and editing"
  },
  music: { 
    title: "Music Composer", 
    placeholder: "Describe the music you want to compose...",
    icon: Music,
    model: "AI Music Producer",
    description: "Professional music composition and production"
  },
};

const suggestions = [
  "Build a modern e-commerce website with React",
  "Analyze this dataset and find key insights",
  "Create a Python script for data processing",
  "Design a mobile app interface",
  "Write a business plan for a tech startup",
  "Solve complex mathematical equations step by step"
];

export default function AdvancedChat({ 
  activeFeature, 
  onSidebarToggle, 
  messages, 
  onSendMessage, 
  isLoading 
}: AdvancedChatProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const config = featureConfigs[activeFeature as keyof typeof featureConfigs] || featureConfigs.chat;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input, activeFeature);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev + ' ' + transcript);
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <config.icon className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">{config.title}</h1>
              <p className="text-xs text-muted-foreground">{config.description}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {config.model}
            </Badge>
          </div>
        </div>

        <div className="clean-welcome">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <config.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to {config.title === "Smart Chat" ? "Chat" : config.title.split(" ")[0]}?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {config.description}. What would you like to work on today?
            </p>
          </div>

          <div className="clean-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => setInput(suggestion)}
                className="clean-suggestion group hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Suggestion</span>
                </div>
                <p className="text-sm">{suggestion}</p>
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
              className="clean-input pr-20"
              rows={1}
            />
            <div className="absolute left-3 bottom-3 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
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
              <div className="clean-message-ai group">
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
                
                {/* Message Actions */}
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => copyToClipboard(message.content)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
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
                <span>Processing your request...</span>
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
            className="clean-input pr-20"
            rows={1}
          />
          <div className="absolute left-3 bottom-3 flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
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