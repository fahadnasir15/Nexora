"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import AdvancedSidebar from "@/components/advanced-sidebar";
import AdvancedChat from "@/components/advanced-chat";
import LibraryPage from "@/components/library-page";
import SettingsPage from "@/components/settings-page";
import AccountPage from "@/components/account-page";
import { FreeAIService } from "@/lib/ai-service";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feature?: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  feature: string;
  messages: Message[];
}

export default function Home() {
  // Core state
  const [activeFeature, setActiveFeature] = useState("chat");
  const [activePage, setActivePage] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat management
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('nexora-chat-history');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats).map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(parsed);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('nexora-chat-history', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Generate smart chat title based on first user message
  const generateChatTitle = (firstMessage: string, feature: string): string => {
    const featureNames: { [key: string]: string } = {
      chat: "General Chat",
      reasoning: "Deep Analysis",
      code: "Code Project",
      image: "Image Creation",
      web: "Web Development", 
      analysis: "Data Analysis",
      translate: "Translation",
      video: "Video Production",
      music: "Music Composition"
    };

    const baseName = featureNames[feature] || "AI Chat";
    
    // Extract key words from the message for a smart title
    const words = firstMessage.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3);
    
    if (words.length > 0) {
      const smartTitle = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      return `${baseName}: ${smartTitle}`;
    }
    
    return `${baseName} ${new Date().toLocaleDateString()}`;
  };

  // Handle new chat creation
  const handleNewChat = () => {
    console.log("Creating new chat");
    setCurrentChatId(null);
    setCurrentMessages([]);
    setActivePage("chat");
    setActiveFeature("chat");
    setSidebarOpen(false);
  };

  // Handle feature selection
  const handleFeatureSelect = (feature: string) => {
    console.log("Feature selected:", feature);
    setActiveFeature(feature);
    setActivePage("chat");
    
    // If we have a current chat, keep it; otherwise start fresh
    if (!currentChatId) {
      setCurrentMessages([]);
    }
  };

  // Handle page selection (library, settings, account)
  const handlePageSelect = (page: string) => {
    console.log("Page selected:", page);
    setActivePage(page);
  };

  // Handle chat selection from history
  const handleSelectChat = (chatId: string) => {
    console.log("Chat selected:", chatId);
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setCurrentMessages(chat.messages);
      setActiveFeature(chat.feature);
      setActivePage("chat");
    }
  };

  // Handle chat deletion
  const handleDeleteChat = (chatId: string) => {
    console.log("Deleting chat:", chatId);
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're currently viewing the deleted chat, clear it
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setCurrentMessages([]);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (content: string, feature: string) => {
    console.log("Sending message:", content, "Feature:", feature);
    
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: new Date(),
      feature
    };

    // Add user message immediately
    setCurrentMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = FreeAIService.generateAIResponse(content, feature);
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const aiMessage: Message = {
        id: uuidv4(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        feature
      };

      const updatedMessages = [...currentMessages, userMessage, aiMessage];
      setCurrentMessages(updatedMessages);

      // Save or update chat in history
      if (currentChatId) {
        // Update existing chat
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId 
            ? {
                ...chat,
                lastMessage: content,
                timestamp: new Date(),
                messages: updatedMessages
              }
            : chat
        ));
      } else {
        // Create new chat
        const newChatId = uuidv4();
        const chatTitle = generateChatTitle(content, feature);
        
        const newChat: Chat = {
          id: newChatId,
          title: chatTitle,
          lastMessage: content,
          timestamp: new Date(),
          feature,
          messages: updatedMessages
        };

        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChatId);
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        feature
      };
      
      setCurrentMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render the active page
  const renderActivePage = () => {
    switch (activePage) {
      case "library":
        return (
          <LibraryPage
            onFeatureSelect={handleFeatureSelect}
            onPageSelect={handlePageSelect}
          />
        );
      case "settings":
        return (
          <SettingsPage
            onPageSelect={handlePageSelect}
          />
        );
      case "account":
        return (
          <AccountPage
            onPageSelect={handlePageSelect}
          />
        );
      case "chat":
      default:
        return (
          <AdvancedChat
            activeFeature={activeFeature}
            onSidebarToggle={handleSidebarToggle}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Advanced Sidebar */}
      <AdvancedSidebar
        activeFeature={activeFeature}
        activePage={activePage}
        onFeatureSelect={handleFeatureSelect}
        onPageSelect={handlePageSelect}
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={handleSidebarToggle}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderActivePage()}
      </div>
    </div>
  );
}