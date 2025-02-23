import { useEffect } from 'react'
import { Card } from './components/card/card'
import { Clock } from './components/clock/clock'
import { Weather } from './components/weather/weather'
import { Forecast } from './components/weather/forecast'

const TOKEN = import.meta.env.VITE_HA_TOKEN
const API_URL = 'http://192.168.86.100:8123/api/'

function App() {
  useEffect(() => {
    async function getHAData() {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      console.log(data)
    }
  }, [])

  return (
    <div className="min-h-screen w-screen bg-neutral-900 p-6 text-white">
      <Card>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-3">
            <Clock />
          </div>
          <div className="col-span-4">
            <Weather />
          </div>
          <div className="col-span-3">
            <Forecast />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
