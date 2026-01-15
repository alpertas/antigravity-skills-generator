
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ExternalLink, Check } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SupportModal({ isOpen, onClose, onSuccess }: SupportModalProps) {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4 border border-pink-500/20">
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Unlock Professional Export 🚀</h2>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        This tool is open-source. Support the developer with a coffee (<span className="text-white font-semibold">$1</span>) to download ready-to-use <code className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 text-pink-400">.skill</code> files instantly.
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    <a 
                        href="https://alpertas6.gumroad.com/l/alpertas" 
                        data-gumroad-overlay-checkout="true"
                        data-gumroad-single-product="true"
                    className="flex items-center justify-center w-full py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-900/20 group"
                        target="_blank"
                        
                    >
                        <span>☕ Buy me a coffee ($1)</span>
                        <ExternalLink className="w-4 h-4 ml-2 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <button 
                        onClick={onSuccess}
                        className="w-full py-3 text-sm text-zinc-500 hover:text-zinc-300 font-medium transition-colors flex items-center justify-center"
                    >
                        <span>I have already supported / I don't want to support - Download</span>
                    </button>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800/50 text-center">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
                    Secure payment via Gumroad
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
