import type { Metadata } from "next";
import { AdminLayout } from "@/components/layout/AdminLayout";

export const metadata: Metadata = {
  title: "管理后台 | 认证通",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className="h-full antialiased">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
