import { useEffect, useState } from 'react'
import './Preloader.css'

const CAT_IMG = '/images/preloading/ChatGPT Image Jul 11, 2026, 05_41_46 PM.png'
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
      <img src={CAT_IMG} alt="" className="preloader-cat" />
      <p className="preloader-text">loading</p>
    </div>
  )
}

export default Preloader
