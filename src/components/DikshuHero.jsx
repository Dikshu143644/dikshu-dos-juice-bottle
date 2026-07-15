import { useCallback, useEffect, useRef, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { juices, offers, storeProducts } from '../data/juices'
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

const NAV_LINKS = [
  { label: 'Dikshu Story', target: 'story' },
  { label: 'Flavours', target: 'flavours' },
  { label: 'Offers', target: 'offers' },
  { label: 'DOS Store', target: 'store' },
]

const STORY_POINTS = [
  ['Cold-filled', 'Bottled fresh in 300 ml glass for a cleaner fruit finish.'],
  ['No added sugar', 'The sweetness comes from fruit body, not a heavy syrup profile.'],
  ['DOS batch care', 'Every flavour is built as a small collection with a clear label system.'],
]

const DikshuHero = () => {
  const [index, setIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('flavours')
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

  const scrollToSection = useCallback((target) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(target)
  }, [])

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

  useEffect(() => {
    const triggers = gsap.utils.toArray('[data-dikshu-section]').map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 48%',
        end: 'bottom 48%',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      }),
    )

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  return (
    <>
    <section
      className="dikshu-hero"
      id="flavours"
      data-dikshu-section
      ref={heroRef}
      style={{ '--flavor-count': len }}
    >
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
            {NAV_LINKS.map((item) => (
              <li key={item.target} className={activeSection === item.target ? 'active' : ''}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  aria-current={activeSection === item.target ? 'page' : undefined}
                >
                  {item.label}
                </button>
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
              <button className="dikshu-cta" onClick={() => scrollToSection('store')}>
                View Flavour
              </button>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    <section className="dikshu-page-section dikshu-story-section" id="story" data-dikshu-section>
      <div className="dikshu-section-shell dikshu-story-layout">
        <div className="dikshu-section-copy">
          <span className="dikshu-kicker">Dikshu Story</span>
          <h2>Fresh fruit bottles shaped by DOS.</h2>
          <p>
            Dikshu is built around bright fruit colour, clean bottle labels, and daily-use 300 ml
            juices. The collection keeps the product simple: fruit first, no added sugar, and a
            premium glass-bottle look that feels fresh on the shelf.
          </p>
        </div>
        <div className="dikshu-story-product">
          <img src={juices[6].image} alt="Dikshu Mango bottle" />
          <img src={juices[0].image} alt="Dikshu Orange bottle" />
        </div>
        <div className="dikshu-story-points">
          {STORY_POINTS.map(([title, copy]) => (
            <article className="dikshu-glass-panel" key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="dikshu-page-section dikshu-offers-section" id="offers" data-dikshu-section>
      <div className="dikshu-section-shell">
        <div className="dikshu-section-heading">
          <span className="dikshu-kicker">Offers</span>
          <h2>Bento deals for every fruit mood.</h2>
        </div>
        <div className="dikshu-bento-grid">
          {offers.map((offer) => (
            <article
              className={`dikshu-offer-card ${offer.layout ? `dikshu-offer-card--${offer.layout}` : ''}`}
              key={offer.id}
              style={{ '--card-accent': offer.accent }}
            >
              <div>
                <span>{offer.eyebrow}</span>
                <h3>{offer.title}</h3>
                <p>{offer.copy}</p>
              </div>
              <strong>{offer.stat}</strong>
              <img src={offer.image} alt="" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="dikshu-page-section dikshu-store-section" id="store" data-dikshu-section>
      <div className="dikshu-section-shell">
        <div className="dikshu-section-heading">
          <span className="dikshu-kicker">DOS Store</span>
          <h2>Fruit bottles ready for sale.</h2>
        </div>
        <div className="dikshu-store-grid">
          {storeProducts.map((juice) => (
            <article className="dikshu-store-card" key={juice.id} style={{ '--card-accent': juice.accent }}>
              <div className="dikshu-store-image">
                <img src={juice.image} alt={`Dikshu ${juice.label} juice bottle`} />
              </div>
              <div className="dikshu-store-copy">
                <span>{juice.benefit}</span>
                <h3>{juice.label}</h3>
                <p>{juice.storeCopy}</p>
                <div className="dikshu-store-row">
                  <strong>{juice.price}</strong>
                  <em>{juice.sale}</em>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default DikshuHero
