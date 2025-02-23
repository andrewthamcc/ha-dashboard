import { useQuery } from '@tanstack/react-query'
import { getNextBus, ttcKeys } from '@api/ttc.ts'

export const Ttc = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ttcKeys['62'](),
    queryFn: getNextBus,
    refetchInterval: 10000,
  })

  if (isLoading) {
    return (
      <div className="flex animate-pulse items-center gap-3" role="status">
        <div className="h-10 w-10 rounded-sm bg-gray-500" />
        <div className="h-10 w-10 rounded-sm bg-gray-500" />
        <div className="h-10 w-10 rounded-sm bg-gray-500" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    return null
  }

  return (
    <div className="grid grid-cols-3">
      <div className="flex items-start gap-3">
        <h2 className="rounded-xs bg-[#da251d] px-2 py-0.5 text-white">62</h2>
        <div className="flex flex-col">
          {data.map(({ nextBusMinutes, crowdingIndex }, i) => {
            const crowdingColor = getCrowding(Number(crowdingIndex))
            const next =
              nextBusMinutes === 'D' || nextBusMinutes === '0'
                ? 'Due'
                : `${nextBusMinutes} mins`

            return (
              <div key={i} className="flex items-center gap-1">
                <p>{next}</p>
                <div className="flex items-center gap-1">
                  {[...new Array(3)].map((_, j) => (
                    <div
                      key={`crowding-${i}-${j}`}
                      className={`h-2 w-2 rounded-full ${Number(crowdingIndex) >= j + 1 ? crowdingColor : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-start">
        <h2 className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8c300] p-2 text-black">
          1
        </h2>
      </div>

      <div className="flex items-start">
        <h2 className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00923f] p-2">
          2
        </h2>
      </div>
    </div>
  )
}

function getCrowding(index: number) {
  switch (index) {
    case 1:
      return 'bg-green-500'
    case 2:
      return 'bg-yellow-500'
    case 3:
      return 'bg-red-500'
    default:
      return null
  }
}
