import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";

interface CTASectionProps {
  lang: Lang;
  data?: { zh?: { title?: string; subtitle?: string; button?: string }; en?: { title?: string; subtitle?: string; button?: string } };
}

const defaults = {
  zh: {
    title: "开启您的认证之旅",
    subtitle: "专业顾问将在24小时内与您联系，为企业量身定制认证方案",
    button: "免费获取认证方案",
  },
  en: {
    title: "Start Your Certification Journey",
    subtitle: "Our expert consultants will contact you within 24 hours with a tailored certification plan",
    button: "Get Free Consultation",
  },
};

export function CTASection({ lang, data }: CTASectionProps) {
  const d = data?.[lang] || {};
  const t = {
    title: d.title || defaults[lang].title,
    subtitle: d.subtitle || defaults[lang].subtitle,
    button: d.button || defaults[lang].button,
  };
  return (
    <section className="py-20 max-md:py-14 bg-primary-600 reveal-on-scroll">
      <div className="container-page text-center">
        <h2 className="text-4xl font-bold text-white text-balance">{t.title}</h2>
        <p className="mt-4 text-lg text-white/80 max-w-[560px] mx-auto">{t.subtitle}</p>
        <Link
          href={langPath(lang, "/contact")}
          className="inline-flex items-center justify-center h-13 px-8 mt-8 text-lg font-medium rounded-md bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          {t.button}
        </Link>
      </div>
    </section>
  );
}
