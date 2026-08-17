import { NextRequest, NextResponse } from "next/server"
import africastalking from "@/lib/africastalking"
import { adminDb } from "@/lib/firebase"
import { registrationSchema } from "@/lib/registration-schema"

function normalizeKenyanPhone(raw: string): string {
  const phone = raw.replace(/\s+/g, "").replace(/-/g, "")
  if (phone.startsWith("+254")) return phone
  if (phone.startsWith("254")) return `+${phone}`
  if (phone.startsWith("0")) return `+254${phone.substring(1)}`
  return `+254${phone}`
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = registrationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid registration data", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const values = parsed.data

  // -----------------------------------------
  // Normalize Kenyan phone number (moved up so we can dedupe on it)
  // -----------------------------------------
  const fullPhone = normalizeKenyanPhone(values.parentPhone)

  // -----------------------------------------
  // Enforce uniqueness by using the phone number as the doc ID.
  // .create() throws if the doc already exists, so this is atomic —
  // no race condition between "check" and "write".
  // -----------------------------------------
  const docRef = adminDb.collection("parent").doc(fullPhone)

  try {
    await docRef.create({
      ...values,
      parentPhone: fullPhone,
      createdAt: new Date(),
    })
  } catch (error: any) {
    // Firestore admin SDK throws code 6 (ALREADY_EXISTS) when create() collides
    if (error?.code === 6) {
      return NextResponse.json(
        { error: "This phone number is already registered." },
        { status: 409 }
      )
    }
    console.error("Firestore write failed:", error)
    return NextResponse.json(
      { error: "Could not save registration" },
      { status: 500 }
    )
  }

  const docId = docRef.id

  let smsSent = false
  if (africastalking) {
    try {
      console.log("========== AFRICA'S TALKING DEBUG ==========")
      console.log("Username:", process.env.AT_USERNAME)
      console.log("Sender:", process.env.AT_SENDER_ID || "(default)")
      console.log("Recipient:", fullPhone)
      console.log("============================================")

      const options: {
        to: string[]
        message: string
        from?: string
      } = {
        to: [fullPhone],
        message: `Hi ${values.parentFullName}, thanks for registering with Nyansapo AI! We'll reach out to you shortly.`,
      }

      if (process.env.AT_SENDER_ID && process.env.AT_USERNAME !== "sandbox") {
        options.from = process.env.AT_SENDER_ID
      }

      const response = await africastalking.SMS.send(options)
      console.log("========== AFRICA'S TALKING RESPONSE ==========")
      console.log(JSON.stringify(response, null, 2))
      console.log("================================================")
      smsSent = true
    } catch (error: any) {
      console.error("========== AFRICA'S TALKING ERROR ==========")
      console.error(error?.response?.data ?? error)
      console.error("============================================")
    }
  } else {
    console.log("[SMS STUB] Africa's Talking credentials not configured.")
  }

  return NextResponse.json({
    success: true,
    id: docId,
    smsSent,
  })
}