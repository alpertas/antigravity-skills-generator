
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Trash2, ChevronRight } from "lucide-react";

export interface HistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  output: string;
  techStack: string; // Storing this purely for display if needed later, or context restoration
}

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function HistorySidebar({
  isOpen,
  onClose,
  historyItems,
  onRestore,
  onClear,
}: HistorySidebarProps) {
  
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-zinc-950 border-r border-zinc-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2 text-zinc-100 font-medium">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>History</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-zinc-900 rounded-md text-zinc-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {historyItems.length === 0 ? (
                    <div className="text-center py-10 text-zinc-600 text-sm">
                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No history yet.</p>
                    </div>
                ) : (
                    historyItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onRestore(item);
                                onClose();
                            }}
                            className="w-full text-left p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                                    {formatTime(item.timestamp)}
                                </span>
                                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                                {item.prompt}
                            </p>
                            {item.techStack && (
                                <div className="mt-2 text-[10px] text-zinc-500 font-mono truncate">
                                    {item.techStack}
                                </div>
                            )}
                        </button>
                    ))
                )}
            </div>

            {/* Footer */}
            {historyItems.length > 0 && (
                <div className="p-4 border-t border-zinc-800">
                    <button
                        onClick={onClear}
                        className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear History</span>
                    </button>
                    <p className="mt-3 text-[10px] text-center text-zinc-600">
                        Stored locally in browser
                    </p>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
