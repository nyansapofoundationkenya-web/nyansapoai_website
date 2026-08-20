import Link from "next/link";
import {
  FileText,
  GraduationCap,
  Users,
  LayoutGrid,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

const stats = [
  { value: "40+", label: "Schools Supported" },
  { value: "6,000", label: "Learners Supported" },
  { value: "50%+", label: "of assessed Grade 5 learners." },
];

type Card = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  bg: string;
  border: string;
  iconColor: string;
  hover: string;
};

const cards: Card[] = [
  { title: "Learning Evidence", description: "Review specific interventions and their documented outcomes.", href: "/learning-lab/insights/learning-evidence", icon: FileText, bg: "bg-lightblue-50", border: "border-lightblue-100", iconColor: "text-lightblue", hover: "hover:text-lightblue" },
  { title: "Teacher Insight", description: "Discover insights directly from educators working in rural contexts.", href: "/learning-lab/insights/teacher-insight", icon: GraduationCap, bg: "bg-yellow-50", border: "border-yellow-200", iconColor: "text-yellow-500", hover: "hover:text-yellow-600" },
  { title: "Community Insight", description: "Understanding the role of caregivers and local leaders in education.", href: "/learning-lab/insights/community-insight", icon: Users, bg: "bg-gray-100", border: "border-gray-200", iconColor: "text-gray-500", hover: "hover:text-gray-600" },
];

const smallCards = [
  { title: "Product Learning", href: "/learning-lab/insights/product-learning", icon: LayoutGrid, bg: "bg-purple-50", border: "border-purple-100", iconColor: "text-purple-400", linkColor: "text-purple-600" },
  { title: "Implementation", href: "/learning-lab/insights/implementation", icon: CheckCircle2, bg: "bg-green-50", border: "border-green-100", iconColor: "text-green-400", linkColor: "text-green-600" },
];

export default function EvidenceSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-navy-800">Evidence of reach</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div>
                  <p className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">Evidence</p>
                  <p className="text-4xl font-bold text-navy-800">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-3xl font-bold text-navy-800">What we&apos;re learning</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {cards.map((card) => (
              <div key={card.title} className={`flex flex-col justify-between rounded-xl border p-6 ${card.bg} ${card.border}`}>
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-bold text-navy-800">{card.title}</h3>
                    <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                  <p className="mb-6 text-sm text-gray-700">{card.description}</p>
                </div>
                <Link href={card.href} className={`flex items-center gap-1 text-sm font-bold text-navy-800 ${card.hover}`}>
                  Read story →
                </Link>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              {smallCards.map((card) => (
                <div key={card.title} className={`flex h-full items-center justify-between rounded-xl border p-4 ${card.bg} ${card.border}`}>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-navy-800">{card.title}</h3>
                    <Link href={card.href} className={`flex items-center gap-1 text-xs font-bold ${card.linkColor}`}>
                      Explore →
                    </Link>
                  </div>
                  <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}