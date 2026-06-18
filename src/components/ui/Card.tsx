import { type HTMLAttributes, type ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "stat" | "feature";
  hover?: boolean;
  children: ReactNode;
}

export function Card({
  variant = "default",
  hover = true,
  children,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = {
    default: [
      "bg-white border border-neutral-200 rounded-md shadow-xs",
      "p-6",
      hover &&
        "hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer",
    ].join(" "),
    stat: [
      "bg-white border border-neutral-200 rounded-md",
      "p-6",
      "relative overflow-hidden",
    ].join(" "),
    feature: [
      "bg-white rounded-lg shadow-sm",
      "p-8",
      hover &&
        "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out",
    ].join(" "),
  };

  return (
    <div className={[baseStyles[variant], className].join(" ")} {...props}>
      {children}
    </div>
  );
}

/** Stat Card — used in Dashboard */
export function StatCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string | number;
  trend?: { value: string; positive: boolean };
  icon?: ReactNode;
}) {
  return (
    <Card variant="stat">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">{label}</p>
          <p className="mt-1 text-4xl font-bold text-primary-600">{value}</p>
          {trend && (
            <p
              className={[
                "mt-1.5 text-sm font-medium inline-flex items-center gap-0.5",
                trend.positive ? "text-success-500" : "text-error-500",
              ].join(" ")}
            >
              <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor">
                {trend.positive ? (
                  <path d="M8 3.5a.5.5 0 01.35.15l4.5 4.5a.5.5 0 01-.7.7L8.5 5.21V12.5a.5.5 0 01-1 0V5.21L3.85 8.85a.5.5 0 01-.7-.7l4.5-4.5A.5.5 0 018 3.5z" />
                ) : (
                  <path d="M8 12.5a.5.5 0 01-.35-.15l-4.5-4.5a.5.5 0 01.7-.7l3.65 3.64V3.5a.5.5 0 011 0v7.29l3.65-3.64a.5.5 0 01.7.7l-4.5 4.5A.5.5 0 018 12.5z" />
                )}
              </svg>
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-neutral-100 size-16 -mr-2 -mt-2">{icon}</div>
        )}
      </div>
    </Card>
  );
}

/** Feature Card — used in homepage "Why Us" section */
export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card variant="feature" className="h-full flex flex-col">
      <div className="flex items-center justify-center size-12 rounded-lg bg-primary-50 text-primary-500 mb-4 shrink-0">
        <span className="size-8">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2 shrink-0">{title}</h3>
      <p className="text-base text-neutral-600 flex-1">{description}</p>
    </Card>
  );
}

export type { CardProps };
