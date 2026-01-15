"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Clock, Star, ChevronRight } from "lucide-react";
import { FEATURED_SKILLS, FeaturedSkill } from "@/data/featured-skills";

export interface HistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  output: string;
  techStack: string;
}

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: HistoryItem[];
  onRestore: (item: HistoryItem | FeaturedSkill) => void;
  onClear: () => void;
}

export default function HistorySidebar({
  isOpen,
  onClose,
  historyItems,
  onRestore,
  onClear,
}: HistorySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"history" | "featured">("history");

  useEffect(() => {
    // Click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const formatTime = (timestamp: number) => {
    const diff = (Date.now() - timestamp) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            ref={sidebarRef}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-zinc-950 border-r border-zinc-900 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
              <h2 className="font-semibold text-zinc-100">Library</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-zinc-900 rounded-md text-zinc-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 border-b border-zinc-900/50">
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === "history"
                    ? "bg-zinc-900 text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <Clock className="w-3.5 h-3.5" />
                History
              </button>
              <button
                onClick={() => setActiveTab("featured")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === "featured"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <Star className="w-3.5 h-3.5" />
                Featured
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {activeTab === "history" ? (
                historyItems.length === 0 ? (
                  <div className="text-center py-10 text-zinc-600 text-sm">
                    No history yet. <br /> Start generating!
                  </div>
                ) : (
                    historyItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onRestore(item);
                          onClose();
                        }}
                      className="w-full text-left p-3 rounded-xl bg-zinc-900/30 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {formatTime(item.timestamp)}
                        </span>
                        <span className="text-[10px] text-zinc-600 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">
                          {item.techStack}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {item.prompt}
                      </p>
                    </button>
                  ))
                )
              ) : (
                // Featured Tab
                FEATURED_SKILLS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onRestore(item);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex -space-x-1">
                        {item.techStack.slice(0, 3).map((t, i) => (
                          <div key={i} className="w-4 h-4 rounded-full bg-zinc-800 border ring-1 ring-zinc-950 flex items-center justify-center text-[6px] text-zinc-400 uppercase">
                            {t[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center text-[10px] text-zinc-600 gap-1">
                      <span className="w-3 h-3 rounded-full bg-zinc-800 flex items-center justify-center text-[6px]">A</span>
                      <span>by {item.author}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {activeTab === "history" && historyItems.length > 0 && (
              <div className="p-4 border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-sm">
                <button
                  onClick={onClear}
                  className="flex items-center justify-center w-full space-x-2 text-xs text-red-400/80 hover:text-red-400 hover:bg-red-400/10 py-2.5 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
