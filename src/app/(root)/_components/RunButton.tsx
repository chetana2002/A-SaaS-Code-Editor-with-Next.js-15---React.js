"use client";

import { useEffect } from "react";
import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play, Clock } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
  const { user } = useUser();

  const { runCode, language, isRunning, executionTime } = useCodeEditorStore();

  const saveExecution = useMutation(api.codeExecutions.saveExecution);

  const handleRun = async () => {
    if (isRunning) return;

    await runCode();

    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });
    }
  };

  // Keyboard Shortcut: Ctrl + Enter
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();

        if (!isRunning) {
          handleRun();
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [isRunning, language]);

  return (
    <motion.button
      id="run-code-btn"
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        group relative inline-flex items-center gap-3 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      "
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white/80" />
            <span className="text-sm font-medium text-white/90">
              Executing...
            </span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium text-white">
              Run Code
            </span>
          </>
        )}

        {/* Execution Time */}
        {!isRunning && executionTime && (
          <div className="flex items-center gap-1 ml-2 text-xs text-white/80">
            <Clock className="w-3 h-3" />
            {executionTime} ms
          </div>
        )}

        {/* Keyboard Hint */}
        {!isRunning && (
          <span className="hidden md:block text-xs text-white/60 ml-2">
            Ctrl + Enter
          </span>
        )}
      </div>
    </motion.button>
  );
}

export default RunButton;