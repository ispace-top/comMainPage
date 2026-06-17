"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Tag } from "@/components/ui/Tag";
import { useToast } from "@/components/ui/Toast";

const tabs = [
  { key: "site", label: "站点信息" },
  { key: "seo", label: "SEO 配置" },
  { key: "nav", label: "导航管理" },
  { key: "push", label: "推送配置" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("site");
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    addToast("success", "设置已保存");
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">全局设置</h1>
        <p className="text-sm text-neutral-500 mb-8">管理站点基础信息、SEO配置、导航菜单和推送通知渠道。</p>

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
              <Input label="站点名称" defaultValue="认证通" />
              <Input label="站点副标题" defaultValue="专业企业认证服务" />
              <Textarea label="站点简介" defaultValue="认证通为企业提供ISO9001等国际标准认证咨询服务。" />
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">站点 Logo</label>
                <div className="flex items-center gap-4">
                  <div className="size-16 bg-neutral-100 rounded-md flex items-center justify-center text-neutral-400 text-xs">Logo</div>
                  <Button variant="secondary" size="sm">上传 Logo</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-5">
              <Input label="首页标题 (Title)" defaultValue="认证通 — 专业企业认证服务" />
              <Textarea label="首页描述 (Description)" defaultValue="认证通为企业提供ISO9001等国际标准认证咨询服务。" />
              <Input label="关键词 (Keywords)" defaultValue="ISO9001,ISO14001,企业认证" />
              <Switch checked={true} onChange={() => {}} label="启用 JSON-LD 结构化数据" />
            </div>
          )}

          {activeTab === "nav" && (
            <div className="space-y-1">
              {["首页", "认证服务", "成功案例", "行业洞察", "关于我们", "联系我们"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-md hover:bg-white border border-transparent hover:border-neutral-200 transition-colors group">
                  <span className="text-neutral-400 cursor-grab">⠿</span>
                  <span className="flex-1 text-sm font-medium text-neutral-700">{name}</span>
                  <span className="text-sm text-neutral-400">/{i === 0 ? "" : name.toLowerCase()}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-success-50 text-success-700">已启用</span>
                  <div className="hidden group-hover:flex gap-2">
                    <Button variant="tertiary" size="sm">编辑</Button>
                    <Button variant="tertiary" size="sm">删除</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "push" && <PushConfigTab />}
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
function PushConfigTab() {
  const [subTab, setSubTab] = useState<"wework-bot" | "wework-webhook" | "email">("wework-bot");
  const tabs: { key: typeof subTab; label: string }[] = [
    { key: "wework-bot", label: "企微机器人" },
    { key: "wework-webhook", label: "企微 Webhook" },
    { key: "email", label: "邮件通知" },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-md max-w-sm">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key)}
            className={[
              "flex-1 py-2 px-3 text-sm font-semibold rounded-sm transition-colors",
              subTab === t.key
                ? "bg-white text-neutral-800 shadow-xs"
                : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 企微机器人 */}
      {subTab === "wework-bot" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">企业微信机器人</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过企微群机器人推送 Markdown 格式的线索通知到指定群聊。</p>
            </div>
            <Switch checked={true} onChange={() => {}} label="启用" />
          </div>
          <Input
            label="机器人 Webhook URL"
            type="url"
            placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx"
            hint="在企微群聊中添加机器人后获取此地址"
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">Markdown 消息模板</label>
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
              <pre className="text-xs text-neutral-600 whitespace-pre-wrap font-mono">{`### 🔔 新认证咨询线索
> **客户姓名**: <font color="info">{"{name}"}</font>
> **联系电话**: [{"{phone}"}](tel:{"{phone}"})
> **意向项目**: {"{service_name}"}
> **来源页面**: [{"{source_url}"}]({"{source_url}"})

[👉 点击前往后台跟进]({"{admin_url}"})`}</pre>
            </div>
            <p className="mt-1.5 text-xs text-neutral-400">
              支持变量: {"{name}"} {"{phone}"} {"{company}"} {"{service_name}"} {"{source_url}"} {"{admin_url}"}
            </p>
          </div>
        </div>
      )}

      {/* 企微 Webhook */}
      {subTab === "wework-webhook" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">企业微信 Webhook</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过企微应用消息 API 发送通知，支持更灵活的消息类型。</p>
            </div>
            <Switch checked={false} onChange={() => {}} label="启用" />
          </div>
          <Input
            label="Corp ID (企业ID)"
            placeholder="wwxxxxxxxxxxxxxxxx"
          />
          <Input
            label="Corp Secret (应用密钥)"
            type="password"
            placeholder="••••••••••••••••"
          />
          <Input
            label="Agent ID (应用编号)"
            type="number"
            placeholder="1000001"
          />
          <Input
            label="接收人 UserID"
            placeholder="user1|user2|user3 (多个用竖线分隔)"
            hint="留空则发送给应用可见范围内的所有人"
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">Markdown 消息模板</label>
            <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
              <pre className="text-xs text-neutral-600 whitespace-pre-wrap font-mono">{`{
  "msgtype": "markdown",
  "markdown": {
    "content": "### 🔔 新认证咨询线索\\n> **客户姓名**: <font color=\\"info\\">{"{name}"}</font>\\n> **联系电话**: [{"{phone}"}](tel:{"{phone}"})\\n> **意向项目**: {"{service_name}"}\\n> **来源页面**: [{"{source_url}"}]({"{source_url}"})\\n\\n[👉 点击前往后台跟进]({"{admin_url}"})"
  }
}`}</pre>
            </div>
            <p className="mt-1.5 text-xs text-neutral-400">
              支持变量: {"{name}"} {"{phone}"} {"{company}"} {"{service_name}"} {"{source_url}"} {"{admin_url}"}
            </p>
          </div>
        </div>
      )}

      {/* 邮件 */}
      {subTab === "email" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-800">邮件通知</h3>
              <p className="text-sm text-neutral-600 mt-0.5">通过 SMTP 发送线索通知邮件，支持多收件人。</p>
            </div>
            <Switch checked={true} onChange={() => {}} label="启用" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="SMTP 服务器地址" placeholder="smtp.example.com" />
            <Input label="SMTP 端口" type="number" placeholder="587" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="发件邮箱地址" type="email" placeholder="noreply@renzheng.com" />
            <Input label="发件邮箱密码" type="password" placeholder="••••••••••••••••" hint="建议使用 SMTP 授权码而非登录密码" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="发件人名称" placeholder="认证通" />
            <div>
              <label className="block mb-2 text-sm font-medium text-neutral-700">加密方式</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-1.5 text-sm text-neutral-600 cursor-pointer">
                  <input type="radio" name="encryption" defaultChecked className="size-[18px] accent-primary-500" /> STARTTLS
                </label>
                <label className="flex items-center gap-1.5 text-sm text-neutral-600 cursor-pointer">
                  <input type="radio" name="encryption" className="size-[18px] accent-primary-500" /> SSL/TLS
                </label>
                <label className="flex items-center gap-1.5 text-sm text-neutral-600 cursor-pointer">
                  <input type="radio" name="encryption" className="size-[18px] accent-primary-500" /> 无
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">收件人列表</label>
            <Textarea
              placeholder="admin@renzheng.com&#10;sales@renzheng.com"
              hint="每行一个邮箱地址，新线索将同步发送至所有地址"
              rows={3}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">发送测试邮件</Button>
            <span className="text-xs text-neutral-400">验证配置是否正确</span>
          </div>
        </div>
      )}
    </div>
  );
}
