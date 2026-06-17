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

// Simple inline SVG flags
function FlagIcon({ lang }: { lang: Lang }) {
  if (lang === "zh") {
    return (
      <svg className="size-5 shrink-0" viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#DE2910" rx="1" />
        <path d="M2 4l2.5 1.8L3 9.5l2.5-1.8L8 9.5 7 5.8 9.5 4H6l-1-3.5L4 4H2z" fill="#FFDE00" />
        <path d="M12 4l1.3.9L14 4l-.3 1.4 1.3.9H13.5l-.5 1.3-.5-1.3H11l1.3-.9L12 4z" fill="#FFDE00" />
        <path d="M10 8l.8.6.2-1h-1l.8-.6-.3-1 .8.6.8-.6-.3 1 .8.6h-1l.2 1z" fill="#FFDE00" />
      </svg>
    );
  }
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 30 20">
      <rect width="30" height="4" fill="#B22234" rx="0.5" />
      <rect y="4" width="30" height="4" fill="#FFFFFF" rx="0" />
      <rect y="8" width="30" height="4" fill="#B22234" rx="0" />
      <rect y="12" width="30" height="4" fill="#FFFFFF" rx="0" />
      <rect y="16" width="30" height="4" fill="#B22234" rx="0.5" />
      <rect width="15" height="10" fill="#3C3B6E" rx="0.5" />
      <circle cx="2.5" cy="1" r="0.3" fill="white" />
      <circle cx="5" cy="1" r="0.3" fill="white" />
      <circle cx="7.5" cy="1" r="0.3" fill="white" />
      <circle cx="10" cy="1" r="0.3" fill="white" />
      <circle cx="12.5" cy="1" r="0.3" fill="white" />
      <circle cx="3.75" cy="3" r="0.3" fill="white" />
      <circle cx="6.25" cy="3" r="0.3" fill="white" />
      <circle cx="8.75" cy="3" r="0.3" fill="white" />
      <circle cx="11.25" cy="3" r="0.3" fill="white" />
      <circle cx="2.5" cy="5" r="0.3" fill="white" />
      <circle cx="5" cy="5" r="0.3" fill="white" />
      <circle cx="7.5" cy="5" r="0.3" fill="white" />
      <circle cx="10" cy="5" r="0.3" fill="white" />
      <circle cx="12.5" cy="5" r="0.3" fill="white" />
      <circle cx="3.75" cy="7" r="0.3" fill="white" />
      <circle cx="6.25" cy="7" r="0.3" fill="white" />
      <circle cx="8.75" cy="7" r="0.3" fill="white" />
      <circle cx="11.25" cy="7" r="0.3" fill="white" />
      <circle cx="2.5" cy="9" r="0.3" fill="white" />
      <circle cx="5" cy="9" r="0.3" fill="white" />
      <circle cx="7.5" cy="9" r="0.3" fill="white" />
      <circle cx="10" cy="9" r="0.3" fill="white" />
      <circle cx="12.5" cy="9" r="0.3" fill="white" />
    </svg>
  );
}

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
              "flex-1 py-2 text-sm font-medium rounded-sm flex items-center justify-center gap-1.5 transition-colors",
              lang === currentLang
                ? "bg-white text-primary-600 shadow-xs"
                : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50",
            ].join(" ")}
          >
            <FlagIcon lang={lang} />
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
      >
        <FlagIcon lang={currentLang} />
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
                  "w-full text-left h-10 px-4 text-sm flex items-center gap-2 transition-colors",
                  lang === currentLang
                    ? "text-primary-600 font-semibold bg-primary-50/50"
                    : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                <FlagIcon lang={lang} />
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
