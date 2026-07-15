# Dikshu DOS Juice Bottle

Dikshu is a fruit-forward juice product website built for DOS. It presents a polished animated flavour carousel, supplied Dikshu bottle artwork, scroll-driven flavour changes, glassy bento offers, and a DOS Store product grid.

## What Changed

- Replaced the generated product SVGs with the supplied Dikshu bottle PNGs.
- Matched each bottle image to the correct fruit: Orange, Strawberry, Watermelon, Lemon, Cherry, Blueberry, Mango, and Kiwi.
- Added active navigation for Dikshu Story, Flavours, Offers, and DOS Store.
- Added a spatial liquid-glass UI for the new Story, Offers, and Store sections.
- Built a bento-style Offers section with sale cards.
- Built a DOS Store section with fruit bottles, prices, and sale bundles.

## Tech Stack

- React 19
- Vite
- Framer Motion
- GSAP ScrollTrigger
- Lenis smooth scrolling

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Product Assets

Final bottle assets live in `public/images/dikshu-bottles`.

The source bottle files were supplied as PNGs and cleaned locally so the checkerboard background is transparent in the web experience.
