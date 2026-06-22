"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tag } from "@/components/ui/Tag";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/Loading";
import { useScrollReveal } from "@/lib/scroll-reveal";

const fallbackArticles = [
  { id: 1, title: "ISO9001:2025 新版标准解读与实施要点", category: "政策解读", created: "2026-06-10" },
  { id: 2, title: "中小企业如何高效通过ISO认证审核", category: "认证知识", created: "2026-06-03" },
  { id: 3, title: "2026年制造业质量管理趋势报告", category: "行业动态", created: "2026-05-28" },
];

const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "政策解读", zh: "政策解读", en: "Policy" },
  { key: "认证知识", zh: "认证知识", en: "Knowledge" },
  { key: "行业动态", zh: "行业动态", en: "Trends" },
];

const PAGE_SIZE = 6;

export default function InsightsPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<{ id: number; title: string; category: string; created: string }[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal(!loading);

  useEffect(() => {
    setLoading(true);
    fetch("/api/content?type=articles")
      .then((r) => r.json())
      .then((data) => setArticles(data.length > 0 ? data : fallbackArticles))
      .catch(() => setArticles(fallbackArticles))
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;

  const filtered = cat === "all" ? articles : articles.filter((a) => a.category === cat);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") }, { label: lang === "zh" ? "行业洞察" : "Insights" }]} className="mb-6" />
        <h1 className="text-4xl font-bold text-neutral-800">{lang === "zh" ? "行业洞察" : "Industry Insights"}</h1>
        <p className="mt-4 text-lg text-neutral-500 max-w-[600px]">{lang === "zh" ? "最新认证政策解读与行业动态，助力企业把握先机。" : "Latest certification policies and industry trends."}</p>

        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map(c => (
            <Tag key={c.key} variant={cat === c.key ? "primary" : "outline"} size="md">
              <button onClick={() => { setCat(c.key); setPage(1); }}>{lang === "zh" ? c.zh : c.en}</button>
            </Tag>
          ))}
        </div>

        {paged.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title={lang === "zh" ? "未找到相关文章" : "No Articles Found"}
              description={lang === "zh" ? "请尝试调整筛选条件" : "Try adjusting your filter criteria"}
              action={<Button variant="secondary" size="sm" onClick={() => { setCat("all"); setPage(1); }}>{lang === "zh" ? "清除筛选" : "Clear Filter"}</Button>}
            />
          </div>
        ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((a, i) => (
            <Link key={a.id} href={langPath(lang, `/insights/${a.id}`)} className="group block bg-white border border-neutral-200 rounded-md overflow-hidden shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="aspect-video bg-neutral-100 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-${["1454165804606-c3d57bc86b40","1434030216411-0b793f4b4173","1553877522-43269d4ea984"][i % 3]}?w=600&q=80`} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{a.created || ""}</span>
                  {a.category && <span className="px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600 text-xs font-medium">{a.category}</span>}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-800 line-clamp-2 group-hover:text-primary-500 transition-colors">{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        )}

        <div className="mt-10">
          <Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
