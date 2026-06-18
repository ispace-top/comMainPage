"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  footer?: ReactNode;
}

const sizeStyles = {
  sm: "max-w-[520px]",
  md: "max-w-[640px]",
  lg: "max-w-[800px]",
};

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  children,
  footer,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 150);
  };

  useEffect(() => {
    if (open) {
      setClosing(false);
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || closing) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closing]);

  if (!open && !closing) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-8 max-md:p-0">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 ${closing ? "animate-[fadeOut_150ms_ease-in]" : "animate-[fadeIn_200ms_ease-out]"}`}
        onClick={handleClose}
      />
      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={[
          "relative bg-white rounded-lg shadow-xl w-full outline-none max-h-[calc(100vh-128px)] flex flex-col",
          "max-md:rounded-none max-md:max-w-full max-md:h-full max-md:max-h-full",
          sizeStyles[size],
          closing
            ? "animate-[modalOut_150ms_ease-in]"
            : "animate-[modalIn_200ms_ease-out]",
        ].join(" ")}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-8 pt-8 pb-0 shrink-0">
            <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
            <button
              onClick={handleClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100 transition-colors"
              aria-label="关闭"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {/* Body */}
        <div className="px-8 py-6 overflow-auto flex-1">
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-8 pb-8 shrink-0 max-md:border-t max-md:border-neutral-200 max-md:py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export type { ModalProps };
