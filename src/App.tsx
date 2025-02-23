import { Card } from '@components/card/card'
import { Clock } from '@components/clock/clock'
import { Weather } from '@components/weather/weather'
import { Forecast } from '@components/weather/forecast'
import { Ttc } from '@components/ttc/ttc'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-6 bg-neutral-900 p-6 text-white">
      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-4">
          <Clock />
        </Card>

        <Card className="col-span-6">
          <Weather />
        </Card>
      </div>

      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-4">
          <Forecast />
        </Card>

        <Card className="col-span-6">
          <Ttc />
        </Card>
      </div>
    </div>
  )
}

export default App
