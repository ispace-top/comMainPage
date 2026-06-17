import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/Button";

interface InsightsPreviewProps {
  lang: Lang;
}

const mockArticles = [
  {
    titleZh: "ISO9001:2025 新版标准解读与实施要点",
    titleEn: "ISO9001:2025 New Standard: Key Updates & Implementation",
    date: "2026-06-10",
    categoryZh: "政策解读",
    categoryEn: "Policy",
    summaryZh: "国际标准化组织发布ISO9001最新修订版，本文深度解读核心变更及企业应对策略。",
    summaryEn: "ISO has released the latest revision of ISO9001. Deep analysis of key changes and enterprise strategies.",
  },
  {
    titleZh: "中小企业如何高效通过ISO认证审核",
    titleEn: "How SMEs Can Pass ISO Audits Efficiently",
    date: "2026-06-03",
    categoryZh: "认证知识",
    categoryEn: "Knowledge",
    summaryZh: "专为中小企业定制的实用指南，从文件准备到现场审核的全面优化建议。",
    summaryEn: "Practical guide tailored for SMEs, from document preparation to on-site audit optimization.",
  },
  {
    titleZh: "2026年制造业质量管理趋势报告",
    titleEn: "2026 Manufacturing Quality Management Trends",
    date: "2026-05-28",
    categoryZh: "行业动态",
    categoryEn: "Trends",
    summaryZh: "深度分析全球制造业质量管理最新趋势，助力企业抢占发展先机。",
    summaryEn: "In-depth analysis of the latest trends in global manufacturing quality management.",
  },
];

export function InsightsPreview({ lang }: InsightsPreviewProps) {
  const title = lang === "zh" ? "行业洞察" : "Industry Insights";
  const subtitle = lang === "zh"
    ? "最新认证政策解读与行业动态，助力企业把握先机"
    : "Latest certification policies and industry trends to help you stay ahead";
  const viewAll = lang === "zh" ? "查看全部文章" : "View All Articles";

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {mockArticles.map((article, i) => (
            <Link
              key={i}
              href={`/${lang}/insights/article-${i + 1}`}
              className="group block bg-white border border-neutral-200 rounded-md overflow-hidden shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Cover image placeholder */}
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <svg className="size-12 text-neutral-300" viewBox="0 0 48 48" fill="currentColor">
                  <rect x="6" y="8" width="36" height="32" rx="2" />
                  <path d="M6 28h36" stroke="white" strokeWidth="2" />
                  <circle cx="16" cy="18" r="3" fill="white" opacity="0.5" />
                </svg>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{article.date}</span>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600 text-xs font-medium">
                    {lang === "zh" ? article.categoryZh : article.categoryEn}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-800 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {lang === "zh" ? article.titleZh : article.titleEn}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                  {lang === "zh" ? article.summaryZh : article.summaryEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-10 reveal-on-scroll">
          <Link href={`/${lang}/insights`}>
            <Button variant="secondary" size="lg">
              {viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
