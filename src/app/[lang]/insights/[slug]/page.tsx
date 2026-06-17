"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useScrollReveal } from "@/lib/scroll-reveal";

export default function InsightDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const slug = params?.slug as string || "1";
  useScrollReveal();

  return (
    <div>
      <div className="container-page py-12">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: `/${lang}` }, { label: lang === "zh" ? "行业洞察" : "Insights", href: `/${lang}/insights` }, { label: lang === "zh" ? "文章详情" : "Article" }]} className="mb-6" />

        <article className="max-w-[720px] mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-neutral-800 leading-tight">{lang === "zh" ? "ISO9001:2025 新版标准解读与实施要点" : "ISO9001:2025 New Standard: Key Updates & Implementation"}</h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-neutral-400">
              <span>2026-06-10</span>
              <span className="w-px h-4 bg-neutral-300" />
              <span className="text-primary-500 font-medium">{lang === "zh" ? "政策解读" : "Policy"}</span>
              <span className="w-px h-4 bg-neutral-300" />
              <span>{lang === "zh" ? "阅读约 5 分钟" : "~5 min read"}</span>
            </div>
          </header>

          <div className="aspect-[2/1] bg-neutral-100 rounded-lg mb-10 flex items-center justify-center">
            <svg className="size-20 text-neutral-300" viewBox="0 0 80 80" fill="currentColor"><rect x="10" y="12" width="60" height="56" rx="4"/><circle cx="30" cy="32" r="8"/><path d="M10 52h60" stroke="white" strokeWidth="3"/></svg>
          </div>

          <div className="prose prose-neutral max-w-none space-y-6 text-base leading-relaxed text-neutral-600">
            <p>{lang === "zh" ? "国际标准化组织（ISO）正式发布了ISO9001:2025修订版，这是自2015年以来的首次重大修订。新版标准在保持原有质量管理核心原则的基础上，进一步强化了数字化转型、供应链韧性以及气候变化应对等方面的要求。" : "ISO has officially released the ISO9001:2025 revision, the first major revision since 2015. The new standard strengthens requirements for digital transformation, supply chain resilience, and climate change response."}</p>
            <h2 className="text-2xl font-semibold text-neutral-800 mt-8">{lang === "zh" ? "核心变更要点" : "Key Changes"}</h2>
            <p>{lang === "zh" ? "本次修订重点围绕以下四个方面展开：首先，新增'组织数字化环境'条款，要求企业将数字化工具和数据管理纳入质量管理体系；其次，强化供应链尽职调查条款，确保供应链各环节的质量可控；第三，引入气候变化风险考量，将环境因素纳为质量管理体系的输入变量；第四，优化服务型组织的条款适用性。" : "This revision focuses on four key areas. First, new clauses on organizational digital environment, requiring enterprises to integrate digital tools into QMS. Second, strengthened supply chain due diligence. Third, climate change risk considerations. Fourth, improved applicability for service organizations."}</p>
            <h2 className="text-2xl font-semibold text-neutral-800 mt-8">{lang === "zh" ? "企业应对建议" : "Recommendations"}</h2>
            <p>{lang === "zh" ? "我们建议企业从以下几个方面着手准备：1）开展新版标准差距分析，识别当前体系与新要求的差距；2）制定转版升级计划，合理分配资源；3）加强内部培训，确保相关人员理解新标准要求；4）与认证机构提前沟通转版审核安排。" : "We recommend enterprises prepare as follows: 1) Conduct a gap analysis between current systems and new requirements; 2) Develop a transition plan; 3) Strengthen internal training; 4) Communicate with certification bodies on transition audit arrangements early."}</p>
          </div>

          <div className="mt-12 flex justify-between items-center py-6 border-t border-neutral-200">
            <Link href={`/${lang}/insights/2`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">← {lang === "zh" ? "上一篇" : "Previous"}</Link>
            <Link href={`/${lang}/insights`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">{lang === "zh" ? "返回列表" : "Back to List"}</Link>
            <Link href={`/${lang}/insights/3`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">{lang === "zh" ? "下一篇" : "Next"} →</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
