import { useEffect } from 'react'

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

    getHAData()
  }, [])

  return <div>HA</div>
}

export default App
