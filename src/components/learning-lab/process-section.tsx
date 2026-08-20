import {
  BookOpenCheck,
  Brain,
  Users,
  FlaskConical,
  BarChart3,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  ring: "lightblue" | "yellow" | "navy";
};

const steps: Step[] = [
  { number: "01", title: "Assess", description: "Understand where learners are currently at.", icon: BookOpenCheck, ring: "lightblue" },
  { number: "02", title: "Understand", description: "Explore the context behind the numbers.", icon: Brain, ring: "yellow" },
  { number: "03", title: "Co-create", description: "Brainstorm with teachers and school admins.", icon: Users, ring: "navy" },
  { number: "04", title: "Test", description: "Implement short, targeted trials directly.", icon: FlaskConical, ring: "yellow" },
  { number: "05", title: "Measure", description: "Determine what worked, and what didn't.", icon: BarChart3, ring: "lightblue" },
  { number: "06", title: "Adapt", description: "Refine the approach and scale what succeeds.", icon: RefreshCw, ring: "navy" },
];

const ringClasses: Record<Step["ring"], string> = {
  lightblue: "border-lightblue",
  yellow: "border-yellow-400",
  navy: "border-navy-800",
};

export default function ProcessSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">
          A place to learn, test and find what works.
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-600">
          Our iterative approach to developing educational interventions.
        </p>

        <div className="flex flex-col items-start justify-center gap-8 md:flex-row md:gap-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex max-w-[150px] flex-col items-center">
              <div
                className={cn(
                  "z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white text-navy-800",
                  ringClasses[step.ring]
                )}
              >
                <step.icon className="h-8 w-8" strokeWidth={2} />
              </div>
              <h3 className="mb-2 font-bold text-navy-800">
                {step.number} — {step.title.toUpperCase()}
              </h3>
              <p className="text-center text-xs text-gray-600">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="absolute right-[-2rem] top-10 hidden h-px w-8 bg-gray-300 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}