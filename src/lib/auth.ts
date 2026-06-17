"use client";

const AUTH_KEY = "admin_auth_token";
// Simple demo credentials — replace with real auth in production
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

export interface AuthUser {
  username: string;
  role: string;
}

export function login(username: string, password: string): AuthUser | null {
  if (username === DEMO_USER && password === DEMO_PASS) {
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem(AUTH_KEY, token);
    return { username, role: "admin" };
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (!isAuthenticated()) return null;
  return { username: "admin", role: "admin" };
}
