import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
    executionTime: null,
    executionHistory: [],

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const language = get().language;

      const savedCode = localStorage.getItem(`editor-code-${language}`);

      if (savedCode) {
        editor.setValue(savedCode);
      }

      // Debounced auto-save
      let saveTimeout: NodeJS.Timeout;

      editor.onDidChangeModelContent(() => {
        clearTimeout(saveTimeout);

        saveTimeout = setTimeout(() => {
          const code = editor.getValue();
          localStorage.setItem(`editor-code-${get().language}`, code);
        }, 500);
      });

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const editor = get().editor;

      if (!editor) {
        set({ language });
        return;
      }

      const currentCode = editor.getValue();
      localStorage.setItem(`editor-code-${get().language}`, currentCode);

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
        executionTime: null,
      });

      const savedCode = localStorage.getItem(`editor-code-${language}`);

      if (savedCode) {
        editor.setValue(savedCode);
      } else {
        editor.setValue("");
      }
    },

    runCode: async () => {
      const startTime = Date.now();

      const { language, getCode } = get();
      const code = getCode().trim();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({
        isRunning: true,
        error: null,
        output: "",
        executionTime: null,
      });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });

        const data = await response.json();

        console.log("Piston response:", data);

        if (data.message) {
          set((state) => ({
            error: data.message,
            executionResult: {
              code,
              output: "",
              error: data.message,
            },
            executionHistory: [
              {
                code,
                output: "",
                error: data.message,
                time: 0,
                date: new Date().toLocaleTimeString(),
              },
              ...state.executionHistory,
            ],
          }));
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;

          set((state) => ({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
            executionHistory: [
              {
                code,
                output: "",
                error,
                time: 0,
                date: new Date().toLocaleTimeString(),
              },
              ...state.executionHistory,
            ],
          }));
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;

          set((state) => ({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
            executionHistory: [
              {
                code,
                output: "",
                error,
                time: 0,
                date: new Date().toLocaleTimeString(),
              },
              ...state.executionHistory,
            ],
          }));
          return;
        }

        const output = data.run.output || "";
        const executionTime = Date.now() - startTime;

        set((state) => ({
          output: output.trim(),
          error: null,
          executionTime,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
          executionHistory: [
            {
              code,
              output: output.trim(),
              error: null,
              time: executionTime,
              date: new Date().toLocaleTimeString(),
            },
            ...state.executionHistory,
          ],
        }));
      } catch (err) {
        console.error("Error running code:", err);

        set((state) => ({
          error: "Error running code",
          executionResult: {
            code,
            output: "",
            error: "Error running code",
          },
          executionHistory: [
            {
              code,
              output: "",
              error: "Error running code",
              time: 0,
              date: new Date().toLocaleTimeString(),
            },
            ...state.executionHistory,
          ],
        }));
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult;