"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import LanguageIcon from "@/components/LanguageIcon";
import { ChevronDownIcon, Lock, Search, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const mounted = useMounted();

  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguageObj = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;

    setLanguage(langId);
    setIsOpen(false);
  };

  const languages = Object.values(LANGUAGE_CONFIG).filter((lang) =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Language Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700
        ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <LanguageIcon language={language} size={20} />
        </div>

        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentLanguageObj.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-all duration-300 
          ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
            rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            {/* Header */}
            <div className="px-3 pb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 mb-2">
                Select Language
              </p>

              {/* Search Input */}
              <div className="flex items-center gap-2 bg-[#262637] px-2 py-1 rounded-md">
                <Search className="w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-xs text-gray-200 outline-none w-full"
                />
              </div>
            </div>

            {/* Languages */}
            <div className="max-h-[260px] overflow-y-auto">
              {languages.map((lang) => {
                const isLocked = !hasAccess && lang.id !== "javascript";

                return (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageSelect(lang.id)}
                    disabled={isLocked}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all
                    ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                    ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}`}
                  >
                    <LanguageIcon language={lang.id} size={20} />

                    <span className="flex-1 text-left">{lang.label}</span>

                    {isLocked ? (
                      <Lock className="w-4 h-4 text-gray-500" />
                    ) : (
                      language === lang.id && (
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      )
                    )}
                  </button>
                );
              })}

              {languages.length === 0 && (
                <div className="text-center text-xs text-gray-500 py-4">
                  No language found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;