import { z } from "zod"

export const gradeLevels = [
  {
    value: "play_group",
    label: "Play Group",
    ageRange: "Ages 3-5",
    icon: "fa-child-reaching",
  },
  {
    value: "p1_p2",
    label: "P1 - P2",
    ageRange: "Ages 6-7",
    icon: "fa-book-open",
  },
  {
    value: "grade_1_3",
    label: "Grade 1-3",
    ageRange: "Ages 7-9",
    icon: "fa-graduation-cap",
  },
] as const

export const childSchema = z.object({
  firstName: z.string().min(1, "Child's first name is required"),
  grade: z.enum(["play_group", "p1_p2", "grade_1_3"], {
    errorMap: () => ({ message: "Please select a grade level" }),
  }),
  school: z.string().optional(),
})

export const registrationSchema = z.object({
  parentFullName: z.string().min(2, "Please enter your full name"),
  parentPhone: z
    .string()
    .regex(/^[17]\d{8}$/, "Enter a valid number, e.g. 712345678"),
  children: z.array(childSchema).min(1, "Add at least one child"),
  referrerName: z.string().optional(),
  referrerPhone: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to continue" }),
  }),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>
export type ChildValues = z.infer<typeof childSchema>

// Cast away strictness here on purpose: react-hook-form needs a starting
// value for the grade/consent fields, but zod requires the real enum/literal.
export const defaultChild = {
  firstName: "",
  grade: undefined,
  school: "",
} as unknown as ChildValues

export const defaultValues = {
  parentFullName: "",
  parentPhone: "",
  children: [defaultChild],
  referrerName: "",
  referrerPhone: "",
  consent: undefined,
} as unknown as RegistrationFormValues