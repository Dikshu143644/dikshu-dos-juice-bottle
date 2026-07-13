import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { juices } from '../data/juices'
import './SunvitaHero.css'

gsap.registerPlugin(ScrollTrigger)

const TEXT_VARIANTS = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } },
}

const BOTTLE_VARIANTS = {
  initial: { y: 60, opacity: 0, scale: 0.94 },
  animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { y: -50, opacity: 0, scale: 0.94, transition: { duration: 0.35, ease: 'easeIn' } },
}

const SunicaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="sunvita-spark" x1="0" y1="0" x2="24" y2="24">
        <stop stopColor="#ffdd8a" />
        <stop offset="1" stopColor="#d99a3d" />
      </linearGradient>
    </defs>
    <path
      d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2Z"
      fill="url(#sunvita-spark)"
    />
  </svg>
)

const NAV_LINKS = ['Sunvita True Story', 'Product', 'Promotion', 'Store']

const SunvitaHero = () => {
  const [index, setIndex] = useState(0)
  const len = juices.length
  const current = juices[index]
  const upcoming = juices[(index + 1) % len]

  const heroRef = useRef(null)
  const blobRef = useRef(null)
  const stageRef = useRef(null)

  const next = () => setIndex((i) => (i + 1) % len)

  // Subtle scroll-driven parallax, powered by the app-wide Lenis smooth
  // scroll feeding GSAP's ScrollTrigger (see lib/useLenis.js).
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(stageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="sunvita-hero" ref={heroRef}>
      <div className="sunvita-mesh" aria-hidden="true" />
      <motion.div
        className="sunvita-tint"
        animate={{ backgroundColor: current.tint }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="sunvita-blob" ref={blobRef} aria-hidden="true">
        <AnimatePresence>
          {current.bgImage && (
            <motion.img
              key={current.id}
              src={current.bgImage}
              alt=""
              className="sunvita-blob-photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      <nav className="sunvita-nav">
        <div className="sunvita-logo">
          <span>Sunvita</span>
          <SunicaIcon />
        </div>
        <ul className="sunvita-nav-links">
          {NAV_LINKS.map((label) => (
            <li key={label} className={label === 'Product' ? 'active' : ''}>
              {label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sunvita-side-deco">
        <span className="sunvita-line sunvita-line--left" aria-hidden="true" />
        <span className="sunvita-line sunvita-line--right" aria-hidden="true" />
        <button className="sunvita-next" onClick={next} aria-label="Next flavor">
          Next
        </button>
      </div>

      <div className="sunvita-bottle-stage" ref={stageRef}>
        <div className="sunvita-bottle-slot">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={current.id}
              src={current.image}
              alt={current.flavor}
              variants={BOTTLE_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </AnimatePresence>
        </div>
        <div className="sunvita-bottle-slot">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={upcoming.id}
              src={upcoming.image}
              alt={upcoming.flavor}
              variants={BOTTLE_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="sunvita-content">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            variants={TEXT_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1>
              Sunvita true JUICE
              <br />
              {current.flavor}
            </h1>
            <p>{current.description}</p>
            <button className="sunvita-cta">View Flavour</button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SunvitaHero
