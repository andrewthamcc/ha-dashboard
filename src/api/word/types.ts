interface ContentProvider {
  name: string
  id: number
}

interface Definition {
  text: string
  partOfSpeech: string
  source: string
  note: string | null
}

interface Example {
  url: string
  text: string
  title: string
  id: number | null
}

export interface WordData {
  _id: string
  word: string
  /** ISO string (e.g., "2025-02-22T03:00:00.000Z") */
  publishDate: string //
  contentProvider: ContentProvider
  note: string
  htmlExtra: string | null
  /**"2025-02-22" (YYYY-MM-DD) */
  pdd: string
  definitions: Definition[]
  examples: Example[]
}
