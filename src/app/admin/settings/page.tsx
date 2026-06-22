"use client";

import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import { fetchAllSettings, saveSettings, type NavItem } from "@/lib/admin-store";

const tabs = [
  { key: "site", label: "站点信息" },
  { key: "seo", label: "SEO 配置" },
  { key: "nav", label: "导航管理" },
  { key: "push", label: "推送配置" },
];

function SortableNavItem({ id, label, href }: { id: string; label: string; href: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "flex items-center gap-3 p-3 bg-neutral-50 rounded-md hover:bg-white border border-transparent hover:border-neutral-200 transition-colors group",
        isDragging ? "shadow-lg bg-white border-primary-300 z-10" : "",
      ].join(" ")}
    >
      <button {...attributes} {...listeners} className="text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing p-1" aria-label="拖拽排序">
        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="7" cy="4" r="1.5" /><circle cx="13" cy="4" r="1.5" />
          <circle cx="7" cy="10" r="1.5" /><circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="16" r="1.5" /><circle cx="13" cy="16" r="1.5" />
        </svg>
      </button>
      <span className="flex-1 text-sm font-medium text-neutral-700">{label}</span>
      <span className="text-xs text-neutral-400 hidden group-hover:inline">{href}</span>
      <div className="hidden group-hover:flex items-center gap-1">
        <Button variant="tertiary" size="sm">编辑</Button>
        <Button variant="tertiary" size="sm">删除</Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("site");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Form state
  const [siteName, setSiteName] = useState("");
  const [siteSubtitle, setSiteSubtitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [homeTitle, setHomeTitle] = useState("");
  const [homeDescription, setHomeDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [enableJsonLd, setEnableJsonLd] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Push config state
  const [pushSettings, setPushSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAllSettings()
      .then((settings) => {
        setSiteName(settings.siteName || "");
        setSiteSubtitle(settings.siteSubtitle || "");
        setSiteDescription(settings.siteDescription || "");
        setLogoUrl(settings.logoUrl || "");
        setHomeTitle(settings.homeTitle || "");
        setHomeDescription(settings.homeDescription || "");
        setKeywords(settings.keywords || "");
        setEnableJsonLd(settings.enableJsonLd !== "false");
        try { setNavItems(JSON.parse(settings.navItems || "[]")); } catch { setNavItems([]); }
        setPushSettings(settings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: Record<string, string> = {
        siteName,
        siteSubtitle,
        siteDescription,
        logoUrl,
        homeTitle,
        homeDescription,
        keywords,
        enableJsonLd: String(enableJsonLd),
        navItems: JSON.stringify(navItems),
        pushSettings: pushSettings.pushSettings || "{}",
      };
      await saveSettings(data);
      addToast("success", "设置已保存");
    } catch (e) {
      console.error(e);
      addToast("error", "保存失败");
    } finally {
      setSaving(false);
    }
  };

  const handleNavDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setNavItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-neutral-400">加载设置中...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">全局设置</h1>
        <p className="text-sm text-neutral-500 mb-8">管理站点基础信息、SEO配置、导航菜单和推送通知渠道。数据存储在服务端 SQLite 数据库中。</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-md mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={["flex-1 py-2 px-4 text-sm font-semibold rounded-sm transition-colors", activeTab === tab.key ? "bg-white text-neutral-800 shadow-xs" : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-neutral-200 rounded-md p-6">
          {activeTab === "site" && (
            <div className="space-y-5">
              <Input label="站点名称" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              <Input label="站点副标题" value={siteSubtitle} onChange={(e) => setSiteSubtitle(e.target.value)} />
              <Textarea label="站点简介" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">站点 Logo</label>
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="size-16 rounded-md object-contain border border-neutral-200" />
                  ) : (
                    <div className="size-16 bg-neutral-100 rounded-md flex items-center justify-center text-neutral-400 text-xs">Logo</div>
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        setLogoUrl(reader.result as string);
                        addToast("success", "图片已选择，点击下方「保存设置」生效");
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => logoInputRef.current?.click()}>
                      {logoUrl ? "更换 Logo" : "上传 Logo"}
                    </Button>
                    {logoUrl && (
                      <Button variant="tertiary" size="sm" onClick={() => setLogoUrl("")}>
                        移除
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs text-neutral-400">建议尺寸 200×60px，支持 PNG/JPG/SVG，透明背景最佳。</p>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-5">
              <Input label="首页标题 (Title)" value={homeTitle} onChange={(e) => setHomeTitle(e.target.value)} />
              <Textarea label="首页描述 (Description)" value={homeDescription} onChange={(e) => setHomeDescription(e.target.value)} />
              <Input label="关键词 (Keywords)" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              <Switch checked={enableJsonLd} onChange={setEnableJsonLd} label="启用 JSON-LD 结构化数据" />
            </div>
          )}

          {activeTab === "nav" && (
            <div>
              <p className="text-sm text-neutral-500 mb-4">拖拽调整导航菜单排序，悬停显示操作按钮。</p>
              <DndContext collisionDetection={closestCenter} onDragEnd={handleNavDragEnd}>
                <SortableContext items={navItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <SortableNavItem key={item.id} id={item.id} label={item.label} href={item.href} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {activeTab === "push" && <PushConfigTab settings={pushSettings} onChange={setPushSettings} />}
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="tertiary">重置</Button>
          <Button variant="primary" loading={saving} onClick={handleSave}>保存设置</Button>
        </div>
      </div>
    </div>
  );
}

/** Push configuration with sub-tabs for each channel type */
function PushConfigTab({
  settings,
  onChange,
}: {
  settings: Record<string, string>;
  onChange: (s: Record<string, string>) => void;
}) {
  const [subTab, setSubTab] = useState<"wework-bot" | "wework-webhook" | "email">("wework-bot");

  const push = (() => {
    try { return JSON.parse(settings.pushSettings || "{}"); } catch { return {}; }
  })();

  const updatePush = (path: string, value: unknown) => {
    const keys = path.split(".");
    const next = JSON.parse(JSON.stringify(push));
    let obj = next;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onChange({ ...settings, pushSettings: JSON.stringify(next) });
  };

  const subTabs: { key: typeof subTab; label: string }[] = [
    { key: "wework-bot", label: "企微机器人" },
    { key: "wework-webhook", label: "企微 Webhook" },
    { key: "email", label: "邮件通知" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-md max-w-sm">
        {subTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key)}
            className={[
              "flex-1 py-2 px-3 text-sm font-semibold rounded-sm transition-colors",
              subTab === t.key ? "bg-white text-neutral-800 shadow-xs" : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "wework-bot" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">企业微信机器人</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过企微群机器人推送 Markdown 格式的线索通知到指定群聊。</p>
            </div>
            <Switch checked={push.weworkBot?.enabled ?? false} onChange={(v) => updatePush("weworkBot.enabled", v)} label="启用" />
          </div>
          <Input
            label="机器人 Webhook URL"
            type="url"
            value={push.weworkBot?.webhookUrl || ""}
            onChange={(e) => updatePush("weworkBot.webhookUrl", e.target.value)}
            placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx"
            hint="在企微群聊中添加机器人后获取此地址"
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">Markdown 消息模板</label>
            <Textarea
              value={push.weworkBot?.template || ""}
              onChange={(e) => updatePush("weworkBot.template", e.target.value)}
              rows={6}
              hint='支持变量: {name} {phone} {company} {service_name} {source_url} {admin_url}'
            />
          </div>
        </div>
      )}

      {subTab === "wework-webhook" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">企业微信 Webhook</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过企微应用消息 API 发送通知。</p>
            </div>
            <Switch checked={push.weworkWebhook?.enabled ?? false} onChange={(v) => updatePush("weworkWebhook.enabled", v)} label="启用" />
          </div>
          <Input label="Corp ID (企业ID)" value={push.weworkWebhook?.corpId || ""} onChange={(e) => updatePush("weworkWebhook.corpId", e.target.value)} placeholder="wwxxxxxxxxxxxxxxxx" />
          <Input label="Corp Secret (应用密钥)" type="password" value={push.weworkWebhook?.corpSecret || ""} onChange={(e) => updatePush("weworkWebhook.corpSecret", e.target.value)} placeholder="••••••••••••••••" />
          <Input label="Agent ID (应用编号)" type="number" value={push.weworkWebhook?.agentId || ""} onChange={(e) => updatePush("weworkWebhook.agentId", e.target.value)} placeholder="1000001" />
          <Input label="接收人 UserID" value={push.weworkWebhook?.toUser || ""} onChange={(e) => updatePush("weworkWebhook.toUser", e.target.value)} placeholder="user1|user2|user3" hint="留空则发送给应用可见范围内的所有人" />
          <Textarea label="Markdown 消息模板" value={push.weworkWebhook?.template || ""} onChange={(e) => updatePush("weworkWebhook.template", e.target.value)} rows={6} />
        </div>
      )}

      {subTab === "email" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">邮件通知</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过 SMTP 发送线索通知邮件。</p>
            </div>
            <Switch checked={push.email?.enabled ?? false} onChange={(v) => updatePush("email.enabled", v)} label="启用" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="SMTP 服务器地址" value={push.email?.smtpHost || ""} onChange={(e) => updatePush("email.smtpHost", e.target.value)} placeholder="smtp.example.com" />
            <Input label="SMTP 端口" type="number" value={push.email?.smtpPort || ""} onChange={(e) => updatePush("email.smtpPort", e.target.value)} placeholder="587" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="发件邮箱地址" type="email" value={push.email?.fromEmail || ""} onChange={(e) => updatePush("email.fromEmail", e.target.value)} placeholder="noreply@9001.ltd" />
            <Input label="发件邮箱密码" type="password" value={push.email?.fromPassword || ""} onChange={(e) => updatePush("email.fromPassword", e.target.value)} placeholder="••••••••••••••••" hint="建议使用 SMTP 授权码而非登录密码" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="发件人名称" value={push.email?.fromName || ""} onChange={(e) => updatePush("email.fromName", e.target.value)} placeholder="正远智汇" />
            <div>
              <label className="block mb-2 text-sm font-medium text-neutral-700">加密方式</label>
              <div className="flex gap-3">
                {["STARTTLS", "SSL/TLS", "无"].map((enc) => (
                  <label key={enc} className="flex items-center gap-1.5 text-sm text-neutral-600 cursor-pointer">
                    <input
                      type="radio"
                      name="encryption"
                      checked={(push.email?.encryption || "STARTTLS") === enc}
                      onChange={() => updatePush("email.encryption", enc)}
                      className="size-[18px] accent-primary-500"
                    /> {enc}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <Textarea
            label="收件人列表"
            value={push.email?.recipients || ""}
            onChange={(e) => updatePush("email.recipients", e.target.value)}
            placeholder="admin@9001.ltd&#10;sales@9001.ltd"
            hint="每行一个邮箱地址"
            rows={3}
          />
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">发送测试邮件</Button>
            <span className="text-xs text-neutral-400">验证配置是否正确</span>
          </div>
        </div>
      )}
    </div>
  );
}
