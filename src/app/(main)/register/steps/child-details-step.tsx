import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import {
  gradeLevels,
  defaultChild,
  type RegistrationFormValues,
} from "@/lib/registration-schema"

type Props = {
  form: UseFormReturn<RegistrationFormValues>
  childrenArray: UseFieldArrayReturn<RegistrationFormValues, "children">
  onNext: () => void
  onBack: () => void
}

export default function ChildDetailsStep({ form, childrenArray, onNext, onBack }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form
  const { fields, append, remove } = childrenArray

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Step 2 of 3
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Child&apos;s Details
        </h1>
      </div>

      {/* FORM – already first in the flex column, so it's on top on mobile */}
      <div className="flex flex-col gap-8 rounded-xl border border-border bg-card p-8 shadow-sm md:p-10">
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => {
            const selectedGrade = watch(`children.${index}.grade`)
            const childErrors = errors.children?.[index]

            return (
              <div
                key={field.id}
                className="flex flex-col gap-6 rounded-lg border border-border bg-muted/20 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Child {index + 1}
                  </span>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm font-semibold text-destructive hover:opacity-80"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Child&apos;s First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="rounded-lg border-0 border-b-2 border-border bg-background px-4 py-4 text-xl font-medium text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0"
                    {...register(`children.${index}.firstName` as const)}
                  />
                  {childErrors?.firstName && (
                    <p className="text-sm text-destructive">
                      {childErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Grade Level
                  </label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {gradeLevels.map((grade) => (
                      <button
                        key={grade.value}
                        type="button"
                        onClick={() =>
                          setValue(`children.${index}.grade`, grade.value, {
                            shouldValidate: true,
                          })
                        }
                        className={`flex flex-col items-center justify-center gap-4 rounded-xl border-2 p-6 text-center transition-all ${
                          selectedGrade === grade.value
                            ? "border-primary bg-primary/10"
                            : "border-transparent bg-background hover:border-primary/40"
                        }`}
                      >
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                            selectedGrade === grade.value ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <i className={`fa-solid ${grade.icon} text-2xl text-primary`} />
                        </div>
                        <span className="font-bold text-foreground">{grade.label}</span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          {grade.ageRange}
                        </span>
                      </button>
                    ))}
                  </div>
                  {childErrors?.grade && (
                    <p className="text-sm text-destructive">{childErrors.grade.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Current School (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="School name"
                    className="rounded-lg border-0 border-b-2 border-border bg-background px-4 py-4 text-lg font-medium text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0"
                    {...register(`children.${index}.school` as const)}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => append(defaultChild)}
          className="flex items-center gap-2 self-start font-bold text-foreground transition-colors hover:text-primary"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <i className="fa-solid fa-plus text-xs" />
          </span>
          Add another child
        </button>

        <div className="flex flex-col gap-4 pt-2 md:flex-row">
          <button
            type="button"
            onClick={onNext}
            className="flex-grow rounded-lg bg-primary py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Continue to Assessment
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Back
          </button>
        </div>
      </div>

      {/* “Why we ask?” section – now text appears above image on mobile (text first in DOM) */}
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="mb-4 text-2xl font-bold text-primary">Why we ask?</h3>
          <p className="leading-relaxed text-muted-foreground">
            Tailoring the learning journey starts with understanding where your
            child is today. Our AI adapts content based on their grade and
            reading level to ensure they are always challenged but never
            overwhelmed.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="relative">
            <div className="absolute inset-0 -rotate-3 scale-105 rounded-3xl bg-secondary/20" />
            <img
              src="imgs/gallery/6.jpg"
              alt="A child exploring a tablet in a cozy home library"
              className="relative z-10 aspect-video w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}