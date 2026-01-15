
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, FolderTree } from "lucide-react";
import { useState } from "react";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallGuideModal({ isOpen, onClose }: InstallGuideModalProps) {
  const [copiedStep1, setCopiedStep1] = useState(false);
  const [copiedStep2, setCopiedStep2] = useState(false);

  const CMD_STEP_1 = "mkdir -p .agent/skills/my-skill";
  const CMD_STEP_2 = "mv ~/Downloads/SKILL.md .agent/skills/my-skill/SKILL.md";

  const handleCopy = (text: string, setStepCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setStepCopied(true);
    setTimeout(() => setStepCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-900">
                 <div className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-zinc-100">Installation Guide</h3>
                 </div>
                 <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex items-start gap-3">
                  <FolderTree className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm text-blue-200 font-medium">Standard Skill Structure</p>
                    <p className="text-xs text-blue-400/80 leading-relaxed">
                      Skills live in <code className="bg-blue-500/10 px-1 rounded">.agent/skills/</code>. Each skill needs its own folder containing a <code className="bg-blue-500/10 px-1 rounded">SKILL.md</code> file.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>1. Create skill folder</span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() => handleCopy(CMD_STEP_1, setCopiedStep1)}
                        className="absolute top-2 right-2 p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors"
                      >
                        {copiedStep1 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 overflow-x-auto">
                        <code className="language-bash">{CMD_STEP_1}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>2. Move and rename the file</span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() => handleCopy(CMD_STEP_2, setCopiedStep2)}
                        className="absolute top-2 right-2 p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors"
                      >
                        {copiedStep2 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 overflow-x-auto">
                        <code className="language-bash">{CMD_STEP_2}</code>
                      </pre>
                    </div>
                  </div>
                 </div>

                <p className="text-[10px] text-zinc-500 text-center">
                  For global availability, use <code className="text-zinc-400">~/.gemini/antigravity/skills/</code> instead.
                </p>
              </div>

              <div className="p-4 border-t border-zinc-900 bg-zinc-900/50 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
