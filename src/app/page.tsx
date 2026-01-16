"use client";

import { useState, useEffect } from "react";
import PromptInput from "@/components/PromptInput";
import SkillEditor from "@/components/SkillEditor";
import PrivacyModal from "@/components/PrivacyModal";
import InstallGuideModal from "@/components/InstallGuideModal";
import HistorySidebar, { HistoryItem } from "@/components/HistorySidebar";
import { Github, Clock, Share2, Check, AlertTriangle } from "lucide-react"; // AlertTriangle ekledim hata gösterimi için
import lzString from "lz-string";

export default function Home() {
  const [input, setInput] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Hata yönetimi için state ekleyelim
  const [error, setError] = useState<string | null>(null);

  // History State
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Hydrate from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("s");
    if (shared) {
      try {
        const decompressed = lzString.decompressFromEncodedURIComponent(shared);
        if (decompressed) {
          const { o } = JSON.parse(decompressed);
          if (o) {
            setOutput(o);
          }
        }
      } catch (e) {
        console.error("Failed to parse shared state", e);
      }
    }
  }, []);

  // Load History
  useEffect(() => {
    const saved = localStorage.getItem("skill_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save History Helper
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem("skill_history", JSON.stringify(newHistory));
  };

  // --- GÜNCELLENEN KISIM BAŞLANGICI ---
  const handleGenerate = async (additionalContext?: string) => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null); // Önceki hataları temizle

    // Prompt'u zenginleştir (Kullanıcının seçtiği teknolojileri ekle)
    // Eğer SkillEditor veya PromptInput'tan gelen raw context varsa onu kullan, yoksa state'tekini al
    const techContext = additionalContext || selectedTechs.join(", ");
    const finalPrompt = techContext
      ? `${input}\n\nTechnical Stack & Requirements: ${techContext}`
      : input;

    try {
      // API'ye istek at
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate skill");
      }

      // API'den gelen gerçek veri
      const newOutput = data.output;
      setOutput(newOutput);

      // Başarılı olursa geçmişe kaydet
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        prompt: input,
        output: newOutput,
        techStack: techContext || "Standard",
      };

      const updatedHistory = [newItem, ...history].slice(0, 10);
      saveHistory(updatedHistory);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while contacting the AI.");
    } finally {
      setIsLoading(false);
    }
  };
  // --- GÜNCELLENEN KISIM SONU ---

  const restoreHistory = (item: HistoryItem | any) => {
    setInput(item.prompt);
    if ('output' in item) {
      setOutput(item.output);
    } else {
      if (item.techStack && Array.isArray(item.techStack)) {
        setSelectedTechs(item.techStack);
      }
      setOutput("");
    }
    // Hata varsa temizle
    setError(null);
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const handleShare = () => {
    if (!output) {
      alert("Please generate a skill first to share it.");
      return;
    }
    const state = { o: output };
    const compressed = lzString.compressToEncodedURIComponent(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}?s=${compressed}`;

    window.history.pushState({}, "", url);
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="h-screen bg-zinc-950 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowHistory(true)}
            className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-purple-400 transition-colors"
            title="History"
          >
            <Clock className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#header-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <defs>
                <linearGradient id="header-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span className="font-semibold text-zinc-100 tracking-tight text-lg flex items-center gap-2">
              Antigravity <span className="text-zinc-500 font-normal">Skill Architect</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-yellow-500/50 text-yellow-500 bg-yellow-500/10 font-medium tracking-wide">
                v0.1 Beta
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="text-zinc-500 hover:text-purple-400 transition-colors flex items-center space-x-2 text-sm"
            title="Share Configuration"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            <span className={isCopied ? "text-green-400" : ""}>{isCopied ? "Link Copied!" : "Share"}</span>
          </button>
          <a
            href="https://github.com/alpertas/antigravity-skills-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center space-x-2 text-sm"
          >
            <Github className="w-4 h-4" />
            <span>alpertas/antigravity-skills-generator - open source</span>
          </a>
        </div>
      </header>

      {/* Main Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <HistorySidebar
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          historyItems={history}
          onRestore={restoreHistory}
          onClear={clearHistory}
        />

        {/* Left Column: Input */}
        <section className="w-full md:w-1/2 border-r border-zinc-900 h-full overflow-y-auto relative">
          {/* Hata Mesajı Gösterimi (Eğer hata varsa input alanının üstünde göster) */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <PromptInput
            input={input}
            setInput={setInput}
            isGenerating={isLoading}
            handleGenerate={handleGenerate}
            selectedTechs={selectedTechs}
            setSelectedTechs={setSelectedTechs}
          />
        </section>

        {/* Right Column: Output */}
        <section className="w-full md:w-1/2 h-full bg-zinc-950/50">
          <SkillEditor
            markdown={output}
            isVisible={!!output}
            onInstallGuideClick={() => setShowInstallGuide(true)}
          />
        </section>
      </div>

      {/* Footer */}
      <footer className="py-2 border-t border-zinc-900/50 bg-zinc-950 text-center z-10">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:space-x-4 text-xs text-zinc-600">
          <span>No Server Storage. Data remains locally in your browser.</span>
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            Terms & Privacy
          </button>
        </div>
      </footer>

      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

      <InstallGuideModal
        isOpen={showInstallGuide}
        onClose={() => setShowInstallGuide(false)}
      />

      {/* Open Source Toast */}
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
        <a
          href="https://github.com/alpertas/antigravity-skills-generator/issues"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-2xl hover:bg-zinc-800 transition-colors group"
        >
          <div className="bg-zinc-800 p-1.5 rounded-md group-hover:bg-zinc-700 transition-colors">
            <Github className="w-4 h-4 text-white" />
          </div>
          <div className="pr-2">
            <p className="text-xs font-semibold text-zinc-200">🚧 Work in Progress</p>
            <p className="text-[10px] text-zinc-500">Found a bug? Open an Issue 🚀</p>
          </div>
        </a>
      </div>
    </main>
  );
}