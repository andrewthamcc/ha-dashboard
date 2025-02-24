import { useQuery } from '@tanstack/react-query'
import { getForecast, weatherKeys } from '@api/weather'

export const Forecast = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: weatherKeys.forecast(6),
    queryFn: () => getForecast(4),
    refetchInterval: 60 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div
        className="flex animate-pulse items-center justify-center gap-6"
        role="status"
      >
        <div className="h-20 w-15 rounded-xs bg-gray-500" />
        <div className="h-20 w-15 rounded-xs bg-gray-500" />
        <div className="h-20 w-15 rounded-xs bg-gray-500" />
        <div className="h-20 w-15 rounded-xs bg-gray-500" />
        <div className="h-20 w-15 rounded-xs bg-gray-500" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    return null
  }

  const nextThreeDays = data.forecast.forecastday.slice(1)

  return (
    <div className="flex flex-grow items-center justify-center gap-6">
      {nextThreeDays.map((day) => {
        return (
          <div
            key={day.date}
            className="flex flex-col justify-center text-center"
          >
            <p className="uppercase">
              {new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-CA', {
                weekday: 'short',
                timeZone: 'UTC',
              })}
            </p>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="mx-auto block w-14"
            />
            <p className="text-white/80">{day.day.avgtemp_c}°C</p>
          </div>
        )
      })}
    </div>
  )
}
