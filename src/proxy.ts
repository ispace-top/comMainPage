import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["zh", "en"];
const defaultLocale = "zh";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip admin routes, API routes, and static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico|css|js)).*)"],
};
