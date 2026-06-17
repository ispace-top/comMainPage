"use client";

import Link from "next/link";
import { StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";

type LeadRow = { id: number; name: string; company: string; service: string; status: "new" | "contacted" | "converted" | "invalid"; time: string };

const mockLeads: LeadRow[] = [
  { id: 1, name: "张*明", company: "某制造集团", service: "ISO9001", status: "new", time: "2026-06-17 10:30" },
  { id: 2, name: "李*华", company: "某化工企业", service: "ISO14001", status: "contacted", time: "2026-06-17 09:15" },
  { id: 3, name: "王*国", company: "某建筑公司", service: "ISO45001", status: "converted", time: "2026-06-16 16:20" },
  { id: 4, name: "陈*雨", company: "某食品公司", service: "ISO22000", status: "new", time: "2026-06-16 14:00" },
  { id: 5, name: "刘*远", company: "某汽车零部件厂", service: "IATF 16949", status: "invalid", time: "2026-06-16 11:00" },
];

const columns: TableColumn<LeadRow>[] = [
  { key: "name", header: "姓名", width: "100px" },
  { key: "company", header: "公司" },
  { key: "service", header: "意向项目" },
  {
    key: "status", header: "状态",
    render: (row) => <Badge status={row.status} />,
  },
  { key: "time", header: "提交时间" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="今日新增线索" value={28} trend={{ value: "+12%", positive: true }} />
        <StatCard label="待跟进" value={45} trend={{ value: "+5%", positive: true }} />
        <StatCard label="本月已转化" value={32} />
        <StatCard label="线索总数" value={1280} />
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
        <Table columns={columns} data={mockLeads} rowKey={(r) => r.id} />
      </div>
    </div>
  );
}
