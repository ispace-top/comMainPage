import type { Lang } from "@/components/ui/LanguageSwitcher";
import { FeatureCard } from "@/components/ui/Card";

interface FeatureData { title: string; desc: string; }

interface WhyUsSectionProps {
  lang: Lang;
  data?: { zh?: FeatureData[]; en?: FeatureData[] };
}

const defaults: Record<string, { title: string; subtitle: string; features: FeatureData[] }> = {
  zh: {
    title: "为什么选择我们",
    subtitle: "10+年行业深耕，以专业服务赢得数百家企业信赖",
    features: [
      { title: "10+ 年行业深耕", desc: "自 2015 年成立以来，专注 ISO 认证咨询领域，积累深厚行业经验与大量成功案例。" },
      { title: "98% 一次性通过率", desc: "专业的预审机制和全流程辅导，确保企业高效通过认证审核，大幅降低反复审核成本。" },
      { title: "专家级顾问团队", desc: "核心顾问均持有 ISO 审核员资质，平均从业经验超 10 年，为您提供权威技术指导。" },
      { title: "一站式全流程服务", desc: "从差距分析、体系搭建、运行辅导到审核陪同，覆盖认证全生命周期，省心高效。" },
      { title: "500+ 企业信赖", desc: "服务覆盖制造、化工、建筑、食品、IT 等 30+ 行业，客户复购率超 60%。" },
      { title: "持续跟踪与维护", desc: "认证通过后持续提供体系维护、年审辅导，确保企业长期合规运营。" },
    ],
  },
  en: {
    title: "Why Choose Us",
    subtitle: "Over 10 years of industry expertise, trusted by hundreds of enterprises",
    features: [
      { title: "10+ Years of Expertise", desc: "Focused on ISO certification consulting since 2015, with deep industry experience." },
      { title: "98% First-Time Pass Rate", desc: "Professional pre-audit and full-process guidance ensuring efficient certification." },
      { title: "Expert Consulting Team", desc: "Core consultants hold ISO auditor qualifications with 10+ years of average experience." },
      { title: "One-Stop Full Service", desc: "From gap analysis to audit support — covering the entire certification lifecycle." },
      { title: "500+ Enterprises Served", desc: "Covering 30+ industries with a 60%+ client retention rate." },
      { title: "Ongoing Maintenance", desc: "Continuous system maintenance and annual surveillance audit support." },
    ],
  },
};

export function WhyUsSection({ lang, data }: WhyUsSectionProps) {
  const d = data?.[lang];
  const t = { ...defaults[lang], features: d || defaults[lang].features };

  const icons = [
    <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>,
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{t.title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{t.subtitle}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, i) => (
            <div key={i} className="h-full reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
              <FeatureCard
                icon={icons[i]}
                title={feature.title}
                description={feature.desc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
