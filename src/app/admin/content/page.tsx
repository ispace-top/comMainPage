"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import {
  fetchContent,
  addContent,
  updateContent,
  deleteContent,
  type ContentItem,
  type ContentType,
} from "@/lib/admin-store";

type ContentRow = Record<string, unknown> & { id: number; title: string; status: string; created: string };

const TAB_LABELS: Record<ContentType, string> = {
  banner: "Banner 管理",
  services: "服务项目",
  cases: "成功案例",
  articles: "行业洞察",
};

const columnsMap: Record<ContentType, TableColumn<ContentRow>[]> = {
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
    { key: "status", header: "状态", render: (r) => r.status === "published" ? <Badge status="converted" label="已发布" /> : <Badge status="new" label="草稿" /> },
    { key: "created", header: "创建时间" },
  ],
  articles: [
    { key: "title", header: "文章标题" },
    { key: "category", header: "分类" },
    { key: "status", header: "状态", render: (r) => r.status === "published" ? <Badge status="converted" label="已发布" /> : <Badge status="new" label="草稿" /> },
    { key: "created", header: "创建时间" },
  ],
};

const EXTRA_FIELD_META: Record<ContentType, { key: string; label: string } | null> = {
  banner: null,
  services: { key: "category", label: "分类 (如: ISO体系, 行业认证)" },
  cases: { key: "industry", label: "所属行业 (如: 制造业, 化工)" },
  articles: { key: "category", label: "分类 (如: 政策解读, 认证知识)" },
};

const SHOW_BODY_FIELDS: ContentType[] = ["services", "cases", "articles"];

export default function ContentPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "banner";
  const activeTab: ContentType = ["banner", "services", "cases", "articles"].includes(tabParam) ? tabParam as ContentType : "banner";
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formExtra, setFormExtra] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formPublished, setFormPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchContent(activeTab);
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadItems();
    setPage(1);
  }, [loadItems]);

  const filtered = items.filter((item) => {
    if (search && !item.title.includes(search)) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    return true;
  });

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openNew = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormExtra("");
    setFormSummary("");
    setFormBody("");
    setFormPublished(false);
    setShowModal(true);
  };

  const openEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    const meta = EXTRA_FIELD_META[activeTab];
    setFormExtra(meta ? ((item as any)[meta.key] || "") : "");
    setFormSummary(item.summary || "");
    setFormBody(item.body || "");
    setFormPublished(item.status === "published");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    setSaving(true);
    try {
      const meta = EXTRA_FIELD_META[activeTab];
      const extra: Record<string, string> = {};
      if (meta) extra[meta.key] = formExtra;

      const base = {
        title: formTitle.trim(),
        status: formPublished ? "published" as const : "draft" as const,
        ...extra,
      };

      if (editingItem) {
        await updateContent(editingItem.id, {
          ...base,
          summary: formSummary,
          body: formBody,
        } as any);
        addToast("success", "内容已更新");
      } else {
        await addContent({
          type: activeTab,
          ...base,
          summary: formSummary,
          body: formBody,
          created: new Date().toISOString().slice(0, 10),
        } as any);
        addToast("success", "新内容已创建");
      }
      setShowModal(false);
      loadItems();
    } catch (e) {
      console.error(e);
      addToast("error", "保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContent(id);
      loadItems();
      addToast("success", "内容已删除");
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePublish = async (item: ContentItem) => {
    try {
      await updateContent(item.id, {
        status: item.status === "published" ? "draft" : "published",
      } as any);
      loadItems();
      addToast("success", item.status === "published" ? "已取消发布" : "已发布");
    } catch (e) {
      console.error(e);
    }
  };

  const showBodyFields = SHOW_BODY_FIELDS.includes(activeTab);
  const columns = columnsMap[activeTab];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-neutral-800 mb-2">内容中心</h1>
      <p className="text-sm text-neutral-600 mb-6">管理 {TAB_LABELS[activeTab]} 内容。数据存储在服务端 SQLite 数据库中。</p>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="搜索..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-11 px-3 text-sm border border-neutral-300 rounded-sm w-64 focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.15)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-11 px-3 text-sm border border-neutral-300 rounded-sm bg-white"
          >
            <option value="all">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <Button variant="primary" size="sm" onClick={openNew}>+ 新建</Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-md">
        {loading ? (
          <p className="text-sm text-neutral-400 text-center py-12">加载中...</p>
        ) : pageData.length > 0 ? (
          <Table
            columns={[
              ...columns,
              {
                key: "actions", header: "操作", width: "220px", align: "right" as const,
                render: (row) => {
                  const item = row as unknown as ContentItem;
                  return (
                    <div className="flex gap-2 justify-end">
                      <Button variant="tertiary" size="sm" onClick={() => openEdit(item)}>编辑</Button>
                      <Button variant="tertiary" size="sm" onClick={() => handleTogglePublish(item)}>
                        {item.status === "published" ? "下架" : "发布"}
                      </Button>
                      <Button variant="tertiary" size="sm" onClick={() => handleDelete(item.id)}>删除</Button>
                    </div>
                  );
                },
              },
            ]}
            data={pageData as unknown as ContentRow[]}
            rowKey={(r) => r.id}
          />
        ) : (
          <p className="text-sm text-neutral-400 text-center py-12">暂无内容，点击"+ 新建"添加</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-neutral-400">共 {filtered.length} 条</span>
        {totalPages > 1 && <Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? `编辑 — ${TAB_LABELS[activeTab]}` : `新建 — ${TAB_LABELS[activeTab]}`}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="标题"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="请输入标题"
            required
          />

          {EXTRA_FIELD_META[activeTab] && (
            <Input
              label={EXTRA_FIELD_META[activeTab]!.label}
              value={formExtra}
              onChange={(e) => setFormExtra(e.target.value)}
            />
          )}

          {showBodyFields && (
            <>
              <Textarea
                label="摘要"
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                placeholder="简短描述，用于列表展示"
                rows={3}
              />
              <Textarea
                label="正文内容 (支持 Markdown)"
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                placeholder="## 标题&#10;&#10;正文内容..."
                rows={8}
              />
            </>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
            <Switch checked={formPublished} onChange={setFormPublished} label="发布" />
            <div className="flex gap-3">
              <Button variant="tertiary" onClick={() => setShowModal(false)}>取消</Button>
              <Button variant="primary" loading={saving} onClick={handleSave}>
                {editingItem ? "保存修改" : "创建"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
