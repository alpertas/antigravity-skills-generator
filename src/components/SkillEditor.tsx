
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Check, Code2, FileText } from "lucide-react";

interface SkillEditorProps {
  markdown: string;
  isVisible: boolean;
}

export default function SkillEditor({ markdown, isVisible }: SkillEditorProps) {
  const [copied, setCopied] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const autoScrollRef = useRef<HTMLDivElement>(null);

    // Typewriter effect logic
    useEffect(() => {
        if (!isVisible) {
            setDisplayedText("");
            return;
        }

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < markdown.length) {
                setDisplayedText(markdown.slice(0, currentIndex + 1));
                currentIndex++;
                // Auto-scroll to bottom
                if (autoScrollRef.current) {
                    autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
            }
        }, 5); // 5ms per character for fast typing

        return () => clearInterval(interval);
    }, [markdown, isVisible]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SKILL.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-zinc-950/50 flex flex-col relative overflow-hidden">
        {/* Placeholder State */}
        <AnimatePresence>
            {!isVisible && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 p-8 text-center"
                >
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 border border-zinc-800">
                        <Code2 className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-zinc-400 font-medium mb-2">Ready to Architect</h3>
                    <p className="text-sm max-w-xs mx-auto">
                        Describe your skill in the left panel to generate a structured markdown file.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Content State */}
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col h-full"
                >
                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                        <div className="flex items-center space-x-2 text-zinc-400">
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-mono">SKILL.md</span>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button 
                                onClick={handleCopy}
                                className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors"
                                title="Copy to Clipboard"
                             >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                             </button>
                             <button 
                                onClick={handleDownload}
                                className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors"
                                title="Download File"
                             >
                                <Download className="w-4 h-4" />
                             </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                      <div
                          ref={autoScrollRef}
                          className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed custom-scrollbar"
                      >
                        <pre className="whitespace-pre-wrap text-zinc-300">
                              {displayedText}
                              {displayedText.length < markdown.length && (
                                  <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse align-middle" />
                              )}
                        </pre>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
