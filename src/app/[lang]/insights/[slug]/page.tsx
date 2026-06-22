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

interface ArticleData {
  id: number;
  title: string;
  category: string;
  summary: string;
  body: string;
  created: string;
}

export default function InsightDetailPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const id = params?.slug as string;
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useScrollReveal();

  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="section-padding"><div className="container-page"><PageSkeleton /></div></div>;

  if (notFound || !article) {
    return (
      <div className="section-padding">
        <div className="container-page">
          <EmptyState
            title={lang === "zh" ? "文章未找到" : "Article Not Found"}
            description={lang === "zh" ? "该文章不存在或已被移除。" : "This article does not exist or has been removed."}
            action={
              <Link href={langPath(lang, "/insights")}>
                <Button variant="secondary" size="md">{lang === "zh" ? "返回列表" : "Back to List"}</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  // Simple Markdown → HTML conversion for body text
  const renderBody = (text: string) => {
    if (!text) return null;
    return text
      .split("\n\n")
      .map((block, i) => {
        if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-neutral-800 mt-8 mb-4">{block.slice(3)}</h2>;
        if (block.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold text-neutral-800 mt-6 mb-3">{block.slice(4)}</h3>;
        if (block.startsWith("- ")) {
          return <ul key={i} className="list-disc pl-5 space-y-1 mb-4 text-neutral-600">{block.split("\n").filter((l) => l.startsWith("- ")).map((li, j) => <li key={j}>{li.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")}</li>)}</ul>;
        }
        if (/^\d+\.\s/.test(block)) {
          return <ol key={i} className="list-decimal pl-5 space-y-1 mb-4 text-neutral-600">{block.split("\n").filter((l) => /^\d+\.\s/.test(l)).map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />)}</ol>;
        }
        return <p key={i} className="mb-4 text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\n/g, "<br/>") }} />;
      });
  };

  return (
    <div className="section-padding">
      <div className="container-page max-w-[800px]">
        <Breadcrumb
          items={[
            { label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") },
            { label: lang === "zh" ? "行业洞察" : "Insights", href: langPath(lang, "/insights") },
            { label: article.title },
          ]}
          className="mb-6"
        />

        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
            alt={article.title}
            className="w-full aspect-[2/1] object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-400 mb-4">
          {article.category && <Tag variant="primary" size="sm">{article.category}</Tag>}
          <span>{article.created}</span>
        </div>

        <h1 className="text-3xl font-bold text-neutral-800 mb-2">{article.title}</h1>
        {article.summary && <p className="text-lg text-neutral-500 mb-8">{article.summary}</p>}

        <div className="prose max-w-none">{renderBody(article.body)}</div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link href={langPath(lang, "/insights")} className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            {lang === "zh" ? "← 返回文章列表" : "← Back to Articles"}
          </Link>
        </div>
      </div>
    </div>
  );
}
