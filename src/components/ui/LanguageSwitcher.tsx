"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const switchLang = (lang: Lang) => {
    if (lang === currentLang) {
      setOpen(false);
      return;
    }
    // zh uses no prefix, en uses /en prefix
    let newPath: string;
    if (lang === "zh") {
      newPath = pathname.replace(/^\/en/, "") || "/";
    } else {
      newPath = `/en${pathname}`;
    }
    // Use window.location for a full navigation to ensure content updates
    window.location.href = newPath;
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
                : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50",
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
        className="inline-flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-100 transition-colors"
        aria-label="切换语言"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {/* Globe icon per spec */}
        <svg className="size-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        <span>{langLabels[currentLang]}</span>
        <svg className="size-4 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M4.23 5.23a.75.75 0 011.06 0L8 7.94l2.71-2.71a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.23 6.29a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-md min-w-[120px] py-1 z-[var(--z-dropdown)]"
        >
          {(["zh", "en"] as Lang[]).map((lang) => (
            <li key={lang} role="option" aria-selected={lang === currentLang}>
              <button
                onClick={() => switchLang(lang)}
                className={[
                  "w-full text-left h-10 px-4 text-sm flex items-center transition-colors",
                  lang === currentLang
                    ? "text-primary-600 font-semibold bg-primary-50/50"
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
