import { useQuery } from '@tanstack/react-query'
import { getCurrentWeather, weatherKeys } from '@api/weather'

export const CurrentTemp = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: weatherKeys.current(),
    queryFn: getCurrentWeather,
    refetchInterval: 15 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div className="flex flex-grow animate-pulse items-center justify-end gap-3">
        <div className="h-20 w-20 rounded-md bg-gray-500" />
        <div className="h-20 w-36 rounded-xs bg-gray-500" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    return (
      <div className="flex flex-grow items-center justify-center">
        <p className="text-center text-gray-500 italic">Weather unavilable</p>
      </div>
    )
  }

  return (
    <div className="flex flex-grow items-center justify-end">
      <img
        className="h-20 w-20"
        src={data.current?.condition.icon}
        alt={data.current?.condition.text}
      />
      <p className="text-6xl">{data.current?.temp_c}°C</p>
    </div>
  )
}
