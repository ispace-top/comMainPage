"use client";

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white shadow-xs hover:bg-primary-600 hover:shadow-sm active:bg-primary-700 active:shadow-xs focus-visible:outline-2 focus-visible:outline-primary-300 disabled:opacity-40 disabled:cursor-not-allowed",
  secondary:
    "border-1.5 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 hover:border-primary-600 active:bg-primary-100 focus-visible:outline-2 focus-visible:outline-primary-300 disabled:opacity-40 disabled:cursor-not-allowed",
  tertiary:
    "bg-transparent text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-primary-300 disabled:opacity-40 disabled:cursor-not-allowed",
  accent:
    "bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-sm hover:from-accent-500 hover:to-accent-500 active:from-[#B45309] active:to-[#B45309] focus-visible:outline-2 focus-visible:outline-accent-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger:
    "bg-error-500 text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus-visible:outline-2 focus-visible:outline-error-300 disabled:opacity-40 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 [&>svg]:size-4 rounded-md",
  md: "h-11 px-6 text-base gap-2 [&>svg]:size-5 rounded-md",
  lg: "h-13 px-8 text-lg gap-2 [&>svg]:size-5 rounded-md",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center font-medium transition-all duration-150 ease-standard select-none",
          variantStyles[variant],
          sizeStyles[size],
          "min-w-[44px] min-h-[44px]", // touch target
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M14 8a6 6 0 00-10.39-4.24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : icon && iconPosition === "left" ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
        {!loading && icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
