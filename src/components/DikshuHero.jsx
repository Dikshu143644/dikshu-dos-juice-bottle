import { useCallback, useEffect, useRef, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { juices } from '../data/juices'
import './DikshuHero.css'

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

const DikshuMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="dikshu-spark" x1="0" y1="0" x2="24" y2="24">
        <stop stopColor="#fff1a6" />
        <stop offset="1" stopColor="#f28c22" />
      </linearGradient>
    </defs>
    <path
      d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2Z"
      fill="url(#dikshu-spark)"
    />
  </svg>
)

const NAV_LINKS = ['Dikshu Story', 'Flavours', 'Offers', 'DOS Store']

const DikshuHero = () => {
  const [index, setIndex] = useState(0)
  const len = juices.length
  const current = juices[index]
  const upcoming = juices[(index + 1) % len]

  const heroRef = useRef(null)
  const blobRef = useRef(null)
  const scrollIndexRef = useRef(0)
  const stageRef = useRef(null)

  const setFlavorIndex = useCallback((value) => {
    const nextIndex = ((value % len) + len) % len
    scrollIndexRef.current = nextIndex
    setIndex(nextIndex)
  }, [len])

  const next = useCallback(() => setFlavorIndex(index + 1), [index, setFlavorIndex])

  // Subtle scroll-driven parallax, powered by the app-wide Lenis smooth
  // scroll feeding GSAP's ScrollTrigger (see lib/useLenis.js).
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.25,
        onUpdate: (self) => {
          const nextIndex = Math.min(len - 1, Math.round(self.progress * (len - 1)))

          if (nextIndex !== scrollIndexRef.current) {
            setFlavorIndex(nextIndex)
          }
        },
      })

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
  }, [len, setFlavorIndex])

  return (
    <section className="dikshu-hero" ref={heroRef} style={{ '--flavor-count': len }}>
      <div className="dikshu-hero-pin">
        <div className="dikshu-mesh" aria-hidden="true" />
        <Motion.div
          className="dikshu-tint"
          animate={{ backgroundColor: current.tint }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="dikshu-blob" ref={blobRef} aria-hidden="true">
          <AnimatePresence>
            {current.bgImage && (
              <Motion.img
                key={current.id}
                src={current.bgImage}
                alt=""
                className="dikshu-blob-photo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </div>

        <nav className="dikshu-nav">
          <div className="dikshu-logo">
            <span>Dikshu</span>
            <DikshuMark />
          </div>
          <ul className="dikshu-nav-links">
            {NAV_LINKS.map((label) => (
              <li key={label} className={label === 'Flavours' ? 'active' : ''}>
                {label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="dikshu-side-deco">
          <span className="dikshu-line dikshu-line--left" aria-hidden="true" />
          <span className="dikshu-line dikshu-line--right" aria-hidden="true" />
          <button className="dikshu-next" onClick={next} aria-label="Next flavour">
            Next
          </button>
        </div>

        <div className="dikshu-bottle-stage" ref={stageRef}>
          <div className="dikshu-bottle-slot">
            <AnimatePresence mode="popLayout">
              <Motion.img
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
          <div className="dikshu-bottle-slot dikshu-bottle-slot--preview">
            <AnimatePresence mode="popLayout">
              <Motion.img
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

        <div className="dikshu-content">
          <AnimatePresence mode="popLayout">
            <Motion.div
              key={current.id}
              variants={TEXT_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1>
                Dikshu true JUICE
                <br />
                {current.flavor}
              </h1>
              <p>{current.description}</p>
              <button className="dikshu-cta">View Flavour</button>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default DikshuHero
