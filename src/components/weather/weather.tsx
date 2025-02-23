import { useQuery } from '@tanstack/react-query'
import { weatherKeys, getWeather } from '../../api/weather'
import Sunrise from '../../icons/sunrise.svg?react'
import Sunset from '../../icons/sunset.svg?react'

export const Weather = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: weatherKeys.weather(),
    queryFn: getWeather,
    refetchInterval: 15 * 60 * 1000,
  })

  if (isLoading)
    return (
      <div className="flex animate-pulse items-center gap-3" role="status">
        <div className="h-10 w-10 rounded-full bg-gray-500" />
        <div className="h-12 w-15 rounded-xs bg-gray-500" />
        <div className="flex flex-col items-center gap-1">
          <div className="h-3 w-16 rounded-xs bg-gray-500" />
          <div className="h-3 w-16 rounded-xs bg-gray-500" />
          <div className="h-3 w-16 rounded-xs bg-gray-500" />
        </div>
      </div>
    )

  if (error || !data) {
    console.error(error)
    return null
  }

  const isSunUp = Boolean(data.forecast.forecastday[0].astro.is_sun_up)

  return (
    <div className="flex items-center gap-3">
      <img
        className="h-20 w-20"
        src={data.current.condition.icon}
        alt={data.current.condition.text}
      />
      <div className="gap-3">
        <div className="flex items-center gap-6">
          <p className="text-5xl">{data.current.temp_c}°C</p>

          <div className="flex flex-col text-sm">
            <p className="text-lg">{data.current.condition.text}</p>
            <p className="text-white/80">
              Feels like: {data.current.feelslike_c}°C
            </p>
            <p className="text-white/80">
              H: {data.forecast.forecastday[0].day.maxtemp_c}°C L:{' '}
              {data.forecast.forecastday[0].day.mintemp_c}°C
            </p>

            <p className="text-sm text-white/80">
              <span>
                {isSunUp ? (
                  <Sunset className="inline h-4" />
                ) : (
                  <Sunrise className="inline h-4" />
                )}
              </span>
              {isSunUp
                ? data.forecast.forecastday[0].astro.sunset
                : data.forecast.forecastday[0].astro.sunrise}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
