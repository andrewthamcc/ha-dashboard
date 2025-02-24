interface Bus {
  vehicleType: string
  nextBusMinutes: string
  crowdingIndex: string
}

export const ttcKeys = {
  all: ['ttc'] as const,
  '62': () => [...ttcKeys.all, '62'] as const,
}

export function getNextBus(): Promise<Bus[]> {
  const params = new URLSearchParams({
    routeId: '62',
    stopCode: '5768',
  })

  return fetch(`https://www.ttc.ca/ttcapi/routedetail/GetNextBuses?${params.toString()}
`).then((res) => res.json())
}
