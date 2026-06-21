"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { Download } from "lucide-react";

function DownloadCodeButton() {
  const { editor, language } = useCodeEditorStore();

  const handleDownload = () => {
    if (!editor) return;

    const code = editor.getValue();

    const extensionMap: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      c: "c",
      go: "go",
      rust: "rs",
    };

    const extension = extensionMap[language] || "txt";

    const blob = new Blob([code], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${extension}`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="
      flex items-center gap-2 px-3 py-1.5
      text-xs text-gray-300
      bg-[#1e1e2e]
      rounded-lg
      ring-1 ring-gray-800
      hover:ring-blue-500/40
      hover:text-white
      transition-all
      "
    >
      <Download className="w-3.5 h-3.5" />
      Download
    </button>
  );
}

export default DownloadCodeButton;