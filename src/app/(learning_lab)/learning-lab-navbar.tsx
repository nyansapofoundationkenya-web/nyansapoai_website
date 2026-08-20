"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteSwitcher from "@/components/SiteSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

const labNavLinks = [
  { name: "The Lab", href: "/learning-lab" },
  { name: "People", href: "/learning-lab/people" },
  { name: "What we've done", href: "/learning-lab/projects" },
  { name: "What we're learning", href: "/learning-lab/insights" },
  { name: "Stories and insights", href: "/learning-lab/stories" },
];

export default function LearningLabNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSectionTheme(64); // 64px = h-16 navbar height
  const isDark = theme === "dark";

  return (
    <nav
      className={cn(
        "w-full sticky top-0 z-50 border-b transition-colors duration-300 shadow-md",
        isDark
          ? "bg-navy-900 border-navy-700"
          : "bg-white border-gray-200"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <SiteSwitcher />
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {labNavLinks.map((link) => {
              const active =
                pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-yellow-400",
                    active
                      ? "text-yellow-400"
                      : isDark
                      ? "text-white/90"
                      : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:items-center">
            <Link
              href="/learning-lab/explore"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-yellow-400 text-navy-900 hover:bg-yellow-500 font-bold rounded-full"
              )}
            >
              Explore the Lab
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400",
                isDark ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              )}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t transition-colors duration-300",
          isOpen ? "block" : "hidden",
          isDark ? "bg-navy-900 border-navy-700" : "bg-white border-gray-200"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {labNavLinks.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  active
                    ? "text-yellow-400"
                    : isDark
                    ? "text-white/90 hover:bg-white/10 hover:text-yellow-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-yellow-500"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link
              href="/learning-lab/explore"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-yellow-400 text-navy-900 hover:bg-yellow-500 font-bold rounded-full"
              )}
              onClick={() => setIsOpen(false)}
            >
              Explore the Lab
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}