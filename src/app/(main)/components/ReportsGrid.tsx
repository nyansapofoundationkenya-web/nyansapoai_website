"use client";

import { useMemo } from "react";
import ReportCard from "./ReportCard";

const reports = [
  {
    id: 1,
    title: "RCP Baseline Report",
    subtitle: "(2025)",
    imageUrl: "/imgs/reports/baseline.png",
    pdfUrl: "/pdfs/RCP Baseline Report.pdf",
    index: 0,
  },
  {
    id: 2,
    title: "Endline Report",
    subtitle: "(2025)",
    imageUrl: "/imgs/reports/endline.png",
    pdfUrl: "/pdfs/EndlineReport.pdf",
    index: 1,
  },
  {
    id: 3,
    title: "Utilizing Mobile Technology as a Tool to Supplementing Literacy Education For Underserved Children in Kenya",
    subtitle: "(2025)",
    imageUrl: "/imgs/reports/utilising.png",
    pdfUrl: "/pdfs/NERA Poster B_Mumbe et al.pdf",
    index: 2,
  },

 {
    id: 4,
    title: "Technology Applications in Teaching at the Right Level Programs",
    subtitle: "(2025)",
    imageUrl: "/imgs/reports/technology.png",
    pdfUrl: "/pdfs/Technology_Applications_in_Teaching_at_the_Right_Level_Programs (1) 2 2.pdf",
    index: 3,
  },
] as const;

interface ReportsGridProps {
  searchQuery: string;
}

export default function ReportsGrid({ searchQuery }: ReportsGridProps) {
  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;
    const q = searchQuery.toLowerCase().trim();
    return reports.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (filteredReports.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">
          No reports found matching “{searchQuery}”
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        grid gap-8
        grid-cols-1           /* 1 on mobile */
        sm:grid-cols-2        /* 2 on small tablets */
        lg:grid-cols-3        /* ← 3 PER ROW on large screens */
        auto-rows-fr
        place-items-stretch   /* cards stretch to fill row */
      `}
    >
      {filteredReports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          index={report.index}
        />
      ))}
    </div>
  );
}