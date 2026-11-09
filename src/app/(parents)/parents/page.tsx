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
  GraduationCap,
  Info,
  MapPin,
  MessageCircle,
  Play,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
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
/* Brand palette (from globals.css)                                    */
/*   yellow     #FACC15   yellow-hover #EAB308   yellow-soft #FEF08A   */
/*   yellow-ink #422006   (yellow is for accents only, not backgrounds) */
/*   navy       #142848   navy-hover   #1d3a66   navy-deep   #0c1a2f   */
/*   blue       #5AA1CE   blue-tint    #DCEBF6                          */
/*   cream      #f4f1eb   cream-low    #ebe6db   cream-line  #ddd7c9   */
/*   ink        #0b1220   muted        #475569                          */
/* ------------------------------------------------------------------ */

/* Google Play logo (lucide has no brand icons) */
function PlayStoreIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#00A0FF" d="M3.6 2.4 14 12 3.6 21.6c-.4-.2-.6-.6-.6-1.1V3.5c0-.5.2-.9.6-1.1Z" />
      <path fill="#00E676" d="M4 2.2 14 12l3.2-3.2L5.4 2.3c-.5-.2-1-.2-1.4-.1Z" />
      <path fill="#FF3D00" d="M4 21.8 14 12l3.2 3.2-11.8 6.5c-.5.2-1 .2-1.4.1Z" />
      <path fill="#FFD600" d="m17.2 8.8 3.2 1.8c.8.5.8 1.9 0 2.4l-3.2 2.2L14 12l3.2-3.2Z" />
    </svg>
  )
}

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
  size: string
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
    image: "/images/parents/hekima.webp",
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
    image: "/images/parents/stadi.webp",
    icon: BadgeCheck,
  },
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
function InstallButton({
  href,
  size,
  tabIndex,
  className = "",
}: {
  href: string
  size?: string
  tabIndex?: number
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      aria-label={`Install now on Google Play${size ? ` (${size})` : ""}`}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#142848] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1d3a66] ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
        <PlayStoreIcon className="h-4 w-4" />
      </span>
      Install now
      {size && <span className="text-xs font-semibold text-[#FEF08A]">· {size}</span>}
    </a>
  )
}

function AppCard({ app }: { app: AppInfo }) {
  const [flipped, setFlipped] = useState(false)
  const AgeIcon = app.ageIcon
  const Icon = app.icon

  return (
    <div className="h-[500px] w-full [perspective:1000px]">
      <div
        className="relative h-full w-full rounded-2xl shadow-lg transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          aria-hidden={flipped}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-[#142848] bg-white [backface-visibility:hidden]"
        >
          <div className="relative h-[300px] w-full shrink-0 bg-[#ebe6db]">
            <Image
              src={app.image}
              alt={`${app.name} app preview`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top"
            />

            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FACC15] px-3 py-1 text-xs font-bold text-[#422006]">
                <AgeIcon className="h-4 w-4" /> {app.ageBadge}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-[#142848] backdrop-blur-md">
                <BadgeCheck className="h-3.5 w-3.5" /> {app.verifiedBadge}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-[#142848]/85 px-3.5 py-3 text-white backdrop-blur-md">
              <p className="mb-0.5 text-[11px] font-bold text-[#FACC15]">{app.tag}</p>
              <h3 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
                {app.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
            <p className="text-sm leading-snug text-[#475569]">{app.short}</p>
            <div className="flex items-center gap-2">
              <InstallButton
                href={app.href}
                size={app.size}
                tabIndex={flipped ? -1 : 0}
                className="flex-grow"
              />
              <button
                type="button"
                onClick={() => setFlipped(true)}
                tabIndex={flipped ? -1 : 0}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1 rounded-xl bg-[#DCEBF6] px-3 py-2 text-sm font-bold text-[#142848] transition-colors hover:bg-[#5AA1CE]/40"
              >
                Details <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          aria-hidden={!flipped}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#142848] bg-white p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 border-b border-[#ebe6db] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#142848] text-[#FACC15]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`${heading} text-lg font-bold leading-6 text-[#142848]`}>
                    {app.name}
                  </h3>
                  <span className="text-[11px] text-[#475569]">
                    {app.verifiedBadge} • {app.ageBadge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? 0 : -1}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#DCEBF6] px-2.5 py-1 text-xs font-semibold text-[#142848]"
              >
                <RotateCcw className="h-4 w-4" /> Preview
              </button>
            </div>

            <p className="text-sm leading-snug text-[#475569]">{app.description}</p>

            <ul className="flex flex-col gap-2 rounded-xl bg-[#142848] p-3 text-white">
              {app.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm leading-tight">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#FACC15]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <InstallButton
              href={app.href}
              size={app.size}
              tabIndex={flipped ? 0 : -1}
              className="w-full"
            />
            <p className="mt-1.5 text-center text-[11px] text-[#475569]">
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
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-4 border-[#142848] bg-[#0c1a2f] shadow-lg">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/videos/parents-demo.mp4#t=0.1"
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
          className="absolute inset-0 flex items-center justify-center bg-[#0c1a2f]/30 transition-colors hover:bg-[#0c1a2f]/40"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FACC15] text-[#422006] shadow-lg">
            <Play className="ml-0.5 h-7 w-7 fill-current" />
          </span>
        </button>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0c1a2f]/80 p-4 text-center text-sm text-white">
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
    <div className="overflow-hidden rounded-xl border-2 border-[#142848] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-4 text-left text-base font-bold text-[#142848]"
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#5AA1CE] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-4 pb-4 text-base text-[#475569]">{a}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function ParentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const primary = APPS[0]

  return (
    <div
      className={`${nunito.variable} ${jakarta.variable} bg-[#f4f1eb] font-[family-name:var(--font-nunito)] text-[#0b1220]`}
    >
      {/* Hero — NAVY */}
      <section className="w-full bg-[#142848] text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-10 pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FACC15] px-4 py-1 text-sm font-bold text-[#422006]">
                <MapPin className="h-4 w-4" /> For parents in Kenya
              </span>
              <h1
                className={`${heading} mt-1 text-[32px] font-extrabold leading-[38px] tracking-tight lg:text-[48px] lg:leading-[56px]`}
              >
                Is your child learning at their{" "}
                <span className="text-[#FACC15]">level?</span>
              </h1>
              <p className="text-base text-[#DCEBF6] lg:text-lg">
                Find out in minutes, then help them improve with fun lessons at home.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:max-w-md">
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] w-full items-center justify-center gap-1 rounded-xl bg-[#FACC15] font-bold text-[#422006] shadow-md transition-colors hover:bg-[#EAB308]"
              >
                <PlayCircle className="h-5 w-5" /> Start a free reading check
              </a>
              <a
                href="#how-it-works"
                className="flex min-h-[48px] w-full items-center justify-center gap-1 rounded-xl bg-white/10 font-bold text-white transition-colors hover:bg-white/20"
              >
                <Info className="h-[18px] w-[18px]" /> How it works
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#0c1a2f] shadow-lg">
            <Image
              src="/images/parents/hero-mother-child.png"
              alt="Kenyan mother and young daughter practising phonics together on a smartphone"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-[#0c1a2f]/90 p-2.5 shadow-md backdrop-blur-md">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FACC15] text-[#422006]">
                <Star className="h-[18px] w-[18px] fill-current" />
              </span>
              <p className="text-sm font-semibold leading-tight text-white">
                Built for Kenyan homes • Trusted by CBC teachers nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apps — CREAM (darker) */}
      <section id="assessment-jump" className="w-full bg-[#ebe6db] py-10 lg:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#5AA1CE]">
              Made for home learning
            </p>
            <h2
              className={`${heading} text-[28px] font-extrabold leading-9 tracking-tight text-[#142848]`}
            >
              Our learning apps for your child
            </h2>
            <p className="text-base text-[#475569]">
              Interactive, teacher-approved tools for foundational literacy and numeracy on Android
              smartphones.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {APPS.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* Video — CREAM */}
      <section className="w-full bg-[#f4f1eb] py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#5AA1CE]">
            See it in action
          </p>
          <VideoBlock />
          <p className="px-1 text-sm italic text-[#475569]">
            Watch Mama Amani and 6-year-old Baraka do a 5-minute reading practice after school in
            Kibera, Nairobi.
          </p>
        </div>
      </section>

      {/* How it works — BRAND BLUE */}
      <section id="how-it-works" className="w-full scroll-mt-20 bg-[#5AA1CE] py-10 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#142848]">
              Three easy steps
            </p>
            <h2
              className={`${heading} text-[28px] font-extrabold leading-9 tracking-tight text-[#0c1a2f]`}
            >
              How it works
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-3 rounded-2xl bg-[#142848] p-4 text-white shadow-md"
              >
                <span
                  className={`${heading} flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FACC15] font-bold text-[#422006]`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className={`${heading} text-lg font-bold leading-6`}>{s.title}</h3>
                  <p className="mt-1 text-sm text-[#DCEBF6]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials — NAVY */}
      <section className="w-full bg-[#142848] py-10 text-white lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-[#FACC15]">Real impact</p>
            <h2 className={`${heading} text-[28px] font-bold leading-9 tracking-tight`}>
              What parents & teachers say
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col gap-3 rounded-2xl bg-[#0c1a2f] p-4 shadow-md"
              >
                <div className="flex gap-1 text-[#FACC15]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-[18px] w-[18px] fill-current" />
                  ))}
                </div>
                <blockquote className="italic">“{t.quote}”</blockquote>
                <figcaption className="border-t border-white/10 pt-2">
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="text-sm text-[#5AA1CE]">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="flex items-center justify-center gap-2 rounded-xl bg-white/10 p-3 text-center text-sm font-bold backdrop-blur-md">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#FACC15]" />
            Trusted by 140+ primary schools across 12 Kenyan counties
          </p>
        </div>
      </section>

      {/* WhatsApp — LIGHT BLUE */}
      <section className="w-full bg-[#DCEBF6] py-10 text-[#142848] lg:py-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#142848] text-[#FACC15] shadow-sm">
              <MessageCircle className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#5AA1CE]">
                Parent WhatsApp circle
              </p>
              <h3 className={`${heading} text-[22px] font-extrabold leading-7 text-[#142848]`}>
                Get free weekly reading tips
              </h3>
            </div>
          </div>
          <p className="leading-snug text-[#475569]">
            Join 15,000+ Kenyan parents receiving simple phonics games, local story
            recommendations, and CBC updates every Monday.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="https://wa.me/254796165792?text=Hello%20Nyansapo%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] flex-1 items-center justify-center gap-1 rounded-xl bg-[#142848] font-bold text-white shadow-md transition-colors hover:bg-[#1d3a66]"
            >
              <MessageCircle className="h-5 w-5" /> Join on WhatsApp
            </a>
            <a
              href="https://wa.me/254796165792"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] flex-1 items-center justify-center rounded-xl border-2 border-[#142848] bg-white text-sm font-bold text-[#142848] transition-colors hover:bg-[#f4f1eb]"
            >
              Chat with a teacher directly
            </a>
          </div>
        </div>
      </section>

      {/* FAQ — CREAM */}
      <section className="w-full bg-[#f4f1eb] py-10 lg:py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#5AA1CE]">
              Answers for parents
            </p>
            <h2
              className={`${heading} text-[28px] font-extrabold leading-9 tracking-tight text-[#142848]`}
            >
              Frequently asked questions
            </h2>
          </div>
          <div className="flex flex-col gap-2">
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
        </div>
      </section>
    </div>
  )
}