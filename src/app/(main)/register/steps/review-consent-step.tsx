import type { UseFormReturn } from "react-hook-form"
import { gradeLevels, type RegistrationFormValues } from "@/lib/registration-schema"

export default function ReviewConsentStep({
  form,
  onBack,
  submitting,
}: {
  form: UseFormReturn<RegistrationFormValues>
  onBack: () => void
  submitting: boolean
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const values = watch()
  const consent = watch("consent")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Almost There
        </h1>
        <p className="text-lg text-muted-foreground">Step 3 of 3: Referral &amp; Consent</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left: form */}
        <div className="flex flex-col gap-10 lg:col-span-7">
          <section className="flex flex-col gap-8 rounded-xl bg-muted/20 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <i className="fa-solid fa-people-group" />
              </div>
              <div>
                <h2 className="mb-1 text-xl font-bold text-foreground">
                  How did you hear about us?
                </h2>
                <p className="text-sm text-muted-foreground">
                  We value our community growth. If a friend or educator
                  referred you, let us know.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Referrer&apos;s Full Name
                </label>
                <input
                  type="text"
                  className="rounded-lg border-0 border-b-2 border-border bg-card px-4 py-4 text-foreground focus:border-primary focus:outline-none focus:ring-0"
                  {...register("referrerName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Referrer&apos;s Phone Number
                </label>
                <input
                  type="tel"
                  className="rounded-lg border-0 border-b-2 border-border bg-card px-4 py-4 text-foreground focus:border-primary focus:outline-none focus:ring-0"
                  {...register("referrerPhone")}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div>
              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-border p-6 transition-colors hover:bg-muted/20">
                <input
                  type="checkbox"
                  checked={consent === true}
                  onChange={(e) =>
                    setValue("consent", e.target.checked as true, {
                      shouldValidate: true,
                    })
                  }
                  className="mt-1 h-6 w-6 rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  I consent to Nyansapo AI collecting and processing my data to
                  personalize the learning experience. I understand that my
                  information is secure and will never be shared without my
                  explicit permission. Read our{" "}
                  <a href="#" className="font-semibold text-primary underline">
                    Privacy Policy
                  </a>{" "}
                  for more details.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-sm text-destructive">{errors.consent.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-5 text-lg font-bold text-primary-foreground shadow-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Complete Registration"}
              <i className="fa-solid fa-champagne-glasses" />
            </button>
            <button
              type="button"
              onClick={onBack}
              className="self-center font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Back
            </button>
          </section>
        </div>

        {/* Right: context panels */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl border border-secondary/10 bg-secondary/5 p-8">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
              <i className="fa-solid fa-comments text-secondary" />
              Our Community Circle
            </h3>
            <p className="mb-6 font-medium leading-relaxed text-muted-foreground">
              At Nyansapo AI, we believe education is a collective journey. By
              sharing who referred you, you help us map the network of impact
              and strengthen our &quot;Village&quot; approach to child
              development.
            </p>
            <div className="mb-4 flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-background bg-secondary/40" />
              <div className="h-10 w-10 rounded-full border-2 border-background bg-secondary/40" />
              <div className="h-10 w-10 rounded-full border-2 border-background bg-secondary/40" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-bold text-muted-foreground">
                +1.2k
              </div>
            </div>
            <p className="text-xs font-medium italic text-secondary">
              Join 1,200+ families already in the circle.
            </p>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-border bg-muted/20 p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm">
                <i className="fa-solid fa-shield-halved text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Data Sovereignty</h4>
                <p className="text-xs text-muted-foreground">
                  Your child&apos;s progress data belongs to you.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm">
                <i className="fa-solid fa-lock text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">End-to-End Encryption</h4>
                <p className="text-xs text-muted-foreground">
                  Banking-grade security for all learning logs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
            <i className="fa-solid fa-chevron-up mb-2 animate-bounce text-primary" />
            <p className="font-bold tracking-tight text-foreground">Unlocking Potential</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              AI-Powered Growth Engine
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Summary
        </h3>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Parent</dt>
            <dd className="font-semibold text-foreground">{values.parentFullName || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-semibold text-foreground">
              {values.parentPhone ? `+254 ${values.parentPhone}` : "—"}
            </dd>
          </div>
          {values.children?.map((child, index) => (
            <div key={index} className="flex justify-between gap-4 border-t border-border pt-3">
              <dt className="text-muted-foreground">
                Child {index + 1}
                {child.school ? ` · ${child.school}` : ""}
              </dt>
              <dd className="text-right font-semibold text-foreground">
                {child.firstName || "—"}
                {child.grade
                  ? ` (${gradeLevels.find((g) => g.value === child.grade)?.label})`
                  : ""}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}