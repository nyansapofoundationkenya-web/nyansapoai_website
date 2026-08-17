// components/AnnouncementBar.tsx
"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "announcement-holiday-dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative w-full bg-primary text-primary-foreground py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium text-center">
        <span>🎉 Our Holiday Programme is now open for registration!</span>
        <Link
          href="/register"
          className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded-full font-bold hover:bg-blue-700 transition-all shadow-sm flex-shrink-0"
        >
          Register Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}