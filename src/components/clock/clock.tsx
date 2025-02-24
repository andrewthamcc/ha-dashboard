import { useEffect, useState } from 'react'
import { CurrentTemp } from '@components/weather/current-temp'

const LABEL_DAYS: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

const LABEL_MONTHS: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

function handleTime(time: Date) {
  let hour = time.getHours()
  const minute = time.getMinutes().toString().padStart(2, '0')
  const meridiem = hour >= 12 ? 'PM' : 'AM'

  hour = hour % 12 || 12

  return `${hour}:${minute} ${meridiem}`
}

export const Clock = () => {
  const [date, setDate] = useState<string | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!date) {
      const time = new Date()
      const day = LABEL_DAYS[time.getDay()]
      const month = LABEL_MONTHS[time.getMonth()]
      const monthDate = time.getDate()
      const year = time.getFullYear()

      const currentDate = `${month} ${monthDate}, ${year}`
      setDate(currentDate)

      const currentTime = handleTime(time)
      setTime(currentTime)
    }

    const interval = setInterval(() => {
      const currentTime = handleTime(new Date())
      setTime(currentTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-6xl">{time}</h3>
        <h2 className="text-3xl">{date}</h2>
      </div>

      <CurrentTemp />
    </div>
  )
}
