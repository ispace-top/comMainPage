"use client";

import { useEffect } from "react";

/**
 * Syncs the browser favicon with the uploaded logo from admin settings.
 * Falls back to the default "正" SVG favicon set in layout metadata.
 */
export function FaviconSync() {
  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((settings) => {
        if (settings.logoUrl && settings.logoUrl.startsWith("data:image")) {
          // Remove all existing icon links
          document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach((el) => { try { el.remove(); } catch {} });
          // Create new favicon link with uploaded logo
          const link = document.createElement("link");
          link.rel = "icon";
          link.type = "image/png";
          link.href = settings.logoUrl;
          document.head.appendChild(link);
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
