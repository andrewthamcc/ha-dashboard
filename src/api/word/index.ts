import { WordData } from './types'

const apiKey = import.meta.env.VITE_WORD_NIK_KEY

export const wordKeys = {
  all: ['word'] as const,
  day: () => [...wordKeys.all, 'day'] as const,
}

export function getWOTD(): Promise<WordData> {
  const params = new URLSearchParams({
    api_key: apiKey,
  })

  return fetch(`http://api.wordnik.com:80/v4/words.json/wordOfTheDay?${params.toString()}
`).then((res) => res.json())
}
