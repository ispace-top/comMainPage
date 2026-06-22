"use client";

import { useEffect } from "react";

/**
 * Syncs the browser favicon with the uploaded logo from admin settings.
 * Falls back to the default "正" SVG favicon set in layout metadata.
 */
export function FaviconSync() {
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((settings) => {
        if (cancelled) return;
        if (settings.logoUrl && settings.logoUrl.startsWith("data:image")) {
          const existing = document.querySelector("link[rel='icon']");
          if (existing) existing.setAttribute("href", settings.logoUrl);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return null;
}
