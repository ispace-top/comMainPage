"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/Button";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Badge, type BadgeStatus as UIBadgeStatus } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { SlidePanel } from "@/components/ui/SlidePanel";
import { useToast } from "@/components/ui/Toast";
import { fetchLeads, updateLead, addLead, type Lead, type BadgeStatus } from "@/lib/admin-store";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

const statusLabels: Record<BadgeStatus, string> = {
  new: "新线索",
  contacted: "已联系",
  converted: "已转化",
  invalid: "无效",
};

// Draggable card component
function KanbanCard({ lead, color, onView }: { lead: Lead; color: string; onView: (lead: Lead) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `lead-${lead.id}`,
    data: { lead },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={[
        "bg-white border border-neutral-200 rounded-md p-4 cursor-grab active:cursor-grabbing hover:shadow-sm transition-all border-l-4",
        isDragging ? "opacity-50 shadow-lg scale-105 z-50" : "",
        color,
      ].join(" ")}
      style={style}
    >
      <p className="font-semibold text-neutral-800">{lead.name}</p>
      <p className="text-sm text-neutral-600 mt-1">{lead.company}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600">{lead.service}</span>
        <span className="text-xs text-neutral-400">{lead.time}</span>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onView(lead); }}
        className="mt-2 text-xs text-primary-500 hover:text-primary-600 font-medium"
      >
        查看详情 →
      </button>
    </div>
  );
}

// Droppable column component
function KanbanColumn({
  colKey,
  label,
  color,
  count,
  children,
}: {
  colKey: string;
  label: string;
  color: string;
  count: number;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `col-${colKey}` });

  return (
    <div className="flex-shrink-0 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-neutral-800">{label}</h3>
        <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div
        ref={setNodeRef}
        className={[
          "space-y-3 min-h-[200px] p-2 rounded-md transition-colors",
          isOver ? "bg-primary-50/50" : "bg-transparent",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

const statuses: { key: BadgeStatus; label: string; color: string }[] = [
  { key: "new", label: "新线索", color: "border-l-primary-500" },
  { key: "contacted", label: "已联系", color: "border-l-warning-500" },
  { key: "converted", label: "已转化", color: "border-l-success-500" },
  { key: "invalid", label: "无效", color: "border-l-error-500" },
];

export default function LeadsPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const view: "list" | "kanban" = viewParam === "kanban" ? "kanban" : "list";
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showNewLead, setShowNewLead] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: "", phone: "", company: "", service: "" });
  const { addToast } = useToast();

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params: { status?: string; search?: string } = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (searchText) params.search = searchText;
      const data = await fetchLeads(params);
      setLeads(data);
    } catch (e) {
      console.error(e);
      addToast("error", "加载线索失败");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText, addToast]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const columns: TableColumn<Lead>[] = [
    { key: "name", header: "姓名", width: "80px" },
    { key: "phone", header: "手机号", width: "120px" },
    { key: "company", header: "公司" },
    { key: "service", header: "意向项目", width: "100px" },
    {
      key: "status", header: "状态", width: "100px",
      render: (row) => <Badge status={row.status as UIBadgeStatus} />,
    },
    { key: "time", header: "提交时间", width: "130px" },
    {
      key: "actions", header: "操作", width: "180px", align: "right",
      render: (row) => (
        <div className="flex gap-2 justify-end">
          <Button variant="tertiary" size="sm" onClick={() => setDetailLead(row)}>详情</Button>
          <Button variant="tertiary" size="sm" onClick={async () => {
            const next: BadgeStatus[] = ["new", "contacted", "converted", "invalid"];
            const idx = next.indexOf(row.status);
            const newStatus = next[(idx + 1) % 4];
            await updateLead(row.id, { status: newStatus });
            loadLeads();
            addToast("success", `状态已更新为"${statusLabels[newStatus]}"`);
          }}>标记</Button>
        </div>
      ),
    },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = String(active.id).replace("lead-", "");
    const targetCol = String(over.id).replace("col-", "");

    if (targetCol && ["new", "contacted", "converted", "invalid"].includes(targetCol)) {
      const newStatus = targetCol as BadgeStatus;
      await updateLead(Number(leadId), { status: newStatus });
      loadLeads();
      addToast("success", `已移至"${statusLabels[newStatus]}"`);
    }
  };

  const handleStatusChange = async (leadId: number, newStatus: BadgeStatus) => {
    await updateLead(leadId, { status: newStatus });
    loadLeads();
    setDetailLead((prev) => prev && prev.id === leadId ? { ...prev, status: newStatus } : prev);
    addToast("success", `状态已更新为"${statusLabels[newStatus]}"`);
  };

  const filtered = leads;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">线索中心</h1>
          <p className="text-sm text-neutral-600 mt-1">管理客户留资数据，跟踪线索转化状态。数据存储在服务端 SQLite 数据库中。</p>
        </div>
        <div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => addToast("success", "导出功能开发中")}>导出 Excel</Button>
            <Button variant="primary" size="sm" onClick={() => setShowNewLead(true)}>+ 新建线索</Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="h-10 px-3 text-sm border border-neutral-300 rounded-sm bg-white"
        >
          <option value="all">全部状态</option>
          <option value="new">新线索</option>
          <option value="contacted">已联系</option>
          <option value="converted">已转化</option>
          <option value="invalid">无效</option>
        </select>
        <input
          type="search"
          placeholder="搜索姓名/公司/手机号..."
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
          className="h-10 px-3 text-sm border border-neutral-300 rounded-sm w-56 focus:border-primary-500"
        />
      </div>

      {view === "list" ? (
        <>
          <div className="bg-white border border-neutral-200 rounded-md">
            {loading ? (
              <p className="text-sm text-neutral-400 text-center py-12">加载中...</p>
            ) : filtered.length > 0 ? (
              <Table columns={columns} data={filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} rowKey={(r) => r.id} />
            ) : (
              <p className="text-sm text-neutral-400 text-center py-12">暂无线索数据</p>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-neutral-400">共 {filtered.length} 条线索</span>
            {filtered.length > PAGE_SIZE && <Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />}
          </div>
        </>
      ) : (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {statuses.map((col) => {
              const colLeads = filtered.filter((l) => l.status === col.key);
              return (
                <KanbanColumn
                  key={col.key}
                  colKey={col.key}
                  label={col.label}
                  color={col.color}
                  count={colLeads.length}
                >
                  {colLeads.map((lead) => (
                    <KanbanCard key={lead.id} lead={lead} color={col.color} onView={setDetailLead} />
                  ))}
                </KanbanColumn>
              );
            })}
          </div>
        </DndContext>
      )}

      {/* Lead Detail Slide Panel */}
      <SlidePanel
        open={!!detailLead}
        onClose={() => setDetailLead(null)}
        title="线索详情"
      >
        {detailLead && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">客户信息</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-400">姓名</p>
                  <p className="text-base font-medium text-neutral-800">{detailLead.name}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">手机号</p>
                  <p className="text-base font-medium text-neutral-800">{detailLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">公司</p>
                  <p className="text-base font-medium text-neutral-800">{detailLead.company || "-"}</p>
                </div>
              </div>
            </div>

            {/* Lead Info */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">线索信息</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-400">意向项目</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-sm bg-primary-50 text-primary-600 font-medium">{detailLead.service}</span>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">来源页面</p>
                  <p className="text-sm text-primary-500 mt-0.5">{detailLead.source_url || detailLead.sourceUrl}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">提交时间</p>
                  <p className="text-sm text-neutral-600 mt-0.5">{detailLead.time}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">当前状态</p>
                  <Badge status={detailLead.status as UIBadgeStatus} />
                </div>
              </div>
            </div>

            {/* Status Flow */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">状态流转</h3>
              <div className="flex flex-wrap gap-2">
                {(["new", "contacted", "converted", "invalid"] as BadgeStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(detailLead.id, s)}
                    className={[
                      "px-3 py-1.5 text-xs font-medium rounded-sm transition-colors border",
                      detailLead.status === s
                        ? "bg-primary-50 border-primary-300 text-primary-600"
                        : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300",
                    ].join(" ")}
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Follow-up Notes */}
            <div>
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">跟进记录</h3>
              <div className="text-sm text-neutral-400 py-4 text-center border border-dashed border-neutral-200 rounded-md">
                暂无跟进记录
              </div>
            </div>
          </div>
        )}
      </SlidePanel>

      {/* New Lead Modal */}
      <Modal
        open={showNewLead}
        onClose={() => setShowNewLead(false)}
        title="新建线索"
        size="md"
      >
        <div className="space-y-4">
          <Input label="姓名" value={newLeadForm.name} onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })} placeholder="客户姓名" />
          <Input label="手机号" value={newLeadForm.phone} onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })} placeholder="手机号" />
          <Input label="公司" value={newLeadForm.company} onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })} placeholder="公司名称" />
          <Input label="意向项目" value={newLeadForm.service} onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })} placeholder="如: ISO9001" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="tertiary" onClick={() => setShowNewLead(false)}>取消</Button>
            <Button variant="primary" onClick={async () => {
              if (!newLeadForm.name.trim()) return;
              await addLead({
                name: newLeadForm.name.trim(),
                phone: newLeadForm.phone.trim(),
                company: newLeadForm.company.trim(),
                service: newLeadForm.service.trim() || "未指定",
                source_url: "/admin/leads",
                status: "new",
                time: new Date().toISOString().replace("T", " ").slice(0, 16),
              });
              setShowNewLead(false);
              setNewLeadForm({ name: "", phone: "", company: "", service: "" });
              loadLeads();
              addToast("success", "线索已创建");
            }}>创建</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
