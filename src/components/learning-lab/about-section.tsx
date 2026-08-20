import Image from "next/image";
import { cn } from "@/lib/utils";

const photos = [
  { src: "/learningLab/Gemini_Generated_Image_gdgpvggdgpvggdgp.jpg", alt: "The Lab building exterior", caption: "The Lab building/interior" },
  { src: "/learningLab/Computers_setup.jpg", alt: "Computers setup", caption: "Computers" },
  { src: "/learningLab/Internet_connectivity.jpg", alt: "Internet connectivity equipment", caption: "Internet connectivity" },
  { src: "/learningLab/Teachers_collaborating.jpg", alt: "Teachers collaborating", caption: "Teachers" },
  { src: "/learningLab/learners.jpg", alt: "Learners using tablets", caption: "Learners" },
  { src: "/learningLab/Training_sessions.jpg", alt: "Training sessions", caption: "Training sessions" },
  { src: "/learningLab/Assessment_activities.jpg", alt: "Assessment activities in progress", caption: "Assessment activities", wide: true },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">
            More than a computer centre.
            <br />
            What is the Learning Lab?
          </h2>
          <p className="text-lg text-gray-600">
            The Learning Lab provides shared access to computers, internet
            connectivity, AI-enabled assessment and learning tools, teacher
            training and collaborative space.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            But technology is only one part of the Lab. The Lab acts as an
            educational anchor that connects teachers, learners, caregivers,
            communities, and education actors. It provides the insights
            needed to understand learning challenges, the data to explore
            solutions, and a bridge to bring real-world classroom success to
            the wider community.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {photos.map((photo) => (
            <div
              key={photo.caption}
              className={cn("space-y-2", photo.wide && "col-span-2 md:col-span-2")}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-sm">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
              <p className="text-sm font-medium text-navy-800">{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}