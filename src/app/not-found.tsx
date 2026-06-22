"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (pathname?.startsWith("/en")) setLang("en");
    else setLang("zh");
  }, [pathname]);

  return (
    <>
      <Navigation lang={lang} />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <p className="text-7xl font-extrabold text-primary-500 mb-4">404</p>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            {lang === "zh" ? "页面未找到" : "Page Not Found"}
          </h1>
          <p className="text-neutral-500 mb-8">
            {lang === "zh" ? "您访问的页面不存在或已被移除。" : "The page you are looking for does not exist or has been removed."}
          </p>
          <Link href={langPath(lang, "/")}>
            <Button variant="primary" size="md">
              {lang === "zh" ? "返回首页" : "Back to Home"}
            </Button>
          </Link>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
