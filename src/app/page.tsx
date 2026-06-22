import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { HreflangTags } from "@/components/ui/HreflangTags";
import HomePage from "@/app/[lang]/page";

// This page is a fallback for when middleware doesn't rewrite (e.g. static build).
// Under normal runtime, middleware rewrites "/" to "/zh" and [lang]/page.tsx handles it.
export default function RootHomePage() {
  return (
    <ToastProvider>
      <SetHtmlLang lang="zh" />
      <HreflangTags />
      <Navigation lang="zh" />
      <main id="main-content" className="flex-1">
        <HomePage />
      </main>
      <Footer lang="zh" />
    </ToastProvider>
  );
}
