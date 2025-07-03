import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora AI - Super Intelligence Platform",
  description: "The ultimate AI platform with chat, image generation, code assistance, video creation, voice AI, and more. Free forever with cutting-edge AI capabilities.",
  keywords: "AI, artificial intelligence, ChatGPT, GPT, image generation, code assistant, video creation, voice AI, automation, machine learning",
  authors: [{ name: "Nexora AI" }],
  creator: "Nexora AI",
  publisher: "Nexora AI",
  robots: "index, follow",
  metadataBase: new URL("https://nexora.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexora.ai",
    title: "Nexora AI - Super Intelligence Platform",
    description: "The ultimate AI platform with chat, image generation, code assistance, video creation, voice AI, and more. Free forever with cutting-edge AI capabilities.",
    siteName: "Nexora AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexora AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora AI - Super Intelligence Platform",
    description: "The ultimate AI platform with chat, image generation, code assistance, video creation, voice AI, and more. Free forever with cutting-edge AI capabilities.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}