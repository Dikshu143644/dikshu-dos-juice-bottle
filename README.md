# Dikshu Juice Bottle

Dikshu is a fruit-forward juice product website built for DOS. It presents a polished animated carousel of fresh juice flavours with branded product bottles, flavour photography, smooth motion, and responsive layouts for desktop and mobile.

## Brand Updates

- Rebuilt the original juice experience around the Dikshu brand.
- Replaced company and organization references with DOS.
- Recreated the bottle label artwork as deterministic SVG product images in `public/images/dikshu-products`.
- Updated the app title, favicon, preloader, package name, and README for the Dikshu brand.

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

The Dikshu bottle assets are generated from `scripts/generate-dikshu-products.mjs`.

```bash
npm run assets
```

That command recreates the eight branded bottle images for Orange, Strawberry, Watermelon, Lemon, Cherry, Blueberry, Mango, and Kiwi.
