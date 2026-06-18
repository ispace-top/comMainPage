"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tag } from "@/components/ui/Tag";
import { useScrollReveal } from "@/lib/scroll-reveal";

const articles: Record<string, {
  slug: string;
  category: string;
  categoryZh: string;
  categoryEn: string;
  date: string;
  readTimeZh: string;
  readTimeEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  contentZh: { heading?: string; body: string }[];
  contentEn: { heading?: string; body: string }[];
}> = {
  "iso9001-2025": {
    slug: "iso9001-2025",
    category: "policy",
    categoryZh: "政策解读",
    categoryEn: "Policy",
    date: "2026-06-10",
    readTimeZh: "阅读约 5 分钟",
    readTimeEn: "~5 min read",
    titleZh: "ISO9001:2025 新版标准解读与实施要点",
    titleEn: "ISO9001:2025 New Standard: Key Updates & Implementation",
    summaryZh: "国际标准化组织正式发布ISO9001:2025修订版，这是自2015年以来的首次重大修订，核心变化涉及数字化转型、供应链韧性等。",
    summaryEn: "ISO has released ISO9001:2025, the first major revision since 2015, with core changes involving digital transformation and supply chain resilience.",
    contentZh: [
      { heading: "修订背景", body: "国际标准化组织（ISO）正式发布了ISO9001:2025修订版，这是自2015年以来的首次重大修订。新版标准在保持原有质量管理核心原则的基础上，进一步强化了数字化转型、供应链韧性以及气候变化应对等方面的要求。" },
      { heading: "核心变更要点", body: "本次修订重点围绕以下四个方面展开：首先，新增'组织数字化环境'条款，要求企业将数字化工具和数据管理纳入质量管理体系；其次，强化供应链尽职调查条款，确保供应链各环节的质量可控；第三，引入气候变化风险考量，将环境因素纳为质量管理体系的输入变量；第四，优化服务型组织的条款适用性。" },
      { heading: "企业应对建议", body: "我们建议企业从以下几个方面着手准备：1）开展新版标准差距分析，识别当前体系与新要求的差距；2）制定转版升级计划，合理分配资源；3）加强内部培训，确保相关人员理解新标准要求；4）与认证机构提前沟通转版审核安排。建议企业预留至少6个月的转版过渡期。" },
    ],
    contentEn: [
      { heading: "Background", body: "ISO has officially released the ISO9001:2025 revision, the first major revision since 2015. The new standard strengthens requirements for digital transformation, supply chain resilience, and climate change response while maintaining core QMS principles." },
      { heading: "Key Changes", body: "This revision focuses on four key areas. First, new clauses on organizational digital environment, requiring enterprises to integrate digital tools into QMS. Second, strengthened supply chain due diligence to ensure quality control throughout the chain. Third, climate change risk considerations integrated as QMS input variables. Fourth, improved applicability for service organizations." },
      { heading: "Recommendations", body: "We recommend enterprises prepare as follows: 1) Conduct a gap analysis between current systems and new requirements; 2) Develop a transition plan with proper resource allocation; 3) Strengthen internal training to ensure relevant personnel understand the new requirements; 4) Communicate with certification bodies on transition audit arrangements early. We recommend allowing at least 6 months for transition." },
    ],
  },
  "digital-certification": {
    slug: "digital-certification",
    category: "trend",
    categoryZh: "行业动态",
    categoryEn: "Trends",
    date: "2026-06-05",
    readTimeZh: "阅读约 3 分钟",
    readTimeEn: "~3 min read",
    titleZh: "数字化认证趋势：远程审核成为新常态",
    titleEn: "Digital Certification Trends: Remote Audits Become the New Normal",
    summaryZh: "疫情后时代，远程审核技术日趋成熟，越来越多的认证机构提供混合审核模式，企业应如何适应这一变化？",
    summaryEn: "In the post-pandemic era, remote audit technology is maturing. More certification bodies offer hybrid audit models — how should enterprises adapt?",
    contentZh: [
      { heading: "远程审核的兴起", body: "自2020年以来，全球认证行业经历了前所未有的数字化转型。IATF、UKAS等权威机构相继发布了远程审核指南，推动了线上线下混合审核模式的普及。据统计，2026年约有40%的认证审核包含远程审核环节。" },
      { heading: "对企业的影响", body: "远程审核为企业带来了时间与成本的显著节省，但同时也对企业信息化水平提出了更高要求。企业需确保电子文档管理系统、视频会议设施、现场实时展示能力等准备就绪。建议企业提前与认证机构沟通远程审核的具体要求，并进行模拟演练。" },
    ],
    contentEn: [
      { heading: "The Rise of Remote Audits", body: "Since 2020, the global certification industry has undergone unprecedented digital transformation. IATF, UKAS, and other authoritative bodies have issued remote audit guidelines, promoting the adoption of hybrid online/offline audit models. By 2026, approximately 40% of certification audits include remote components." },
      { heading: "Impact on Enterprises", body: "Remote audits bring significant time and cost savings but also demand higher levels of information management capability. Enterprises must ensure readiness of electronic document management systems, video conferencing facilities, and real-time site demonstration capabilities. We recommend communicating with certification bodies about specific remote audit requirements in advance and conducting mock exercises." },
    ],
  },
  "small-business-iso": {
    slug: "small-business-iso",
    category: "knowledge",
    categoryZh: "认证知识",
    categoryEn: "Knowledge",
    date: "2026-05-28",
    readTimeZh: "阅读约 4 分钟",
    readTimeEn: "~4 min read",
    titleZh: "中小企业如何低成本通过ISO认证？",
    titleEn: "How Can SMEs Achieve ISO Certification on a Budget?",
    summaryZh: "中小企业常因资源有限而对ISO认证望而却步，本文分享低成本高效率的认证路径与实用策略。",
    summaryEn: "SMEs often hesitate to pursue ISO certification due to limited resources. This article shares cost-effective certification paths and practical strategies.",
    contentZh: [
      { heading: "中小企业认证误区", body: "很多中小企业认为ISO认证流程复杂、费用高昂，但实际上通过合理规划和专业指导，认证投入远低于企业预期。关键是要避免'大而全'的体系建设思路，聚焦核心业务流程。" },
      { heading: "低成本认证策略", body: "建议中小企业采用以下策略：1）优先选择与业务最相关的一个标准起步；2）借助专业咨询机构进行差距分析，精准投入而非盲目建设；3）充分利用政府扶持政策，许多地区对首次获证企业提供补贴；4）采用敏捷体系建设方法，聚焦关键流程而非追求面面俱到的文件体系。" },
    ],
    contentEn: [
      { heading: "SME Certification Myths", body: "Many SMEs believe ISO certification involves complex processes and high costs. However, with proper planning and professional guidance, certification investments are far lower than expected. The key is to avoid 'all-encompassing' system building and focus on core business processes." },
      { heading: "Cost-Effective Strategies", body: "We recommend SMEs adopt these strategies: 1) Start with one standard most relevant to your business; 2) Use professional consultants for gap analysis — invest precisely rather than blindly; 3) Leverage government support policies — many regions offer subsidies for first-time certified enterprises; 4) Use agile system building approaches, focusing on key processes rather than exhaustive documentation." },
    ],
  },
};

const allSlugs = Object.keys(articles);

export default function InsightDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const slug = params?.slug as string || "1";
  useScrollReveal();

  const article = articles[slug];
  if (!article) {
    return (
      <div className="section-padding">
        <div className="container-page text-center py-20">
          <h1 className="text-2xl font-bold text-neutral-800">{lang === "zh" ? "文章未找到" : "Article Not Found"}</h1>
          <p className="mt-2 text-neutral-500">{lang === "zh" ? "请检查链接是否正确" : "Please check the URL"}</p>
          <Link href={`/${lang}/insights`} className="inline-block mt-6 text-primary-500 hover:text-primary-600 font-medium">
            ← {lang === "zh" ? "返回文章列表" : "Back to Insights"}
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = allSlugs
    .filter((s) => s !== slug)
    .map((s) => articles[s]);

  const currentIdx = allSlugs.indexOf(slug);
  const prevArticle = currentIdx > 0 ? articles[allSlugs[currentIdx - 1]] : null;
  const nextArticle = currentIdx < allSlugs.length - 1 ? articles[allSlugs[currentIdx + 1]] : null;

  const content = lang === "zh" ? article.contentZh : article.contentEn;

  return (
    <div>
      <div className="container-page py-12">
        <Breadcrumb items={[
          { label: lang === "zh" ? "首页" : "Home", href: `/${lang}` },
          { label: lang === "zh" ? "行业洞察" : "Insights", href: `/${lang}/insights` },
          { label: lang === "zh" ? article.titleZh : article.titleEn },
        ]} className="mb-6" />

        <article className="max-w-[720px] mx-auto">
          <header className="mb-10">
            <Tag variant="primary" size="sm">{lang === "zh" ? article.categoryZh : article.categoryEn}</Tag>
            <h1 className="text-4xl font-bold text-neutral-800 leading-tight mt-4">{lang === "zh" ? article.titleZh : article.titleEn}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-neutral-400">
              <span>{article.date}</span>
              <span className="w-px h-4 bg-neutral-300" />
              <span>{lang === "zh" ? article.readTimeZh : article.readTimeEn}</span>
            </div>
          </header>

          <div className="aspect-[2/1] bg-neutral-100 rounded-lg mb-10 flex items-center justify-center">
            <svg className="size-20 text-neutral-300" viewBox="0 0 80 80" fill="currentColor"><rect x="10" y="12" width="60" height="56" rx="4"/><circle cx="30" cy="32" r="8"/><path d="M10 52h60" stroke="white" strokeWidth="3"/></svg>
          </div>

          <div className="space-y-6">
            {content.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-2xl font-semibold text-neutral-800 mb-3">{section.heading}</h2>
                )}
                <p className="text-base leading-relaxed text-neutral-600">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Prev/Next Navigation */}
          <div className="mt-12 flex justify-between items-center py-6 border-t border-neutral-200">
            <div>
              {prevArticle ? (
                <Link href={`/${lang}/insights/${prevArticle.slug}`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                  ← {lang === "zh" ? prevArticle.titleZh : prevArticle.titleEn}
                </Link>
              ) : <span className="text-sm text-neutral-300">{lang === "zh" ? "已是第一篇" : "First Article"}</span>}
            </div>
            <Link href={`/${lang}/insights`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">{lang === "zh" ? "返回列表" : "Back to List"}</Link>
            <div>
              {nextArticle ? (
                <Link href={`/${lang}/insights/${nextArticle.slug}`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                  {lang === "zh" ? nextArticle.titleZh : nextArticle.titleEn} →
                </Link>
              ) : <span className="text-sm text-neutral-300">{lang === "zh" ? "已是最后一篇" : "Last Article"}</span>}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16 max-w-[720px] mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">{lang === "zh" ? "相关文章推荐" : "Related Articles"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.slug}
                href={`/${lang}/insights/${ra.slug}`}
                className="block p-5 bg-white border border-neutral-200 rounded-md shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <div className="text-xs text-neutral-400 mb-1">{ra.date}</div>
                <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2">{lang === "zh" ? ra.titleZh : ra.titleEn}</h3>
                <p className="mt-1 text-xs text-neutral-500 line-clamp-2">{lang === "zh" ? ra.summaryZh : ra.summaryEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
