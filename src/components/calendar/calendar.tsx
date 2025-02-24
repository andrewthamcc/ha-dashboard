import { useQueries } from '@tanstack/react-query'
import { calendarKeys, getCalendarEvents, getHolidays } from '@api/calendar'
import CalendarIcon from '@icons/calendar.svg?react'

export const Calendar = () => {
  const data = useQueries({
    queries: [
      {
        queryKey: calendarKeys.events(),
        queryFn: getCalendarEvents,
      },
      {
        queryKey: calendarKeys.holidays(),
        queryFn: getHolidays,
      },
    ],
  })

  if (data.some(({ isLoading }) => isLoading)) {
    return (
      <div
        className="flex animate-pulse flex-col items-center justify-center gap-3"
        role="status"
      >
        <div className="h-5 w-full rounded-xs bg-gray-500" />
        <div className="h-5 w-full rounded-xs bg-gray-500" />
        <div className="h-5 w-full rounded-xs bg-gray-500" />
        <div className="h-5 w-full rounded-xs bg-gray-500" />
        <div className="h-5 w-full rounded-xs bg-gray-500" />
      </div>
    )
  }

  if (data.some(({ error }) => error)) {
    data.forEach(({ error }) => {
      if (error instanceof Error) {
        console.error(error)
      }
    })

    return null
  }

  const events = data[0].data?.map(({ description, uid, start, end }) => ({
    description,
    id: uid,
    start: start.date,
    end: end.date,
  }))
  const holidays = data[1].data

  if (events?.length === 0 && holidays?.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <CalendarIcon />
        <p className="text-center text-sm text-white/80">No upcoming events</p>
      </div>
    )
  }

  return <div></div>
}
