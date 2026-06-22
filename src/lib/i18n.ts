export type Lang = "zh" | "en";

const DEFAULT_LOCALE: Lang = "zh";

/** Generate the correct URL path for a given locale. zh uses no prefix, en uses /en prefix. */
export function langPath(lang: Lang, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return `/${lang}${path}`;
}

/** Get the locale from a URL pathname. Returns "zh" if no locale prefix is found. */
export function localeFromPathname(pathname: string): Lang {
  if (pathname.startsWith("/en")) return "en";
  return "zh";
}

/** Remove locale prefix from a URL pathname */
export function stripLocale(pathname: string): string {
  if (pathname.startsWith("/en")) return pathname.replace(/^\/en/, "") || "/";
  if (pathname.startsWith("/zh")) return pathname.replace(/^\/zh/, "") || "/";
  return pathname;
}

export { DEFAULT_LOCALE };
