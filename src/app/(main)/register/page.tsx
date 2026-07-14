import { Metadata } from "next"
import RegistrationWizard from "./registration-wizard"

export const metadata: Metadata = {
  title: "Register | Nyansapo AI",
  description:
    "Register your child for the Nyansapo AI holiday programme in three quick steps.",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <RegistrationWizard />
    </main>
  )
}