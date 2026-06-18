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
import { PageSkeleton } from "@/components/ui/Loading";
import { usePageData } from "@/lib/use-page-data";
import { useScrollReveal } from "@/lib/scroll-reveal";

const PAGE_SIZE = 9;

const allServices = [
  { slug: "iso-9001", icon: "🏭", category: "iso" },
  { slug: "iso-14001", icon: "🌿", category: "iso" },
  { slug: "iso-45001", icon: "🛡️", category: "iso" },
  { slug: "iso-27001", icon: "🔒", category: "iso" },
  { slug: "iso-22000", icon: "🍽️", category: "iso" },
  { slug: "haccp", icon: "📋", category: "industry" },
  { slug: "iatf-16949", icon: "🚗", category: "industry" },
  { slug: "iso-13485", icon: "💊", category: "industry" },
  { slug: "sa8000", icon: "🤝", category: "service" },
];

const serviceInfo: Record<string, { zh: { title: string; desc: string }; en: { title: string; desc: string } }> = {
  "iso-9001": { zh: { title: "ISO9001 质量管理体系", desc: "国际公认的质量管理标准，适用于任何规模的企业，助力提升客户满意度和运营效率。" }, en: { title: "ISO9001 Quality Management", desc: "Internationally recognized quality management standard for enterprises of all sizes." } },
  "iso-14001": { zh: { title: "ISO14001 环境管理体系", desc: "帮助企业建立环境保护机制，实现可持续发展目标，提升企业社会责任形象。" }, en: { title: "ISO14001 Environmental Management", desc: "Build environmental protection mechanisms and achieve sustainable development goals." } },
  "iso-45001": { zh: { title: "ISO45001 职业健康安全", desc: "保障员工职业健康与安全，降低工伤事故风险，构建安全的生产环境。" }, en: { title: "ISO45001 OH&S Management", desc: "Protect employee occupational health and safety, reduce workplace accident risks." } },
  "iso-27001": { zh: { title: "ISO27001 信息安全", desc: "国际信息安全管理的黄金标准，保护企业核心数据和客户隐私安全。" }, en: { title: "ISO27001 Information Security", desc: "The gold standard for information security management." } },
  "iso-22000": { zh: { title: "ISO22000 食品安全", desc: "覆盖食品全产业链的安全管理体系，确保从农田到餐桌的食品安全。" }, en: { title: "ISO22000 Food Safety", desc: "Food safety management covering the entire food supply chain." } },
  "haccp": { zh: { title: "HACCP 危害分析", desc: "系统化的食品安全预防体系，识别并控制食品生产过程中的潜在危害。" }, en: { title: "HACCP Hazard Analysis", desc: "Systematic preventive approach to food safety." } },
  "iatf-16949": { zh: { title: "IATF 16949 汽车行业", desc: "面向汽车行业的专项质量管理标准，满足全球汽车供应链的严格要求。" }, en: { title: "IATF 16949 Automotive", desc: "Quality management standard for the automotive industry." } },
  "iso-13485": { zh: { title: "ISO13485 医疗器械", desc: "医疗器械行业质量管理体系核心标准，确保产品安全性和有效性。" }, en: { title: "ISO13485 Medical Devices", desc: "Core quality management standard for medical device industry." } },
  "sa8000": { zh: { title: "SA8000 社会责任", desc: "全球首个社会责任认证标准，关注劳工权益、工作环境与人权保障。" }, en: { title: "SA8000 Social Accountability", desc: "The first global social accountability certification standard." } },
};

const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "iso", zh: "ISO 体系", en: "ISO Systems" },
  { key: "industry", zh: "行业认证", en: "Industry Cert." },
  { key: "service", zh: "服务认证", en: "Service Cert." },
];

export default function ServicesPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const { loading, error, retry } = usePageData(
    () => new Promise<void>((resolve) => setTimeout(resolve, 200))
  );

  useScrollReveal();

  if (error) {
    return (
      <div className="section-padding">
        <div className="container-page">
          <EmptyState
            title={lang === "zh" ? "加载失败" : "Loading Failed"}
            description={error}
            action={<Button variant="secondary" size="md" onClick={retry}>{lang === "zh" ? "重新加载" : "Retry"}</Button>}
          />
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;
  }

  const filtered = activeCategory === "all"
    ? allServices
    : allServices.filter((s) => s.category === activeCategory);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const breadcrumbItems = [
    { label: lang === "zh" ? "首页" : "Home", href: `/${lang}` },
    { label: lang === "zh" ? "认证服务" : "Services" },
  ];

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page Header */}
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <Tag
              key={cat.key}
              variant={activeCategory === cat.key ? "primary" : "outline"}
              size="md"
            >
              <button onClick={() => { setActiveCategory(cat.key); setPage(1); }}>
                {lang === "zh" ? cat.zh : cat.en}
              </button>
            </Tag>
          ))}
        </div>

        {/* Services Grid */}
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
          {paged.map((service) => {
            const info = serviceInfo[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/${lang}/services/${service.slug}`}
                className="group block bg-white border border-neutral-200 rounded-md p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll"
              >
                <span className="text-3xl">{service.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors">
                  {lang === "zh" ? info?.zh.title : info?.en.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                  {lang === "zh" ? info?.zh.desc : info?.en.desc}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                  {lang === "zh" ? "了解详情" : "Learn More"}
                  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
        )}

        {/* Pagination */}
        <div className="mt-10">
          <Pagination
            current={page}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
