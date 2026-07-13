import { useState } from 'react'
import './App.css'
import useLenis from './lib/useLenis'
import Preloader from './components/Preloader'
import SunvitaHero from './components/SunvitaHero'

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <SunvitaHero />
    </>
  )
}

export default App
