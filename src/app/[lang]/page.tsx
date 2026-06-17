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

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";

  // Initialize scroll reveal animations
  useScrollReveal();

  return (
    <>
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
