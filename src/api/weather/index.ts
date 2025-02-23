import { AstronomyResponse, Forecast, WeatherData } from './types'

const apiKey = import.meta.env.VITE_WEATHER_KEY

export const weatherKeys = {
  all: ['weather'] as const,
  astronomy: () => [...weatherKeys.all, 'astro'] as const,
  current: () => [...weatherKeys.all, 'current'] as const,
  forecast: (days: number) => [...weatherKeys.all, 'forecast', days] as const,
}

export function getAstronomy(): Promise<{
  astronomy: { astro: AstronomyResponse }
}> {
  const params = new URLSearchParams({
    key: apiKey,
    q: 'M4K2A1',
  })

  return fetch(
    `https://api.weatherapi.com/v1/astronomy.json?${params.toString()}`
  ).then((res) => res.json())
}

export function getCurrentWeather(): Promise<{ current: WeatherData }> {
  const params = new URLSearchParams({
    key: apiKey,
    q: 'M4K2A1',
    aqi: 'no',
  })

  return fetch(
    `https://api.weatherapi.com/v1/current.json?${params.toString()}`
  ).then((res) => res.json())
}

export function getForecast(days: number): Promise<Forecast> {
  const params = new URLSearchParams({
    key: apiKey,
    q: 'M4K2A1',
    aqi: 'no',
    days: days.toString(),
  })

  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`
  ).then((res) => res.json())
}
