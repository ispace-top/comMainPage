"use client";

// ── Types ──────────────────────────────────────────────────────

export type BadgeStatus = "new" | "contacted" | "converted" | "invalid";

export interface Lead {
  id: number;
  name: string;
  phone: string;
  company: string;
  service: string;
  source_url: string;
  status: BadgeStatus;
  time: string;
}

export type ContentType = "banner" | "services" | "cases" | "articles";

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  status: "published" | "draft";
  category?: string;
  industry?: string;
  summary?: string;
  body?: string;
  created: string;
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  siteDescription: string;
  logoUrl: string;
}

export interface SeoSettings {
  homeTitle: string;
  homeDescription: string;
  keywords: string;
  enableJsonLd: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PushSettings {
  weworkBot: {
    enabled: boolean;
    webhookUrl: string;
    template: string;
    picurl: string;
  };
  weworkWebhook: {
    enabled: boolean;
    corpId: string;
    corpSecret: string;
    agentId: string;
    toUser: string;
    template: string;
    picurl: string;
  };
  email: {
    enabled: boolean;
    smtpHost: string;
    smtpPort: string;
    fromEmail: string;
    fromPassword: string;
    fromName: string;
    encryption: string;
    recipients: string;
  };
}

// ── API helpers ────────────────────────────────────────────────

async function api(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ── Leads ──────────────────────────────────────────────────────

export async function fetchLeads(params?: { status?: string; search?: string }): Promise<Lead[]> {
  const sp = new URLSearchParams();
  if (params?.status) sp.set("status", params.status);
  if (params?.search) sp.set("search", params.search);
  const qs = sp.toString();
  return api(`/api/admin/leads${qs ? `?${qs}` : ""}`);
}

export async function fetchLeadStats(): Promise<{ todayNew: number; pending: number; convertedThisMonth: number; total: number }> {
  return api("/api/admin/stats");
}

export async function addLead(data: Omit<Lead, "id">): Promise<Lead> {
  return api("/api/admin/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateLead(id: number, patch: Partial<Lead>): Promise<void> {
  await api(`/api/admin/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
}

export async function deleteLead(id: number): Promise<void> {
  await api(`/api/admin/leads/${id}`, { method: "DELETE" });
}

// ── Content ────────────────────────────────────────────────────

export async function fetchContent(type: ContentType): Promise<ContentItem[]> {
  return api(`/api/admin/content?type=${type}`);
}

export async function addContent(data: Omit<ContentItem, "id">): Promise<ContentItem> {
  return api("/api/admin/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateContent(id: number, patch: Partial<ContentItem>): Promise<void> {
  await api(`/api/admin/content/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
}

export async function deleteContent(id: number): Promise<void> {
  await api(`/api/admin/content/${id}`, { method: "DELETE" });
}

// ── Settings ───────────────────────────────────────────────────

export async function fetchAllSettings(): Promise<Record<string, string>> {
  return api("/api/admin/settings");
}

export async function saveSettings(data: Record<string, string>): Promise<void> {
  await api("/api/admin/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
