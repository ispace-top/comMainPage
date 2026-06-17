import { type ReactNode } from "react";

interface TableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  loading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyState,
  onRowClick,
  className = "",
}: TableProps<T>) {
  if (loading) {
    return (
      <div className={["overflow-x-auto", className].join(" ")}>
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="h-12 px-4 text-left text-sm font-medium text-neutral-700 border-b-2 border-neutral-200"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-neutral-200">
                {columns.map((col) => (
                  <td key={col.key} className="h-[52px] px-4">
                    <div className="h-4 rounded skeleton-shimmer w-3/4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={["overflow-x-auto rounded-md border border-neutral-200", className].join(" ")}>
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  "h-12 px-4 text-sm font-medium text-neutral-700 border-b-2 border-neutral-200 whitespace-nowrap",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                ].join(" ")}
                style={{ width: col.width }}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <svg className="size-3.5 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 3.5a.5.5 0 01.35.15l3 3a.5.5 0 01-.7.7L8 4.71 5.35 7.35a.5.5 0 01-.7-.7l3-3A.5.5 0 018 3.5zm0 9a.5.5 0 01-.35-.15l-3-3a.5.5 0 01.7-.7L8 11.29l2.65-2.64a.5.5 0 01.7.7l-3 3A.5.5 0 018 12.5z" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={rowKey(row, index)}
              onClick={() => onRowClick?.(row)}
              className={[
                "border-b border-neutral-200 last:border-b-0 transition-colors",
                "even:bg-neutral-50 hover:bg-primary-50/30",
                onRowClick && "cursor-pointer",
              ].join(" ")}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    "h-[52px] px-4 text-sm text-neutral-600",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                  ].join(" ")}
                >
                  {col.render
                    ? col.render(row, index)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { TableColumn, TableProps };
