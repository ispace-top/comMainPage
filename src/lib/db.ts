import Database from "better-sqlite3";
import path from "path";
import { PAGE_DATA } from "./seed-data";

const DB_PATH = path.join(process.cwd(), "data", "cms.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    // Ensure data directory exists
    const fs = require("fs");
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      service TEXT NOT NULL DEFAULT '',
      source_url TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','converted','invalid')),
      time TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('banner','services','cases','articles')),
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('published','draft')),
      category TEXT DEFAULT '',
      industry TEXT DEFAULT '',
      summary TEXT DEFAULT '',
      body TEXT DEFAULT '',
      created TEXT NOT NULL DEFAULT (date('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed leads if empty
  const leadCount = db.prepare("SELECT COUNT(*) as count FROM leads").get() as { count: number };
  if (leadCount.count === 0) {
    const insert = db.prepare(
      "INSERT INTO leads (name, phone, company, service, source_url, status, time) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const seedLeads = [
      ["王*明", "139****4521", "北京恒达精密制造有限公司", "ISO9001", "/services/iso-9001", "new", "2026-06-17 10:30"],
      ["李*芳", "138****7832", "华东新材化工有限公司", "ISO14001", "/services/iso-14001", "contacted", "2026-06-17 09:15"],
      ["张*强", "136****9127", "中建三局第一建设公司", "ISO45001", "/services/iso-45001", "converted", "2026-06-16 16:20"],
      ["赵*华", "185****3604", "京粮食品科技有限公司", "ISO22000", "/services/iso-22000", "new", "2026-06-16 14:00"],
      ["刘*峰", "177****5298", "深圳华创汽车零部件有限公司", "IATF 16949", "/services/iatf-16949", "invalid", "2026-06-16 11:00"],
      ["陈*洁", "159****0843", "杭州迅捷电子科技有限公司", "ISO9001", "/services/iso-9001", "new", "2026-06-15 15:00"],
      ["杨*婷", "133****6105", "上海康瑞医疗器械有限公司", "ISO13485", "/services/iso-13485", "contacted", "2026-06-15 10:20"],
      ["周*宇", "186****2041", "成都云端软件技术有限公司", "ISO27001", "/services/iso-27001", "converted", "2026-06-14 14:45"],
    ];
    const insertMany = db.transaction(() => {
      for (const l of seedLeads) insert.run(...l);
    });
    insertMany();
  }

  // Seed content if empty
  const contentCount = db.prepare("SELECT COUNT(*) as count FROM content").get() as { count: number };
  if (contentCount.count === 0) {
    const insert = db.prepare(
      "INSERT INTO content (type, title, status, category, industry, summary, body, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    const seedContent: [string, string, string, string, string, string, string, string][] = [
      ["banner", "正远智汇 — 专业 ISO 认证咨询服务", "published", "", "", "企业ISO认证咨询首选品牌", "", "2026-06-01"],
      ["banner", "ISO9001 质量管理体系认证专题", "draft", "", "", "ISO9001质量管理体系认证", "", "2026-06-10"],
      ["services", "ISO9001 质量管理体系", "published", "ISO体系", "", "ISO9001 是国际公认的质量管理体系标准，适用于任何规模和行业的企业。正远智汇帮助企业建立科学的质量管理流程，持续提升产品和服务质量。", "ISO9001:2015 是最新版质量管理体系国际标准，采用 PDCA 循环方法论。正远智汇资深顾问团队将全程辅导，从差距分析、体系搭建、试运行指导到审核陪同，确保企业一次性通过认证审核，获得国际互认的认证证书。", "2026-05-15"],
      ["services", "ISO14001 环境管理体系", "published", "ISO体系", "", "ISO14001 帮助企业建立系统化环境管理框架，实现合规运营、节能减排，提升企业社会责任形象与市场竞争力。", "ISO14001:2015 是国际环境管理体系标准，指导企业识别和管理环境因素，降低环境影响。正远智汇从环境因素识别、体系策划到认证审核提供全流程专业服务，助力企业实现绿色可持续发展。", "2026-05-20"],
      ["services", "ISO45001 职业健康安全管理体系", "published", "ISO体系", "", "ISO45001 为企业提供职业健康安全管理框架，系统化预防工伤事故和职业病，保障员工健康安全。", "ISO45001:2018 替代 OHSAS18001，采用 Annex SL 高阶结构，更易于与其他管理体系整合。正远智汇帮助企业建立系统化安全管理机制，显著降低事故风险，营造安全健康的工作环境。", "2026-06-01"],
      ["services", "ISO27001 信息安全管理体系", "published", "ISO体系", "", "ISO27001 是信息安全管理领域的国际权威标准，帮助企业保护核心信息资产，防范数据泄露与网络攻击风险。", "ISO27001:2022 覆盖信息安全风险评估、控制措施选择与实施。正远智汇帮助企业建立系统化信息安全防护体系，守护核心数据和客户隐私安全，增强客户与合作伙伴的信任。", "2026-06-05"],
      ["cases", "北京恒达精密制造 ISO9001 认证", "published", "", "制造业", "通过 ISO9001 质量管理体系认证，产品一次合格率从 91.5% 提升至 99.2%，年度质量成本降低约 35%，成功进入多家世界 500 强供应商体系。", "该企业为华北地区精密制造龙头企业，员工 2000 余人。正远智汇顾问团队历时 4 个月完成从差距分析到审核陪同的全流程服务。认证通过后，客户质量管理水平显著提升，获得多家国际客户的高度认可。", "2026-06-05"],
      ["cases", "华东新材化工 ISO14001 认证", "published", "", "化工", "建立环境管理体系后，废水排放达标率 100%，年能源消耗成本降低 28%，获得市级绿色工厂荣誉称号。", "该企业为长三角地区知名化工企业。正远智汇项目团队从环境因素全面识别入手，帮助企业建立了覆盖全生命周期的环境管理体系，引入清洁生产技术和能源管理模块，顺利通过认证审核。", "2026-06-08"],
      ["articles", "ISO9001 新版标准解读与企业应对策略", "published", "政策解读", "", "国际标准化组织发布 ISO9001 最新修订版，本文深度解读核心变更及企业高效应对策略。", "## 新版标准主要变化\n\n1. **强调组织环境分析**：新增组织内外部环境分析要求，企业需系统识别影响质量管理体系的内外部因素\n2. **风险思维全面强化**：将风险管理深度融入全流程，要求企业建立基于风险的决策机制\n3. **数字化整合认可**：正式认可电子化文件管理系统，为企业数字化转型提供标准支撑\n\n## 企业应对建议\n\n已获证企业应在过渡期内完成体系升级，重点关注新增条款的落实与人员培训。建议尽早启动差距分析，制定详细的升级计划。", "2026-06-10"],
      ["articles", "中小企业如何高效通过 ISO 认证", "published", "认证知识", "", "专为中小企业定制的 ISO 认证实用指南，从文件准备到现场审核的全面优化建议，帮助企业少走弯路。", "## 中小企业认证常见难点\n\n- 人力资源有限，缺乏专职体系管理人员\n- 文件编写工作量大，容易产生畏难情绪\n- 对标准条款理解不够深入\n\n## 高效通过的核心策略\n\n1. **善用专业顾问经验**：选择经验丰富的咨询机构，避免自己摸索走弯路\n2. **采用轻量化文件体系**：在满足标准要求的前提下，减少不必要的文件化\n3. **提前做好内部审核准备**：内部审核是发现问题的最后机会，务必认真对待\n4. **管理层深度参与**：认证不是某一个部门的事，需要全员参与和管理层推动", "2026-06-03"],
      ["articles", "企业认证常见误区与科学应对方案", "published", "认证知识", "", "深度剖析企业在 ISO 认证过程中容易陷入的三大误区，提供经过实践验证的科学应对方案。", "## 常见误区\n\n1. **「认证就是为了拿证」**：认证的真正价值在于管理能力提升。仅仅为了拿证而认证，不仅浪费资源，更可能形成「两张皮」现象\n2. **「文件越多越好」**：过度文件化反而增加管理负担和运行成本，标准强调的是「适宜」而非「繁杂」\n3. **「认证后就万事大吉」**：管理体系需要持续维护和改进，认证只是管理提升的起点而非终点\n\n## 科学认知\n\nISO 认证是企业管理提升的有效工具。正确运用认证标准，可以帮助企业优化流程、降低成本、提升竞争力。选择专业的咨询伙伴，让认证真正为企业创造价值。", "2026-06-12"],
    ];
    const insertMany = db.transaction(() => {
      for (const c of seedContent) insert.run(...c);
    });
    insertMany();
  }

  // Seed settings if empty
  const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
  if (settingsCount.count === 0) {
    const insert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const defaults: Record<string, string> = {
      siteName: "正远智汇",
      siteSubtitle: "专业 ISO 认证咨询服务",
      siteDescription: "北京正远智汇科技有限公司为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务。",
      logoUrl: "",
      homeTitle: "正远智汇 — 专业 ISO 认证咨询 | ISO9001 ISO14001 ISO45001",
      homeDescription: "北京正远智汇科技有限公司为企业提供 ISO9001、ISO14001、ISO45001 等国际标准认证咨询服务，10+年行业经验，98%认证通过率。",
      keywords: "ISO9001认证,ISO14001认证,ISO45001认证,企业认证,认证咨询,体系认证",
      enableJsonLd: "true",
      navItems: JSON.stringify([
        { id: "home", label: "首页", href: "/" },
        { id: "services", label: "认证服务", href: "/services" },
        { id: "cases", label: "成功案例", href: "/cases" },
        { id: "insights", label: "行业洞察", href: "/insights" },
        { id: "about", label: "关于我们", href: "/about" },
        { id: "contact", label: "联系我们", href: "/contact" },
      ]),
      pushSettings: JSON.stringify({
        weworkBot: { enabled: true, webhookUrl: "", template: "" },
        weworkWebhook: { enabled: false, corpId: "", corpSecret: "", agentId: "", toUser: "", template: "" },
        email: { enabled: true, smtpHost: "", smtpPort: "587", fromEmail: "", fromPassword: "", fromName: "正远智汇", encryption: "STARTTLS", recipients: "" },
      }),
      pageData: JSON.stringify(PAGE_DATA),
    };
    const insertMany = db.transaction(() => {
      for (const [key, value] of Object.entries(defaults)) {
        insert.run(key, value);
      }
    });
    insertMany();
  }
}

// ── Leads ──────────────────────────────────────────────────────

export interface LeadRow {
  id: number;
  name: string;
  phone: string;
  company: string;
  service: string;
  source_url: string;
  status: string;
  time: string;
}

export function getLeads(filters?: { status?: string; search?: string }): LeadRow[] {
  const d = getDb();
  let sql = "SELECT * FROM leads WHERE 1=1";
  const params: unknown[] = [];
  if (filters?.status) {
    sql += " AND status = ?";
    params.push(filters.status);
  }
  if (filters?.search) {
    sql += " AND (name LIKE ? OR company LIKE ? OR phone LIKE ?)";
    const s = `%${filters.search}%`;
    params.push(s, s, s);
  }
  sql += " ORDER BY time DESC";
  return d.prepare(sql).all(...params) as LeadRow[];
}

export function getLeadStats() {
  const d = getDb();
  const today = new Date().toISOString().slice(0, 10);
  const todayNew = (d.prepare("SELECT COUNT(*) as count FROM leads WHERE status='new' AND time LIKE ?").get(`${today}%`) as { count: number }).count;
  const pending = (d.prepare("SELECT COUNT(*) as count FROM leads WHERE status IN ('new','contacted')").get() as { count: number }).count;
  const convertedThisMonth = (d.prepare("SELECT COUNT(*) as count FROM leads WHERE status='converted' AND time LIKE ?").get("2026-06-%") as { count: number }).count;
  const total = (d.prepare("SELECT COUNT(*) as count FROM leads").get() as { count: number }).count;
  return { todayNew, pending, convertedThisMonth, total };
}

export function addLead(data: Omit<LeadRow, "id">): LeadRow {
  const d = getDb();
  const result = d.prepare(
    "INSERT INTO leads (name, phone, company, service, source_url, status, time) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(data.name, data.phone, data.company, data.service, data.source_url, data.status, data.time);
  return d.prepare("SELECT * FROM leads WHERE id = ?").get(result.lastInsertRowid) as LeadRow;
}

export function updateLead(id: number, patch: Partial<LeadRow>): void {
  const d = getDb();
  const fields = Object.keys(patch).filter((k) => k !== "id");
  if (fields.length === 0) return;
  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = fields.map((f) => (patch as any)[f]);
  d.prepare(`UPDATE leads SET ${setClause} WHERE id = ?`).run(...values, id);
}

export function deleteLead(id: number): void {
  getDb().prepare("DELETE FROM leads WHERE id = ?").run(id);
}

// ── Content ────────────────────────────────────────────────────

export type ContentType = "banner" | "services" | "cases" | "articles";

export interface ContentRow {
  id: number;
  type: ContentType;
  title: string;
  status: string;
  category: string;
  industry: string;
  summary: string;
  body: string;
  created: string;
}

export function getContent(type: ContentType): ContentRow[] {
  return getDb().prepare("SELECT * FROM content WHERE type = ? ORDER BY created DESC").all(type) as ContentRow[];
}

export function addContent(data: Omit<ContentRow, "id">): ContentRow {
  const d = getDb();
  const result = d.prepare(
    "INSERT INTO content (type, title, status, category, industry, summary, body, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(data.type, data.title, data.status, data.category || "", data.industry || "", data.summary || "", data.body || "", data.created);
  return d.prepare("SELECT * FROM content WHERE id = ?").get(result.lastInsertRowid) as ContentRow;
}

export function updateContent(id: number, patch: Partial<ContentRow>): void {
  const d = getDb();
  const fields = Object.keys(patch).filter((k) => k !== "id" && k !== "type");
  if (fields.length === 0) return;
  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = fields.map((f) => (patch as any)[f]);
  d.prepare(`UPDATE content SET ${setClause} WHERE id = ?`).run(...values, id);
}

export function deleteContent(id: number): void {
  getDb().prepare("DELETE FROM content WHERE id = ?").run(id);
}

// ── Settings ───────────────────────────────────────────────────

export function getSetting(key: string): string | null {
  const row = getDb().prepare("SELECT value FROM settings WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  getDb().prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
}

export function getAllSettings(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const result: Record<string, string> = {};
  for (const r of rows) result[r.key] = r.value;
  return result;
}
