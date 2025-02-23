import { WeatherApiResponse } from './types'

const apiKey = import.meta.env.VITE_WEATHER_KEY

export const weatherKeys = {
  all: ['weather'] as const,
  weather: () => [...weatherKeys.all, 'weather'] as const,
}

export function getWeather(): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    key: apiKey,
    q: 'M4K2A1',
    aqi: 'no',
    days: '5',
  })

  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`
  ).then((res) => res.json())
}
