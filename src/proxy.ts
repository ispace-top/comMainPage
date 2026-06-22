import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  // Redirect /zh/* → /* (permanent, Chinese is the default with no prefix)
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // /en/* paths pass through to [lang] route
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // All other paths → internally rewrite to /zh/* so [lang] route matches
  const url = request.nextUrl.clone();
  url.pathname = `/zh${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico|css|js)).*)"],
};
