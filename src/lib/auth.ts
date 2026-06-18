"use client";

const AUTH_KEY = "admin_auth_token";
const USER_KEY = "admin_user_info";

// Demo credentials
const DEMO_USERS: Record<string, { password: string; role: "admin" | "editor" }> = {
  admin: { password: "admin123", role: "admin" },
  editor: { password: "editor123", role: "editor" },
};

export interface AuthUser {
  username: string;
  role: "admin" | "editor";
}

export type Role = "admin" | "editor";

export function login(username: string, password: string): AuthUser | null {
  const user = DEMO_USERS[username];
  if (user && user.password === password) {
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem(AUTH_KEY, token);
    const authUser: AuthUser = { username, role: user.role };
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    return authUser;
  }
  return null;
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
  } catch { /* fallback to admin */ }
  return { username: "admin", role: "admin" };
}

export function isAdmin(): boolean {
  return getAuthUser()?.role === "admin";
}
