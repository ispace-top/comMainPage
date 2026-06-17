import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className={className}>
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg className="size-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5.47 3.47a.75.75 0 011.06 0L10.47 7.4a.75.75 0 010 1.06l-3.94 3.94a.75.75 0 11-1.06-1.06L8.94 8 5.47 4.53a.75.75 0 010-1.06z" />
                </svg>
              )}
              {isLast ? (
                <span className="font-semibold text-neutral-800">{item.label}</span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-primary-500 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-500">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type { BreadcrumbItem, BreadcrumbProps };
