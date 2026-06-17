"use client";

import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "请选择",
  label,
  error,
  required,
  disabled,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = `select-${Math.random().toString(36).slice(2, 8)}`;

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-2 text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="text-error-500 ml-0.5">*</span>}
        </label>
      )}
      <button
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={[
          "relative flex items-center w-full h-11 px-3 text-base text-left bg-white border rounded-sm",
          "transition-all duration-150 ease-standard",
          "disabled:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
          error
            ? "border-error-500 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]"
            : "border-neutral-300 hover:border-neutral-400 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]",
          className,
        ].join(" ")}
      >
        <span className={selectedOption ? "text-neutral-800" : "text-neutral-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={[
            "ml-auto size-5 text-neutral-400 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && !disabled && (
        <div className="relative z-[var(--z-dropdown)]">
          <ul
            className="absolute top-1 left-0 right-0 bg-white border border-neutral-200 rounded-md shadow-md overflow-auto max-h-[300px] py-1"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={[
                  "h-10 px-4 flex items-center text-sm cursor-pointer transition-colors",
                  option.value === value
                    ? "bg-primary-50 text-primary-600 font-medium"
                    : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
    </div>
  );
}

export type { SelectProps, SelectOption };
