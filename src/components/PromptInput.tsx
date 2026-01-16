"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Shuffle, Layers, AlertTriangle, Code, FileCode } from "lucide-react";
import { motion } from "framer-motion";

interface PromptInputProps {
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  handleGenerate: (additionalContext: string) => void;
  selectedTechs: string[];
  setSelectedTechs: (techs: string[]) => void;
}



const MIN_CHARS = 10;
const MAX_CHARS = 100000;

const EXAMPLES = [
  "Create a Python script using BeautifulSoup to scrape product prices from an e-commerce site and save them to a CSV file.",
  "Build a React Native music player with Expo AV, including play/pause/skip controls and a progress bar.",
  "Develop a Next.js SaaS boilerplate with Supabase Auth, Stripe subscription integration, and a dashboard layout.",
  "Write a Node.js Express API with TypeScript that handles file uploads to AWS S3 and stores metadata in PostgreSQL."
];

const REVERSE_EXAMPLES = [
  "Paste a React component to extract its hook patterns...",
  "Paste a generic repository pattern implementation...",
  "Paste a complex SQL query to understand its optimization rules..."
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
}: PromptInputProps) {
  const [activeTab, setActiveTab] = useState<"describe" | "reverse">("describe");

  const handleExample = () => {
    const list = activeTab === "describe" ? EXAMPLES : REVERSE_EXAMPLES;
    const randomExample = list[Math.floor(Math.random() * list.length)];
    if (activeTab === "describe") {
      setInput(randomExample);
    }
    // For reverse mode we might not want to replace the whole content if it's code, but let's stick to standard behavior
    // actually showing a placeholder example might be better? For now just setting input.
  };

  const toggleTech = (id: string) => {
    setSelectedTechs(
      selectedTechs.includes(id)
        ? selectedTechs.filter(t => t !== id)
        : [...selectedTechs, id]
    );
  };

  const onGenerateClick = () => {
    if (activeTab === "reverse") {
      const reverseContext = `
### SYSTEM INSTRUCTION: REVERSE ENGINEERING MODE
You are an Expert Code Analyst for Google Antigravity.
Your task: Analyze the provided code snippet deeply. Extract its coding conventions, naming patterns, library choices, and architectural style.
Output: Create a \`SKILL.md\` file that teaches an AI agent how to reproduce this exact style.
- In 'Context & Rules', explicitly list the patterns found in the code.
- In 'Goal', write: 'Replicate the coding style and structure observed in the reference code.'
- Strictly follow the standard SKILL.md format (YAML, Goal, Rules, Capabilities).
`;
      handleGenerate(reverseContext);
    } else {
      const context = selectedTechs
        .map(id => TECH_STACKS.find(t => t.id === id)?.context)
        .filter(Boolean)
        .join("\n");

      const finalContext = context ? `\n\n### TECHNICAL CONTEXT:\n${context}` : "";
      handleGenerate(finalContext);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="space-y-4 relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("describe")}
              className={`flex items-center space-x-2 pb-3 text-sm font-medium transition-all relative ${activeTab === "describe" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>Describe Requirement</span>
              {activeTab === "describe" && (
                <motion.div layoutId="activeTab" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reverse")}
              className={`flex items-center space-x-2 pb-3 text-sm font-medium transition-all relative ${activeTab === "reverse" ? "text-purple-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              <Code className="w-4 h-4" />
              <span>Reverse Engineer Code</span>
              {activeTab === "reverse" && (
                <motion.div layoutId="activeTab" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
          </div>
        </div>
        
        <div className="relative">
            <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeTab === "describe"
              ? "Describe your coding task... (e.g., 'Create a Supabase auth hook with RLS policies')"
              : "Paste your best React/Python code here to extract its style & rules..."}
            className={`w-full h-64 p-4 pr-24 bg-zinc-900 border rounded-xl focus:ring-2 outline-none resize-none transition-all placeholder:text-zinc-600 text-sm font-mono leading-relaxed ${activeTab === "reverse"
                ? "border-purple-900/40 focus:ring-purple-500/30 focus:border-purple-500/50 text-purple-100"
                : "border-zinc-800 focus:ring-purple-500/50 focus:border-purple-500/50"
              }`}
            />
            
          {activeTab === "describe" && (
            <button
              onClick={handleExample}
              className="absolute top-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-lg transition-colors border border-zinc-700/50"
            >
              <Shuffle className="w-3 h-3" />
              <span>Example</span>
            </button>
          )}
        </div>

        {/* Tech Stack Chips - Only visible in Describe mode */}
        {activeTab === "describe" ? (
          <div className="flex flex-wrap gap-2 animate-in fade-in duration-300">
            {TECH_STACKS.map(tech => {
              const isSelected = selectedTechs.includes(tech.id);
              return (
                <button
                  key={tech.id}
                  onClick={() => toggleTech(tech.id)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 font-medium ${isSelected
                      ? "border-purple-500 bg-purple-500/10 text-purple-200 shadow-sm shadow-purple-500/20"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                >
                  {tech.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-300">Tech stack will be inferred from your code snippet.</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
             <div className="flex items-center space-x-2">
            {/* Tone selector removed */}
             </div>
          <div className={`text-xs ${input.length > 0 && (input.length < MIN_CHARS || input.length > MAX_CHARS) ? "text-red-400 font-bold" : "text-zinc-600"}`}>
            {input.length} / {MAX_CHARS} chars
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
          disabled={!input || isGenerating || input.length < MIN_CHARS || input.length > MAX_CHARS}
          className={`w-full group relative flex items-center justify-center space-x-2 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === "reverse"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-900/20"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-900/20"
            }`}
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
                {activeTab === "reverse" ? <FileCode className="w-5 h-5" /> : <Sparkles className="w-5 h-5 group-hover:text-yellow-200 transition-colors" />}
                <span>{activeTab === "reverse" ? "Analyze & Extract Skill" : "Generate Skill File"}</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      
      {/* Tips Section */}
      <div className="mt-auto pt-8 border-t border-zinc-800/50">
        <h4 className="text-xs font-semibold text-zinc-500 mb-3">
          {activeTab === "reverse" ? "REVERSE ENGINEERING TIPS" : "TIPS FOR BEST RESULTS"}
        </h4>
        <ul className="space-y-2 text-xs text-zinc-400">
          {activeTab === "describe" ? (
            <>
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
            </>
          ) : (
            <>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                <span>Paste complete files for best context</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-pink-500 rounded-full" />
                <span>Include imports to help identify libraries</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                <span>Works best with modern, idiomatic code</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
