"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google"
import {
  BadgeCheck,
  Baby,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  GraduationCap,
  Info,
  Languages,
  MapPin,
  MessageCircle,
  Play,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Star,
  WifiOff,
  type LucideIcon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Fonts (scoped to this page via CSS variables)                       */
/* ------------------------------------------------------------------ */
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-jakarta",
  display: "swap",
})

const heading = "font-[family-name:var(--font-jakarta)]"

/* ------------------------------------------------------------------ */
/* Page palette (from the design) – arbitrary values so no Tailwind    */
/* config changes are needed.                                          */
/*   green      #005448   green-dark #0b6e5f   green-tint #9ff2df      */
/*   sand       #f6faf8   sand-low   #f0f4f2   amber      #fdbf47     */
/*   amber-text #704e00   slate      #4e637a   navy       #051d30     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const PLAY = "https://play.google.com/store/apps/details?id="

type AppInfo = {
  id: string
  name: string
  tag: string
  ageBadge: string
  ageIcon: LucideIcon
  verifiedBadge: string
  short: string
  size?: string
  description: string
  features: string[]
  href: string
  image: string
  icon: LucideIcon
}

const APPS: AppInfo[] = [
  {
    id: "hekima",
    name: "Hekima Learning",
    tag: "Phonics & letter blends",
    ageBadge: "Ages 4–7",
    ageIcon: Baby,
    verifiedBadge: "Playgroup to PP2",
    short: "Daily reading & phonics practice without internet.",
    size: "22MB",
    description:
      "Daily reading and maths practice your child will enjoy. Bite-sized interactive lessons with friendly audio guidance in both language and maths.",
    features: [
      "Letter sounds, blending & syllables recognition",
      "Bilingual audio guidance in English & Kiswahili",
      "Zero internet required after initial download",
    ],
    href: `${PLAY}com.nyansapo_foundation.hekimaapp`,
    image: "/images/parents/hekima.png",
    icon: BookOpen,
  },
  {
    id: "stadi",
    name: "Stadi Learn",
    tag: "CBC competency practice",
    ageBadge: "Grades 1–3",
    ageIcon: GraduationCap,
    verifiedBadge: "CBC aligned",
    short: "CBC reading comprehension & foundational numeracy.",
    size: "24MB",
    description:
      "Lessons that follow the official CBC curriculum for Grades 1–3. Helps parents support school homework with real, classroom-tested exercises.",
    features: [
      "Reading comprehension passages with contextual questions",
      "Teacher-approved foundational numeracy and language tasks",
      "Weekly diagnostic homework sync for Kenyan classrooms",
    ],
    href: `${PLAY}com.nyansapoai.stadiLearn`,
    image: "/images/parents/stadi.png",
    icon: BadgeCheck,
  },
  {
    id: "nao",
    name: "NAO Assessment",
    tag: "Reading check",
    ageBadge: "Reading level",
    ageIcon: ClipboardCheck,
    verifiedBadge: "Teacher-matched",
    short: "A quick reading check that shows where your child is.",
    description:
      "Find out in minutes whether your child is reading at their level. Results match trained teacher assessments, so you know what to practise next.",
    features: [
      "Short reading check you can run at home",
      "Results match trained teacher assessments",
      "Available in English & Kiswahili",
    ],
    href: `${PLAY}com.nyansapoai.naoassessment`,
    image: "/images/parents/stadi.png",
    icon: ClipboardCheck,
  },
]

const TRUST_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Try 100% free" },
  { icon: WifiOff, label: "Works offline" },
  { icon: Languages, label: "English & Kiswahili" },
  { icon: Download, label: "Small app (<25MB)" },
]

const STEPS = [
  {
    title: "Check reading level",
    body: "Do a short reading check with your child. It takes a few minutes.",
  },
  {
    title: "See where to help",
    body: "Get results that match what a trained teacher would find.",
  },
  {
    title: "Practise at home",
    body: "Do fun 5-minute lessons after school, even without internet.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "My daughter used to struggle with letter blending. After three weeks with Hekima, she reads her storybooks aloud to her grandmother every evening!",
    name: "Grace M.",
    role: "Mother of 2 in Nakuru",
  },
  {
    quote:
      "Nyansapo AI tools give parents the exact same structured assessments we use in the classroom. It bridges home and school seamlessly.",
    name: "Teacher Patrick",
    role: "Grade 2 Head Teacher in Machakos",
  },
]

const FAQS = [
  {
    q: "Is it free?",
    a: "Yes! The core reading assessments and foundational phonics lessons are 100% free for all parents in Kenya.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. Once downloaded, all interactive lessons, voice activities, and games work completely offline without consuming mobile bundles.",
  },
  {
    q: "What ages is it for?",
    a: "Our apps are designed for early learners from age 4 (PP1/PP2 pre-primary) through age 9 (CBC Grade 3 foundational levels).",
  },
  {
    q: "Is my child's information safe?",
    a: "Strictly protected. We never sell data or show third-party ads. Your child's reading and progress records are private to you and fully encrypted.",
  },
]

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */
function AppCard({ app }: { app: AppInfo }) {
  const [flipped, setFlipped] = useState(false)
  const AgeIcon = app.ageIcon
  const Icon = app.icon
  const downloadLabel = app.size ? `Download APK (${app.size})` : "Get on Google Play"

  return (
    <div className="h-[500px] w-full [perspective:1000px]">
      <div
        className="relative h-full w-full rounded-2xl shadow-md transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white [backface-visibility:hidden]"
        >
          <div className="relative h-[300px] w-full shrink-0 bg-[#ebefed]">
            <Image
              src={app.image}
              alt={`${app.name} app preview`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top"
            />

            {/* Top badges */}
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ffdea9] px-3 py-1 text-xs font-bold text-[#271900]">
                <AgeIcon className="h-4 w-4" /> {app.ageBadge}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-[#005448] backdrop-blur-md">
                <BadgeCheck className="h-3.5 w-3.5" /> {app.verifiedBadge}
              </span>
            </div>

            {/* Frosted strip at the bottom of the image (tag + name stay on the image) */}
            <div className="absolute inset-x-0 bottom-0 bg-black/35 px-3.5 py-3 text-white backdrop-blur-md">
              <p className="mb-0.5 text-[11px] font-bold text-[#ffdea9]">{app.tag}</p>
              <h3 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
                {app.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
            <p className="text-sm leading-snug text-[#3e4946]">{app.short}</p>
            <div className="flex items-center gap-2">
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={flipped ? -1 : 0}
                className="inline-flex min-h-[44px] flex-grow items-center justify-center gap-1.5 rounded-xl bg-[#005448] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0b6e5f]"
              >
                <Download className="h-[18px] w-[18px]" />
                {downloadLabel}
              </a>
              <button
                type="button"
                onClick={() => setFlipped(true)}
                tabIndex={flipped ? -1 : 0}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1 rounded-xl bg-[#ebefed] px-3 py-2 text-sm font-bold text-[#005448] transition-colors hover:bg-[#e5e9e7]"
              >
                Details <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 border-b border-[#ebefed] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9ff2df] text-[#005448]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`${heading} text-lg font-bold leading-6 text-[#181d1c]`}>
                    {app.name}
                  </h3>
                  <span className="text-[11px] text-[#3e4946]">
                    {app.verifiedBadge} • {app.ageBadge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? 0 : -1}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ebefed] px-2.5 py-1 text-xs font-semibold text-[#005448]"
              >
                <RotateCcw className="h-4 w-4" /> Preview
              </button>
            </div>

            <p className="text-sm leading-snug text-[#3e4946]">{app.description}</p>

            <ul className="flex flex-col gap-2 rounded-xl bg-[#f0f4f2] p-3 text-[#181d1c]">
              {app.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm leading-tight">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#005448]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={flipped ? 0 : -1}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#005448] text-sm font-bold text-white transition-colors hover:bg-[#0b6e5f]"
            >
              <Download className="h-[18px] w-[18px]" />
              {app.size ? `Download ${app.name.split(" ")[0]} (${app.size})` : "Get on Google Play"}
            </a>
            <p className="mt-1.5 text-center text-[11px] text-[#3e4946]">
              Free trial available • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoBlock() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  const start = async () => {
    const v = ref.current
    if (!v) return
    try {
      await v.play()
    } catch {
      setError(true)
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#2d3130] shadow-md">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/images/parents/parents-demo.mp4#t=0.1"
        playsInline
        preload="metadata"
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      {!playing && !error && (
        <button
          type="button"
          onClick={start}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-[#181d1c]/30 transition-colors hover:bg-[#181d1c]/40"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fdbf47] text-[#704e00] shadow-lg">
            <Play className="ml-0.5 h-7 w-7 fill-current" />
          </span>
        </button>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#181d1c]/70 p-4 text-center text-sm text-white">
          Sorry, this video couldn&apos;t be loaded. Please try again later.
        </div>
      )}
    </div>
  )
}
function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#f0f4f2]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-4 text-left text-base font-bold text-[#181d1c]"
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#3e4946] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-4 pb-4 text-base text-[#3e4946]">{a}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function ParentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const nao = APPS.find((a) => a.id === "nao")!

  return (
    <div
      className={`${nunito.variable} ${jakarta.variable} bg-[#f6faf8] font-[family-name:var(--font-nunito)] text-[#181d1c]`}
    >
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-8 pt-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdbf47] px-4 py-1 text-sm font-bold text-[#704e00]">
              <MapPin className="h-4 w-4" /> For parents in Kenya
            </span>
            <h1
              className={`${heading} mt-1 text-[32px] font-extrabold leading-[38px] tracking-tight lg:text-[48px] lg:leading-[56px]`}
            >
              Is your child learning at their level?
            </h1>
            <p className="text-base text-[#3e4946] lg:text-lg">
              Find out in minutes, then help them improve with fun lessons at home.
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#005448]">
              <CheckCircle2 className="h-5 w-5" /> Results match trained teacher assessments.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:max-w-md">
            <a
              href={nao.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[52px] w-full items-center justify-center gap-1 rounded-xl bg-[#005448] font-bold text-white shadow-md transition-colors hover:bg-[#0b6e5f]"
            >
              <PlayCircle className="h-5 w-5" /> Start a free reading check
            </a>
            <a
              href="#how-it-works"
              className="flex min-h-[48px] w-full items-center justify-center gap-1 rounded-xl bg-[#ebefed] font-bold text-[#005448] transition-colors hover:bg-[#e5e9e7]"
            >
              <Info className="h-[18px] w-[18px]" /> How it works
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-1 sm:max-w-md">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl bg-[#f0f4f2] p-2.5 text-xs font-semibold leading-tight"
              >
                <Icon className="h-5 w-5 shrink-0 text-[#005448]" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#ebefed] shadow-sm">
          <Image
            src="/images/parents/hero-mother-child.png"
            alt="Kenyan mother and young daughter practising phonics together on a smartphone"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white/90 p-2.5 shadow-md backdrop-blur-md">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fdbf47] text-[#704e00]">
              <Star className="h-[18px] w-[18px] fill-current" />
            </span>
            <p className="text-sm font-semibold leading-tight">
              Built for Kenyan homes • Trusted by CBC teachers nationwide
            </p>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="assessment-jump" className="w-full bg-[#f0f4f2] py-8 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-sm font-bold text-[#005448]">Made for home learning</p>
            <h2 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
              Our learning apps for your child
            </h2>
            <p className="text-base text-[#3e4946]">
              Interactive, teacher-approved tools for foundational literacy and numeracy on Android
              smartphones.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPS.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-8 lg:py-16">
        <p className="flex items-center gap-1 text-sm font-bold text-[#005448]">
          See it in action
        </p>
        <VideoBlock />
        <p className="px-1 text-sm italic text-[#3e4946]">
          Watch Mama Amani and 6-year-old Baraka do a 5-minute reading practice after school in
          Kibera, Nairobi.
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="w-full scroll-mt-20 bg-[#f0f4f2] py-8 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          <h2 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
            How it works
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span
                  className={`${heading} flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005448] font-bold text-white`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className={`${heading} text-lg font-bold leading-6`}>{s.title}</h3>
                  <p className="mt-1 text-sm text-[#3e4946]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#4e637a] py-10 text-white lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-[#ffdea9]">Real impact</p>
            <h2 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
              What parents & teachers say
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col gap-3 rounded-2xl bg-[#051d30] p-4 shadow-md"
              >
                <div className="flex gap-1 text-[#ffdea9]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[18px] w-[18px] fill-current" />
                  ))}
                </div>
                <blockquote className="italic">“{t.quote}”</blockquote>
                <figcaption className="border-t border-white/10 pt-2">
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="text-sm text-[#c9dffa]">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="flex items-center justify-center gap-2 rounded-xl bg-white/10 p-3 text-center text-sm font-bold backdrop-blur-md">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#ffdea9]" />
            Trusted by 140+ primary schools across 12 Kenyan counties
          </p>
        </div>
      </section>

      {/* WhatsApp */}
      <section className="w-full bg-[#fdbf47] py-8 text-[#704e00] lg:py-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#704e00] text-[#ffdea9] shadow-sm">
              <MessageCircle className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-extrabold">Parent WhatsApp circle</p>
              <h3 className={`${heading} text-[22px] font-bold leading-7`}>
                Get free weekly reading tips
              </h3>
            </div>
          </div>
          <p className="leading-snug">
            Join 15,000+ Kenyan parents receiving simple phonics games, local story
            recommendations, and CBC updates every Monday.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="https://wa.me/254796165792?text=Hello%20Nyansapo%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] flex-1 items-center justify-center gap-1 rounded-xl bg-[#704e00] font-bold text-white shadow-md transition-opacity hover:opacity-95"
            >
              <MessageCircle className="h-5 w-5" /> Join on WhatsApp
            </a>
            <a
              href="https://wa.me/254796165792"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] flex-1 items-center justify-center rounded-xl bg-white text-sm font-bold shadow-sm transition-colors hover:bg-[#f0f4f2]"
            >
              Chat with a teacher directly
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10 lg:py-16">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-[#005448]">Answers for parents</p>
          <h2 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
            Frequently asked questions
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}