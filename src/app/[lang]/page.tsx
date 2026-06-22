"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LogoWall } from "@/components/sections/LogoWall";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { CTASection } from "@/components/sections/CTASection";
import { useScrollReveal } from "@/lib/scroll-reveal";
import { PageSkeleton } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { langPath } from "@/lib/i18n";

interface PageData {
  hero?: any;
  whyUs?: any;
  process?: any;
  cta?: any;
  logoWall?: any;
  stats?: any;
}

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useScrollReveal(!loading);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch("/api/page-data").then((r) => r.json()),
      fetch("/api/content?type=services").then((r) => r.json()),
      fetch("/api/content?type=articles").then((r) => r.json()),
    ])
      .then(([pd, svc, art]) => {
        setPageData(pd);
        setServices(svc);
        setArticles(art);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to load");
        setLoading(false);
      });
  }, [lang]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          title={lang === "zh" ? "加载失败" : "Loading Failed"}
          description={error}
          action={
            <Button variant="secondary" size="md" onClick={() => window.location.reload()}>
              {lang === "zh" ? "重新加载" : "Retry"}
            </Button>
          }
        />
      </div>
    );
  }

  if (loading) return <PageSkeleton />;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: lang === "zh" ? "正远智汇" : "ZhengyuanZhihui",
            description: lang === "zh"
              ? "正远智汇为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务"
              : "ZhengyuanZhihui provides ISO9001, ISO14001, ISO45001 certification consulting services",
            url: `https://www.9001.ltd${langPath(lang, "/")}`,
            foundingDate: "2015",
            numberOfEmployees: "200+",
            areaServed: { "@type": "Country", name: "China" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "98", bestRating: "100", ratingCount: "500" },
          }),
        }}
      />
      <HeroSection lang={lang} data={pageData?.hero} />
      <WhyUsSection lang={lang} data={pageData?.whyUs} />
      <ServicesPreview lang={lang} services={services} />
      <ProcessSection lang={lang} data={pageData?.process} />
      <LogoWall lang={lang} data={pageData?.logoWall} />
      <InsightsPreview lang={lang} articles={articles} />
      <CTASection lang={lang} data={pageData?.cta} />
    </>
  );
}
