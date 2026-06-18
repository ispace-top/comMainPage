"use client";

import { usePathname } from "next/navigation";

/**
 * Injects hreflang alternate links for SEO.
 * Place inside any page component. Next.js hoists <link> tags to <head>.
 */
export function HreflangTags() {
  const pathname = usePathname();

  // Determine the current and alternate language URLs
  const isZh = pathname.startsWith("/zh");
  const otherLang = isZh ? "en" : "zh";
  const currentPath = pathname.replace(/^\/(zh|en)/, "");
  const alternatePath = `/${otherLang}${currentPath}`;

  return (
    <>
      <link rel="alternate" hrefLang="zh" href={`/zh${currentPath}`} />
      <link rel="alternate" hrefLang="en" href={`/en${currentPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`/zh${currentPath}`} />
    </>
  );
}
