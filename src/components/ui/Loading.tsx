interface SkeletonProps {
  className?: string;
}

/** General purpose skeleton block */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={["rounded skeleton-shimmer", className].join(" ")}
      aria-hidden="true"
    />
  );
}

/** Card skeleton for list pages */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-md border border-neutral-200 p-6 space-y-3">
      <Skeleton className="h-40 w-full rounded-sm" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

/** Page content skeleton */
export function PageSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      ))}
    </div>
  );
}

/** Spinner for buttons / inline loading */
export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "size-4", md: "size-6", lg: "size-8" };
  return (
    <svg
      className={["animate-spin text-primary-500", sizeMap[size]].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="加载中"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path
        d="M22 12a10 10 0 00-17.32-7.07"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
