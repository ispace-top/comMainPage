"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Modal } from "@/components/ui/Modal";
import { useScrollReveal } from "@/lib/scroll-reveal";
import { langPath } from "@/lib/i18n";

export default function AboutPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <div className="hero-gradient py-20 max-md:py-14">
        <div className="container-page text-center">
          <h1 className="text-4xl font-bold text-white">{lang === "zh" ? "关于我们" : "About Us"}</h1>
          <p className="mt-4 text-lg text-white/80 max-w-[560px] mx-auto">{lang === "zh" ? "深耕认证行业10+年，以专业和信任铸就企业品质" : "Over 10 years of certification expertise, built on professionalism and trust"}</p>
        </div>
      </div>

      <div className="container-page py-16 max-md:py-12">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") }, { label: lang === "zh" ? "关于我们" : "About" }]} className="mb-8" />

        {/* Company Intro */}
        <section className="grid md:grid-cols-2 gap-10 items-center reveal-on-scroll">
          <div>
            <h2 className="text-3xl font-bold text-neutral-800">{lang === "zh" ? "公司简介" : "Company Profile"}</h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">{lang === "zh" ? "北京正远智汇科技有限公司是国内领先的 ISO 认证咨询服务提供商，成立于2015年，总部位于北京密云。我们汇聚了一批由资深 ISO 认证审核员、行业专家组成的专业团队，致力于为各类企业提供全方位、一站式的国际标准认证咨询服务。10余年来，我们已成功服务 500+ 企业客户，覆盖制造、化工、建筑、食品、IT 等 30+ 行业，保持着 98% 的认证一次性通过率。" : "Beijing Zhengyuan Zhihui Technology Co., Ltd. is a leading ISO certification consulting provider in China, founded in 2015 and headquartered in Beijing Miyun. We bring together a team of senior ISO auditors and industry experts, dedicated to providing comprehensive one-stop international standard certification consulting services. Over 10 years, we have successfully served 500+ enterprise clients across 30+ industries, maintaining a 98% first-time certification pass rate."}</p>
          </div>
          <div className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="正远智汇办公室" className="w-full h-full object-cover rounded-lg" loading="lazy" />
          </div>
        </section>

        {/* Core Stats */}
        <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll">
          {[["2015", lang === "zh" ? "成立年份" : "Founded"], ["500+", lang === "zh" ? "服务企业" : "Enterprises"], ["98%", lang === "zh" ? "通过率" : "Success Rate"], ["30+", lang === "zh" ? "行业覆盖" : "Industries"]].map(([num, label], i) => (
            <div key={i} className="text-center p-6 bg-white border border-neutral-200 rounded-md">
              <p className="text-3xl font-bold text-primary-600">{num}</p>
              <p className="mt-1 text-sm text-neutral-500">{label}</p>
            </div>
          ))}
        </section>

        {/* Certificates */}
        <section className="mt-20 reveal-on-scroll" id="certificates">
          <h2 className="text-3xl font-bold text-neutral-800 text-center">{lang === "zh" ? "资质证书" : "Certifications"}</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div
                key={i}
                onClick={() => { setLightboxIndex(i - 1); setLightboxOpen(true); }}
                className="aspect-[3/4] bg-neutral-50 border border-neutral-200 rounded-md flex items-center justify-center hover:shadow-sm cursor-pointer transition-all hover:border-primary-300"
              >
                <span className="text-sm text-neutral-400">{lang === "zh" ? "资质证书" : "Certificate"} {i}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certificate Lightbox */}
        <Modal
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          title={lang === "zh" ? `资质证书 ${lightboxIndex + 1}` : `Certificate ${lightboxIndex + 1}`}
          size="lg"
        >
          <div className="flex items-center justify-center min-h-[300px] bg-neutral-50 rounded-md">
            <div className="text-center">
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" alt="认证证书" className="w-full h-full object-contain rounded-md" loading="lazy" />
              <p className="mt-4 text-neutral-500 text-sm">
                {lang === "zh" ? "点击左右箭头浏览更多证书" : "Use arrow keys to browse certificates"}
              </p>
            </div>
          </div>
        </Modal>

        {/* Expert Team */}
        <section className="mt-20 reveal-on-scroll" id="team">
          <h2 className="text-3xl font-bold text-neutral-800 text-center">{lang === "zh" ? "专家团队" : "Expert Team"}</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { zh: "张明远", en: "Zhang Mingyuan", roleZh: "首席顾问 · 15年经验", roleEn: "Chief Consultant · 15yr", descZh: "前SGS高级审核员", descEn: "Former SGS Senior Auditor" },
              { zh: "李雪华", en: "Li Xuehua", roleZh: "资深顾问 · 12年经验", roleEn: "Senior Consultant · 12yr", descZh: "ISO9001/14001双体系专家", descEn: "ISO9001/14001 Expert" },
              { zh: "王建国", en: "Wang Jianguo", roleZh: "技术总监 · 18年经验", roleEn: "Technical Director · 18yr", descZh: "食品安全管理体系专家", descEn: "Food Safety Expert" },
              { zh: "陈思雨", en: "Chen Siyu", roleZh: "项目经理 · 10年经验", roleEn: "Project Manager · 10yr", descZh: "汽车行业IATF认证专家", descEn: "IATF Certification Expert" },
            ].map((person, i) => (
              <div key={i} className="text-center p-6 bg-white border border-neutral-200 rounded-md hover:shadow-sm transition-all">
                <div className="size-28 rounded-full bg-neutral-100 mx-auto flex items-center justify-center">
                  <img src={`https://images.unsplash.com/photo-${["1507003211169-0a1dd7228f2d","1494790108377-be9c29b29330","1472099645785-5658abf4ff4e","1438761681033-6461ffad8d80"][i]}?w=112&h=112&fit=crop&q=80`} alt={lang === "zh" ? person.zh : person.en} className="size-28 rounded-full object-cover" loading="lazy" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-800">{lang === "zh" ? person.zh : person.en}</h3>
                <p className="text-sm text-primary-500 mt-1">{lang === "zh" ? person.roleZh : person.roleEn}</p>
                <p className="text-sm text-neutral-400 mt-1">{lang === "zh" ? person.descZh : person.descEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-20 reveal-on-scroll" id="history">
          <h2 className="text-3xl font-bold text-neutral-800 text-center">{lang === "zh" ? "发展历程" : "Our Journey"}</h2>
          <div className="mt-10 max-w-[800px] mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2 max-md:left-4" />
            {[
              { year: "2015", zh: "正远智汇在北京成立，创始团队5人", en: "Founded in Beijing with a team of 5" },
              { year: "2017", zh: "累计服务客户突破100家", en: "Surpassed 100 enterprise clients" },
              { year: "2019", zh: "成立上海、广州分公司", en: "Opened Shanghai & Guangzhou offices" },
              { year: "2021", zh: "累计服务客户突破300家", en: "Surpassed 300 enterprise clients" },
              { year: "2023", zh: "获评'企业认证服务行业标杆'", en: "Awarded Industry Benchmark" },
              { year: "2025", zh: "累计服务客户500+，团队超百人", en: "500+ clients, 100+ team members" },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-6 mb-8 relative ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} max-md:pl-10 max-md:text-left`}>
                  <h3 className="text-xl font-bold text-primary-600">{item.year}</h3>
                  <p className="mt-1 text-base text-neutral-600">{lang === "zh" ? item.zh : item.en}</p>
                </div>
                <div className="absolute left-1/2 top-2 size-3 rounded-full bg-primary-500 border-2 border-white -translate-x-1/2 max-md:left-4 max-md:translate-x-0" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
