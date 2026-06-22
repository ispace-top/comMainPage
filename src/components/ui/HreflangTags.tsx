"use client";

import { usePathname } from "next/navigation";

/**
 * Injects hreflang alternate links for SEO.
 * Place inside any page component. Next.js hoists <link> tags to <head>.
 * zh is the default locale with no URL prefix; en uses /en prefix.
 */
export function HreflangTags() {
  const pathname = usePathname();

  const isEn = pathname.startsWith("/en");
  const currentPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;

  return (
    <>
      <link rel="alternate" hrefLang="zh" href={currentPath} />
      <link rel="alternate" hrefLang="en" href={`/en${currentPath}`} />
      <link rel="alternate" hrefLang="x-default" href={currentPath} />
    </>
  );
}
