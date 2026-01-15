
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallGuideModal({ isOpen, onClose }: InstallGuideModalProps) {
  const [copied, setCopied] = useState(false);

  const INSTALL_CMD = `
# 1. Create the skills directory
mkdir -p .antigravity/skills

# 2. Move the downloaded file
mv ~/Downloads/SKILL.md .antigravity/skills/
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

              <div className="p-6 space-y-4">
                 <p className="text-sm text-zinc-400">
                    To use this skill with the Antigravity IDE, place the downloaded file in your project's skills directory.
                 </p>

                 <div className="relative group">
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-md transition-colors"
                            title="Copy Commands"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 overflow-x-auto">
                        <code className="language-bash">{INSTALL_CMD}</code>
                    </pre>
                 </div>

                 <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-xs text-blue-400">
                        <strong>Tip:</strong> You can rename the file to something more descriptive, like <code>auth-flow.skill</code>.
                    </p>
                 </div>
              </div>

              <div className="p-4 border-t border-zinc-900 bg-zinc-900/50 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg text-sm font-medium transition-colors"
                >
                    Got it
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
