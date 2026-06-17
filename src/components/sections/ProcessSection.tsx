import type { Lang } from "@/components/ui/LanguageSwitcher";

interface ProcessSectionProps {
  lang: Lang;
}

const content = {
  zh: {
    title: "认证流程",
    subtitle: "简单四步，开启企业标准化认证之旅",
    steps: [
      { title: "在线咨询", desc: "提交企业基本信息，专属顾问1对1沟通需求" },
      { title: "方案制定", desc: "量身定制认证方案，明确时间节点和费用预算" },
      { title: "体系审核", desc: "专家团队现场审核，确保管理体系合规运行" },
      { title: "颁发证书", desc: "审核通过后颁发国际互认的认证证书" },
    ],
  },
  en: {
    title: "Certification Process",
    subtitle: "Four simple steps to start your certification journey",
    steps: [
      { title: "Consultation", desc: "Submit basic info and get a 1-on-1 consultation with our experts" },
      { title: "Planning", desc: "Tailored certification plan with clear timelines and budget" },
      { title: "Audit", desc: "On-site audit by our expert team to ensure compliance" },
      { title: "Certification", desc: "Receive internationally recognized certification upon approval" },
    ],
  },
};

const stepIcons = [
  <svg key="1" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="3" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12h2l2-6h12l2 6h2M7 12h10M9 12a3 3 0 116 0M9 12a3 3 0 00-6 0" />
  </svg>,
  <svg key="4" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
];

export function ProcessSection({ lang }: ProcessSectionProps) {
  const t = content[lang];
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{t.title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{t.subtitle}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step, i) => (
            <div key={i} className="relative reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary-500 text-white text-xl font-bold mb-4 shadow-sm">
                  {i + 1}
                </div>
                <div className="inline-flex items-center justify-center size-12 rounded-lg bg-primary-50 text-primary-500 mb-3">
                  {stepIcons[i]}
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 max-w-[220px] mx-auto">{step.desc}</p>
              </div>
              {/* Connector line (desktop only) */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-[60px] left-[calc(50%+60px)] w-[calc(100%-120px)]">
                  <div className="h-0.5 bg-primary-200 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-primary-300" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
