import { CalendarEvent } from './types'

const API_URL = import.meta.env.VITE_HA_URL
const TOKEN = import.meta.env.VITE_HA_TOKEN
const HA_CALENDAR = import.meta.env.VITE_HA_CALENDAR

export const calendarKeys = {
  all: ['calendar'] as const,
  events: () => [...calendarKeys.all, 'events'] as const,
  holidays: () => [...calendarKeys.all, 'holidays'] as const,
}

export function getCalendarEvents(): Promise<CalendarEvent[]> {
  const params = new URLSearchParams(getStartAndEndDate())

  return fetch(`${API_URL}/api/calendars/${HA_CALENDAR}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export function getHolidays(): Promise<CalendarEvent[]> {
  const params = new URLSearchParams(getStartAndEndDate())

  return fetch(
    `${API_URL}/api/calendars/calendar.holidays_in_canada?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json())
}

/** current date until end of month */
function getStartAndEndDate() {
  const now = new Date()

  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )

  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)
  )

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  }
}
