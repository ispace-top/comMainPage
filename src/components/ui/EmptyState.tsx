import { type ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const defaultIcon = (
  <svg className="size-16 text-neutral-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="12" width="48" height="40" rx="4" />
    <path d="M8 24h48" />
    <path d="M20 36h8" strokeLinecap="round" />
  </svg>
);

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={["flex flex-col items-center justify-center py-16 px-4 text-center", className].join(" ")}>
      <div className="mb-4">{icon || defaultIcon}</div>
      <h3 className="text-lg font-semibold text-neutral-600 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-400 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
