"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tag } from "@/components/ui/Tag";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/scroll-reveal";

const articleSlugs = ["iso9001-2025", "digital-certification", "small-business-iso", "iso14001-guide", "audit-nonconformity", "digital-cert-management", "food-safety-update", "ohs-case-study", "mutual-recognition"];

const articles = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  slug: articleSlugs[i],
  category: ["policy", "trends", "knowledge"][i % 3],
  date: `2026-0${6 - Math.floor(i / 3)}-${String(10 + i).padStart(2, "0")}`,
  titleZh: [
    "ISO9001:2025 新版标准解读与实施要点",
    "中小企业如何高效通过ISO认证审核",
    "2026年制造业质量管理趋势报告",
    "ISO14001 环境管理体系升级指南",
    "认证审核中的常见不符合项及应对策略",
    "数字化转型时代的认证管理新思路",
    "食品行业安全管理体系最新动态",
    "职业健康安全管理体系实施案例分享",
    "国际认证标准的互认机制深度解析",
  ][i],
  titleEn: [
    "ISO9001:2025 New Standard: Key Updates & Implementation",
    "How SMEs Can Pass ISO Audits Efficiently",
    "2026 Manufacturing Quality Management Trends",
    "ISO14001 Environmental Management Upgrade Guide",
    "Common Non-conformities in Certification Audits & Solutions",
    "New Approaches to Certification Management in the Digital Era",
    "Latest Updates on Food Safety Management Systems",
    "Occupational Health & Safety Implementation Case Study",
    "Deep Dive into International Certification Mutual Recognition",
  ][i],
  summaryZh: "深入解读认证行业最新动态，为企业管理者提供权威、实用的政策解读与行业洞察。",
  summaryEn: "In-depth analysis of the latest certification trends, providing authoritative and practical policy interpretations for business leaders.",
}));

const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "policy", zh: "政策解读", en: "Policy" },
  { key: "trends", zh: "行业动态", en: "Trends" },
  { key: "knowledge", zh: "认证知识", en: "Knowledge" },
];

const PAGE_SIZE = 6;

export default function InsightsPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);
  useScrollReveal();

  const filtered = cat === "all" ? articles : articles.filter(a => a.category === cat);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: `/${lang}` }, { label: lang === "zh" ? "行业洞察" : "Insights" }]} className="mb-6" />
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
            <Link key={a.id} href={`/${lang}/insights/${a.slug}`} className="group block bg-white border border-neutral-200 rounded-md overflow-hidden shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <svg className="size-12 text-neutral-300" viewBox="0 0 48 48" fill="currentColor"><rect x="6" y="8" width="36" height="32" rx="2"/><circle cx="16" cy="18" r="3" fill="white" opacity="0.5"/><path d="M6 28h36" stroke="white" strokeWidth="2"/></svg>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{a.date}</span>
                  <span className="px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600 text-xs font-medium">{a.category}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-800 line-clamp-2 group-hover:text-primary-500 transition-colors">{lang === "zh" ? a.titleZh : a.titleEn}</h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{lang === "zh" ? a.summaryZh : a.summaryEn}</p>
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
