import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | 认证通 — 专业企业认证服务",
    default: "认证通 — 专业企业认证服务 | ISO9001 ISO14001 认证咨询",
  },
  description:
    "认证通为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务，10+年行业经验，500+企业信赖，98%认证通过率。",
  keywords: [
    "ISO9001认证",
    "ISO14001认证",
    "ISO45001认证",
    "企业认证",
    "认证咨询",
    "体系认证",
  ],
  authors: [{ name: "认证通" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "认证通",
    title: "认证通 — 专业企业认证服务",
    description:
      "为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务。",
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
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-600 antialiased">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          跳转到主内容
        </a>
        {children}
      </body>
    </html>
  );
}
