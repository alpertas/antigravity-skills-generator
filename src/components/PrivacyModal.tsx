
"use client";

import { X, Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
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
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-100">Privacy & Data Policy</h2>
                        <p className="text-xs text-zinc-500">How we handle your data</p>
                    </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                     <Lock className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-200 mb-1">100% Client-Side Processing</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      This application runs entirely in your browser. We do not store your prompts, generate code, or API keys on any external servers.
                      <br /><br />
                      <span className="text-zinc-500">
                        * We use your browser's <strong>Local Storage</strong> solely to save your history for your convenience. You can clear this at any time.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                  <p className="text-xs text-zinc-500 text-center leading-relaxed">
                    "Antigravity Skill Architect" is an unofficial community project and is not affiliated with Google or the DeepMind team. Use the generated skills at your own risk.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                  <button 
                    onClick={onClose}
                    className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-900 font-medium rounded-xl transition-colors"
                  >
                      I Understand
                  </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
