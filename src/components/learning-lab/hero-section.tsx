import Link from "next/link";

const stats = [
  { value: "40+", label: "Schools Supported" },
  { value: "6,000", label: "Learners Supported" },
  { value: "Voo, Kitui East,", label: "Kenya" },
];

export default function HeroSection() {
  return (
    <section className="bg-navy-800 py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Nyansapo Learning Lab
          </p>
          <h1 className="hero-header mb-6">
            Finding what works to improve foundational learning for rural
            children.
          </h1>
          <p className="hero-text mb-8 max-w-xl text-gray-200">
            The Nyansapo Learning Lab is a physical community learning and
            technology hub in Kitui East, Kenya. It brings together schools,
            teachers, communities, technology and evidence to understand
            learning needs, test practical solutions and improve what
            happens in classrooms.
          </p>

          <div className="mb-10 grid grid-cols-3 gap-6 border-t border-gray-600 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/learning-lab/explore"
              className="rounded-full bg-yellow-400 px-8 py-3 font-bold text-navy-900 transition-colors hover:bg-yellow-500"
            >
              Explore the Lab
            </Link>
            <Link
              href="/learning-lab/insights"
              className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition-colors hover:bg-white hover:text-navy-900"
            >
              See What We&apos;re Learning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}