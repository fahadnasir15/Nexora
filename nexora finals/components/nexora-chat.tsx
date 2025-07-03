"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon,
  DocumentArrowUpIcon,
  PhotoIcon,
  FaceSmileIcon,
  CommandLineIcon,
  BoltIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  SpeakerWaveIcon,
  HeartIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowPathIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import NexoraImageGenerator from "./nexora-image-generator";
import NexoraCodeAssistant from "./nexora-code-assistant";
import NexoraAdvancedFeatures from "./nexora-advanced-features";

interface Message {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  metadata?: {
    tokens?: number;
    model?: string;
    tools?: string[];
  };
}

interface ChatProps {
  activeFeature: string;
  onFeatureSelect?: (feature: string) => void;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    type: "system",
    content: "Welcome to Nexora AI! I'm your super-intelligent assistant with access to all AI features. How can I help you today?",
    timestamp: new Date(),
    metadata: {
      model: "Nexora-GPT",
      tokens: 25
    }
  }
];

export default function NexoraChat({ activeFeature, onFeatureSelect }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log("Chat rendered - activeFeature:", activeFeature, "messages:", messages.length);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    console.log("Sending message:", inputValue);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputValue, activeFeature),
        timestamp: new Date(),
        metadata: {
          model: "Nexora-GPT",
          tokens: Math.floor(Math.random() * 100) + 50,
          tools: activeFeature !== "chat" ? [activeFeature] : []
        }
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, feature: string): string => {
    const responses = {
      chat: `I understand you're asking about "${input}". As your AI assistant, I can help you with detailed explanations, creative solutions, and intelligent analysis. What specific aspect would you like me to elaborate on?`,
      agents: `I'll create a custom AI agent for "${input}". This agent will have specialized capabilities including autonomous task planning, multi-step reasoning, and real-time adaptation. Would you like me to configure specific tools or parameters for this agent?`,
      code: `Here's a code solution for "${input}":\n\n\`\`\`typescript\n// AI-generated code example\nfunction handleRequest(input: string): string {\n  console.log("Processing:", input);\n  return \`Processed: \${input}\`;\n}\n\nexport default handleRequest;\n\`\`\`\n\nThis code demonstrates best practices with TypeScript, proper error handling, and clean architecture. Would you like me to add more features or explain any part?`,
      image: `I'll generate an image for "${input}". Using advanced AI models, I can create:\n\n• Photorealistic images\n• Digital art and illustrations\n• Concept art and designs\n• Product mockups\n• Character designs\n\nWhat style and dimensions would you prefer?`,
      video: `Creating a video for "${input}". I can generate:\n\n• Text-to-video animations\n• Explainer videos\n• Product demos\n• Social media content\n• Educational content\n\nShould I include voiceover, subtitles, or background music?`,
      voice: `Processing voice request for "${input}". I can:\n\n• Convert text to natural speech\n• Clone voices with permission\n• Transcribe audio accurately\n• Real-time voice chat\n• Multiple language support\n\nWhat voice style would you like?`,
      files: `Analyzing document content for "${input}". I can:\n\n• Extract key information\n• Summarize documents\n• Answer questions about content\n• Compare multiple files\n• Generate reports\n\nPlease upload your files and I'll get started!`,
      web: `Building a website for "${input}". I'll create:\n\n• Modern responsive design\n• Interactive components\n• SEO optimization\n• Mobile-first approach\n• Lightning-fast performance\n\nWhat specific features do you need?`,
      game: `Developing a game for "${input}". I can create:\n\n• 2D platformers\n• Puzzle games\n• Action adventures\n• Educational games\n• Mobile games\n\nWhat genre and platform are you targeting?`,
      social: `Creating social media content for "${input}":\n\n• Viral post ideas\n• Engaging captions\n• Hashtag strategies\n• Content calendars\n• Platform optimization\n\nWhich platforms are you focusing on?`,
      memory: `Saving "${input}" to memory bank. I now remember:\n\n• Your preferences\n• Previous conversations\n• Important information\n• Custom instructions\n• Project details\n\nI'll use this context in future conversations!`,
      tools: `Creating custom tool for "${input}". This tool will:\n\n• Automate specific tasks\n• Integrate with your workflow\n• Provide specialized functions\n• Save time and effort\n• Scale with your needs\n\nWhat functionality should it include?`
    };

    return responses[feature as keyof typeof responses] || responses.chat;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success("Voice input activated");
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false);
        setInputValue("This is a voice input test");
      }, 3000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render specialized components for certain features
  if (activeFeature === "image") {
    return <NexoraImageGenerator />;
  }
  
  if (activeFeature === "code") {
    return <NexoraCodeAssistant />;
  }
  
  if (activeFeature === "advanced") {
    return <NexoraAdvancedFeatures onFeatureSelect={onFeatureSelect || (() => {})} />;
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <h2 className="text-lg font-semibold">
              {activeFeature === "chat" ? "Smart Chat" : 
               activeFeature === "agents" ? "AI Agents" :
               activeFeature === "code" ? "Code Assistant" :
               activeFeature === "image" ? "Image Generator" :
               activeFeature === "video" ? "Video Creator" :
               activeFeature === "voice" ? "Voice AI" :
               activeFeature === "files" ? "File Intelligence" :
               activeFeature === "web" ? "Web Builder" :
               activeFeature === "game" ? "Game Studio" :
               activeFeature === "social" ? "Social Media" :
               activeFeature === "memory" ? "Memory Bank" :
               activeFeature === "tools" ? "Custom Tools" : "AI Assistant"}
            </h2>
            <Badge variant="secondary" className="text-xs">
              {activeFeature === "chat" ? "GPT-4 Level" :
               activeFeature === "agents" ? "AutoGPT" :
               activeFeature === "code" ? "DeepSeek" :
               activeFeature === "image" ? "SDXL" :
               activeFeature === "video" ? "Veo3 Style" :
               activeFeature === "voice" ? "Whisper" :
               activeFeature === "files" ? "RAG" :
               activeFeature === "web" ? "Maclay Style" :
               activeFeature === "game" ? "2D/3D" :
               activeFeature === "social" ? "Viral" :
               activeFeature === "memory" ? "ChromaDB" :
               activeFeature === "tools" ? "GPT Store" : "AI"}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ShareIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <EllipsisVerticalIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <Avatar className={`w-8 h-8 ${message.type === "user" ? "bg-primary" : "bg-gradient-to-br from-primary to-secondary"}`}>
                    <AvatarFallback className="text-white text-sm">
                      {message.type === "user" ? "You" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Card className={`p-4 ${
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : message.type === "system"
                      ? "bg-muted border-accent"
                      : "bg-card"
                  }`}>
                    <div className="prose prose-sm max-w-none">
                      {message.type === "ai" || message.type === "system" ? (
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
                                  className="rounded-md"
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 text-xs opacity-70">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.type === "ai" && (
                        <div className="flex items-center space-x-2">
                          {message.metadata?.tokens && (
                            <span>{message.metadata.tokens} tokens</span>
                          )}
                          {message.metadata?.model && (
                            <Badge variant="outline" className="text-xs">
                              {message.metadata.model}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {message.type === "ai" && (
                      <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="h-6 px-2 text-xs"
                        >
                          {copiedId === message.id ? (
                            <CheckIcon className="h-3 w-3 text-green-400" />
                          ) : (
                            <ClipboardDocumentIcon className="h-3 w-3" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <SpeakerWaveIcon className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <HandThumbUpIcon className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <HandThumbDownIcon className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <ArrowPathIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex space-x-3">
                <Avatar className="w-8 h-8 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                </Avatar>
                <Card className="p-4 bg-card">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask ${activeFeature === "chat" ? "anything" : 
                    activeFeature === "agents" ? "for an AI agent" :
                    activeFeature === "code" ? "for code help" :
                    activeFeature === "image" ? "for an image" :
                    activeFeature === "video" ? "for a video" :
                    activeFeature === "voice" ? "for voice features" :
                    activeFeature === "files" ? "about your files" :
                    activeFeature === "web" ? "to build a website" :
                    activeFeature === "game" ? "to create a game" :
                    activeFeature === "social" ? "for social content" :
                    activeFeature === "memory" ? "me to remember" :
                    activeFeature === "tools" ? "for custom tools" : "AI"}...`}
                  className="min-h-[60px] nexora-input pr-12 resize-none"
                  rows={2}
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`h-8 w-8 p-0 ${isListening ? "text-red-400 animate-pulse" : ""}`}
                  >
                    {isListening ? (
                      <StopIcon className="h-4 w-4" />
                    ) : (
                      <MicrophoneIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <DocumentArrowUpIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <PhotoIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="h-12 px-6 nexora-button nexora-glow"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{inputValue.length}/4000</span>
          </div>
        </div>
      </div>
    </div>
  );
}