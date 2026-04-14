"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const WORK_HOURS: string[] = []
for (let h = 8; h < 17; h++) {
  WORK_HOURS.push(`${pad(h)}:00`)
  WORK_HOURS.push(`${pad(h)}:30`)
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function fmt12(slot: string) {
  const [h, m] = slot.split(":").map(Number)
  const ap = h >= 12 ? "PM" : "AM"
  return `${h % 12 || 12}:${pad(m)} ${ap}`
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

function fmtFull(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00")
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

interface Props {
  onSelect: (date: string, time: string) => void
}

export default function DemoCalendar({ onSelect }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [freeMap, setFreeMap] = useState<Record<string, string[]>>({})
  const [loadingDates, setLoadingDates] = useState<Set<string>>(new Set())

  // Fetch all weekdays in the current month view
  const fetchMonth = useCallback(async () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const datesToFetch: string[] = []

    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(viewYear, viewMonth, d)
      const dow = dt.getDay()
      const dateStr = toDateStr(viewYear, viewMonth, d)
      // Only weekdays we haven't fetched yet
      if (dow !== 0 && dow !== 6 && freeMap[dateStr] === undefined) {
        datesToFetch.push(dateStr)
      }
    }

    if (datesToFetch.length === 0) return

    setLoadingDates(new Set(datesToFetch))

    const results: Record<string, string[]> = {}
    await Promise.all(
      datesToFetch.map(async (dateStr) => {
        try {
          const res = await fetch(`/api/availability?date=${dateStr}`)
          const data = await res.json()
          results[dateStr] = data.slots ?? []
        } catch {
          results[dateStr] = []
        }
      })
    )

    setFreeMap((prev) => ({ ...prev, ...results }))
    setLoadingDates(new Set())
  }, [viewYear, viewMonth])

  useEffect(() => {
    fetchMonth()
  }, [fetchMonth])

  const navMonth = (dir: number) => {
    let m = viewMonth + dir
    let y = viewYear
    if (m > 11) { m = 0; y++ }
    if (m < 0) { m = 11; y-- }
    setViewMonth(m)
    setViewYear(y)
    setSelectedDate(null)
    setSelectedSlot(null)
  }

  const isPrevDisabled =
    viewYear === today.getFullYear() && viewMonth <= today.getMonth()

  const handlePickDate = (dateStr: string) => {
    setSelectedDate(dateStr)
    setSelectedSlot(null)
  }

  const handlePickSlot = (slot: string) => {
    setSelectedSlot(slot)
    if (selectedDate) onSelect(selectedDate, slot)
  }

  // Build calendar grid
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const trailingBlanks = (7 - ((firstDow + daysInMonth) % 7)) % 7

  const freeSlots = (dateStr: string) => freeMap[dateStr] ?? []
  const hasFree = (dateStr: string) => freeSlots(dateStr).length > 0
  const isLoading = (dateStr: string) => loadingDates.has(dateStr)

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-GB",
    { month: "long", year: "numeric" }
  )

  const selectedLabel =
    selectedDate && selectedSlot
      ? `${fmtFull(selectedDate)} at ${fmt12(selectedSlot)}`
      : null

  return (
    <div className="space-y-3">
      {/* Calendar card */}
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Month nav header */}
        <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
          <span className="text-sm font-semibold text-foreground">{monthLabel}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPrevDisabled}
              onClick={() => navMonth(-1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-border bg-background text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setViewYear(today.getFullYear())
                setViewMonth(today.getMonth())
                setSelectedDate(null)
                setSelectedSlot(null)
              }}
              className="px-3 h-7 text-xs rounded border border-border bg-background text-foreground hover:bg-muted transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => navMonth(1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-border bg-background text-foreground hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day-of-week row */}
        <div
          className="bg-muted border-b border-border"
          style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))" }}
        >
          {DOW.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[11px] text-muted-foreground uppercase tracking-widest"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))" }}>
          {/* Leading blanks */}
          {Array.from({ length: firstDow }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="bg-muted border-b border-r border-border"
              style={{ minHeight: "56px" }}
            />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dt = new Date(viewYear, viewMonth, day)
            const dateStr = toDateStr(viewYear, viewMonth, day)
            const dow = dt.getDay()
            const isWeekend = dow === 0 || dow === 6
            const isPast = dt < today
            const isToday = dt.getTime() === today.getTime()
            const isSel = selectedDate === dateStr
            const loading = isLoading(dateStr)
            const free = !isPast && !isWeekend && hasFree(dateStr)
            const slots = freeSlots(dateStr)
            const freeCount = slots.length
            const busyCount = WORK_HOURS.length - freeCount

            const isLastRow =
              Math.ceil((firstDow + day) / 7) ===
              Math.ceil((firstDow + daysInMonth) / 7)

            let bg = "bg-background"
            if (isWeekend || isPast) bg = "bg-muted"
            if (isSel) bg = "bg-primary"
            if (free && !isSel) bg = "bg-background hover:bg-emerald-50"

            return (
              <div
                key={day}
                onClick={() => free && handlePickDate(dateStr)}
                style={{ minHeight: "56px" }}
                className={[
                  "flex flex-col items-center pt-1.5 pb-1 gap-1 border-r border-b border-border last-of-type:border-r-0 transition-colors",
                  isLastRow ? "border-b-0" : "",
                  free ? "cursor-pointer" : "cursor-default",
                  bg,
                ].join(" ")}
              >
                {/* Date number */}
                <div
                  className={[
                    "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium",
                    isToday && !isSel
                      ? "bg-primary text-primary-foreground"
                      : isSel
                      ? "text-primary-foreground"
                      : isPast || isWeekend
                      ? "text-muted-foreground/40"
                      : "text-foreground",
                  ].join(" ")}
                >
                  {day}
                </div>

                {/* Availability dots */}
                {!isPast && !isWeekend && (
                  <div className="flex gap-[3px] flex-wrap justify-center px-1">
                    {loading ? (
                      <div className="w-3 h-1.5 rounded-full bg-muted-foreground/20 animate-pulse" />
                    ) : (
                      <>
                        {Array.from({ length: Math.min(freeCount, 5) }).map(
                          (_, i) => (
                            <div
                              key={`f${i}`}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSel
                                  ? "bg-white/70"
                                  : "bg-emerald-500"
                              }`}
                            />
                          )
                        )}
                        {Array.from({
                          length: Math.min(busyCount, 3),
                        }).map((_, i) => (
                          <div
                            key={`b${i}`}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSel
                                ? "bg-white/30"
                                : "bg-border"
                            }`}
                          />
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* Trailing blanks */}
          {Array.from({ length: trailingBlanks }).map((_, i) => (
            <div
              key={`t-${i}`}
              className="bg-muted border-r border-border last:border-r-0"
              style={{ minHeight: "56px" }}
            />
          ))}
        </div>

        {/* Slot panel — shown below calendar when a date is selected */}
        {selectedDate && (
          <div className="border-t border-border">
            <div className="bg-muted px-4 py-2.5 border-b border-border">
              <p className="text-sm font-medium text-foreground">
                {fmtFull(selectedDate)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                EAT · Nairobi time · select a time slot below
              </p>
            </div>

            {freeSlots(selectedDate).length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No available slots on this day — all times are booked. Please
                pick another date.
              </div>
            ) : (
              <div
                className="p-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                  gap: "8px",
                }}
              >
                {WORK_HOURS.map((slot) => {
                  const isFreeSlot = freeSlots(selectedDate).includes(slot)
                  const isPicked = selectedSlot === slot

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!isFreeSlot}
                      onClick={() => isFreeSlot && handlePickSlot(slot)}
                      className={[
                        "py-2 px-1 rounded border text-xs font-medium transition-colors",
                        isPicked
                          ? "bg-primary border-primary text-primary-foreground"
                          : isFreeSlot
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                          : "bg-muted border-border text-muted-foreground/40 cursor-not-allowed",
                      ].join(" ")}
                    >
                      {fmt12(slot)}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-5 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Free slots
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-border inline-block" />
          Busy slots
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary inline-block" />
          Selected date
        </span>
      </div>

      {/* Confirmation bar */}
      {selectedLabel ? (
        <div className="flex items-center gap-2 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
          <span>✓</span>
          <span>
            <strong>Selected:</strong> {selectedLabel}
          </span>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground px-1">
          {selectedDate
            ? "Now pick a time slot above."
            : "Click any date with green dots to see available times."}
        </div>
      )}
    </div>
  )
}