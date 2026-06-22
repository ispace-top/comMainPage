import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { langPath } from "@/lib/i18n";

interface ArticleData { id: number; title: string; category?: string; created?: string; }

interface InsightsPreviewProps {
  lang: Lang;
  articles?: ArticleData[];
}

const fallbackArticles: ArticleData[] = [
  { id: 1, title: "ISO9001:2025 新版标准解读与实施要点", category: "政策解读", created: "2026-06-10" },
  { id: 2, title: "中小企业如何高效通过ISO认证审核", category: "认证知识", created: "2026-06-03" },
  { id: 3, title: "2026年制造业质量管理趋势报告", category: "行业动态", created: "2026-05-28" },
];

export function InsightsPreview({ lang, articles }: InsightsPreviewProps) {
  const title = lang === "zh" ? "行业洞察" : "Industry Insights";
  const subtitle = lang === "zh"
    ? "最新认证政策解读与行业动态，助力企业把握先机"
    : "Latest certification policies and industry trends to help you stay ahead";
  const viewAll = lang === "zh" ? "查看全部文章" : "View All Articles";

  const items = (articles && articles.length > 0) ? articles : fallbackArticles;

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((article, i) => (
            <Link
              key={article.id}
              href={langPath(lang, `/insights/${article.id}`)}
              className="group block bg-white border border-neutral-200 rounded-md overflow-hidden shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-video bg-neutral-100 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-${["1454165804606-c3d57bc86b40","1434030216411-0b793f4b4173","1553877522-43269d4ea984"][i % 3]}?w=600&q=80`} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span>{article.created || ""}</span>
                  {article.category && (
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-primary-50 text-primary-600 text-xs font-medium">
                      {article.category}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-800 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-10 reveal-on-scroll">
          <Link href={langPath(lang, "/insights")}>
            <Button variant="secondary" size="lg">
              {viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
