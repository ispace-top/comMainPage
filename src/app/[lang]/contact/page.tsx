"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/components/ui/LanguageSwitcher";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { useScrollReveal } from "@/lib/scroll-reveal";
import { langPath } from "@/lib/i18n";

export default function ContactPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "zh";
  const { addToast } = useToast();
  useScrollReveal();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize Baidu Map (script loaded synchronously in root layout <head>)
  const initMap = useCallback(() => {
    const BMap = (window as any).BMap;
    if (!BMap || !mapRef.current) {
      // Retry if BMap isn't ready yet (edge case)
      setTimeout(initMap, 100);
      return;
    }

    try {
      const point = new BMap.Point(116.478, 39.915);
      const map = new BMap.Map(mapRef.current, { enableMapClick: false });
      map.centerAndZoom(point, 17);
      map.addControl(new BMap.NavigationControl({ anchor: (window as any).BMAP_ANCHOR_TOP_LEFT }));
      map.addControl(new BMap.ScaleControl());
      const marker = new BMap.Marker(point);
      map.addOverlay(marker);
      const infoWindow = new BMap.InfoWindow(
        lang === "zh"
          ? "<p style='font-size:14px;margin:0;white-space:nowrap;'><b>正远智汇</b><br/>北京市密云区西田各庄镇<br/>卸河路6号135室</p>"
          : "<p style='font-size:14px;margin:0;white-space:nowrap;'><b>ZhengyuanZhihui</b><br/>Room 135, No.6 Xiehe Road<br/>Xitiangezhuang, Miyun District, Beijing</p>",
        { width: 220 }
      );
      marker.addEventListener("click", () => { map.openInfoWindow(infoWindow, point); });
      map.openInfoWindow(infoWindow, point);
      setMapReady(true);
    } catch (e) {
      console.error("Baidu Map init error:", e);
    }
  }, [lang]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  const [form, setForm] = useState({ name: "", phone: "", company: "", type: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const typeOptions = [
    { value: "cert", label: lang === "zh" ? "认证咨询" : "Certification" },
    { value: "coop", label: lang === "zh" ? "商务合作" : "Partnership" },
    { value: "other", label: lang === "zh" ? "其他" : "Other" },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === "zh" ? "请输入姓名" : "Name required";
    if (!form.phone.trim()) errs.phone = lang === "zh" ? "请输入手机号" : "Phone required";
    if (!agreed) setAgreeError(true); else setAgreeError(false);
    setErrors(errs);
    return Object.keys(errs).length === 0 && agreed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const typeLabel = typeOptions.find((o) => o.value === form.type)?.label || "";
      // Build service string: preserve both type and full message
      let service = typeLabel || (lang === "zh" ? "未分类咨询" : "Uncategorized");
      if (form.message.trim()) {
        service = typeLabel
          ? `${typeLabel} — ${form.message.trim()}`
          : `${lang === "zh" ? "留言" : "Message"} — ${form.message.trim()}`;
      }
      // Capture referring page as source; fallback to current page
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      const sourceUrl = referrer
        ? new URL(referrer).pathname
        : `/${lang}/contact`;

      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          service,
          source_url: sourceUrl,
          status: "new",
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "提交失败" }));
        addToast("error", errData.error || (lang === "zh" ? "提交失败，请稍后重试" : "Submission failed, please try again"));
        setSubmitting(false);
        return;
      }
      addToast("success", lang === "zh" ? "提交成功！我们将在24小时内与您联系。" : "Submitted! We will contact you within 24 hours.");
      setForm({ name: "", phone: "", company: "", type: "", message: "" });
      setAgreed(false);
    } catch {
      addToast("error", lang === "zh" ? "网络错误，请稍后重试" : "Network error, please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-page">
        <Breadcrumb items={[{ label: lang === "zh" ? "首页" : "Home", href: langPath(lang, "/") }, { label: lang === "zh" ? "联系我们" : "Contact" }]} className="mb-6" />
        <h1 className="text-4xl font-bold text-neutral-800">{lang === "zh" ? "联系我们" : "Contact Us"}</h1>
        <p className="mt-4 text-lg text-neutral-500 max-w-[560px]">{lang === "zh" ? "留下您的需求，专业顾问将在24小时内与您取得联系。" : "Leave your inquiry and our expert consultant will reach out within 24 hours."}</p>

        <div className="mt-12 grid md:grid-cols-[1fr_400px] gap-10">
          {/* Form */}
          <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm reveal-on-scroll">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">{lang === "zh" ? "咨询表单" : "Inquiry Form"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label={lang === "zh" ? "姓名" : "Name"} required placeholder={lang === "zh" ? "请输入姓名" : "Your name"} value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} error={errors.name} />
                <Input label={lang === "zh" ? "手机号" : "Phone"} required type="tel" placeholder={lang === "zh" ? "请输入手机号" : "Your phone"} value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }} error={errors.phone} />
              </div>
              <Input label={lang === "zh" ? "公司名称" : "Company"} placeholder={lang === "zh" ? "请输入公司名称（选填）" : "Company (optional)"} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              <Select label={lang === "zh" ? "咨询类型" : "Inquiry Type"} options={typeOptions} value={form.type} onChange={v => setForm({ ...form, type: v })} />
              <Textarea label={lang === "zh" ? "留言内容" : "Message"} placeholder={lang === "zh" ? "请简要描述您的需求（选填）" : "Briefly describe your needs (optional)"} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} />

              <div className="p-3 border border-neutral-200 rounded-sm bg-neutral-50 text-center text-xs text-neutral-400">reCAPTCHA 验证</div>

              <div>
                <Checkbox checked={agreed} onChange={e => { setAgreed(e.target.checked); setAgreeError(false); }} label={<span>{lang === "zh" ? "我已阅读并同意" : "I agree to the"} <Link href={langPath(lang, "/about")} className="text-primary-500 underline">{lang === "zh" ? "《隐私政策》" : "Privacy Policy"}</Link></span>} error={agreeError ? (lang === "zh" ? "请阅读并同意隐私政策" : "Please agree") : undefined} />
              </div>

              <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">{lang === "zh" ? "提交咨询" : "Submit"}</Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 reveal-on-scroll">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">{lang === "zh" ? "联系方式" : "Contact Info"}</h3>
              <ul className="space-y-4">
                {[
                  { icon: <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 15.088 17 12.61 17 9A7 7 0 103 9c0 3.61 1.698 6.088 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>, label: lang === "zh" ? "北京市密云区西田各庄镇卸河路6号135室" : "A SOHO Modern Town, 88 Jianguo Rd, Beijing" },
                  { icon: <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.022 13.022 0 012 5V3.5z" /></svg>, label: "400-888-9999" },
                  { icon: <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>, label: "info@9001.ltd" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <span className="text-primary-400 shrink-0 mt-0.5">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-400">{lang === "zh" ? "工作时间: 周一至周五 9:00-18:00" : "Hours: Mon-Fri 9:00-18:00"}</p>
              </div>
            </div>

            {/* Baidu Map */}
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg h-[280px] overflow-hidden relative">
              <div ref={mapRef} className="w-full h-full" />
              {!mapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-400 text-sm z-0">
                  <span>{lang === "zh" ? "地图加载中..." : "Loading map..."}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
