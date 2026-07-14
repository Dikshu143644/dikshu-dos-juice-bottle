import { useEffect, useState } from 'react'
import './Preloader.css'

const DURATION = 4000
const FADE = 300

const Preloader = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fadeTimer = setTimeout(() => setLeaving(true), DURATION - FADE)
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = ''
      onDone?.()
    }, DURATION)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div className={`preloader${leaving ? ' preloader--leaving' : ''}`}>
      <div className="preloader-mark" aria-hidden="true">
        <span className="preloader-brand">Dikshu</span>
        <span className="preloader-company">DOS</span>
      </div>
      <p className="preloader-text">loading fresh juice</p>
    </div>
  )
}

export default Preloader
