"use client";

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
import { usePageData } from "@/lib/use-page-data";
import { PageSkeleton } from "@/components/ui/Loading";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";

  // Simulate data loading (replace with real API call)
  const { loading, error, retry } = usePageData(
    () => new Promise<void>((resolve) => setTimeout(resolve, 300))
  );

  useScrollReveal();

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          title={lang === "zh" ? "加载失败" : "Loading Failed"}
          description={error}
          action={
            <Button variant="secondary" size="md" onClick={retry}>
              {lang === "zh" ? "重新加载" : "Retry"}
            </Button>
          }
        />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: lang === "zh" ? "认证通" : "Renzheng",
            description: lang === "zh"
              ? "认证通为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务"
              : "Renzheng provides ISO9001, ISO14001, ISO45001 certification consulting services",
            url: `https://www.renzheng.com/${lang}`,
            foundingDate: "2015",
            numberOfEmployees: "200+",
            areaServed: {
              "@type": "Country",
              name: "China",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "98",
              bestRating: "100",
              ratingCount: "500",
            },
          }),
        }}
      />
      <HeroSection lang={lang} />
      <WhyUsSection lang={lang} />
      <ServicesPreview lang={lang} />
      <ProcessSection lang={lang} />
      <LogoWall lang={lang} />
      <InsightsPreview lang={lang} />
      <CTASection lang={lang} />
    </>
  );
}
