
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Check, AlertTriangle, ShieldCheck, Lock, HelpCircle, Code2, FileText } from "lucide-react";
import SupportModal from "./SupportModal";
import ReactMarkdown from "react-markdown";

interface SkillEditorProps {
  markdown: string;
  isVisible: boolean;
    onInstallGuideClick: () => void;
}

const validateSkill = (md: string) => {
    if (!md) return { valid: true, missing: [] };
    const missing = [];

    if (!/^---\n[\s\S]*?name:[\s\S]*?---/.test(md)) missing.push("Frontmatter");
    if (!md.includes("# 🎯 Goal")) missing.push("Goal Section");
    // Allow flexible context/instruction headers
    if (!md.match(/# (🧠 Context|📋 Instructions)/)) missing.push("Context/Instructions");

    return { valid: missing.length === 0, missing };
};

export default function SkillEditor({ markdown, isVisible, onInstallGuideClick }: SkillEditorProps) {
  const [copied, setCopied] = useState(false);
    const [displayContent, setDisplayContent] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [validation, setValidation] = useState<{ valid: boolean; missing: string[] }>({ valid: true, missing: [] });
    const autoScrollRef = useRef<HTMLDivElement>(null);

    // Typewriter effect logic
    useEffect(() => {
        if (!isVisible) {
            setDisplayContent("");
            setIsTyping(false);
            return;
        }

        if (markdown) {
            // Validate immediately
            setValidation(validateSkill(markdown));

            // If content changed significantly, restart typing
            if (markdown !== displayContent && !isTyping) {
                // For simplicity, if we are already seeing some content, we might just want to show the new one.
                // But let's stick to the typewriter for now or just set it if it's an update.
                // Actually, the previous logic was:
                // setDisplayContent("") -> start interval.
            }
        }

        let currentIndex = 0;
        // Simple typewriter reset for new generation
        if (markdown && isVisible) {
            setIsTyping(true);
        const interval = setInterval(() => {
            if (currentIndex < markdown.length) {
                setDisplayContent(markdown.slice(0, currentIndex + 1));
                currentIndex += 5; // Speed up
            } else {
                setDisplayContent(markdown); // Ensure full content
                setIsTyping(false);
                clearInterval(interval);
            }
            if (autoScrollRef.current) {
                autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
            }
        }, 5);
        return () => clearInterval(interval);
        }
    }, [markdown, isVisible]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    const executeDownload = () => {
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

    const handleDownloadClick = () => {
        const isSupporter = localStorage.getItem("antigravity_supporter");
        if (isSupporter === "true") {
            executeDownload();
        } else {
            setShowSupportModal(true);
        }
    };

    const handleSupportSuccess = () => {
        localStorage.setItem("antigravity_supporter", "true");
        setShowSupportModal(false);
        executeDownload();
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
                              {/* Validation Status */}
                              {!isTyping && (
                                  validation.valid ? (
                                      <div className="flex items-center space-x-1 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium animate-in fade-in">
                                          <ShieldCheck className="w-3 h-3" />
                                          <span>Valid Format</span>
                                      </div>
                                  ) : (
                                      <div className="flex items-center space-x-1 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-medium animate-in fade-in" title={`Missing: ${validation.missing.join(", ")}`}>
                                          <AlertTriangle className="w-3 h-3" />
                                          <span>Invalid Format</span>
                                      </div>
                                  )
                              )}

                             <button 
                                onClick={handleCopy}
                                  className="flex items-center space-x-2 px-3 py-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors text-xs font-medium"
                                title="Copy to Clipboard"
                             >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                  <span>{copied ? "Copied!" : "Copy Markdown"}</span>
                             </button>

                              <div className="h-4 w-px bg-zinc-800 mx-1" />

                              <button
                                  onClick={onInstallGuideClick}
                                  className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors"
                                  title="How to Install"
                              >
                                  <HelpCircle className="w-4 h-4" />
                              </button>
                             <button 
                                  onClick={handleDownloadClick}
                                  className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md text-xs font-medium transition-colors border border-zinc-700/50"
                                title="Download File"
                             >
                                  <Lock className="w-3 h-3 text-pink-500" />
                                  <span>Download .skill</span>
                             </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                      <div
                          ref={autoScrollRef}
                          className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed custom-scrollbar"
                      >
                        <pre className="whitespace-pre-wrap text-zinc-300">
                              {displayContent}
                              {displayContent.length < markdown.length && (
                                  <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse align-middle" />
                              )}
                        </pre>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        <SupportModal 
            isOpen={showSupportModal}
            onClose={() => setShowSupportModal(false)}
            onSuccess={handleSupportSuccess}
        />
    </div>
  );
}

