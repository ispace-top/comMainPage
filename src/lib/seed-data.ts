export const PAGE_DATA = {
  hero: {
    zh: {
      title: "ISO 认证咨询专家\n助力企业标准化建设",
      subtitle: "北京正远智汇 — 专注 ISO9001、ISO14001、ISO45001 认证咨询，10+年经验，98% 一次性通过率",
      cta1: "免费获取方案",
      cta2: "认证服务",
    },
    en: {
      title: "ISO Certification Experts\nEmpowering Business Standards",
      subtitle: "Beijing ZhengyuanZhihui — Specializing in ISO9001, ISO14001, ISO45001 consulting with 10+ years of expertise",
      cta1: "Get a Free Quote",
      cta2: "Our Services",
    },
  },
  whyUs: {
    zh: [
      { title: "10+ 年行业深耕", desc: "自 2015 年成立以来，专注 ISO 认证咨询领域，积累深厚行业经验与大量成功案例。" },
      { title: "98% 一次性通过率", desc: "专业的预审机制和全流程辅导，确保企业高效通过认证审核，大幅降低反复审核成本。" },
      { title: "专家级顾问团队", desc: "核心顾问均持有 ISO 审核员资质，平均从业经验超 10 年，为您提供权威技术指导。" },
      { title: "一站式全流程服务", desc: "从差距分析、体系搭建、运行辅导到审核陪同，覆盖认证全生命周期，省心高效。" },
      { title: "500+ 企业信赖", desc: "服务覆盖制造、化工、建筑、食品、IT 等 30+ 行业，客户复购率超 60%。" },
      { title: "持续跟踪与维护", desc: "认证通过后持续提供体系维护、年审辅导，确保企业长期合规运营。" },
    ],
    en: [
      { title: "10+ Years of Expertise", desc: "Focused on ISO certification consulting since 2015, with deep industry experience." },
      { title: "98% First-Time Pass Rate", desc: "Professional pre-audit and full-process guidance ensuring efficient certification." },
      { title: "Expert Consulting Team", desc: "Core consultants hold ISO auditor qualifications with 10+ years of average experience." },
      { title: "One-Stop Full Service", desc: "From gap analysis to audit support — covering the entire certification lifecycle." },
      { title: "500+ Enterprises Served", desc: "Covering 30+ industries with a 60%+ client retention rate." },
      { title: "Ongoing Maintenance", desc: "Continuous system maintenance and annual surveillance audit support." },
    ],
  },
  process: {
    zh: [
      { step: "01", title: "需求沟通", desc: "了解企业基本情况、认证目标与时间要求，制定个性化认证方案。" },
      { step: "02", title: "差距分析", desc: "现场调研现有管理体系，识别与目标标准的差距，出具专业诊断报告。" },
      { step: "03", title: "体系搭建", desc: "辅导企业建立文件化管理体系，编写管理手册、程序文件和作业指导书。" },
      { step: "04", title: "运行辅导", desc: "体系试运行期间全程指导，开展内部审核和管理评审培训。" },
      { step: "05", title: "认证审核", desc: "协调第三方认证机构现场审核，全程陪同并协助整改不符合项。" },
      { step: "06", title: "获证维护", desc: "协助获取认证证书，提供年度监督审核辅导和体系持续改进建议。" },
    ],
    en: [
      { step: "01", title: "Needs Assessment", desc: "Understand your business goals, certification targets, and timeline." },
      { step: "02", title: "Gap Analysis", desc: "On-site review of existing management systems against target standards." },
      { step: "03", title: "System Development", desc: "Build documented management systems, manuals, procedures, and work instructions." },
      { step: "04", title: "Implementation Support", desc: "Full guidance during trial operation with internal audit and management review training." },
      { step: "05", title: "Certification Audit", desc: "Coordinate third-party audit, accompany throughout, and assist with non-conformance correction." },
      { step: "06", title: "Post-Certification", desc: "Obtain certificate, provide annual surveillance audit support and continuous improvement advice." },
    ],
  },
  cta: {
    zh: {
      title: "开启您的 ISO 认证之旅",
      subtitle: "专业顾问将在 24 小时内与您联系，为企业量身定制认证方案。",
      button: "免费咨询",
    },
    en: {
      title: "Start Your ISO Certification Journey",
      subtitle: "Our expert consultant will reach out within 24 hours with a tailored certification plan.",
      button: "Free Consultation",
    },
  },
  logoWall: {
    zh: { title: "他们已通过认证", subtitle: "500+ 企业的共同选择" },
    en: { title: "Trusted By", subtitle: "The choice of 500+ enterprises" },
  },
  stats: {
    zh: [
      { value: "500+", label: "服务企业" },
      { value: "98%", label: "一次性通过率" },
      { value: "30+", label: "覆盖行业" },
      { value: "10+", label: "行业经验(年)" },
    ],
    en: [
      { value: "500+", label: "Enterprises" },
      { value: "98%", label: "Success Rate" },
      { value: "30+", label: "Industries" },
      { value: "10+", label: "Years Exp." },
    ],
  },
};

export const SERVICE_DETAILS: Record<string, {
  zh: { name: string; desc: string; category: string; intro: string; suitable: string; process: string[] };
  en: { name: string; desc: string; category: string; intro: string; suitable: string; process: string[] };
}> = {
  "iso-9001": {
    zh: {
      name: "ISO9001 质量管理体系",
      category: "ISO体系",
      desc: "国际公认的质量管理体系标准，适用于任何规模和行业的企业，助力提升客户满意度和运营效率。",
      intro: "ISO9001:2015 是最新版质量管理体系国际标准，采用 PDCA 循环方法论，帮助企业建立系统化、文件化的质量管理流程。正远智汇的资深顾问团队将全程辅导，从差距分析、体系搭建、试运行指导到认证审核陪同，确保企业一次性通过认证审核。",
      suitable: "制造业、服务业、建筑业、贸易公司等各类希望规范质量管理、提升客户满意度的企业。",
      process: ["初步沟通与需求分析", "现场调研与差距诊断", "体系文件编写与培训", "试运行指导与内部审核", "认证机构现场审核陪同", "获证后持续维护"],
    },
    en: {
      name: "ISO9001 Quality Management",
      category: "ISO Standards",
      desc: "The internationally recognized quality management standard for enterprises of all sizes and industries.",
      intro: "ISO9001:2015 is the latest version of the international quality management standard, adopting the PDCA methodology. Our consultants provide full guidance from gap analysis through certification audit.",
      suitable: "Manufacturing, service, construction, and trading companies seeking to standardize quality management.",
      process: ["Initial consultation & needs analysis", "On-site gap assessment", "Documentation & training", "Trial run & internal audit", "Certification audit support", "Post-certification maintenance"],
    },
  },
  "iso-14001": {
    zh: {
      name: "ISO14001 环境管理体系",
      category: "ISO体系",
      desc: "帮助企业建立系统化环境管理框架，实现合规运营、节能减排，提升企业社会责任形象。",
      intro: "ISO14001:2015 是国际环境管理体系标准，指导企业识别和管理环境因素，降低环境影响，实现可持续发展。我们从体系策划到认证审核提供全流程专业服务。",
      suitable: "化工、制造、建筑、能源等对环境有影响的企业，以及希望提升环保形象、满足客户环保要求的各类组织。",
      process: ["环境因素识别与评估", "法律法规合规性审查", "体系文件建立与培训", "运行控制与应急演练", "内审与管理评审", "认证审核与获证"],
    },
    en: {
      name: "ISO14001 Environmental Management",
      category: "ISO Standards",
      desc: "Establish a systematic environmental management framework for compliance and sustainability.",
      intro: "ISO14001:2015 guides organizations in identifying and managing environmental aspects, reducing impacts, and achieving sustainable development.",
      suitable: "Chemical, manufacturing, construction, and energy companies seeking to improve environmental performance.",
      process: ["Environmental aspect identification", "Legal compliance review", "System documentation & training", "Operational control & drills", "Internal audit & review", "Certification audit"],
    },
  },
  "iso-45001": {
    zh: {
      name: "ISO45001 职业健康安全管理体系",
      category: "ISO体系",
      desc: "为组织提供职业健康安全管理框架，预防工伤事故和职业病，保障员工健康安全。",
      intro: "ISO45001:2018 替代 OHSAS18001，采用 Annex SL 高阶结构，更易于与其他管理体系整合。我们帮助企业建立系统的安全管理机制，降低事故风险。",
      suitable: "制造、建筑、矿山、化工、物流等存在较高职业健康安全风险的企业。",
      process: ["危险源辨识与风险评估", "法律法规合规诊断", "体系策划与文件编写", "运行实施与应急准备", "绩效监测与内部审核", "认证审核与持续改进"],
    },
    en: {
      name: "ISO45001 Occupational Health & Safety",
      category: "ISO Standards",
      desc: "A framework for managing occupational health and safety risks, preventing workplace injuries.",
      intro: "ISO45001:2018 replaces OHSAS18001 and adopts the Annex SL high-level structure for easier integration with other management systems.",
      suitable: "Manufacturing, construction, mining, chemical, and logistics companies with significant OHS risks.",
      process: ["Hazard identification & risk assessment", "Legal compliance review", "System planning & documentation", "Implementation & emergency prep", "Performance monitoring & audit", "Certification & improvement"],
    },
  },
  "iso-27001": {
    zh: {
      name: "ISO27001 信息安全管理体系",
      category: "ISO体系",
      desc: "信息安全管理领域的国际标准，帮助企业保护核心信息资产，防范数据泄露风险。",
      intro: "ISO27001:2022 是最新版标准，覆盖信息安全风险评估、控制措施选择和实施，适用于各类组织。帮助企业建立系统化信息安全防护体系。",
      suitable: "IT、金融、医疗、电商、政府机构等对信息安全有较高要求的企业和组织。",
      process: ["信息安全风险评估", "资产识别与分级", "控制措施选择与实施", "体系文件编写与培训", "内部审核与管理评审", "认证审核与获证"],
    },
    en: {
      name: "ISO27001 Information Security Management",
      category: "ISO Standards",
      desc: "The international standard for information security management, protecting critical information assets.",
      intro: "ISO27001:2022 covers risk assessment, control selection, and implementation for organizations of all types.",
      suitable: "IT, finance, healthcare, e-commerce, and government organizations with high information security requirements.",
      process: ["Security risk assessment", "Asset identification & classification", "Control selection & implementation", "Documentation & training", "Internal audit & review", "Certification audit"],
    },
  },
};

export const SERVICE_SLUGS = ["iso-9001", "iso-14001", "iso-45001", "iso-27001"];
