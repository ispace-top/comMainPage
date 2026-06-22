"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useScrollReveal } from "@/lib/scroll-reveal";

const mockServiceData: Record<string, {
  zh: { title: string; intro: string; enterprises: string; titleEn: string };
  en: { title: string; intro: string; enterprises: string; titleEn: string };
}> = {
  "iso-9001": {
    zh: {
      title: "ISO9001 质量管理体系认证",
      titleEn: "ISO9001 Quality Management",
      intro: "ISO9001 是国际标准化组织（ISO）发布的全球公认的质量管理体系标准。该标准以顾客为关注焦点，强调过程方法和持续改进，适用于任何行业、任何规模的组织。通过 ISO9001 认证，企业向客户和合作伙伴展示其具备提供稳定优质产品和服务的能力。",
      enterprises: "适用于所有行业和规模的企业，特别推荐：制造业企业、服务型企业、贸易公司、工程施工企业、IT 与科技公司。无论企业处于初创期、成长期还是成熟期，ISO9001 都能为企业的标准化管理提供有力支撑。",
    },
    en: {
      title: "ISO9001 Quality Management System Certification",
      titleEn: "ISO9001 Quality Management",
      intro: "ISO9001 is a globally recognized quality management system standard published by the International Organization for Standardization (ISO). The standard focuses on customer satisfaction, process approach, and continuous improvement, applicable to organizations of any industry and size. By achieving ISO9001 certification, enterprises demonstrate to customers and partners their ability to consistently provide quality products and services.",
      enterprises: "Applicable to all industries and enterprise sizes, especially recommended for: manufacturing enterprises, service-oriented companies, trading companies, engineering construction firms, and IT & technology companies. Whether in startup, growth, or maturity stage, ISO9001 provides strong support for standardized management.",
    },
  },
  "iso-14001": {
    zh: {
      title: "ISO14001 环境管理体系认证",
      titleEn: "ISO14001 Environmental Management",
      intro: "ISO14001 是全球环境管理体系的权威标准，帮助组织建立和实施环境方针与目标。该标准指导企业识别和管理环境影响，推动节能减排和绿色可持续发展。获得 ISO14001 认证不仅是法规合规的保障，更是企业社会责任和品牌价值的重要体现。",
      enterprises: "适用于所有行业，特别是：化工制造业、建筑施工企业、能源企业、纺织印染行业、食品加工企业等环境影响较大的行业。",
    },
    en: {
      title: "ISO14001 Environmental Management System Certification",
      titleEn: "ISO14001 Environmental Management",
      intro: "ISO14001 is the authoritative global standard for environmental management systems, helping organizations establish and implement environmental policies and objectives. The standard guides enterprises in identifying and managing environmental impacts, promoting energy conservation and sustainable development.",
      enterprises: "Applicable to all industries, particularly: chemical manufacturing, construction enterprises, energy companies, textile and dyeing industries, food processing, and other industries with significant environmental impacts.",
    },
  },
};

// Fallback for slugs not in mockData
const getDefaultData = (slug: string) => ({
  zh: {
    title: `${slug.toUpperCase()} 认证服务`,
    titleEn: `${slug.toUpperCase()} Certification`,
    intro: "这是一项国际公认的认证标准服务。我们的专家团队将为您提供从体系搭建到最终审核的全流程服务，确保企业顺利通过认证。",
    enterprises: "适用于相关行业的企业。具体适用范围请咨询我们的专业顾问。",
  },
  en: {
    title: `${slug.toUpperCase()} Certification Service`,
    titleEn: `${slug.toUpperCase()} Certification`,
    intro: "This is an internationally recognized certification standard service. Our expert team provides full-process service from system building to final audit.",
    enterprises: "Applicable to enterprises in related industries. Please consult our professional advisors for specific scope.",
  },
});

// FAQ data
const faqData = {
  zh: [
    { q: "ISO认证的有效期是多久？", a: "ISO认证证书有效期为3年，期间每年需接受监督审核以维持证书有效性。3年期满后需要进行再认证审核。" },
    { q: "从申请到拿证需要多长时间？", a: "一般周期为 2-6 个月，具体时间取决于企业规模、行业类型和现有管理体系的完善程度。我们提供加急服务通道。" },
    { q: "小型企业也能申请ISO认证吗？", a: "可以。ISO标准适用于任何规模的组织。我们会根据企业实际情况定制精简高效的认证方案。" },
    { q: "认证不通过怎么办？", a: "如审核中存在不符合项，企业可获得整改期限。我们的顾问团队将全程协助整改，确保二次审核顺利通过。" },
    { q: "认证费用是多少？", a: "费用因企业规模、行业、认证范围等因素而异。请联系我们获取针对您企业的免费报价方案。" },
  ],
  en: [
    { q: "How long is the ISO certificate valid?", a: "ISO certificates are valid for 3 years, with annual surveillance audits required to maintain validity. Recertification is required after 3 years." },
    { q: "How long does the certification process take?", a: "The typical cycle is 2-6 months, depending on enterprise size, industry type, and the maturity of existing management systems. We offer expedited service channels." },
    { q: "Can small enterprises apply for ISO certification?", a: "Yes. ISO standards are applicable to organizations of any size. We tailor streamlined and efficient certification plans based on the actual situation." },
    { q: "What if the certification fails?", a: "If non-conformities are found during the audit, enterprises receive a rectification period. Our consulting team will assist throughout the rectification process." },
    { q: "How much does certification cost?", a: "Costs vary by enterprise size, industry, certification scope, and other factors. Contact us for a free, personalized quotation." },
  ],
};

export default function ServiceDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const slug = params?.slug as string || "iso-9001";
  const { addToast } = useToast();

  useScrollReveal();

  const serviceData = mockServiceData[slug] || getDefaultData(slug);
  const t = serviceData[lang] || serviceData.zh;
  const faqs = faqData[lang] || faqData.zh;

  // Form state
  const [form, setForm] = useState({ name: "", phone: "", company: "" });
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === "zh" ? "请输入姓名" : "Name is required";
    if (!form.phone.trim()) errs.phone = lang === "zh" ? "请输入手机号" : "Phone is required";
    else if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) errs.phone = lang === "zh" ? "请输入正确的手机号" : "Invalid phone number";
    if (!agreed) setAgreeError(true);
    else setAgreeError(false);
    setErrors(errs);
    return Object.keys(errs).length === 0 && agreed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    addToast("success", lang === "zh" ? "提交成功！专业顾问将在24小时内与您联系。" : "Submitted! Our consultant will contact you within 24 hours.");
    setForm({ name: "", phone: "", company: "" });
    setAgreed(false);
  };

  const breadcrumbItems = [
    { label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") },
    { label: lang === "zh" ? "认证服务" : "Services", href: langPath(lang, "/services") },
    { label: t.titleEn },
  ];

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: t.title,
              description: t.intro.slice(0, 200),
              provider: {
                "@type": "Organization",
                name: lang === "zh" ? "正远智汇" : "Renzheng",
              },
              areaServed: { "@type": "Country", name: "China" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]),
        }}
      />
      {/* Hero section */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container-page py-12">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 rounded-lg bg-primary-50 text-3xl shrink-0">
              🏭
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-800">
                {lang === "zh" ? t.title : t.title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
                {lang === "zh"
                  ? "国际公认的权威标准认证，助力企业提升管理水平和市场竞争力。"
                  : "Internationally recognized authoritative standard certification to enhance management and market competitiveness."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="container-page py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Certification Introduction */}
            <section className="reveal-on-scroll">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                {lang === "zh" ? "认证介绍" : "Introduction"}
              </h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-base text-neutral-600 leading-relaxed">{t.intro}</p>
              </div>
            </section>

            {/* Applicable Enterprises */}
            <section className="reveal-on-scroll">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                {lang === "zh" ? "适用企业" : "Applicable Enterprises"}
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">{t.enterprises}</p>
            </section>

            {/* Certification Process */}
            <section className="reveal-on-scroll">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                {lang === "zh" ? "认证流程" : "Process"}
              </h2>
              <div className="space-y-4">
                {[
                  { zh: "1. 初步咨询与需求分析", en: "1. Initial Consultation & Needs Analysis" },
                  { zh: "2. 体系文件策划与编写", en: "2. System Documentation Planning" },
                  { zh: "3. 体系试运行与内部审核", en: "3. Trial Run & Internal Audit" },
                  { zh: "4. 管理评审", en: "4. Management Review" },
                  { zh: "5. 认证机构现场审核", en: "5. Certification Body On-site Audit" },
                  { zh: "6. 颁发认证证书", en: "6. Certificate Issuance" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-md">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary-500 text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-base text-neutral-700">{lang === "zh" ? step.zh : step.en}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="reveal-on-scroll">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                {lang === "zh" ? "常见问题" : "FAQ"}
              </h2>
              <div className="divide-y divide-neutral-200 border-t border-neutral-200">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </section>

            {/* Related Services */}
            <section className="reveal-on-scroll">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
                {lang === "zh" ? "相关认证推荐" : "Related Certifications"}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {["iso-14001", "iso-45001", "iso-27001"].filter(s => s !== slug).map((s) => (
                  <Link
                    key={s}
                    href={langPath(lang, `/services/${s}`)}
                    className="block p-4 border border-neutral-200 rounded-md hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <p className="font-medium text-neutral-800 text-sm">{s.toUpperCase()}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar — Lead Form */}
          <aside className="max-lg:order-first">
            <div className="lg:sticky lg:top-[88px] bg-white border border-neutral-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-neutral-800">
                {lang === "zh" ? "获取专属认证方案" : "Get Your Certification Plan"}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {lang === "zh" ? "专业顾问将在 24 小时内与您联系" : "Our consultant will contact you within 24 hours"}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  label={lang === "zh" ? "姓名" : "Name"}
                  required
                  placeholder={lang === "zh" ? "请输入您的姓名" : "Enter your name"}
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  error={errors.name}
                />
                <Input
                  label={lang === "zh" ? "手机号" : "Phone"}
                  required
                  type="tel"
                  placeholder={lang === "zh" ? "请输入您的手机号码" : "Enter your phone number"}
                  value={form.phone}
                  onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                  error={errors.phone}
                />
                <Input
                  label={lang === "zh" ? "公司名称" : "Company"}
                  placeholder={lang === "zh" ? "请输入您的公司名称（选填）" : "Enter your company name (optional)"}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    {lang === "zh" ? "意向项目" : "Service of Interest"}
                  </label>
                  <div className="h-11 px-3 flex items-center text-sm text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-sm">
                    {t.titleEn}
                  </div>
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="p-3 border border-neutral-200 rounded-sm bg-neutral-50 text-center text-xs text-neutral-400">
                  reCAPTCHA 验证
                </div>

                <div>
                  <Checkbox
                    checked={agreed}
                    onChange={(e) => { setAgreed(e.target.checked); setAgreeError(false); }}
                    label={
                      <span>
                        {lang === "zh" ? "我已阅读并同意" : "I have read and agree to the"}{" "}
                        <Link href={langPath(lang, "/about")} className="text-primary-500 underline" target="_blank">
                          {lang === "zh" ? "《隐私政策》" : "Privacy Policy"}
                        </Link>
                      </span>
                    }
                    error={agreeError ? (lang === "zh" ? "请阅读并同意隐私政策" : "Please agree to the privacy policy") : undefined}
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">
                  {lang === "zh" ? "提交咨询" : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** FAQ Accordion item */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-14 px-5 text-left text-lg font-medium text-neutral-700 bg-neutral-50 hover:text-primary-500 transition-colors"
      >
        <span>{question}</span>
        <svg
          className={["size-5 text-neutral-400 shrink-0 transition-transform duration-200", open && "rotate-180"].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <div
        className={[
          "overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-96" : "max-h-0",
        ].join(" ")}
      >
        <p className="px-5 py-4 text-base text-neutral-600 bg-white">{answer}</p>
      </div>
    </div>
  );
}
