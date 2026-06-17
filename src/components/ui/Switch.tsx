"use client";

import { forwardRef } from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, label, disabled = false, id }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className="flex items-center gap-3">
        <button
          ref={ref}
          role="switch"
          id={switchId}
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={[
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-200 ease-standard",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300",
            checked ? "bg-primary-500" : "bg-neutral-300",
            disabled && "opacity-40 cursor-not-allowed",
            !disabled && "cursor-pointer",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block size-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-standard",
              checked ? "translate-x-[22px]" : "translate-x-[2px]",
            ].join(" ")}
          />
        </button>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm text-neutral-700 select-none cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
export { Switch };
export type { SwitchProps };
