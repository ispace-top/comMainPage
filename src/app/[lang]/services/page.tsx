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
import { SERVICE_DETAILS, SERVICE_SLUGS } from "@/lib/seed-data";

const PAGE_SIZE = 9;

function slugFromTitle(title: string): string {
  const isoMatch = title.match(/ISO\s*(\d+)/i);
  if (isoMatch) return `iso-${isoMatch[1]}`;
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const icons = ["🏭", "🌿", "🛡️", "🔒", "🍽️", "📋", "🚗", "💊", "🤝"];

const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "ISO体系", zh: "ISO 体系", en: "ISO Systems" },
];

export default function ServicesPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [services, setServices] = useState<{ id: number; title: string; slug: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal(!loading);

  useEffect(() => {
    fetch("/api/content?type=services")
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data as { id: number; title: string; category: string }[]).map((s) => ({
          ...s,
          slug: slugFromTitle(s.title),
        }));
        setServices(mapped.length > 0 ? mapped : SERVICE_SLUGS.map((slug, i) => ({
          id: i + 1,
          title: SERVICE_DETAILS[slug]?.[lang]?.name || slug,
          slug,
          category: SERVICE_DETAILS[slug]?.[lang]?.category || "ISO体系",
        })));
      })
      .catch(() => {
        setServices(SERVICE_SLUGS.map((slug, i) => ({
          id: i + 1,
          title: SERVICE_DETAILS[slug]?.[lang]?.name || slug,
          slug,
          category: SERVICE_DETAILS[slug]?.[lang]?.category || "ISO体系",
        })));
      })
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;

  const filtered = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const breadcrumbItems = [
    { label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") },
    { label: lang === "zh" ? "认证服务" : "Services" },
  ];

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="max-w-[600px]">
          <h1 className="text-4xl font-bold text-neutral-800">
            {lang === "zh" ? "认证服务" : "Certification Services"}
          </h1>
          <p className="mt-4 text-lg text-neutral-500">
            {lang === "zh"
              ? "覆盖主流国际标准认证体系，为企业提供全方位、一站式的认证咨询服务。"
              : "Covering major international certification standards for comprehensive one-stop consulting services."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <Tag key={cat.key} variant={activeCategory === cat.key ? "primary" : "outline"} size="md">
              <button onClick={() => { setActiveCategory(cat.key); setPage(1); }}>
                {lang === "zh" ? cat.zh : cat.en}
              </button>
            </Tag>
          ))}
        </div>

        {paged.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title={lang === "zh" ? "未找到相关服务" : "No Services Found"}
              description={lang === "zh" ? "请尝试调整筛选条件" : "Try adjusting your filter criteria"}
              action={<Button variant="secondary" size="sm" onClick={() => { setActiveCategory("all"); setPage(1); }}>{lang === "zh" ? "清除筛选" : "Clear Filter"}</Button>}
            />
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((service, i) => {
              const detail = SERVICE_DETAILS[service.slug];
              const title = detail?.[lang]?.name || service.title;
              const desc = detail?.[lang]?.desc || "";
              return (
                <Link
                  key={service.slug}
                  href={langPath(lang, `/services/${service.slug}`)}
                  className="group block bg-white border border-neutral-200 rounded-md p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll"
                >
                  <span className="text-3xl">{icons[i % icons.length]}</span>
                  <h3 className="mt-4 text-xl font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors">{title}</h3>
                  {desc && <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{desc}</p>}
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                    {lang === "zh" ? "了解详情" : "Learn More"}
                    <svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          <Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
