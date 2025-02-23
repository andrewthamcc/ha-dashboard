import { useQuery } from '@tanstack/react-query'
import { getWOTD, wordKeys } from '../../api/word'

export const Wotd = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: wordKeys.day(),
    queryFn: getWOTD,
  })

  if (isLoading) {
    return (
      <div className="flex animate-pulse items-center gap-3" role="status">
        <div className="h-4 w-20 rounded-sm bg-gray-500" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    return null
  }

  return (
    <div>
      <h2 className="text-4xl">{data.word}</h2>

      {data.definitions.map(({ partOfSpeech, text }, i) => (
        <div>
          <p>{partOfSpeech}:</p>
          <p key={`${data.word}-${i}`}>{text}</p>
        </div>
      ))}

      <p className="text-sm italic">{data.note}</p>
    </div>
  )
}
