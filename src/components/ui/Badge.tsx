type BadgeStatus = "new" | "contacted" | "converted" | "invalid";

const statusConfig: Record<BadgeStatus, { bg: string; text: string; dot: string; label: string }> = {
  new: {
    bg: "bg-primary-50",
    text: "text-primary-600",
    dot: "bg-primary-500",
    label: "新线索",
  },
  contacted: {
    bg: "bg-warning-50",
    text: "text-warning-700",
    dot: "bg-warning-500",
    label: "已联系",
  },
  converted: {
    bg: "bg-success-50",
    text: "text-success-700",
    dot: "bg-success-500",
    label: "已转化",
  },
  invalid: {
    bg: "bg-error-50",
    text: "text-error-700",
    dot: "bg-error-500",
    label: "无效",
  },
};

interface BadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

export function Badge({ status, label, className = "" }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap",
        config.bg,
        config.text,
        className,
      ].join(" ")}
    >
      <span className={["block size-2 rounded-full", config.dot].join(" ")} />
      {label || config.label}
    </span>
  );
}

export { statusConfig };
export type { BadgeProps, BadgeStatus };
