import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "victor@nyansapoai.app"
const WORK_START_HOUR = 8   // EAT (Nairobi time)
const WORK_END_HOUR = 17    // EAT (Nairobi time)

function getCalendarClient() {
  // OAuth 2.0 setup (using your existing refresh token)
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // redirect URI
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  return google.calendar({ version: "v3", auth: oauth2Client })
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date")
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 })

  const dayOfWeek = new Date(date).getUTCDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return NextResponse.json({ slots: [], reason: "weekend" })
  }

  // Convert EAT (UTC+3) to UTC for the API
  const utcStartHour = WORK_START_HOUR - 3  // 8 AM EAT = 5 AM UTC
  const utcEndHour = WORK_END_HOUR - 3      // 5 PM EAT = 2 PM UTC
  
  const timeMin = `${date}T${String(utcStartHour).padStart(2, "0")}:00:00Z`
  const timeMax = `${date}T${String(utcEndHour).padStart(2, "0")}:00:00Z`

  console.log(`Querying calendar ${CALENDAR_ID} from ${timeMin} to ${timeMax}`)

  try {
    const calendar = getCalendarClient()
    
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: CALENDAR_ID }],
      },
    })

    const busySlots = freeBusy.data.calendars?.[CALENDAR_ID]?.busy ?? []
    console.log("Busy slots found:", busySlots.length, busySlots)

    // Generate slots in EAT (display) timezone
    const allSlots: string[] = []
    for (let h = WORK_START_HOUR; h < WORK_END_HOUR; h++) {
      allSlots.push(`${String(h).padStart(2, "0")}:00`)
      allSlots.push(`${String(h).padStart(2, "0")}:30`)
    }

    // Convert slot to UTC for comparison
    const availableSlots = allSlots.filter(slot => {
      const [hour, minute] = slot.split(":").map(Number)
      const slotUtcHour = hour - 3
      const slotStart = new Date(`${date}T${String(slotUtcHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`)
      const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000)
      
      return !busySlots.some(busy => {
        const busyStart = new Date(busy.start!)
        const busyEnd = new Date(busy.end!)
        return slotStart < busyEnd && slotEnd > busyStart
      })
    })

    return NextResponse.json({ slots: availableSlots })
  } catch (err: any) {
    console.error("Calendar API Error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}