import Link from "next/link";
import { School, Users, Hand, type LucideIcon } from "lucide-react";

type Pillar = { title: string; description: string; href: string; icon: LucideIcon };

const pillars: Pillar[] = [
  { title: "Schools", description: "Explore interventions and evidence across the network of participating schools.", href: "/learning-lab/schools", icon: School },
  { title: "Communities", description: "Engaging caregivers and local leaders to support foundational learning at home.", href: "/learning-lab/communities", icon: Users },
  { title: "Partners", description: "Collaborating with education actors to scale proven solutions.", href: "/learning-lab/partners", icon: Hand },
];

export default function EcosystemSection() {
  return (
    <section className="bg-lightblue-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-3xl font-bold text-navy-800 md:text-4xl">
          A shared place. A wider system.
        </h2>
        <p className="mb-12 text-lg text-gray-600">
          Explore the ecosystem, ways we learn or get involved.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-800 shadow-sm md:mx-0">
                <pillar.icon className="h-8 w-8" strokeWidth={2} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy-800">{pillar.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-2 border-b-2 border-yellow-400 pb-1 text-sm font-bold text-navy-800 hover:text-yellow-600"
              >
                Work with us →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}