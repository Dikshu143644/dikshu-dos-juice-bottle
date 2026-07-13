import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hoodies } from '../data/hoodies'
import './HoodieHero.css'

const BG_TRANSITION = { duration: 0.7, ease: 'easeInOut' }

const NAME_VARIANTS = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { y: -100, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } },
}

const TEXT_VARIANTS = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } },
}

// Right → (fast) → slight center overshoot → (0.1s hold) → gentle
// settle to its resting spot just left of that overshoot.
const FLY_VARIANTS = {
  initial: { x: 420, y: 140, scale: 1.22, rotate: 13, opacity: 0 },
  animate: {
    x: [420, 36, 36, 0],
    y: [140, 8, 8, 0],
    scale: [1.22, 1.03, 1.03, 1],
    rotate: [13, 2, 2, 0],
    opacity: [0, 1, 1, 1],
    transition: {
      duration: 1.15,
      times: [0, 0.55, 0.63, 1],
      ease: ['easeOut', 'linear', 'easeInOut'],
    },
  },
  exit: {
    x: -460,
    y: -150,
    scale: 0.78,
    rotate: -16,
    opacity: 0,
    transition: { duration: 0.75, ease: 'easeIn' },
  },
}

const HoodieHero = () => {
  const [index, setIndex] = useState(0)
  const len = hoodies.length
  const current = hoodies[index]

  const next = () => setIndex((i) => (i + 1) % len)
  const prev = () => setIndex((i) => (i - 1 + len) % len)

  return (
    <motion.section
      className="hoodie-hero"
      animate={{ backgroundColor: current.bgColor }}
      transition={BG_TRANSITION}
    >
      <div className="hoodie-top">
        <div className="hoodie-logo">LOOM</div>
        <button className="hoodie-cta">Shop Now</button>
      </div>

      <div className="hoodie-giant-name" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={current.id}
            className="hoodie-giant-name-text"
            variants={NAME_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {current.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="hoodie-visual-stage">
        <AnimatePresence>
          <motion.img
            key={current.id}
            src={current.image}
            alt={current.name}
            className="hoodie-fly"
            variants={FLY_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      <div className="hoodie-info">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            variants={TEXT_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2>{current.name}</h2>
            <p>{current.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hoodie-meet">
        <h3>
          Meet the Hoodie
          <br />
          That Feels Like You
        </h3>

        <div className="hoodie-thumb">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={current.id}
              src={current.image}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            />
          </AnimatePresence>
        </div>

        <div className="hoodie-nav">
          <button onClick={prev} aria-label="Previous hoodie">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={next} aria-label="Next hoodie">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <svg className="hoodie-wave" viewBox="0 0 1536 160" preserveAspectRatio="none">
        <path
          d="M0,80 C160,140 320,50 512,80 C704,110 800,140 1024,95 C1200,60 1360,120 1536,85 L1536,160 L0,160 Z"
          fill="var(--surface)"
        />
      </svg>
    </motion.section>
  )
}

export default HoodieHero
