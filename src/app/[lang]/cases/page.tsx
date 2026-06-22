"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/Loading";
import { useScrollReveal } from "@/lib/scroll-reveal";

const clients = ["Huawei", "CNPC", "Sinopec", "CRRC", "BYD", "Alibaba", "Tencent", "Midea", "Haier", "SANY", "GREE", "BAIC"];

const fallbackCases = [
  { id: 1, title: "某大型制造集团 — ISO9001 认证案例", industry: "制造业" },
  { id: 2, title: "某化工企业 — ISO14001 认证案例", industry: "化工" },
  { id: 3, title: "某建筑集团 — ISO45001 认证案例", industry: "建筑" },
  { id: 4, title: "某食品公司 — ISO22000 认证案例", industry: "食品" },
  { id: 5, title: "某汽车零部件厂 — IATF 16949 认证案例", industry: "汽车" },
  { id: 6, title: "某医疗器械公司 — ISO13485 认证案例", industry: "医疗" },
];

export default function CasesPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [cases, setCases] = useState<{ id: number; title: string; industry: string }[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal(!loading);

  useEffect(() => {
    setLoading(true);
    fetch("/api/content?type=cases")
      .then((r) => r.json())
      .then((data) => setCases(data.length > 0 ? data : fallbackCases))
      .catch(() => setCases(fallbackCases))
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") }, { label: lang === "zh" ? "成功案例" : "Cases" }]} className="mb-6" />
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
        {cases.length === 0 ? (
          <div className="mt-16">
            <EmptyState
              title={lang === "zh" ? "暂无成功案例" : "No Success Cases"}
              description={lang === "zh" ? "精彩案例即将上线，敬请期待" : "Exciting cases coming soon"}
            />
          </div>
        ) : (
        <div className="mt-16 space-y-8">
          {cases.map((c, i) => (
            <div key={c.id} className={`flex flex-col md:flex-row gap-8 p-6 bg-white border border-neutral-200 rounded-md shadow-xs hover:shadow-sm transition-all reveal-on-scroll ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-2/5 shrink-0">
                <div className="aspect-[3/2] bg-neutral-100 rounded-sm flex items-center justify-center">
                  <img src={`https://images.unsplash.com/photo-${i === 0 ? "1581091226825-a6a2a5aee158" : "1532996122724-e3c354a0b15b"}?w=600&q=80`} alt={c.title} className="w-full h-full object-cover rounded-sm" loading="lazy" />
                </div>
              </div>
              <div className="md:w-3/5 flex flex-col justify-center">
                {c.industry && <span className="text-xs font-medium text-primary-500 uppercase">{c.industry}</span>}
                <h3 className="mt-2 text-xl font-semibold text-neutral-800">{c.title}</h3>
                <Link href={langPath(lang, `/cases/${c.id}`)} className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-500 hover:gap-2 transition-all">
                  {lang === "zh" ? "查看详情" : "View Details"}
                  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
