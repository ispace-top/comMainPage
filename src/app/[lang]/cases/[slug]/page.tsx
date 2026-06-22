"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tag } from "@/components/ui/Tag";
import { PageSkeleton } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/scroll-reveal";
import { langPath } from "@/lib/i18n";

interface CaseData {
  id: number;
  title: string;
  industry: string;
  summary: string;
  body: string;
  created: string;
}

export default function CaseDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const id = params?.slug as string;
  const [data, setData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useScrollReveal();

  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((item) => {
        setData(item);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;

  if (notFound || !data) {
    return (
      <div className="section-padding">
        <div className="container-page">
          <EmptyState
            title={lang === "zh" ? "案例未找到" : "Case Not Found"}
            description={lang === "zh" ? "该案例不存在或已被移除。" : "This case does not exist or has been removed."}
            action={
              <Link href={langPath(lang, "/cases")}>
                <Button variant="secondary" size="md">{lang === "zh" ? "返回列表" : "Back to List"}</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const renderBody = (text: string) => {
    if (!text) return null;
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-neutral-800 mt-8 mb-4">{block.slice(3)}</h2>;
      if (block.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold text-neutral-800 mt-6 mb-3">{block.slice(4)}</h3>;
      return <p key={i} className="mb-4 text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />;
    });
  };

  return (
    <div className="section-padding">
      <div className="container-page max-w-[800px]">
        <Breadcrumb
          items={[
            { label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") },
            { label: lang === "zh" ? "成功案例" : "Cases", href: langPath(lang, "/cases") },
            { label: data.title },
          ]}
          className="mb-6"
        />

        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
            alt={data.title}
            className="w-full aspect-[2/1] object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-400 mb-4">
          {data.industry && <Tag variant="primary" size="sm">{data.industry}</Tag>}
          <span>{data.created}</span>
        </div>

        <h1 className="text-3xl font-bold text-neutral-800 mb-2">{data.title}</h1>
        {data.summary && <p className="text-lg text-neutral-500 mb-8">{data.summary}</p>}

        <div className="prose max-w-none">{renderBody(data.body)}</div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link href={langPath(lang, "/cases")} className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            {lang === "zh" ? "← 返回案例列表" : "← Back to Cases"}
          </Link>
        </div>
      </div>
    </div>
  );
}
