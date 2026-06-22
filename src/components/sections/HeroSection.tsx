import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";

interface HeroSectionProps {
  lang: Lang;
  data?: { zh?: { title?: string; subtitle?: string; cta1?: string; cta2?: string }; en?: { title?: string; subtitle?: string; cta1?: string; cta2?: string } };
}

const defaults = {
  zh: {
    title: "助力企业标准化建设\n迈向国际认证新高度",
    subtitle: "专注 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务，以专业团队和卓越通过率，为企业构建可信任的管理体系。",
    ctaPrimary: "免费获取认证方案",
    ctaSecondary: "了解服务详情",
  },
  en: {
    title: "Empower Your Business\nwith International Standards",
    subtitle: "Specialized in ISO9001, ISO14001, ISO45001 certification consulting. Build trusted management systems with our expert team and proven success rate.",
    ctaPrimary: "Get Free Consultation",
    ctaSecondary: "Our Services",
  },
};

const statDefaults = {
  zh: [{ num: "10+", label: "年行业经验" }, { num: "500+", label: "服务企业" }, { num: "98%", label: "认证通过率" }],
  en: [{ num: "10+", label: "Years Experience" }, { num: "500+", label: "Enterprises Served" }, { num: "98%", label: "Success Rate" }],
};

export function HeroSection({ lang, data }: HeroSectionProps) {
  const d = data?.[lang] || {};
  const t = {
    title: d.title || defaults[lang].title,
    subtitle: d.subtitle || defaults[lang].subtitle,
    ctaPrimary: d.cta1 || defaults[lang].ctaPrimary,
    ctaSecondary: d.cta2 || defaults[lang].ctaSecondary,
  };

  return (
    <section
      className="relative min-h-[600px] flex items-center hero-gradient overflow-hidden"
      style={{ minHeight: "calc(100vh - 72px)" }}
      id="main-content"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <circle cx="300" cy="300" r="250" fill="white" />
          <circle cx="400" cy="250" r="150" fill="white" />
          <circle cx="200" cy="400" r="100" fill="white" />
        </svg>
      </div>

      <div className="container-page relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 max-md:py-10">
          {/* Left content */}
          <div className="max-lg:text-center max-lg:flex max-lg:flex-col max-lg:items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight whitespace-pre-line text-balance animate-[fadeSlideIn_600ms_ease-out]">
              {t.title}
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-[480px] leading-relaxed animate-[fadeSlideIn_600ms_ease-out_150ms] [animation-fill-mode:backwards]">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-8 animate-[fadeSlideIn_600ms_ease-out_300ms] [animation-fill-mode:backwards] max-lg:justify-center">
              <Link
                href={langPath(lang, "/contact")}
                className="inline-flex items-center justify-center h-13 px-8 text-lg font-medium rounded-md bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href={langPath(lang, "/services")}
                className="inline-flex items-center justify-center h-13 px-8 text-lg font-medium rounded-md border-1.5 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 mt-10 animate-[fadeSlideIn_600ms_ease-out_450ms] [animation-fill-mode:backwards] max-lg:justify-center">
              {statDefaults[lang].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px h-8 bg-white/20" />}
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.num}</p>
                    <p className="text-sm text-white/70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <div className="hidden lg:flex items-center justify-center animate-[fadeScaleIn_800ms_ease-out_200ms] [animation-fill-mode:backwards]">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=500&fit=crop&q=80"
                  alt="ISO Certification"
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                  loading="lazy"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 size-16 rounded-xl bg-accent-400/80 shadow-lg flex items-center justify-center">
                <svg className="size-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -left-4 size-12 rounded-xl bg-primary-400/80 shadow-lg flex items-center justify-center">
                <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
