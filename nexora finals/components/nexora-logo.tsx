"use client";

import { motion } from "framer-motion";

export default function NexoraLogo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <motion.div 
      className={`${sizes[size]} ${className} relative`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl blur-sm opacity-75"></div>
      <div className="relative bg-background rounded-xl border border-border flex items-center justify-center">
        <motion.div 
          className="nexora-text-gradient font-bold text-2xl"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(99,102,241,0.5)",
              "0 0 20px rgba(99,102,241,0.8)",
              "0 0 10px rgba(99,102,241,0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          N
        </motion.div>
      </div>
    </motion.div>
  );
}