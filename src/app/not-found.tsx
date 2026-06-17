import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="zh">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center">
            <p className="text-7xl font-extrabold text-primary-500 mb-4">404</p>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">页面未找到</h1>
            <p className="text-neutral-500 mb-8">您访问的页面不存在或已被移除。</p>
            <Link
              href="/zh"
              className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
