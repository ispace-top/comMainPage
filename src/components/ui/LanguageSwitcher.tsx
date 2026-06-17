"use client";

import { useState, useRef, useEffect } from "react";

type Lang = "zh" | "en";

interface LanguageSwitcherProps {
  currentLang: Lang;
  variant?: "desktop" | "mobile";
}

const langLabels: Record<Lang, string> = {
  zh: "中文",
  en: "English",
};

export function LanguageSwitcher({
  currentLang,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLang = (lang: Lang) => {
    if (lang === currentLang) {
      setOpen(false);
      return;
    }
    const path = window.location.pathname.replace(/^\/(zh|en)/, `/${lang}`);
    window.location.href = path;
  };

  if (variant === "mobile") {
    return (
      <div className="flex gap-2 p-2 bg-neutral-100 rounded-md">
        {(["zh", "en"] as Lang[]).map((lang) => (
          <button
            key={lang}
            onClick={() => switchLang(lang)}
            className={[
              "flex-1 py-2 text-sm font-medium rounded-sm transition-colors",
              lang === currentLang
                ? "bg-white text-primary-600 shadow-xs"
                : "text-neutral-500 hover:text-neutral-700",
            ].join(" ")}
          >
            {langLabels[lang]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-100 transition-colors"
        aria-label="切换语言"
      >
        <svg className="size-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v10.25a2 2 0 001.17 1.8l.04.02c.433.199 1.05.43 1.79.43.74 0 1.357-.231 1.79-.43l.04-.02A2 2 0 009 13.75V3.5A1.5 1.5 0 007.5 2h-3zm1.76 9.7a.75.75 0 01.88-.69 2.5 2.5 0 012.36 2.46.75.75 0 11-1.5.02.998.998 0 00-.95-.99.75.75 0 01-.79-.8zM16 5.21a.75.75 0 011.5 0v7.54a2.5 2.5 0 01-2.5 2.5h-1a.75.75 0 010-1.5h1a1 1 0 001-1V5.21zm-4-1.96a.75.75 0 011.5 0v9.5a.75.75 0 01-1.5 0v-9.5z" clipRule="evenodd" />
        </svg>
        <span>{langLabels[currentLang]}</span>
        <svg className="size-4 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M4.23 5.23a.75.75 0 011.06 0L8 7.94l2.71-2.71a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.23 6.29a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <ul className="absolute top-full right-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-md min-w-[120px] py-1 z-[var(--z-dropdown)]">
          {(["zh", "en"] as Lang[]).map((lang) => (
            <li key={lang}>
              <button
                onClick={() => switchLang(lang)}
                className={[
                  "w-full text-left h-10 px-4 text-sm transition-colors",
                  lang === currentLang
                    ? "text-primary-600 font-semibold"
                    : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                {langLabels[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { Lang };
