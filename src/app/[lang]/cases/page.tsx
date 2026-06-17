"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useScrollReveal } from "@/lib/scroll-reveal";

const clients = ["Huawei", "CNPC", "Sinopec", "CRRC", "BYD", "Alibaba", "Tencent", "Midea", "Haier", "SANY", "GREE", "BAIC"];

const cases = [
  { client: "某大型制造集团", en: "Major Manufacturing Group", industry: "manufacturing", cert: "ISO9001", summaryZh: "通过ISO9001质量管理体系认证，客户产品合格率从92%提升至99.2%，年质量成本降低35%。", summaryEn: "Achieved ISO9001 certification; product pass rate improved from 92% to 99.2%, annual quality costs reduced by 35%." },
  { client: "某化工企业", en: "Chemical Enterprise", industry: "chemical", cert: "ISO14001", summaryZh: "建立环境管理体系后，废水排放达标率100%，年能耗费降低28%，获得市级绿色工厂称号。", summaryEn: "After establishing an environmental management system, wastewater compliance reached 100%, energy costs dropped 28%." },
  { client: "某建筑集团", en: "Construction Group", industry: "construction", cert: "ISO45001", summaryZh: "施工安全管理体系认证后，年工伤事故率下降76%，项目安全生产标准化达标率100%。", summaryEn: "After OH&S certification, annual workplace injury rate dropped 76%, safety compliance reached 100%." },
  { client: "某食品公司", en: "Food Company", industry: "food", cert: "ISO22000", summaryZh: "食品安全管理体系助力企业通过沃尔玛全球采购审核，出口订单增长300%。", summaryEn: "Food safety management system helped pass Walmart Global Sourcing audit; export orders grew 300%." },
  { client: "某汽车零部件厂", en: "Auto Parts Factory", industry: "auto", cert: "IATF 16949", summaryZh: "获得IATF认证后，成功进入奔驰、宝马等国际知名车企供应链体系。", summaryEn: "After IATF certification, successfully entered the supply chain of Mercedes-Benz, BMW, and other global automakers." },
  { client: "某医疗器械公司", en: "Medical Device Company", industry: "medical", cert: "ISO13485", summaryZh: "医疗器械质量管理体系认证通过，产品获得欧盟CE认证，顺利出海欧洲市场。", summaryEn: "Passed medical device quality management certification; products obtained CE marking for the European market." },
];

export default function CasesPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  useScrollReveal();

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: `/${lang}` }, { label: lang === "zh" ? "成功案例" : "Cases" }]} className="mb-6" />
        <h1 className="text-4xl font-bold text-neutral-800">{lang === "zh" ? "成功案例" : "Success Cases"}</h1>
        <p className="mt-4 text-lg text-neutral-500 max-w-[600px]">{lang === "zh" ? "见证数百家企业的认证成功之路，以真实案例传递信任。": "Witness the certification success of hundreds of enterprises."}</p>

        {/* Logo wall */}
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 reveal-on-scroll">
          {clients.map((name) => (
            <div key={name} className="flex items-center justify-center h-16 rounded-md border border-neutral-200 bg-neutral-50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-sm font-bold text-neutral-400">{name}</span>
            </div>
          ))}
        </div>

        {/* Cases list */}
        <div className="mt-16 space-y-8">
          {cases.map((c, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 p-6 bg-white border border-neutral-200 rounded-md shadow-xs hover:shadow-sm transition-all reveal-on-scroll ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-2/5 shrink-0">
                <div className="aspect-[3/2] bg-neutral-100 rounded-sm flex items-center justify-center">
                  <svg className="size-16 text-neutral-300" viewBox="0 0 64 64" fill="currentColor"><rect x="8" y="10" width="48" height="44" rx="4"/><circle cx="22" cy="28" r="6"/><path d="M26 52h24" stroke="white" strokeWidth="3"/><path d="M18 52h4" stroke="white" strokeWidth="3"/></svg>
                </div>
              </div>
              <div className="md:w-3/5 flex flex-col justify-center">
                <span className="text-xs font-medium text-primary-500 uppercase">{c.cert}</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-800">{lang === "zh" ? c.client : c.en}</h3>
                <p className="mt-3 text-base text-neutral-600">{lang === "zh" ? c.summaryZh : c.summaryEn}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-500 hover:gap-2 transition-all cursor-pointer">
                  {lang === "zh" ? "查看详情" : "View Details"}
                  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
