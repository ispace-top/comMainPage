"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { langPath } from "@/lib/i18n";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((s) => { if (s.logoUrl) setLogoUrl(s.logoUrl); })
      .catch(() => {});
  }, []);
  const t = {
    companyDesc: lang === "zh"
      ? "正远智汇 — 专业企业认证咨询服务提供商。深耕认证行业10+年，服务500+企业，以98%认证通过率助力企业标准化建设。"
      : "ZhengyuanZhihui — Professional certification consulting provider. 10+ years of expertise, serving 500+ enterprises with 98% success rate.",
    quickLinks: lang === "zh" ? "快速链接" : "Quick Links",
    services: lang === "zh" ? "认证服务" : "Services",
    contactUs: lang === "zh" ? "联系我们" : "Contact Us",
    address: lang === "zh"
      ? "北京市密云区西田各庄镇卸河路6号135室"
      : "Room 135, No.6 Xiehe Road, Xitiangezhuang Town, Miyun District, Beijing",
    phone: "400-888-9999",
    email: "info@9001.ltd",
    workHours: lang === "zh" ? "工作时间: 周一至周五 9:00-18:00" : "Hours: Mon-Fri 9:00-18:00",
    copyright: (year: number) =>
      lang === "zh"
        ? `© ${year} 正远智汇. All rights reserved.`
        : `© ${year} ZhengyuanZhihui. All rights reserved.`,
    icp: lang === "zh" ? "京ICP备2024XXXXXXXX号" : "ICP Registration No. 2024XXXXXXXX",
  };

  const year = new Date().getFullYear();

  const quickLinks = [
    { label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") },
    { label: lang === "zh" ? "关于我们" : "About", href: langPath(lang, "/about") },
    { label: lang === "zh" ? "成功案例" : "Cases", href: langPath(lang, "/cases") },
    { label: lang === "zh" ? "行业洞察" : "Insights", href: langPath(lang, "/insights") },
    { label: lang === "zh" ? "联系我们" : "Contact", href: langPath(lang, "/contact") },
  ];

  const serviceLinks = [
    { label: "ISO9001", href: langPath(lang, "/services/iso-9001") },
    { label: "ISO14001", href: langPath(lang, "/services/iso-14001") },
    { label: "ISO45001", href: langPath(lang, "/services/iso-45001") },
    { label: "ISO27001", href: langPath(lang, "/services/iso-27001") },
    { label: lang === "zh" ? "查看全部 →" : "View All →", href: langPath(lang, "/services") },
  ];

  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container-page py-16 max-md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-md:gap-8">
          {/* Company */}
          <div className="lg:col-span-1.4">
            <div className="flex items-center gap-2.5 mb-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div className="flex items-center justify-center size-10 rounded-md bg-primary-500">
                  <span className="text-white font-bold text-lg">正</span>
                </div>
              )}
              <span className="text-white font-bold text-lg">
                {lang === "zh" ? "正远智汇" : "ZhengyuanZhihui"}
              </span>
            </div>
            <div className="w-6 h-0.5 bg-primary-400 mb-4" />
            <p className="text-sm leading-relaxed">{t.companyDesc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">{t.services}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-150 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">{t.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <svg className="size-5 text-primary-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 15.088 17 12.61 17 9A7 7 0 103 9c0 3.61 1.698 6.088 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                {t.address}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg className="size-5 text-primary-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.022 13.022 0 012 5V3.5z" />
                </svg>
                {t.phone}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg className="size-5 text-primary-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
                {t.email}
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-400 pt-1">
                <svg className="size-5 text-primary-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                {t.workHours}
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {/* WeChat */}
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="WeChat">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.5 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 2C6.48 2 2 6.06 2 11c0 2.76 1.38 5.24 3.54 6.86L5 21l3.67-2.45c.72.2 1.47.31 2.23.34.05.01.1.01.15.01C17.52 18.9 22 14.84 22 9.9 22 5.14 17.52 2 12 2zm5.8 8.8c0 3.37-3.36 6.1-7.5 6.1-.68 0-1.35-.08-2-.23l-2.1 1.4.5-2.1c-1.2-.9-1.9-2-1.9-3.17C4.8 9.43 8.16 6.7 12.3 6.7s7.5 2.73 7.5 6.1z"/>
                </svg>
              </a>
              {/* Weibo */}
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Weibo">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 4c-1.93 0-3.5-1.57-3.5-3.5S6.57 6.5 8.5 6.5 12 8.07 12 10s-1.57 3.5-3.5 3.5zm6.5 4c-3.04 0-5.5-1.79-5.5-4s2.46-4 5.5-4 5.5 1.79 5.5 4-2.46 4-5.5 4z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-700">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <div className="text-sm text-neutral-500">
            {t.copyright(year)} &nbsp;|&nbsp; {t.icp}
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <Link href={langPath(lang, "/about")} className="hover:text-white transition-colors">
              {lang === "zh" ? "隐私政策" : "Privacy Policy"}
            </Link>
            <Link href={langPath(lang, "/about")} className="hover:text-white transition-colors">
              {lang === "zh" ? "使用条款" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
