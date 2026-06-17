"use client";

import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, showCharCount, maxLength, className = "", id, value, ...props }, ref) => {
    const textareaId = id || label?.replace(/\s+/g, "-").toLowerCase();
    const charCount = typeof value === "string" ? value.length : 0;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block mb-2 text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          maxLength={maxLength}
          value={value}
          className={[
            "block w-full min-h-[100px] py-3 px-3 text-base text-neutral-800 placeholder-neutral-400 resize-y",
            "bg-white border rounded-sm",
            "transition-all duration-150 ease-standard",
            error
              ? "border-error-500 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]"
              : "border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]",
            "disabled:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
            className,
          ].join(" ")}
          {...props}
        />
        <div className="flex justify-between mt-1.5">
          {error ? (
            <p className="text-xs text-error-500">{error}</p>
          ) : (
            <span />
          )}
          {showCharCount && maxLength && (
            <p className="text-xs text-neutral-400 ml-auto">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
export type { TextareaProps };
