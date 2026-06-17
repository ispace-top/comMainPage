"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={[
              "peer size-[18px] appearance-none border-[1.5px] rounded-sm cursor-pointer",
              "transition-all duration-150",
              error
                ? "border-error-500"
                : "border-neutral-300 hover:border-primary-400",
              "checked:bg-primary-500 checked:border-primary-500",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300",
              className,
            ].join(" ")}
            {...props}
          />
          <svg
            className="pointer-events-none absolute size-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-6" />
          </svg>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm text-neutral-600 cursor-pointer select-none leading-5"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// Radio component
interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={[
            "size-[18px] appearance-none rounded-full border-[1.5px] border-neutral-300 cursor-pointer",
            "transition-all duration-150",
            "checked:border-primary-500 checked:bg-white checked:shadow-[inset_0_0_0_5px_var(--color-primary-500)]",
            "hover:border-primary-400",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300",
            className,
          ].join(" ")}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm text-neutral-600 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export { Checkbox, Radio };
export type { CheckboxProps, RadioProps };
