import type { Lang } from "@/components/ui/LanguageSwitcher";
import { FeatureCard } from "@/components/ui/Card";

interface WhyUsSectionProps {
  lang: Lang;
}

const content = {
  zh: {
    title: "为什么选择我们",
    subtitle: "10+年行业深耕，以专业服务赢得数百家企业信赖",
    features: [
      {
        title: "专业团队",
        desc: "由ISO认证审核员组成的专家团队，平均从业经验8年以上，确保每一个项目的高效通过。",
      },
      {
        title: "全程陪护",
        desc: "从体系搭建到认证审核，提供一站式全流程服务。我们不只是指导，更是您的长期管理伙伴。",
      },
      {
        title: "高效出证",
        desc: "标准化流程管理，平均缩短认证周期30%。98%的客户一次性通过初次审核。",
      },
      {
        title: "持续合规",
        desc: "认证后的监督审核与体系维护服务，确保企业管理体系持续有效运行。",
      },
    ],
  },
  en: {
    title: "Why Choose Us",
    subtitle: "Over 10 years of industry expertise, trusted by hundreds of enterprises",
    features: [
      {
        title: "Expert Team",
        desc: "A team of ISO-certified auditors with an average of 8+ years of experience, ensuring the efficient success of every project.",
      },
      {
        title: "Full Support",
        desc: "From system building to certification audit, we offer one-stop full-process service. We're not just guides, but your long-term management partner.",
      },
      {
        title: "Efficient Delivery",
        desc: "Standardized process management reduces certification cycle by 30% on average. 98% of clients pass the initial audit on the first attempt.",
      },
      {
        title: "Continuous Compliance",
        desc: "Post-certification surveillance audits and system maintenance services to ensure the sustained effectiveness of your management system.",
      },
    ],
  },
};

const icons = [
  // Expert Team
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" />
    <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
  </svg>,
  // Full Support
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Efficient
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Compliance
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

export function WhyUsSection({ lang }: WhyUsSectionProps) {
  const t = content[lang];
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{t.title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{t.subtitle}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, i) => (
            <div key={i} className="reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
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
