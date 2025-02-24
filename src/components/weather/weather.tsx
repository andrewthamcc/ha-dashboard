import { useQueries } from '@tanstack/react-query'
import {
  weatherKeys,
  getAstronomy,
  getCurrentWeather,
  getForecast,
} from '@api/weather'
import Sunrise from '@icons/sunrise.svg?react'
import Sunset from '@icons/sunset.svg?react'
import Wind from '@icons/wind.svg?react'
import Gauage from '@icons/gauge.svg?react'
import Drop from '@icons/droplet.svg?react'

export const Weather = () => {
  const data = useQueries({
    queries: [
      {
        queryKey: weatherKeys.current(),
        queryFn: getCurrentWeather,
        refetchInterval: 15 * 60 * 1000,
      },
      {
        queryKey: weatherKeys.forecast(0),
        queryFn: () => getForecast(0),
        refetchInterval: 60 * 60 * 1000,
      },
      {
        queryKey: weatherKeys.astronomy(),
        queryFn: getAstronomy,
      },
    ],
  })

  if (data.some(({ isLoading }) => isLoading))
    return (
      <div
        className="flex animate-pulse items-center justify-center gap-3"
        role="status"
      >
        <div className="flex flex-col gap-2">
          <div className="h-4 w-30 rounded-xs bg-gray-500" />
          <div className="h-3 w-24 rounded-xs bg-gray-500" />
          <div className="h-3 w-20 rounded-xs bg-gray-500" />
          <div className="h-3 w-22 rounded-xs bg-gray-500" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 rounded-xs bg-gray-500" />
          <div className="h-3 w-16 rounded-xs bg-gray-500" />
          <div className="h-3 w-22 rounded-xs bg-gray-500" />
          <div className="h-3 w-18 rounded-xs bg-gray-500" />
        </div>
      </div>
    )

  if (data.some(({ error }) => error) || !data.length) {
    data.forEach(({ error }) => {
      if (error instanceof Error) console.error(error)
    })

    return null
  }

  const current = data[0].data?.current
  const forecast = data[1].data?.forecast.forecastday[0]
  const astronomy = data[2].data?.astronomy.astro
  const isSunUp = Boolean(astronomy?.is_sun_up)

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex flex-col gap-1 text-sm">
        <p className="text-lg">{current?.condition.text}</p>
        <p className="text-white/80">Feels like: {current?.feelslike_c}°C</p>
        <p className="text-white/80">
          H: {forecast?.day.maxtemp_c}°C L: {forecast?.day.mintemp_c}°C
        </p>

        <p className="text-sm text-white/80">
          {isSunUp ? astronomy?.sunset : astronomy?.sunrise}
          <span>
            {isSunUp ? (
              <Sunset className="inline h-4" />
            ) : (
              <Sunrise className="inline h-4" />
            )}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-1 text-white/80">
        <div className="flex flex-col justify-center">
          <p>
            <Wind className="inline h-4" />
            {current?.wind_kph} km/h {current?.wind_dir}
          </p>
          <p className="ml-6 text-xs">Gust {current?.gust_kph} km/h</p>
        </div>

        <p>
          <Drop className="inline h-4" /> {current?.humidity}%
        </p>

        <p>
          <Gauage className="inline h-4" /> {(current?.pressure_mb ?? 0) / 10}{' '}
          kPa
        </p>
      </div>
    </div>
  )
}
