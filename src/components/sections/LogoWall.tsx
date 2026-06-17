import type { Lang } from "@/components/ui/LanguageSwitcher";

interface LogoWallProps {
  lang: Lang;
}

// Mock client logos — in production these would come from CMS
const clientNames = [
  "Huawei", "CNPC", "Sinopec", "CRRC", "COMAC",
  "BYD", "Alibaba", "Tencent", "BOE", "Midea",
  "Haier", "SANY",
];

export function LogoWall({ lang }: LogoWallProps) {
  const title = lang === "zh" ? "他们信任我们" : "They Trust Us";
  const subtitle = lang === "zh"
    ? "数百家行业领先企业选择认证通作为认证合作伙伴"
    : "Hundreds of industry leaders choose Renzheng as their certification partner";
  const statLabel1 = lang === "zh" ? "服务企业" : "Enterprises Served";
  const statLabel2 = lang === "zh" ? "认证通过率" : "Success Rate";
  const statLabel3 = lang === "zh" ? "行业覆盖" : "Industries Covered";

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center max-w-[600px] mx-auto reveal-on-scroll">
          <h2 className="text-4xl font-bold text-neutral-800">{title}</h2>
          <p className="mt-4 text-lg text-neutral-500">{subtitle}</p>
        </div>

        {/* Logo grid */}
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {clientNames.map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-center h-20 rounded-md border border-neutral-200 bg-neutral-50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default reveal-on-scroll"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="text-lg font-bold text-neutral-400">{name}</span>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-8 py-10 px-8 bg-neutral-50 rounded-lg reveal-on-scroll">
          {[
            { value: "500+", label: statLabel1 },
            { value: "98%", label: statLabel2 },
            { value: "30+", label: statLabel3 },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
