import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { HreflangTags } from "@/components/ui/HreflangTags";
type LangType = "zh" | "en";
const validLangs: LangType[] = ["zh", "en"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const effectiveLang: LangType = validLangs.includes(lang as LangType) ? (lang as LangType) : "zh";

  const titles: Record<LangType, string> = {
    zh: "认证通 — 专业企业认证服务 | ISO9001 ISO14001 认证咨询",
    en: "Renzheng — Professional Certification Services | ISO9001 ISO14001",
  };

  const descriptions: Record<LangType, string> = {
    zh: "认证通为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务，10+年行业经验，500+企业信赖，98%认证通过率。",
    en: "Renzheng provides ISO9001, ISO14001, ISO45001 certification consulting. 10+ years of expertise, 500+ enterprises, 98% success rate.",
  };

  return {
    title: titles[effectiveLang],
    description: descriptions[effectiveLang],
    alternates: {
      canonical: `/${effectiveLang}`,
      languages: {
        zh: "/zh",
        en: "/en",
      },
    },
    openGraph: {
      locale: effectiveLang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: effectiveLang === "zh" ? "en_US" : "zh_CN",
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const effectiveLang: LangType = validLangs.includes(lang as LangType) ? (lang as LangType) : "zh";

  return (
    <ToastProvider>
      <SetHtmlLang lang={effectiveLang} />
      <HreflangTags />
      <Navigation lang={effectiveLang} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer lang={effectiveLang} />
    </ToastProvider>
  );
}
