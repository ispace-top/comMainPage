import type { Metadata } from "next";
import "./globals.css";
import { FaviconSync } from "@/components/layout/FaviconSync";

const FAVICON_BASE64 =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#3b82f6"/><text x="50" y="72" font-size="62" font-weight="bold" text-anchor="middle" fill="white" font-family="sans-serif">正</text></svg>`
  ).toString("base64");

export const metadata: Metadata = {
  title: {
    template: "%s | 正远智汇",
    default: "正远智汇 — CCC、ISO 认证咨询专家 | ISO9001 ISO14001 ISO45001",
  },
  description:
    "北京正远智汇科技有限公司 — 专注CCC、ISO9001、ISO14001、ISO45001 认证咨询服务，10+年行业经验，98%认证通过率，500+企业信赖。",
  icons: { icon: FAVICON_BASE64 },
  keywords: [
    "CCC认证",
    "ISO9001认证",
    "ISO14001认证",
    "ISO45001认证",
    "企业认证",
    "认证咨询",
    "体系认证",
    "北京正远智汇",
  ],
  authors: [{ name: "正远智汇" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "正远智汇",
    title: "正远智汇 — CCC、ISO 认证咨询专家",
    description:
      "北京正远智汇科技有限公司为企业提供 CCC、ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://api.map.baidu.com/api?v=3.0&ak=GIbvFC8J8yo4oFIuQ220uKQnmmuzPtKt" />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-600 antialiased">
        <a href="#main-content" className="skip-to-main">
          跳转到主内容
        </a>
        {children}
        <FaviconSync />
      </body>
    </html>
  );
}
