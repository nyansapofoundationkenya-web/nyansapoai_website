// hooks/useSectionTheme.ts
"use client";

import { useEffect, useState } from "react";

export type SectionTheme = "dark" | "light";

export function useSectionTheme(navbarHeight = 64) {
  const [theme, setTheme] = useState<SectionTheme>("dark"); // hero is dark at page load

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-navbar-theme]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTheme = entry.target.getAttribute(
              "data-navbar-theme"
            ) as SectionTheme | null;
            if (sectionTheme) setTheme(sectionTheme);
          }
        });
      },
      {
        // Only count a section "active" once its top edge has passed under the navbar
        rootMargin: `-${navbarHeight}px 0px -95% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navbarHeight]);

  return theme;
}