"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ToastProvider } from "@/components/ui/Toast";
import { isAuthenticated, getAuthUser, logout as doLogout, type Role } from "@/lib/auth";

const allMenuItems = [
  {
    group: "概览",
    roles: ["admin", "editor"] as Role[],
    items: [
      { label: "工作台", icon: "dashboard", href: "/admin" },
    ],
  },
  {
    group: "内容",
    roles: ["admin", "editor"] as Role[],
    items: [
      { label: "Banner 管理", icon: "image", href: "/admin/content" },
      { label: "服务项目", icon: "briefcase", href: "/admin/content?tab=services" },
      { label: "成功案例", icon: "star", href: "/admin/content?tab=cases" },
      { label: "行业洞察", icon: "newspaper", href: "/admin/content?tab=articles" },
    ],
  },
  {
    group: "线索",
    roles: ["admin", "editor"] as Role[],
    items: [
      { label: "线索列表", icon: "users", href: "/admin/leads" },
      { label: "看板视图", icon: "view-columns", href: "/admin/leads?view=kanban" },
    ],
  },
  {
    group: "系统",
    roles: ["admin"] as Role[],
    items: [
      { label: "全局设置", icon: "cog", href: "/admin/settings" },
    ],
  },
];

// Simple icon component using SVG
function MenuIcon({ name, active }: { name: string; active: boolean }) {
  const cls = `size-5 ${active ? "text-primary-400" : "text-neutral-400"}`;
  const icons: Record<string, React.ReactNode> = {
    dashboard: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zm11-1a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>,
    image: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>,
    briefcase: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5z" clipRule="evenodd" /></svg>,
    star: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
    newspaper: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" /><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" /></svg>,
    users: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zm-4.07 11c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM7 11a5 5 0 015 5v1H2v-1a5 5 0 015-5z" /></svg>,
    "view-columns": <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H5zm4 0a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H9zm4 0a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" /></svg>,
    cog: <svg className={cls} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
  };
  return icons[name] || <span className={cls}>●</span>;
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated() && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [pathname, router]);

  // Allow login page to render without auth check
  if (pathname === "/admin/login") {
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <div className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-500" />
      </div>
    );
  }

  const user = getAuthUser();
  const userRole = user?.role || "admin";
  const menuItems = allMenuItems.filter((g) => g.roles.includes(userRole));

  const handleLogout = () => {
    doLogout();
    router.replace("/admin/login");
  };

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-neutral-50">
        {/* Sidebar */}
        <aside className={["bg-neutral-900 text-neutral-300 flex flex-col shrink-0 transition-all duration-200", collapsed ? "w-16" : "w-60"].join(" ")}>
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-neutral-800">
            <div className="flex items-center justify-center size-8 rounded-md bg-primary-500 shrink-0">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            {!collapsed && <span className="ml-3 font-semibold text-white text-sm">认证通 CMS</span>}
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-auto py-4">
            {menuItems.map((group, gi) => (
              <div key={gi} className="mb-4">
                {!collapsed && <p className="px-4 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">{group.group}</p>}
                <ul>
                  {group.items.map((item) => {
                    const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href.split("?")[0]);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={[
                            "flex items-center h-11 px-4 mx-2 rounded-md transition-colors",
                            isActive
                              ? "bg-primary-700/30 text-white border-l-[3px] border-primary-400 pl-[13px]"
                              : "text-neutral-300 hover:bg-white/[0.06] border-l-[3px] border-transparent pl-[13px]",
                          ].join(" ")}
                        >
                          <MenuIcon name={item.icon} active={isActive} />
                          {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-12 border-t border-neutral-800 text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <svg className={["size-5 transition-transform", collapsed && "rotate-180"].join(" ")} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-neutral-200 shrink-0">
            <h1 className="text-lg font-semibold text-neutral-800">
              {pathname === "/admin" ? "工作台" : pathname.includes("settings") ? "全局设置" : pathname.includes("content") ? "内容中心" : pathname.includes("leads") ? "线索中心" : "管理后台"}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                {userRole === "admin" ? "管理员" : "编辑员"}
              </span>
              <span className="text-sm text-neutral-500">{user?.username || "Admin"}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-neutral-400 hover:text-error-500 transition-colors"
                title="退出登录"
              >
                退出
              </button>
              <div className="size-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">A</div>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
