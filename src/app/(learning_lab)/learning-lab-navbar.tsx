"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteSwitcher from "@/components/SiteSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

// Define navigation items for the Learning Lab
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

  return (
    <nav className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Site Switcher */}
          <div className="flex-shrink-0">
            <SiteSwitcher />
          </div>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {labNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === link.href || pathname?.startsWith(link.href + "/")
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Explore button */}
          <div className="hidden lg:flex lg:items-center">
            <Link
              href="/learning-lab/explore"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
              )}
            >
              Explore the Lab
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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

      {/* Mobile menu panel */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {labNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent",
                pathname === link.href || pathname?.startsWith(link.href + "/")
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/learning-lab/explore"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
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