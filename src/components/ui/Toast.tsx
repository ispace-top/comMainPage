"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const iconMap: Record<ToastType, ReactNode> = {
  success: (
    <svg className="size-5 text-success-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="size-5 text-error-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="size-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm.75 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="size-5 text-info-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9.25a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm1.75-2.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" />
    </svg>
  ),
};

const barColor: Record<ToastType, string> = {
  success: "border-l-success-500",
  error: "border-l-error-500",
  warning: "border-l-warning-500",
  info: "border-l-info-500",
};

const autoCloseMs: Record<ToastType, number | null> = {
  success: 3000,
  info: 3000,
  warning: 5000,
  error: null, // manual close only
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, message }]);
      const delay = autoCloseMs[type];
      if (delay !== null) {
        setTimeout(() => removeToast(id), delay);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed z-[var(--z-toast)] flex flex-col gap-2 pointer-events-none"
        style={{
          top: 24,
          right: 24,
          maxWidth: 480,
          minWidth: 320,
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              "pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-md shadow-lg border-l-4",
              barColor[toast.type],
              "animate-[toastIn_300ms_ease-out]",
            ].join(" ")}
          >
            <span className="shrink-0 mt-0.5">{iconMap[toast.type]}</span>
            <p className="flex-1 text-sm text-neutral-700">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-0.5 text-neutral-400 hover:text-neutral-600 rounded transition-colors"
              aria-label="关闭"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.97 4.97a.75.75 0 011.06 0L8 6.94l1.97-1.97a.75.75 0 111.06 1.06L9.06 8l1.97 1.97a.75.75 0 11-1.06 1.06L8 9.06l-1.97 1.97a.75.75 0 01-1.06-1.06L6.94 8 4.97 6.03a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export type { ToastType };
