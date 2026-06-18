"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher, type Lang } from "@/components/ui/LanguageSwitcher";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Navigation({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedChild, setExpandedChild] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: lang === "zh" ? "首页" : "Home", href: `/${lang}` },
    { label: lang === "zh" ? "认证服务" : "Services", href: `/${lang}/services` },
    { label: lang === "zh" ? "成功案例" : "Cases", href: `/${lang}/cases` },
    { label: lang === "zh" ? "行业洞察" : "Insights", href: `/${lang}/insights` },
    {
      label: lang === "zh" ? "关于我们" : "About",
      href: `/${lang}/about`,
      children: [
        { label: lang === "zh" ? "公司简介" : "Company", href: `/${lang}/about` },
        { label: lang === "zh" ? "专家团队" : "Team", href: `/${lang}/about#team` },
        { label: lang === "zh" ? "发展历程" : "History", href: `/${lang}/about#history` },
      ],
    },
    { label: lang === "zh" ? "联系我们" : "Contact", href: `/${lang}/contact` },
  ];

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const pathWithoutLang = pathname.replace(`/${lang}`, "") || "/";
    const hrefWithoutLang = href.replace(`/${lang}`, "");
    if (hrefWithoutLang === "/") return pathWithoutLang === "/";
    return pathWithoutLang.startsWith(hrefWithoutLang);
  };

  // Only home page gets transparent nav (white text on hero gradient)
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const useLightNav = isScrolled || mobileOpen || !isHomePage;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ease-standard",
        useLightNav
          ? "bg-white shadow-lg border-b border-neutral-200"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-page flex items-center h-[72px] max-md:h-[60px]">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 shrink-0 mr-10"
        >
          <div className="flex items-center justify-center size-10 rounded-md bg-primary-500">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span
            className={[
              "text-xl font-bold transition-colors",
              useLightNav ? "text-neutral-800" : "text-white",
            ].join(" ")}
          >
            {lang === "zh" ? "认证通" : "Renzheng"}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="主导航">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setHoveredMenu(item.href)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {item.children ? (
                <button
                  onClick={() => setHoveredMenu(hoveredMenu === item.href ? null : item.href)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setHoveredMenu(null);
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHoveredMenu(hoveredMenu === item.href ? null : item.href);
                    }
                  }}
                  aria-expanded={hoveredMenu === item.href}
                  aria-haspopup="true"
                  className={[
                    "relative inline-flex items-center gap-1 text-base transition-colors duration-150 py-2 cursor-pointer bg-transparent border-0",
                    useLightNav
                      ? isActive(item.href)
                        ? "text-neutral-800"
                        : "text-neutral-600 hover:text-primary-500"
                      : isActive(item.href)
                        ? "text-white"
                        : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4.23 5.23a.75.75 0 011.06 0L8 7.94l2.71-2.71a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.23 6.29a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={[
                    "relative inline-flex items-center gap-1 text-base transition-colors duration-150 py-2",
                    useLightNav
                      ? isActive(item.href)
                        ? "text-neutral-800"
                        : "text-neutral-600 hover:text-primary-500"
                      : isActive(item.href)
                        ? "text-white"
                        : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </Link>
              )}
              {/* Dropdown */}
              {item.children && hoveredMenu === item.href && (
                <ul className="absolute top-full left-0 mt-0 bg-white border border-neutral-200 rounded-md shadow-md min-w-[180px] py-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setHoveredMenu(null)}
                        className="block h-11 px-4 leading-[44px] text-[15px] text-neutral-600 hover:bg-neutral-100 transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Right area */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden lg:block">
            <LanguageSwitcher currentLang={lang} variant="desktop" />
          </div>
          <Link
            href={`/${lang}/contact`}
            className={[
              "hidden lg:inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md transition-all duration-150",
              useLightNav
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm",
            ].join(" ")}
          >
            {lang === "zh" ? "立即咨询" : "Contact"}
          </Link>

          {/* Mobile: Language + Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-md"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
          >
            <svg className="size-6 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 18h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Side Panel */}
      <div
        className={[
          "fixed top-[60px] right-0 bottom-0 w-[300px] max-w-[80vw] bg-white shadow-2xl z-50 lg:hidden",
          "flex flex-col transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600"
          aria-label="关闭菜单"
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex-1 overflow-auto pt-4 pb-8 px-4">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-neutral-100 last:border-b-0">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedChild(expandedChild === item.href ? null : item.href)
                    }
                    className="flex items-center justify-between w-full h-[52px] text-lg font-medium text-neutral-700"
                  >
                    {item.label}
                    <svg
                      className={[
                        "size-5 text-neutral-400 transition-transform duration-200",
                        expandedChild === item.href && "rotate-180",
                      ].join(" ")}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {expandedChild === item.href && (
                    <ul className="pb-3 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block h-10 leading-10 text-base text-neutral-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center h-[52px] text-lg font-medium border-l-3 pl-3",
                    isActive(item.href)
                      ? "text-primary-600 border-primary-500"
                      : "text-neutral-700 border-transparent",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-4 pb-6 border-t border-neutral-200 pt-4 space-y-4">
          <LanguageSwitcher currentLang={lang} variant="mobile" />
          <Link
            href={`/${lang}/contact`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center h-11 w-full rounded-md bg-primary-500 text-white font-medium text-base"
          >
            {lang === "zh" ? "立即咨询" : "Contact Us"}
          </Link>
        </div>
      </div>
    </header>
  );
}
