import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Contact", href: "/learning-lab/contact" },
  { label: "Stories & Insights", href: "/learning-lab/stories" },
  { label: "Reports", href: "/learning-lab/reports" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t-[16px] border-yellow-400 bg-navy-900 pb-8 pt-16 text-white">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
        <Image src="/imgs/gallery/9.jpg" alt="" fill className="object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">A place to learn what works.</h2>
            <p className="max-w-md text-sm text-gray-300">
              The Learning Lab brings people, technology and evidence
              together to build real community solutions. Finding gaps,
              supporting teachers and building ways of helping children
              learn.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 text-xs text-gray-400 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold leading-none text-navy-900">
              N
            </div>
            <span>© 2024 Nyansapo Learning Lab | Kitui East, Kenya</span>
          </div>
          <div className="flex space-x-4">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}