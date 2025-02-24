export interface CalendarEvent {
  start: {
    date: string // Format: YYYY-MM-DD
  }
  end: {
    date: string // Format: YYYY-MM-DD
  }
  summary: string
  description: string
  location: string | null
  uid: string
  recurrence_id: string | null
  rrule: string | null
}
