import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Button } from "@/components/ui/Button";

interface ServicesPreviewProps {
  lang: Lang;
}

const services = [
  { slug: "iso-9001", en: "ISO9001 Quality Management", zh: "ISO9001 质量管理体系" },
  { slug: "iso-14001", en: "ISO14001 Environmental", zh: "ISO14001 环境管理体系" },
  { slug: "iso-45001", en: "ISO45001 OH&S", zh: "ISO45001 职业健康安全" },
  { slug: "iso-27001", en: "ISO27001 Info Security", zh: "ISO27001 信息安全管理" },
  { slug: "iso-22000", en: "ISO22000 Food Safety", zh: "ISO22000 食品安全管理" },
  { slug: "haccp", en: "HACCP Food Safety", zh: "HACCP 危害分析与关键控制点" },
];

const descIcons = ["🏭", "🌿", "🛡️", "🔒", "🍽️", "📋"];

export function ServicesPreview({ lang }: ServicesPreviewProps) {
  const title = lang === "zh" ? "认证服务项目" : "Certification Services";
  const subtitle = lang === "zh"
    ? "覆盖主流国际标准认证，满足不同行业企业的合规需求"
    : "Covering major international standards to meet compliance needs across industries";
  const viewAll = lang === "zh" ? "查看全部服务" : "View All Services";

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{subtitle}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/${lang}/services/${service.slug}`}
              className="group flex flex-col h-full bg-white border border-neutral-200 rounded-md p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out reveal-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl">{descIcons[i]}</span>
              <h3 className="mt-4 text-xl font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors">
                {lang === "zh" ? service.zh : service.en}
              </h3>
              <p className="mt-2 text-sm text-neutral-500 flex-1">
                {lang === "zh"
                  ? "了解认证流程、适用企业及所需材料，开启合规之旅。"
                  : "Learn about the certification process, applicable enterprises, and required materials."}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all shrink-0">
                {lang === "zh" ? "了解详情" : "Learn More"}
                <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-10 reveal-on-scroll">
          <Link href={`/${lang}/services`}>
            <Button variant="secondary" size="lg">
              {viewAll}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
