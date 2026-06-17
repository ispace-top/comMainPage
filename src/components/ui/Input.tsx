"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, className = "", id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s+/g, "-").toLowerCase();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={[
            "block w-full h-11 px-3 text-base text-neutral-800 placeholder-neutral-400",
            "bg-white border rounded-sm",
            "transition-all duration-150 ease-standard",
            error
              ? "border-error-500 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]"
              : "border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]",
            "disabled:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
            "read-only:bg-neutral-50 read-only:border-neutral-200 read-only:cursor-default",
            className,
          ].join(" ")}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-error-500">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-neutral-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
export type { InputProps };
