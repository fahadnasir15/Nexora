"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhotoIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  HeartIcon,
  ShareIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  BeakerIcon,
  PaintBrushIcon,
  MoonIcon,
  SunIcon,
  FireIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  LightBulbIcon,
  CloudArrowUpIcon,
  SwatchIcon,
  SquaresPlusIcon,
  RectangleStackIcon,
  AdjustmentsHorizontalIcon,
  CogIcon,
  PlayIcon,
  PauseIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const styles = [
  { id: "photorealistic", name: "Photorealistic", icon: PhotoIcon },
  { id: "digital-art", name: "Digital Art", icon: PaintBrushIcon },
  { id: "anime", name: "Anime", icon: StarIcon },
  { id: "concept-art", name: "Concept Art", icon: LightBulbIcon },
  { id: "oil-painting", name: "Oil Painting", icon: SwatchIcon },
  { id: "watercolor", name: "Watercolor", icon: BeakerIcon },
];

const aspectRatios = [
  { id: "1:1", name: "Square", value: "1:1" },
  { id: "16:9", name: "Landscape", value: "16:9" },
  { id: "9:16", name: "Portrait", value: "9:16" },
  { id: "4:3", name: "Classic", value: "4:3" },
  { id: "3:4", name: "Poster", value: "3:4" },
  { id: "21:9", name: "Ultrawide", value: "21:9" },
];

const models = [
  { id: "sdxl", name: "SDXL Turbo", description: "Ultra-fast, high quality" },
  { id: "playground", name: "Playground V2", description: "Photorealistic images" },
  { id: "dalle", name: "DALL-E Style", description: "Creative and artistic" },
  { id: "midjourney", name: "Midjourney Style", description: "Artistic excellence" },
];

export default function NexoraImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [selectedModel, setSelectedModel] = useState("sdxl");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [steps, setSteps] = useState([20]);
  const [guidance, setGuidance] = useState([7]);
  const [seed, setSeed] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log("Image generator rendered");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    console.log("Generating image with prompt:", prompt);

    // Simulate image generation process
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    setTimeout(() => {
      // Simulate generated images (placeholder URLs)
      const mockImages = [
        "https://picsum.photos/512/512?random=1",
        "https://picsum.photos/512/512?random=2",
        "https://picsum.photos/512/512?random=3",
        "https://picsum.photos/512/512?random=4",
      ];
      
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      setGenerationProgress(0);
      toast.success("Images generated successfully!");
    }, 1500);
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `nexora-generated-${Date.now()}.jpg`;
    link.click();
    toast.success("Image downloaded!");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="h-full bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          <Card className="nexora-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5" />
                <span>Image Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] nexora-input"
                />
              </div>

              <div>
                <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                <Textarea
                  id="negative-prompt"
                  placeholder="What to avoid in the image..."
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="nexora-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.id} value={ratio.value}>
                          {ratio.name} ({ratio.value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Style</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {styles.map((style) => (
                    <Button
                      key={style.id}
                      variant={selectedStyle === style.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style.id)}
                      className="flex flex-col items-center space-y-1 h-auto p-3"
                    >
                      <style.icon className="h-4 w-4" />
                      <span className="text-xs">{style.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Steps: {steps[0]}</Label>
                  <Slider
                    value={steps}
                    onValueChange={setSteps}
                    min={1}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Guidance Scale: {guidance[0]}</Label>
                  <Slider
                    value={guidance}
                    onValueChange={setGuidance}
                    min={1}
                    max={20}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full nexora-button nexora-glow"
              >
                {isGenerating ? (
                  <>
                    <CogIcon className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 mr-2" />
                    Generate Images
                  </>
                )}
              </Button>

              {isGenerating && (
                <div className="space-y-2">
                  <Progress value={generationProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {generationProgress}% complete
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Center Panel - Generated Images */}
        <div className="lg:col-span-2">
          <Card className="nexora-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PhotoIcon className="h-5 w-5" />
                  <span>Generated Images</span>
                </div>
                <Badge variant="secondary">
                  {generatedImages.length} images
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              {generatedImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((imageUrl, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg border border-border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(imageUrl);
                          }}
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(imageUrl);
                          }}
                        >
                          <ArrowsPointingOutIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success("Image liked!");
                          }}
                        >
                          <HeartIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="max-w-md">
                    <PhotoIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Images Generated Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Enter a prompt and click generate to create amazing AI images
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <SparklesIcon className="h-4 w-4" />
                      <span>Powered by SDXL & Advanced AI Models</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => downloadImage(selectedImage)}
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
              <img
                src={selectedImage}
                alt="Generated image preview"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}