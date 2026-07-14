import { useState } from 'react'
import './App.css'
import useLenis from './lib/useLenis'
import Preloader from './components/Preloader'
import DikshuHero from './components/DikshuHero'

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <DikshuHero />
    </>
  )
}

export default App
