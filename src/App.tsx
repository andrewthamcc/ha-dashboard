import { Card } from '@components/card/card'
import { Clock } from '@components/clock/clock'
import { Weather } from '@components/weather/weather'
import { Forecast } from '@components/weather/forecast'
import { Ttc } from '@components/ttc/ttc'
import { Calendar } from '@components/calendar/calendar'
import { Wotd } from '@components/wotd/wotd'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 bg-neutral-900 p-6 text-white">
      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-6">
          <Clock />
        </Card>

        <Card className="col-span-4">
          <Weather />
        </Card>
      </div>

      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-7">
          <Calendar />
        </Card>

        <Card className="col-span-3">
          <Forecast />
        </Card>
      </div>

      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-2">
          <Ttc />
        </Card>
        <Card className="col-span-8">
          <Wotd />
        </Card>
      </div>
    </div>
  )
}

export default App
