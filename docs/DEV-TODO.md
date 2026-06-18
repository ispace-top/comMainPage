# 开发 Todo List — ToB 认证行业通用型配置化官网

**最后验证**: 2026-06-18 | **验证依据**: PRD V1.0 + UI-Design-Spec V1.0
**技术栈**: Next.js 16.2 (App Router) + TailwindCSS v4 + TypeScript

---

## 进度总览

| 状态 | 任务数 |
|------|--------|
| ✅ 已完成 (初始开发) | 8 |
| 🔴 待开始 (验证发现) | 1 |
| 🟢 已完成 (本轮修复) | 27 |

---

## 阶段一：Critical — 组件 Bug 修复 (高优先级)

### 9. 🟢 修复 Button Danger 变体 broken CSS token
- [x] `Button.tsx:26` `focus-visible:outline-error-300` → 改为 `focus-visible:outline-red-400`
- [x] Button Loading 态文字变透明 + 添加 `relative` 定位 spinner
- **依据**: UI Spec §3.1.3

### 10. 🟢 修复 Modal 缺少退出动画
- [x] 新增 `closing` 状态 + `modalOut` keyframe 动画 (opacity+scale, 150ms)
- [x] 添加 `max-h-[calc(100vh-128px)]` 高度约束
- [x] 新增 `fadeOut` keyframe 用于遮罩退出动画
- **依据**: UI Spec §3.12

### 11. 🟢 修复 Toast 缺少退出动画 + 无 aria-live 区域
- [x] 新增 `exiting` 状态 + `toastOut` keyframe 动画 (200ms ease-in)
- [x] Toast 容器添加 `aria-live="polite"` + `aria-atomic="false"`
- [x] 移动端居中定位 (`max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-4`)
- **依据**: UI Spec §3.13, §9.4

### 12. 🟢 修复 Select 组件缺少键盘导航
- [x] Arrow Up/Down/Home/End/Enter 键盘操作
- [x] 下拉选项自动聚焦 + `tabIndex={-1}` 支持
- [x] 保留 focus ring，添加 `focus:bg-neutral-100` 选项焦点样式
- **依据**: UI Spec §3.3

### 13. 🟢 修复 LanguageSwitcher 整页刷新问题
- [x] `window.location.href` → Next.js `useRouter().push()`
- [x] 替换国旗图标为地球图标 (globe SVG per spec)
- [x] 添加 `aria-expanded`/`aria-haspopup` 无障碍属性
- **依据**: UI Spec §3.17

---

## 阶段二：Critical — 前台页面缺失功能

### 14. 🟢 创建案例详情页 `/cases/[slug]`
- [x] 新建 `src/app/[lang]/cases/[slug]/page.tsx` (含 3 个案例完整数据)
- [x] Cases 列表页 "查看详情" 改为真实 `<Link>` + slug 路由
- [x] 案例详情: Hero + 行业/认证 Badge + 3 项成果数据 + 3 段内容 + 3 篇相关案例 + 返回链接
- [x] 无效 slug 显示 "案例未找到" 提示
- **依据**: PRD §3.1, UI Spec §4.4.2

### 15. 🟢 修复 Insight 详情页内容依赖 slug
- [x] 新增 3 篇文章完整数据 (iso9001-2025, digital-certification, small-business-iso)
- [x] 通过 slug 查找文章数据，无效 slug 显示 404 提示
- [x] 添加 "相关文章推荐 (2-3 篇)" 区块
- [x] 添加 上一篇/下一篇 真实链接 + 空状态处理
- [x] Insights 列表页链接改为 slug 路由
- **依据**: UI Spec §4.6

### 16. 🟢 修复 `<html lang>` 动态切换
- [x] 新建 `src/components/layout/SetHtmlLang.tsx` 客户端组件
- [x] `[lang]/layout.tsx` 中集成，根据路由参数动态 `document.documentElement.lang`
- [x] main 元素添加 `id="main-content"` 使 skip-to-main 链接生效
- **依据**: PRD §5.1, UI Spec §9.3

### 17. 🟢 修复 Navigation 桌面下拉菜单键盘无障碍
- [x] 下拉菜单项从 `<Link>` 改为 `<button>` (防止点击即导航)
- [x] 支持 Enter/Space 展开下拉、Escape 关闭
- [x] 添加 `aria-expanded` / `aria-haspopup` 属性
- [x] 下拉子项点击后关闭菜单
- **依据**: UI Spec §9.2

---

## 阶段三：High — 页面状态覆盖

### 18. 🟢 前台页面添加 Loading 骨架屏
- [x] 首页 → `PageSkeleton` + `usePageData` hook (模拟 300ms 加载)
- [x] 服务列表 → `PageSkeleton` + `usePageData` hook (模拟 200ms 加载)
- [x] 新建 `src/lib/use-page-data.ts` 通用数据加载 hook (loading/error/retry)
- **依据**: UI Spec §附录A

### 19. 🟢 前台列表页添加 Empty 状态
- [x] 服务列表: "未找到相关服务" + 清除筛选
- [x] 案例列表: "暂无成功案例"
- [x] 洞察列表: "未找到相关文章" + 清除筛选
- **依据**: UI Spec §3.16, §附录A

### 20. 🟢 前台页面添加 Error 状态
- [x] 首页 → Error 状态 + 重试按钮 (via `usePageData`)
- [x] 服务列表 → Error 状态 + 重试按钮 (via `usePageData`)
- [x] 详情页无效 slug 显示 404/提示 (案例详情/洞察详情)
- **依据**: UI Spec §附录A

---

## 阶段四：High — SEO 与性能

### 21. 🟢 首页注入 JSON-LD 结构化数据
- [x] Organization schema (公司信息, foundingDate, aggregateRating)
- **依据**: PRD §6.1

### 22. 🟢 服务详情页注入 JSON-LD
- [x] Service schema (当前服务)
- [x] FAQPage schema (常见问题)
- **依据**: PRD §6.1

### 23. 🟢 完善 hreflang 标签注入
- [x] 新建 `HreflangTags` 组件 (zh/en/x-default alternates)
- [x] 集成到 `[lang]/layout.tsx` 覆盖所有前台页面
- [x] 配合 `generateMetadata` 中的 canonical + languages 声明
- **依据**: PRD §5.1

---

## 阶段五：Medium — 组件改进

### 24. 🟢 修复 Button Loading 态文字不变透明
- [x] Loading 时文字包装在 `span.invisible` 中保持占位宽度
- [x] Spinner 使用 `absolute inset-0` 居中定位
- **依据**: UI Spec §3.1.3

### 25. 🟢 修复 Card StatCard 统计数字颜色
- [x] `text-neutral-800` → `text-primary-600`
- **依据**: UI Spec §3.6.2

### 26. 🟢 修复 Pagination 当前页字重
- [x] `font-medium` → `font-semibold`
- **依据**: UI Spec §3.11

### 27. 🟢 修复 Breadcrumb 当前页字号
- [x] 当前页 span 添加 `text-base` (16px)
- **依据**: UI Spec §3.10

### 28. 🟢 修复 Footer 社交媒体图标
- [x] 替换为实际图标: WeChat / Weibo / LinkedIn (独立 SVG)
- **依据**: UI Spec §4.10

---

## 阶段六：Medium — 后台管理系统功能

### 29. 🟢 实现 RBAC 角色权限控制
- [x] `auth.ts` 添加 `editor` demo 账户 (editor/editor123)
- [x] 菜单项添加 `roles` 字段，AdminLayout 根据角色过滤
- [x] ROLE_EDITOR 隐藏 "系统/全局设置" 菜单
- [x] TopBar 显示角色标签 (管理员/编辑员)
- **依据**: PRD §2

### 30. 🟢 实现 Kanban 看板拖拽功能
- [x] 安装 `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities`
- [x] KanbanCard 组件 (useDraggable) + KanbanColumn 组件 (useDroppable)
- [x] onDragEnd 更新线索状态 (新线索→已联系→已转化→无效)
- [x] 拖拽时视觉反馈 (opacity-50, scale-105, 列高亮)
- **依据**: UI Spec §5.4.3

### 31. 🟢 实现导航管理拖拽排序
- [x] @dnd-kit/sortable 垂直列表拖拽 (SortableNavItem + arrayMove)
- [x] 6 点拖拽手柄图标 + 拖拽中阴影高亮
- [x] DndContext + closestCenter 碰撞检测
- **依据**: UI Spec §5.2.2

### 32. 🟢 实现线索详情侧滑面板
- [x] 新建 `SlidePanel` 组件 (480px 右侧滑入, `slideInRight` keyframe)
- [x] 客户信息 (姓名/手机/公司) + 线索信息 (项目/来源/时间/状态)
- [x] 状态流转按钮组 (new→contacted→converted→invalid)
- [x] 跟进记录占位区域
- [x] 列表"详情"按钮 + 看板卡片"查看详情 →"链接
- **依据**: UI Spec §5.4.2

---

## 阶段七：Low — 细节完善

### 33. 🟢 修复 Input 缺少 Success 状态
- [x] 添加 `success` prop → `border-success-500`
- **依据**: UI Spec §3.2.2

### 34. 🟢 修复 Modal 缺少 max-height 约束
- [x] 内容区 `max-h-[calc(100vh-128px)]` + flex column 布局
- **依据**: UI Spec §3.12

### 35. 🟢 404 页面添加完整布局 (Nav + Footer)
- [x] `not-found.tsx` 包裹 Navigation + Footer
- [x] 根据 URL 路径自动检测语言 (/zh 或 /en)
- [x] 返回首页链接根据当前语言动态跳转
- **依据**: UI Spec §3.16

### 36. 🟢 关于页 证书 Lightbox 放大查看
- [x] 点击证书缩略图弹出 Modal (含证书预览)
- [x] 关闭按钮 + 遮罩点击关闭
- **依据**: UI Spec §4.7

---

> 最后更新: 2026-06-18 | 验证发现 28 个待修复项
