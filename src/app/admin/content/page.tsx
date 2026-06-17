"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";

type ContentRow = Record<string, unknown> & { id: number };

const mockData: Record<string, ContentRow[]> = {
  banner: [
    { id: 1, title: "首页主Banner", status: "published", created: "2026-06-01" },
    { id: 2, title: "认证服务Banner", status: "draft", created: "2026-06-10" },
  ],
  services: [
    { id: 1, title: "ISO9001 质量管理体系", category: "ISO体系", status: "published", created: "2026-05-15" },
    { id: 2, title: "ISO14001 环境管理体系", category: "ISO体系", status: "published", created: "2026-05-20" },
    { id: 3, title: "ISO45001 职业健康安全", category: "ISO体系", status: "draft", created: "2026-06-01" },
  ],
  cases: [
    { id: 1, title: "某制造集团 ISO9001 认证案例", industry: "制造业", status: "published", created: "2026-06-05" },
    { id: 2, title: "某化工企业 ISO14001 案例", industry: "化工", status: "published", created: "2026-06-08" },
  ],
  articles: [
    { id: 1, title: "ISO9001:2025 新版标准解读", category: "政策解读", status: "published", created: "2026-06-10" },
    { id: 2, title: "中小企业如何高效通过认证", category: "认证知识", status: "draft", created: "2026-06-03" },
  ],
};

const columnsMap: Record<string, TableColumn<ContentRow>[]> = {
  banner: [
    { key: "title", header: "标题" },
    { key: "status", header: "状态", render: (r) => r.status === "published" ? <Badge status="converted" label="已发布" /> : <Badge status="new" label="草稿" /> },
    { key: "created", header: "创建时间" },
  ],
  services: [
    { key: "title", header: "项目名称" },
    { key: "category", header: "分类" },
    { key: "status", header: "状态", render: (r) => r.status === "published" ? <Badge status="converted" label="已发布" /> : <Badge status="new" label="草稿" /> },
    { key: "created", header: "创建时间" },
  ],
  cases: [
    { key: "title", header: "案例名称" },
    { key: "industry", header: "行业" },
    { key: "status", header: "状态" },
    { key: "created", header: "创建时间" },
  ],
  articles: [
    { key: "title", header: "文章标题" },
    { key: "category", header: "分类" },
    { key: "status", header: "状态", render: (r) => r.status === "published" ? <Badge status="converted" label="已发布" /> : <Badge status="new" label="草稿" /> },
    { key: "created", header: "创建时间" },
  ],
};

export default function ContentPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "banner";
  const activeTab = ["banner", "services", "cases", "articles"].includes(tabParam) ? tabParam : "banner";
  const [page, setPage] = useState(1);

  const data = mockData[activeTab] || [];
  const columns = columnsMap[activeTab] || [];

  // Sidebar navigation drives tab switching via URL param — no need for in-page tabs

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-800 mb-2">内容中心</h1>
      <p className="text-sm text-neutral-600 mb-6">管理 Banner、服务项目、成功案例和行业洞察内容。</p>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input type="search" placeholder="搜索..." className="h-11 px-3 text-sm border border-neutral-300 rounded-sm w-64 focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]" />
          <select className="h-11 px-3 text-sm border border-neutral-300 rounded-sm bg-white">
            <option>全部状态</option>
            <option>已发布</option>
            <option>草稿</option>
          </select>
        </div>
        <Button variant="primary" size="sm">+ 新建</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-md">
        <Table columns={columns} data={data} rowKey={(r) => r.id} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-neutral-400">共 {data.length} 条</span>
        <Pagination current={page} total={data.length} pageSize={10} onChange={setPage} />
      </div>
    </div>
  );
}
