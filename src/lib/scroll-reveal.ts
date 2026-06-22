"use client";

import { useEffect, useRef } from "react";

/**
 * Initialize IntersectionObserver-based scroll reveal.
 * @param ready - When false, skips observation (useful when content hasn't loaded yet)
 */
export function useScrollReveal(ready = true) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ready) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    // Small delay to ensure DOM has rendered
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ready]);
}
