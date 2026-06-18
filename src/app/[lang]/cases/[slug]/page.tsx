"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tag } from "@/components/ui/Tag";
import { useScrollReveal } from "@/lib/scroll-reveal";

const caseData: Record<string, {
  slug: string;
  clientZh: string;
  clientEn: string;
  industry: string;
  industryLabelZh: string;
  industryLabelEn: string;
  cert: string;
  summaryZh: string;
  summaryEn: string;
  contentZh: { heading: string; body: string }[];
  contentEn: { heading: string; body: string }[];
  results: { labelZh: string; labelEn: string; value: string }[];
}> = {
  "major-manufacturing": {
    slug: "major-manufacturing",
    clientZh: "某大型制造集团",
    clientEn: "Major Manufacturing Group",
    industry: "manufacturing",
    industryLabelZh: "制造业",
    industryLabelEn: "Manufacturing",
    cert: "ISO9001",
    summaryZh: "通过ISO9001质量管理体系认证，客户产品合格率从92%提升至99.2%，年质量成本降低35%。",
    summaryEn: "Achieved ISO9001 certification; product pass rate improved from 92% to 99.2%, annual quality costs reduced by 35%.",
    contentZh: [
      { heading: "客户背景", body: "该企业为国内大型装备制造集团，年产值超50亿元人民币，拥有员工8000余人。随着业务规模的快速扩张，企业内部质量管理体系暴露出流程不清晰、部门协作效率低、客诉率逐年上升等问题。" },
      { heading: "实施过程", body: "认证通专家团队深入企业现场调研，通过为期3个月的诊断评估，识别出132个质量管控薄弱点。针对性地制定了质量管理体系优化方案，覆盖产品设计、采购、生产、检验、售后全过程。" },
      { heading: "认证成果", body: "经过6个月的体系运行与优化，该企业一次性通过ISO9001认证审核。产品合格率从92%提升至99.2%，客户投诉率下降67%，年质量成本降低约3500万元。企业随后获得多家世界500强企业的供应商准入资格。" },
    ],
    contentEn: [
      { heading: "Client Background", body: "This enterprise is a major domestic equipment manufacturer with annual revenue of over 5 billion RMB and more than 8,000 employees. Rapid business expansion had exposed issues such as unclear quality processes, low departmental collaboration efficiency, and rising customer complaint rates." },
      { heading: "Implementation Process", body: "Renzheng's expert team conducted an in-depth on-site assessment over 3 months, identifying 132 quality control weaknesses. A targeted QMS optimization plan was developed covering the entire process: product design, procurement, production, inspection, and after-sales." },
      { heading: "Certification Results", body: "After 6 months of system operation and optimization, the company passed ISO9001 certification on the first attempt. Product pass rate increased from 92% to 99.2%, customer complaints dropped 67%, and annual quality costs were reduced by approximately 35 million RMB. The company subsequently obtained supplier qualification from multiple Fortune 500 companies." },
    ],
    results: [
      { labelZh: "产品合格率", labelEn: "Pass Rate", value: "92% → 99.2%" },
      { labelZh: "客诉下降", labelEn: "Complaints Drop", value: "67%" },
      { labelZh: "成本节约", labelEn: "Cost Savings", value: "3500万/年" },
    ],
  },
  "chemical-enterprise": {
    slug: "chemical-enterprise",
    clientZh: "某化工企业",
    clientEn: "Chemical Enterprise",
    industry: "chemical",
    industryLabelZh: "化工业",
    industryLabelEn: "Chemical",
    cert: "ISO14001",
    summaryZh: "建立环境管理体系后，废水排放达标率100%，年能耗费降低28%，获得市级绿色工厂称号。",
    summaryEn: "After establishing an environmental management system, wastewater compliance reached 100%, energy costs dropped 28%.",
    contentZh: [
      { heading: "客户背景", body: "该企业为中型精细化工生产企业，主营工业涂料与助剂，年产能3万吨。由于环保法规日趋严格，企业面临排污许可证升级换证的紧迫需求。" },
      { heading: "解决方案", body: "认证通环境管理专家团队对企业的生产工艺、三废处理设施、能源消耗进行了全面诊断，协助企业建立了覆盖全生命周期的环境管理体系，引入清洁生产技术和能源管理模块。" },
      { heading: "项目成果", body: "企业顺利通过ISO14001认证，废水排放达标率达到100%，危险废物减量30%，年能源费用降低28%，获得市级'绿色工厂'荣誉称号，并享受了相关税收优惠政策。" },
    ],
    contentEn: [
      { heading: "Client Background", body: "This is a medium-sized fine chemical manufacturer producing industrial coatings and additives with an annual capacity of 30,000 tons. Tightening environmental regulations created an urgent need to upgrade their pollution discharge permit." },
      { heading: "Solution", body: "Renzheng's environmental management experts conducted a comprehensive diagnosis of production processes, waste treatment facilities, and energy consumption. We helped establish an EMS covering the full lifecycle, introducing cleaner production technology and energy management modules." },
      { heading: "Results", body: "The company successfully passed ISO14001 certification. Wastewater discharge compliance reached 100%, hazardous waste was reduced by 30%, annual energy costs dropped by 28%. They received municipal 'Green Factory' honors and related tax benefits." },
    ],
    results: [
      { labelZh: "废水达标率", labelEn: "Wastewater Compliance", value: "100%" },
      { labelZh: "危废减量", labelEn: "Hazardous Waste Reduction", value: "30%" },
      { labelZh: "能耗费降低", labelEn: "Energy Cost Drop", value: "28%" },
    ],
  },
  "construction-group": {
    slug: "construction-group",
    clientZh: "某建筑集团",
    clientEn: "Construction Group",
    industry: "construction",
    industryLabelZh: "建筑业",
    industryLabelEn: "Construction",
    cert: "ISO45001",
    summaryZh: "施工安全管理体系认证后，年工伤事故率下降76%，项目安全生产标准化达标率100%。",
    summaryEn: "After OH&S certification, annual workplace injury rate dropped 76%, safety compliance reached 100%.",
    contentZh: [
      { heading: "客户背景", body: "该集团为省级大型建筑施工企业，年承接工程项目超200个，施工作业人员逾万人。长期以来，施工现场安全管理面临点多面广、人员流动大、安全意识薄弱的挑战。" },
      { heading: "实施过程", body: "认证通安全专家团队深入项目一线，针对高空作业、基坑工程、起重吊装等高风险场景，建立了分级管控和隐患排查双重预防机制，制定了覆盖全员的安全培训体系和应急响应预案。" },
      { heading: "认证成果", body: "通过ISO45001认证后，集团年度工伤事故率下降76%，项目安全生产标准化达标率达到100%。该企业的安全管理经验被省级住建部门作为标杆案例推广。" },
    ],
    contentEn: [
      { heading: "Client Background", body: "This is a provincial-level large construction enterprise undertaking over 200 projects annually with more than 10,000 workers. On-site safety management had long faced challenges due to scattered sites, high worker turnover, and weak safety awareness." },
      { heading: "Implementation", body: "Renzheng's safety experts went to project frontlines, establishing a dual prevention mechanism of hierarchical control and hazard investigation for high-risk scenarios including working at heights, excavation, and lifting operations. A comprehensive safety training system and emergency response plan were developed." },
      { heading: "Results", body: "After ISO45001 certification, the annual workplace injury rate dropped 76% and project safety compliance reached 100%. The company's safety management practices were promoted as a benchmark by the provincial housing authority." },
    ],
    results: [
      { labelZh: "工伤率下降", labelEn: "Injury Rate Drop", value: "76%" },
      { labelZh: "安全达标率", labelEn: "Safety Compliance", value: "100%" },
      { labelZh: "项目覆盖", labelEn: "Projects Covered", value: "200+" },
    ],
  },
};

const allSlugs = Object.keys(caseData);

export default function CaseDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const slug = params?.slug as string;
  useScrollReveal();

  const data = caseData[slug];
  if (!data) {
    // Trigger Next.js not-found
    return (
      <div className="section-padding">
        <div className="container-page text-center py-20">
          <h1 className="text-2xl font-bold text-neutral-800">{lang === "zh" ? "案例未找到" : "Case Not Found"}</h1>
          <p className="mt-2 text-neutral-500">{lang === "zh" ? "请检查链接是否正确" : "Please check the URL"}</p>
          <Link href={`/${lang}/cases`} className="inline-block mt-6 text-primary-500 hover:text-primary-600 font-medium">
            ← {lang === "zh" ? "返回案例列表" : "Back to Cases"}
          </Link>
        </div>
      </div>
    );
  }

  const relatedCases = allSlugs.filter((s) => s !== slug).slice(0, 3).map((s) => caseData[s]);

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[
          { label: lang === "zh" ? "首页" : "Home", href: `/${lang}` },
          { label: lang === "zh" ? "成功案例" : "Cases", href: `/${lang}/cases` },
          { label: lang === "zh" ? data.clientZh : data.clientEn },
        ]} className="mb-6" />

        {/* Hero Section */}
        <div className="bg-neutral-100 rounded-lg p-8 md:p-12 reveal-on-scroll">
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag variant="primary" size="sm">{data.cert}</Tag>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-600">
              {lang === "zh" ? data.industryLabelZh : data.industryLabelEn}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">
            {lang === "zh" ? data.clientZh : data.clientEn}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-[800px]">
            {lang === "zh" ? data.summaryZh : data.summaryEn}
          </p>

          {/* Results */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {data.results.map((r) => (
              <div key={r.value} className="p-4 bg-white rounded-md text-center border border-neutral-200">
                <div className="text-2xl font-bold text-primary-600">{r.value}</div>
                <div className="text-xs text-neutral-500 mt-1">{lang === "zh" ? r.labelZh : r.labelEn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-12 max-w-[800px] mx-auto space-y-10 reveal-on-scroll">
          {(lang === "zh" ? data.contentZh : data.contentEn).map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-semibold text-neutral-800 mb-3">{section.heading}</h2>
              <p className="text-base leading-relaxed text-neutral-600">{section.body}</p>
            </section>
          ))}
        </div>

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <div className="mt-16 reveal-on-scroll">
            <h2 className="text-2xl font-bold text-neutral-800 text-center mb-8">
              {lang === "zh" ? "相关案例" : "Related Cases"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/${lang}/cases/${rc.slug}`}
                  className="block p-6 bg-white border border-neutral-200 rounded-md shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-xs font-medium text-primary-500 mb-1">{rc.cert}</div>
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {lang === "zh" ? rc.clientZh : rc.clientEn}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                    {lang === "zh" ? rc.summaryZh : rc.summaryEn}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/cases`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M13 8a.75.75 0 01-.75.75H3.81l3.22 3.22a.75.75 0 01-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 1.06L3.81 7.25h8.44A.75.75 0 0113 8z" clipRule="evenodd" />
            </svg>
            {lang === "zh" ? "返回案例列表" : "Back to All Cases"}
          </Link>
        </div>
      </div>
    </div>
  );
}
