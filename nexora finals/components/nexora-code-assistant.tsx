"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CodeBracketIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
  BugAntIcon,
  CpuChipIcon,
  DocumentTextIcon,
  FolderIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon,
  CloudArrowUpIcon,
  ShareIcon,
  BookmarkIcon,
  CommandLineIcon,
  BeakerIcon,
  AcademicCapIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const languages = [
  { id: "typescript", name: "TypeScript", ext: ".ts" },
  { id: "javascript", name: "JavaScript", ext: ".js" },
  { id: "python", name: "Python", ext: ".py" },
  { id: "java", name: "Java", ext: ".java" },
  { id: "cpp", name: "C++", ext: ".cpp" },
  { id: "rust", name: "Rust", ext: ".rs" },
  { id: "go", name: "Go", ext: ".go" },
  { id: "php", name: "PHP", ext: ".php" },
  { id: "html", name: "HTML", ext: ".html" },
  { id: "css", name: "CSS", ext: ".css" },
  { id: "sql", name: "SQL", ext: ".sql" },
  { id: "bash", name: "Bash", ext: ".sh" },
];

const templates = [
  {
    id: "react-component",
    name: "React Component",
    description: "Modern React component with TypeScript",
    language: "typescript",
    code: `import React from 'react';

interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, children }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;`
  },
  {
    id: "api-endpoint",
    name: "API Endpoint",
    description: "Express.js REST API endpoint",
    language: "javascript",
    code: `const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;`
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Python data analysis with pandas",
    language: "python",
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load and analyze data
def analyze_data(file_path):
    # Read data
    df = pd.read_csv(file_path)
    
    # Basic statistics
    print("Dataset shape:", df.shape)
    print("\\nBasic statistics:")
    print(df.describe())
    
    # Check for missing values
    print("\\nMissing values:")
    print(df.isnull().sum())
    
    # Create visualizations
    plt.figure(figsize=(12, 8))
    
    # Distribution plot
    plt.subplot(2, 2, 1)
    df.hist(bins=30, ax=plt.gca())
    plt.title('Data Distribution')
    
    # Show plots
    plt.tight_layout()
    plt.show()
    
    return df

# Usage
df = analyze_data('data.csv')`
  },
];

const codeFeatures = [
  {
    id: "explain",
    name: "Explain Code",
    description: "Get detailed explanations of code logic",
    icon: AcademicCapIcon,
    color: "text-blue-400"
  },
  {
    id: "debug",
    name: "Debug Code",
    description: "Find and fix bugs in your code",
    icon: BugAntIcon,
    color: "text-red-400"
  },
  {
    id: "optimize",
    name: "Optimize Code",
    description: "Improve performance and efficiency",
    icon: RocketLaunchIcon,
    color: "text-green-400"
  },
  {
    id: "refactor",
    name: "Refactor Code",
    description: "Improve code structure and readability",
    icon: WrenchScrewdriverIcon,
    color: "text-yellow-400"
  },
  {
    id: "test",
    name: "Generate Tests",
    description: "Create unit tests for your code",
    icon: BeakerIcon,
    color: "text-purple-400"
  },
  {
    id: "convert",
    name: "Convert Language",
    description: "Convert code between languages",
    icon: ArrowPathIcon,
    color: "text-cyan-400"
  },
];

export default function NexoraCodeAssistant() {
  const [selectedLanguage, setSelectedLanguage] = useState("typescript");
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  console.log("Code assistant rendered");

  const handleProcessCode = async (feature: string) => {
    if (!code.trim()) {
      toast.error("Please enter some code");
      return;
    }

    setIsProcessing(true);
    setSelectedFeature(feature);
    console.log(`Processing code with feature: ${feature}`);

    // Simulate AI processing
    setTimeout(() => {
      let result = "";
      
      switch (feature) {
        case "explain":
          result = `# Code Explanation

This code demonstrates several key concepts:

## Structure
- **Language**: ${selectedLanguage}
- **Type**: ${code.includes("function") ? "Function" : code.includes("class") ? "Class" : "Script"}
- **Complexity**: ${code.split('\n').length < 20 ? "Simple" : "Complex"}

## Key Features
1. **Variable Declarations**: The code uses modern variable declarations
2. **Function Definitions**: Well-structured function definitions
3. **Error Handling**: Proper error handling mechanisms
4. **Code Style**: Follows best practices and conventions

## Improvements Suggested
- Add type annotations for better code clarity
- Include comprehensive error handling
- Add documentation comments
- Consider performance optimizations

## Security Considerations
- Input validation is recommended
- Sanitize user inputs
- Use secure coding practices`;
          break;
          
        case "debug":
          result = `# Debug Analysis

## Issues Found
1. **Missing Error Handling**: Add try-catch blocks
2. **Variable Scope**: Check variable declarations
3. **Type Safety**: Add proper type checking

## Fixes Applied
\`\`\`${selectedLanguage}
${code.replace(/console\.log/g, '// Fixed: console.log')}
\`\`\`

## Recommendations
- Use TypeScript for better type safety
- Add unit tests
- Implement proper logging
- Validate inputs`;
          break;
          
        case "optimize":
          result = `# Performance Optimization

## Current Performance
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Memory Usage**: Moderate

## Optimizations Applied
1. **Reduced Loop Iterations**: Combined multiple loops
2. **Memory Efficiency**: Reused variables
3. **Caching**: Added memoization where applicable

## Optimized Code
\`\`\`${selectedLanguage}
// Optimized version
${code.replace(/for/g, '// Optimized: for')}
\`\`\`

## Performance Gains
- **Speed**: ~40% faster execution
- **Memory**: ~25% less memory usage
- **Scalability**: Better handling of large datasets`;
          break;
          
        case "refactor":
          result = `# Code Refactoring

## Refactoring Applied
1. **Function Extraction**: Separated concerns
2. **Naming Improvements**: More descriptive names
3. **Code Structure**: Better organization

## Refactored Code
\`\`\`${selectedLanguage}
// Refactored version with improved structure
${code.replace(/var /g, 'const ')}
\`\`\`

## Benefits
- **Readability**: 60% more readable
- **Maintainability**: Easier to maintain
- **Testability**: Better unit testing support`;
          break;
          
        case "test":
          result = `# Unit Tests Generated

## Test Suite
\`\`\`${selectedLanguage}
// Test file: ${selectedLanguage === 'typescript' ? 'test.spec.ts' : 'test.js'}
describe('Code Tests', () => {
  test('should handle valid input', () => {
    expect(yourFunction('valid')).toBe('expected');
  });
  
  test('should handle edge cases', () => {
    expect(yourFunction('')).toBe('');
    expect(yourFunction(null)).toBe(null);
  });
  
  test('should handle errors gracefully', () => {
    expect(() => yourFunction(undefined)).toThrow();
  });
});
\`\`\`

## Coverage
- **Line Coverage**: 95%
- **Branch Coverage**: 88%
- **Function Coverage**: 100%`;
          break;
          
        case "convert":
          const targetLang = selectedLanguage === "typescript" ? "python" : "typescript";
          result = `# Language Conversion

## Converted to ${targetLang}
\`\`\`${targetLang}
${targetLang === "python" ? 
  code.replace(/function/g, 'def').replace(/const/g, '').replace(/;/g, '') :
  code.replace(/def /g, 'function ').replace(/:/g, ' {')}
\`\`\`

## Conversion Notes
- Syntax adapted for ${targetLang}
- Type annotations added where applicable
- Best practices applied for target language`;
          break;
          
        default:
          result = "Feature not implemented yet.";
      }
      
      setOutput(result);
      setIsProcessing(false);
      setActiveTab("output");
      toast.success("Code processed successfully!");
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast.success("Code copied to clipboard!");
  };

  const loadTemplate = (template: any) => {
    setCode(template.code);
    setSelectedLanguage(template.language);
    toast.success("Template loaded!");
  };

  return (
    <div className="h-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 h-full">
        {/* Left Panel - Tools */}
        <div className="space-y-6">
          <Card className="nexora-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CpuChipIcon className="h-5 w-5" />
                <span>AI Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {codeFeatures.map((feature) => (
                  <Button
                    key={feature.id}
                    variant={selectedFeature === feature.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleProcessCode(feature.id)}
                    disabled={isProcessing}
                  >
                    <feature.icon className={`h-4 w-4 mr-2 ${feature.color}`} />
                    {feature.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="nexora-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5" />
                <span>Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => loadTemplate(template)}
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="nexora-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <InformationCircleIcon className="h-5 w-5" />
                <span>AI Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">DeepSeek Coder</span>
                  <Badge variant="secondary">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Code Analysis</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Multi-Language</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Panel - Editor */}
        <div className="lg:col-span-3">
          <Card className="nexora-card h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CodeBracketIcon className="h-5 w-5" />
                  <span>Code Editor</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCode}
                    disabled={!code.trim()}
                  >
                    {copiedCode ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="h-full mt-4">
                  <div className="space-y-4 h-full">
                    <Textarea
                      placeholder={`Enter your ${selectedLanguage} code here...`}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] font-mono nexora-input"
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Lines: {code.split('\n').length} | Characters: {code.length}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCode("")}
                          disabled={!code.trim()}
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Clear
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleProcessCode("explain")}
                          disabled={isProcessing || !code.trim()}
                          className="nexora-button"
                        >
                          {isProcessing ? (
                            <>
                              <CpuChipIcon className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <SparklesIcon className="h-4 w-4 mr-2" />
                              Analyze Code
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="output" className="h-full mt-4">
                  <ScrollArea className="h-[500px] w-full">
                    {output ? (
                      <div className="prose prose-sm max-w-none">
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center">
                        <div className="max-w-md">
                          <CommandLineIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No Output Yet</h3>
                          <p className="text-muted-foreground">
                            Select a code feature to see AI analysis and results
                          </p>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}