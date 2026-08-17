"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteSwitcher() {
  const pathname = usePathname();
  const isLab = pathname.startsWith("/learning-lab");

  return (
    <div className="flex items-center gap-3 text-2xl font-bold">
      <Link
        href="/"
        className={`transition-colors ${
          !isLab ? "text-accent" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Nyansapo AI
      </Link>
      <span className="text-muted-foreground">|</span>
      <Link
        href="/learning-lab"
        className={`transition-colors ${
          isLab ? "text-accent" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Learning Lab
      </Link>
    </div>
  );
}