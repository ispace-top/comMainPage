"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { fetchLeads, fetchLeadStats, type Lead, type BadgeStatus } from "@/lib/admin-store";

const columns: TableColumn<Lead>[] = [
  { key: "name", header: "姓名", width: "100px" },
  { key: "company", header: "公司" },
  { key: "service", header: "意向项目" },
  {
    key: "status", header: "状态",
    render: (row) => <Badge status={row.status as BadgeStatus} />,
  },
  { key: "time", header: "提交时间" },
];

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ todayNew: 0, pending: 0, convertedThisMonth: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLeads(), fetchLeadStats()])
      .then(([leadData, statData]) => {
        setLeads(leadData.slice(0, 5));
        setStats(statData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="今日新增线索" value={loading ? "—" : stats.todayNew} trend={{ value: "", positive: true }} />
        <StatCard label="待跟进" value={loading ? "—" : stats.pending} />
        <StatCard label="本月已转化" value={loading ? "—" : stats.convertedThisMonth} />
        <StatCard label="线索总数" value={loading ? "—" : stats.total} />
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "新建服务项目", href: "/admin/content?tab=services&action=new", icon: "+" },
          { label: "发布行业洞察", href: "/admin/content?tab=articles&action=new", icon: "✎" },
          { label: "查看线索列表", href: "/admin/leads", icon: "→" },
        ].map((action) => (
          <Link key={action.label} href={action.href} className="flex items-center gap-4 p-5 bg-white border border-neutral-200 rounded-md hover:shadow-sm hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-center size-10 rounded-md bg-primary-50 text-primary-500 font-bold">{action.icon}</div>
            <span className="text-base font-medium text-neutral-700">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white border border-neutral-200 rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">最新线索</h2>
          <Link href="/admin/leads">
            <Button variant="tertiary" size="sm">查看全部 →</Button>
          </Link>
        </div>
        {leads.length > 0 ? (
          <Table columns={columns as any} data={leads as any} rowKey={(r: any) => r.id} />
        ) : (
          <p className="text-sm text-neutral-400 text-center py-8">{loading ? "加载中..." : "暂无线索数据"}</p>
        )}
      </div>
    </div>
  );
}
