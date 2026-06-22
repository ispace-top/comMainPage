"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { login, isAuthenticated } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("请输入用户名和密码");
      return;
    }
    setLoading(true);
    const user = await login(username, password);
    setLoading(false);
    if (user) {
      router.replace("/admin");
    } else {
      setError("用户名或密码错误");
    }
  };

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-[400px] mx-4">
        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-12 rounded-md bg-primary-500 mb-4">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-800">正远智汇 CMS</h1>
            <p className="text-sm text-neutral-500 mt-1">请登录以管理网站内容</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-sm bg-error-50 border border-error-200 text-sm text-error-700">
                {error}
              </div>
            )}

            <Input
              label="用户名"
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />

            <Input
              label="密码"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              登录
            </Button>
          </form>

          <p className="text-xs text-neutral-400 text-center mt-6">
            请在环境变量中配置登录凭据
          </p>
        </div>
      </div>
    </div>
  );
}
