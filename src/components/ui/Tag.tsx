interface TagProps {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles: Record<NonNullable<TagProps["variant"]>, string> = {
  default: "bg-neutral-100 text-neutral-600",
  primary: "bg-primary-50 text-primary-600",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  error: "bg-error-50 text-error-700",
  outline: "bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900",
};

const sizeStyles: Record<NonNullable<TagProps["size"]>, string> = {
  sm: "h-[22px] px-2 text-xs",
  md: "h-7 px-3 text-sm",
};

export function Tag({
  variant = "default",
  size = "md",
  children,
  className = "",
  removable = false,
  onRemove,
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 font-medium rounded-sm whitespace-nowrap select-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-black/10 transition-colors"
          aria-label="移除"
        >
          <svg className="size-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3.47 3.47a.75.75 0 011.06 0L6 4.94l1.47-1.47a.75.75 0 111.06 1.06L7.06 6l1.47 1.47a.75.75 0 11-1.06 1.06L6 7.06l-1.47 1.47a.75.75 0 01-1.06-1.06L4.94 6 3.47 4.53a.75.75 0 010-1.06z" />
          </svg>
        </button>
      )}
    </span>
  );
}

export type { TagProps };
