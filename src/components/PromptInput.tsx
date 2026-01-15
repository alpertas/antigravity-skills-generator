"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Shuffle, Layers, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface PromptInputProps {
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: (additionalContext: string) => void;
}

const TONES = ["Standard", "Strict", "Educational"];

const EXAMPLES = [
  "Create a Python script using BeautifulSoup to scrape product prices from an e-commerce site and save them to a CSV file.",
  "Build a React Native music player with Expo AV, including play/pause/skip controls and a progress bar.",
  "Develop a Next.js SaaS boilerplate with Supabase Auth, Stripe subscription integration, and a dashboard layout.",
  "Write a Node.js Express API with TypeScript that handles file uploads to AWS S3 and stores metadata in PostgreSQL."
];

const TECH_STACKS = [
  { id: "nextjs", label: "Next.js", context: "Use App Router, Server Components, and TypeScript strict mode." },
  { id: "tailwind", label: "Tailwind CSS", context: "Use generic utility classes, avoid arbitrary values." },
  { id: "supabase", label: "Supabase", context: "Implement Row Level Security (RLS) and generated database types." },
  { id: "shadcn", label: "shadcn/ui", context: "Use Radix UI primitives and lucide-react icons." },
  { id: "react-query", label: "TanStack Query", context: "Implement strict caching policies and optimistic updates." },
];

export default function PromptInput({
  input,
  setInput,
  isGenerating,
  handleGenerate,
  selectedTechs,
  setSelectedTechs
}: PromptInputProps & {
  selectedTechs: string[];
  setSelectedTechs: (techs: string[]) => void;
}) {
  const [tone, setTone] = useState("Standard");

  const handleExample = () => {
    const randomExample = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setInput(randomExample);
  };

  const toggleTech = (id: string) => {
    setSelectedTechs(
      selectedTechs.includes(id)
        ? selectedTechs.filter(t => t !== id)
        : [...selectedTechs, id]
    );
  };

  const onGenerateClick = () => {
    const context = selectedTechs
      .map(id => TECH_STACKS.find(t => t.id === id)?.context)
      .filter(Boolean)
      .join("\n");
      
    const finalContext = context ? `\n\n### TECHNICAL CONTEXT:\n${context}` : "";
    handleGenerate(finalContext);
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="space-y-4 relative">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center space-x-2">
               <Layers className="w-4 h-4" />
               <span>Task Requirement</span>
            </label>
        </div>
        
        <div className="relative">
            <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your coding task... (e.g., 'Create a Supabase auth hook with RLS policies')"
            className="w-full h-64 p-4 pr-24 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none resize-none transition-all placeholder:text-zinc-600 text-sm font-mono leading-relaxed"
            />
            
            <button
                onClick={handleExample}
                className="absolute top-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-lg transition-colors border border-zinc-700/50"
            >
                <Shuffle className="w-3 h-3" />
                <span>Example</span>
            </button>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2">
            {TECH_STACKS.map(tech => {
                const isSelected = selectedTechs.includes(tech.id);
                return (
                    <button
                        key={tech.id}
                        onClick={() => toggleTech(tech.id)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 font-medium ${
                            isSelected 
                            ? "border-purple-500 bg-purple-500/10 text-purple-200 shadow-sm shadow-purple-500/20" 
                            : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                        }`}
                    >
                        {tech.label}
                    </button>
                );
            })}
        </div>

        <div className="flex justify-between items-center pt-2">
             <div className="flex items-center space-x-2">
               <span className="text-xs text-zinc-500">Tone:</span>
               <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-md px-2 py-1 outline-none focus:border-purple-500"
               >
                 {TONES.map(t => (
                   <option key={t} value={t}>{t}</option>
                 ))}
               </select>
             </div>
             <div className="text-xs text-zinc-600">
               {input.length} chars
             </div>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-2 text-zinc-500 text-xs px-1">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-yellow-500/50" />
          <span>Experimental build. Skills may require manual review.</span>
        </div>

        <button
          onClick={onGenerateClick}
          disabled={!input || isGenerating}
          className="w-full group relative flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/20"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:text-yellow-200 transition-colors" />
              <span>Generate Skill File</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      
      {/* Tips Section */}
      <div className="mt-auto pt-8 border-t border-zinc-800/50">
        <h4 className="text-xs font-semibold text-zinc-500 mb-3">TIPS FOR BEST RESULTS</h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          <li className="flex items-center space-x-2">
            <span className="w-1 h-1 bg-purple-500 rounded-full" />
            <span>Be specific about library versions (e.g. Next.js 14)</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1 h-1 bg-blue-500 rounded-full" />
            <span>Mention state management preference</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1 h-1 bg-green-500 rounded-full" />
            <span>Paste existing file snippets if relevant</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
