"use client";

const AUTH_KEY = "admin_auth_token";
const USER_KEY = "admin_user_info";

export interface AuthUser {
  username: string;
  role: "admin" | "editor";
}

export type Role = "admin" | "editor";

export async function login(username: string, password: string): Promise<AuthUser | null> {
  try {
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const authUser: AuthUser = { username: data.username, role: data.role };
    localStorage.setItem(AUTH_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    return authUser;
  } catch {
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (!isAuthenticated()) return null;
  try {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) return JSON.parse(stored) as AuthUser;
  } catch { /* fallback */ }
  return { username: "admin", role: "admin" };
}

export function isAdmin(): boolean {
  return getAuthUser()?.role === "admin";
}
