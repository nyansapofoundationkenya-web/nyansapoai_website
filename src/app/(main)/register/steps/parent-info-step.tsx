import type { UseFormReturn } from "react-hook-form"
import type { RegistrationFormValues } from "@/lib/registration-schema"

export default function ParentInfoStep({
  form,
  onNext,
}: {
  form: UseFormReturn<RegistrationFormValues>
  onNext: () => void
}) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left: hero + info cards – now appears second on mobile, first on desktop */}
      <div className="order-2 flex flex-col gap-8 lg:order-1 lg:col-span-7">
        <div className="relative h-[320px] overflow-hidden rounded-xl shadow-xl md:h-[400px]">
          <img
            src="imgs/gallery/2.jpg"
            alt="Children collaborating in a bright classroom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Unlock Your Child&apos;s Future this Holiday.
            </h1>
            <p className="max-w-lg text-white/90">
              Join the Holiday Programme at Nyansapo AI, where technology meets
              traditional learning to nurture the next generation of leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/20 p-6">
            <i className="fa-solid fa-brain mb-3 text-3xl text-primary" />
            <h3 className="mb-2 text-lg font-bold text-foreground">AI-Driven Insights</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Personalized learning paths tailored to your child&apos;s specific
              strengths and growth areas.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-6">
            <i className="fa-solid fa-user-shield mb-3 text-3xl text-secondary" />
            <h3 className="mb-2 text-lg font-bold text-foreground">Expert Mentorship</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Guidance from certified educators and industry leaders in a safe,
              supportive environment.
            </p>
          </div>
        </div>
      </div>

      {/* Right: form – now appears first on mobile (top), second on desktop */}
      <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-5">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <header className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">About You</h2>
            <p className="text-sm text-muted-foreground">
              Please provide your primary contact details to begin the
              registration process.
            </p>
          </header>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="parentFullName"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Full Name
              </label>
              <input
                id="parentFullName"
                type="text"
                placeholder="Enter your full name"
                className="rounded-lg border-0 border-b-2 border-border bg-muted/40 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-0"
                {...register("parentFullName")}
              />
              {errors.parentFullName && (
                <p className="text-sm text-destructive">
                  {errors.parentFullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="parentPhone"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">
                  +254
                </span>
                <input
                  id="parentPhone"
                  type="tel"
                  placeholder="712 345 678"
                  className="w-full rounded-lg border-0 border-b-2 border-border bg-muted/40 py-4 pl-16 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-0"
                  {...register("parentPhone")}
                />
              </div>
              {errors.parentPhone && (
                <p className="text-sm text-destructive">{errors.parentPhone.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onNext}
              className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Continue to Child&apos;s Details
              <i className="fa-solid fa-arrow-right" />
            </button>
            <p className="px-4 text-center text-[10px] leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="font-bold text-primary underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="font-bold text-primary underline">
                Terms of Service
              </a>
              . We will use your data to manage your child&apos;s programme.
            </p>
          </div>
        </div>

        <div className="flex w-4/5 items-center gap-4 self-end rounded-xl border-l-4 border-secondary bg-secondary/5 p-6">
          <div className="rounded-lg bg-secondary p-2 text-secondary-foreground">
            <i className="fa-solid fa-lock text-xl" />
          </div>
          <div>
            <p className="text-sm font-bold text-secondary">Secure Enrollment</p>
            <p className="text-xs text-muted-foreground">
              Your data is encrypted and protected by bank-grade security
              protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}