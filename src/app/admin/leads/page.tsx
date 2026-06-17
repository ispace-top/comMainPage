"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Badge, type BadgeStatus } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";

type LeadRow = {
  id: number;
  name: string;
  phone: string;
  company: string;
  service: string;
  sourceUrl: string;
  status: BadgeStatus;
  time: string;
};

const mockLeads: LeadRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ["张*明", "李*华", "王*国", "陈*雨", "刘*远"][i % 5],
  phone: `138****${String(1000 + i).slice(-4)}`,
  company: ["某制造集团", "某化工企业", "某建筑公司", "某食品公司", "某汽车零部件厂"][i % 5],
  service: ["ISO9001", "ISO14001", "ISO45001", "ISO22000", "IATF 16949"][i % 5],
  sourceUrl: `/services/${["iso-9001", "iso-14001", "iso-45001", "iso-22000", "iatf-16949"][i % 5]}`,
  status: (["new", "contacted", "converted", "invalid"] as BadgeStatus[])[i % 4],
  time: `2026-06-${String(17 - Math.floor(i / 5)).padStart(2, "0")} ${String(9 + (i % 6)).padStart(2, "0")}:00`,
}));

const columns: TableColumn<LeadRow>[] = [
  { key: "name", header: "姓名", width: "80px" },
  { key: "phone", header: "手机号", width: "120px" },
  { key: "company", header: "公司" },
  { key: "service", header: "意向项目", width: "100px" },
  {
    key: "status", header: "状态", width: "100px",
    render: (row) => <Badge status={row.status} />,
  },
  { key: "time", header: "提交时间", width: "130px" },
  {
    key: "actions", header: "操作", width: "180px", align: "right",
    render: () => (
      <div className="flex gap-2 justify-end">
        <Button variant="tertiary" size="sm">详情</Button>
        <Button variant="tertiary" size="sm">标记</Button>
      </div>
    ),
  },
];

// Kanban view
function KanbanView() {
  const statuses: { key: BadgeStatus; label: string; color: string }[] = [
    { key: "new", label: "新线索", color: "border-l-primary-500" },
    { key: "contacted", label: "已联系", color: "border-l-warning-500" },
    { key: "converted", label: "已转化", color: "border-l-success-500" },
    { key: "invalid", label: "无效", color: "border-l-error-500" },
  ];

  const groupedLeads = statuses.map(s => ({
    ...s,
    leads: mockLeads.filter(l => l.status === s.key),
  }));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {groupedLeads.map(col => (
        <div key={col.key} className="flex-shrink-0 w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-neutral-800">{col.label}</h3>
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{col.leads.length}</span>
          </div>
          <div className="space-y-3">
            {col.leads.map(lead => (
              <div key={lead.id} className={["bg-white border border-neutral-200 rounded-md p-4 cursor-pointer hover:shadow-sm transition-all border-l-4", col.color].join(" ")}>
                <p className="font-semibold text-neutral-800">{lead.name}</p>
                <p className="text-sm text-neutral-600 mt-1">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600">{lead.service}</span>
                  <span className="text-xs text-neutral-400">{lead.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LeadsPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const view: "list" | "kanban" = viewParam === "kanban" ? "kanban" : "list";
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // Sidebar navigation drives view switching — no need for in-page toggle

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">线索中心</h1>
          <p className="text-sm text-neutral-600 mt-1">管理客户留资数据，跟踪线索转化状态。</p>
        </div>
        <div>
          <Button variant="secondary" size="sm">导出 Excel</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select className="h-10 px-3 text-sm border border-neutral-300 rounded-sm bg-white">
          <option>全部状态</option>
          <option>新线索</option>
          <option>已联系</option>
          <option>已转化</option>
          <option>无效</option>
        </select>
        <input type="search" placeholder="搜索姓名/公司/手机号..." className="h-10 px-3 text-sm border border-neutral-300 rounded-sm w-56 focus:border-primary-500" />
        <input type="date" className="h-10 px-3 text-sm border border-neutral-300 rounded-sm" />
      </div>

      {view === "list" ? (
        <>
          <div className="bg-white border border-neutral-200 rounded-md">
            <Table columns={columns} data={mockLeads.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} rowKey={(r) => r.id} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-neutral-400">共 {mockLeads.length} 条线索</span>
            <Pagination current={page} total={mockLeads.length} pageSize={PAGE_SIZE} onChange={setPage} />
          </div>
        </>
      ) : (
        <KanbanView />
      )}
    </div>
  );
}
