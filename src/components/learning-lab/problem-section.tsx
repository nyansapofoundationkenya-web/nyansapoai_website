import Image from "next/image";

export default function ProblemSection() {
  return (
    <section className="bg-lightblue-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg md:h-96">
              <Image src="/learningLab/Classroom_setting.jpg" alt="Classroom setting" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-xl border border-gray-100 bg-white p-6 shadow-xl md:block">
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-500">
                Evidence
              </p>
              <p className="mb-2 text-4xl font-bold text-navy-800">50%+</p>
              <p className="text-sm leading-snug text-gray-600">
                of assessed Grade 5 learners could not read individual
                words.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold text-navy-800 md:text-4xl">
              Learning gaps can remain hidden.
            </h2>
            <p className="mb-4 text-lg text-gray-700">
              Children can progress through school while still struggling
              with foundational literacy and numeracy. Nyansapo&apos;s
              assessments in participating rural schools have helped reveal
              gaps between children&apos;s grade level and what they can
              actually do.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              The Learning Lab creates a place where these gaps can be
              identified, understood and acted on — with teachers, school
              heads and parents involved in finding practical responses.
            </p>
            <p className="border-l-2 border-gray-300 pl-4 text-xs italic text-gray-500">
              * Nyansapo&apos;s assessments are robust, structured
              literacy and numeracy assessments used across participating
              schools, designed to surface accurate, actionable insight
              that leads to practical classroom responses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}