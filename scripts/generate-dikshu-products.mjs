import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(rootDir, 'public', 'images', 'dikshu-products')

const bottlePath =
  'M314 148 C314 118 338 96 400 96 C462 96 486 118 486 148 L486 194 C486 220 504 254 520 300 C542 364 555 434 560 520 L586 998 C591 1092 528 1140 400 1140 C272 1140 209 1092 214 998 L240 520 C245 434 258 364 280 300 C296 254 314 220 314 194 Z'

const products = [
  {
    id: 'orange',
    label: 'ORANGE',
    juice: '#f79a14',
    accent: '#f4c038',
    fruit: orangeFruit,
  },
  {
    id: 'strawberry',
    label: 'STRAWBERRY',
    juice: '#ed2339',
    accent: '#ff7580',
    fruit: strawberryFruit,
  },
  {
    id: 'watermelon',
    label: 'WATERMELON',
    juice: '#f3464b',
    accent: '#60b05b',
    fruit: watermelonFruit,
  },
  {
    id: 'lemon',
    label: 'LEMON',
    juice: '#f6cd2f',
    accent: '#fff17a',
    fruit: lemonFruit,
  },
  {
    id: 'cherry',
    label: 'CHERRY',
    juice: '#8f1231',
    accent: '#db3154',
    fruit: cherryFruit,
  },
  {
    id: 'blueberry',
    label: 'BLUEBERRY',
    juice: '#3f3f91',
    accent: '#6c77d8',
    fruit: blueberryFruit,
  },
  {
    id: 'mango',
    label: 'MANGO',
    juice: '#f2a32b',
    accent: '#ffcf5d',
    fruit: mangoFruit,
  },
  {
    id: 'kiwi',
    label: 'KIWI',
    juice: '#a8c638',
    accent: '#66a94b',
    fruit: kiwiFruit,
  },
]

await mkdir(outDir, { recursive: true })

await Promise.all(
  products.map((product) =>
    writeFile(join(outDir, `${product.id}.svg`), createBottleSvg(product), 'utf8'),
  ),
)

function createBottleSvg({ id, label, juice, accent, fruit }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" role="img" aria-labelledby="title-${id}">
  <title id="title-${id}">Dikshu ${label} juice bottle by DOS</title>
  <defs>
    <clipPath id="bottle-clip-${id}">
      <path d="${bottlePath}" />
    </clipPath>
    <linearGradient id="juice-${id}" x1="238" y1="170" x2="568" y2="1118" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${lighten(juice, 0.32)}" />
      <stop offset="0.42" stop-color="${juice}" />
      <stop offset="1" stop-color="${darken(juice, 0.2)}" />
    </linearGradient>
    <linearGradient id="glass-${id}" x1="240" y1="80" x2="560" y2="1115" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.78" />
      <stop offset="0.38" stop-color="#ffffff" stop-opacity="0.12" />
      <stop offset="0.72" stop-color="#ffffff" stop-opacity="0.22" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.5" />
    </linearGradient>
    <linearGradient id="cap-${id}" x1="292" y1="66" x2="508" y2="158" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#050505" />
      <stop offset="0.52" stop-color="#343434" />
      <stop offset="1" stop-color="#050505" />
    </linearGradient>
    <filter id="soft-shadow-${id}" x="-40%" y="-20%" width="180%" height="150%">
      <feDropShadow dx="0" dy="30" stdDeviation="22" flood-color="#000000" flood-opacity="0.34" />
    </filter>
    <style>
      .brand { font: 800 34px Arial, sans-serif; letter-spacing: 4px; fill: #19150f; }
      .made { font: 700 16px Arial, sans-serif; letter-spacing: 3px; fill: #6d604e; }
      .flavour { font: 900 50px Arial, sans-serif; letter-spacing: 1px; fill: #17130f; }
      .juice { font: 800 24px Arial, sans-serif; letter-spacing: 6px; fill: #17130f; }
      .claim { font: 800 20px Arial, sans-serif; letter-spacing: 1px; fill: #201b14; }
      .micro { font: 700 13px Arial, sans-serif; letter-spacing: 1px; fill: #4c4438; }
    </style>
  </defs>

  <ellipse cx="400" cy="1136" rx="192" ry="28" fill="#000" opacity="0.24" />
  <g filter="url(#soft-shadow-${id})">
    <path d="${bottlePath}" fill="url(#juice-${id})" clip-path="url(#bottle-clip-${id})" />
    <path d="${bottlePath}" fill="url(#glass-${id})" opacity="0.38" />
    <path d="${bottlePath}" fill="none" stroke="#fff8dd" stroke-width="4" opacity="0.72" />
    <path d="M494 196 C496 238 520 270 533 326 C548 390 556 463 560 520 L586 998 C591 1092 528 1140 400 1140" fill="none" stroke="#fff6d7" stroke-width="11" opacity="0.32" />
    <path d="M328 178 C324 234 305 265 292 318 C279 374 269 443 265 520 L241 995 C237 1062 273 1110 352 1128" fill="none" stroke="#5f3a17" stroke-width="5" opacity="0.2" />
    <rect x="284" y="68" width="232" height="90" rx="38" fill="url(#cap-${id})" />
    <rect x="306" y="150" width="188" height="36" rx="16" fill="#f8ecd1" opacity="0.38" />
    <rect x="304" y="170" width="192" height="18" rx="9" fill="#140f0c" opacity="0.18" />

    <g transform="translate(193 514)">
      <rect x="0" y="0" width="414" height="485" rx="24" fill="#f8f1de" stroke="#17130f" stroke-width="4" />
      <rect x="14" y="14" width="386" height="457" rx="18" fill="#fff8e8" stroke="#3d3427" stroke-width="2" />
      <text x="207" y="52" text-anchor="middle" class="brand">DIKSHU</text>
      <text x="207" y="78" text-anchor="middle" class="made">BY DOS</text>
      <text x="207" y="138" text-anchor="middle" class="flavour">${label}</text>
      <line x1="60" y1="160" x2="158" y2="160" stroke="#17130f" stroke-width="3" />
      <line x1="256" y1="160" x2="354" y2="160" stroke="#17130f" stroke-width="3" />
      <text x="207" y="169" text-anchor="middle" class="juice">JUICE</text>
      ${fruit({ accent, juice })}
      <text x="207" y="344" text-anchor="middle" class="claim">100% NATURAL</text>
      <text x="207" y="370" text-anchor="middle" class="claim">NO ADDED SUGAR</text>
      <line x1="28" y1="394" x2="386" y2="394" stroke="#17130f" stroke-width="2" />
      <line x1="136" y1="394" x2="136" y2="458" stroke="#17130f" stroke-width="2" />
      <line x1="272" y1="394" x2="272" y2="458" stroke="#17130f" stroke-width="2" />
      <text x="82" y="419" text-anchor="middle" class="micro">FRESH</text>
      <text x="82" y="439" text-anchor="middle" class="micro">PRESSED</text>
      <text x="204" y="426" text-anchor="middle" class="claim">250 ML</text>
      <text x="204" y="448" text-anchor="middle" class="micro">BATCH DOS</text>
      <text x="330" y="419" text-anchor="middle" class="micro">COLD</text>
      <text x="330" y="439" text-anchor="middle" class="micro">FILLED</text>
    </g>
  </g>
</svg>
`
}

function orangeFruit() {
  return `
      <g transform="translate(145 196)">
        <circle cx="72" cy="74" r="58" fill="#f28c13" stroke="#c66b08" stroke-width="3" />
        <circle cx="120" cy="104" r="48" fill="#ffb331" stroke="#d87d09" stroke-width="3" />
        <circle cx="120" cy="104" r="37" fill="#ffd56c" />
        ${sliceLines(120, 104, 32, 10)}
        <ellipse cx="117" cy="51" rx="15" ry="34" fill="#4d923b" transform="rotate(36 117 51)" />
      </g>`
}

function strawberryFruit() {
  return `
      <g transform="translate(141 190)">
        <path d="M80 36 C120 0 185 30 172 98 C162 152 105 176 84 192 C62 172 10 147 2 96 C-9 28 42 2 80 36Z" fill="#e82237" stroke="#9c1023" stroke-width="4" />
        <path d="M88 40 C122 18 160 43 150 92 C142 131 108 151 88 166" fill="#ff6470" opacity="0.42" />
        <path d="M58 38 L84 62 L113 38 L103 76 L136 62 L112 88 L123 120 L86 99 L50 120 L62 88 L38 62 L72 76Z" fill="#3e9c43" />
        ${seedDots([
          [56, 78], [82, 82], [111, 80], [139, 88], [42, 111], [70, 120], [101, 116], [130, 128], [76, 151], [106, 149],
        ])}
      </g>`
}

function watermelonFruit() {
  return `
      <g transform="translate(116 190)">
        <path d="M30 146 C58 52 146 18 252 72 C218 158 125 204 30 146Z" fill="#168746" stroke="#0d572d" stroke-width="8" />
        <path d="M45 139 C74 65 146 38 231 78 C197 144 124 178 45 139Z" fill="#f14c5d" />
        <path d="M47 139 C74 65 146 38 231 78" fill="none" stroke="#f8e5ad" stroke-width="7" />
        ${seedDots([[98, 105], [136, 86], [168, 116], [124, 142], [190, 91]], '#1a1510', 5)}
      </g>`
}

function lemonFruit() {
  return `
      <g transform="translate(132 190)">
        <ellipse cx="98" cy="95" rx="88" ry="58" fill="#f5d431" stroke="#c99908" stroke-width="4" transform="rotate(-12 98 95)" />
        <ellipse cx="166" cy="118" rx="58" ry="42" fill="#fff06d" stroke="#d0a20c" stroke-width="4" transform="rotate(18 166 118)" />
        <ellipse cx="166" cy="118" rx="42" ry="30" fill="#fff7a8" />
        ${sliceLines(166, 118, 28, 9)}
        <ellipse cx="117" cy="47" rx="13" ry="32" fill="#579341" transform="rotate(42 117 47)" />
      </g>`
}

function cherryFruit() {
  return `
      <g transform="translate(128 184)">
        <path d="M128 42 C116 72 110 101 112 130" fill="none" stroke="#4b7f2d" stroke-width="7" stroke-linecap="round" />
        <path d="M129 42 C158 78 184 102 204 140" fill="none" stroke="#4b7f2d" stroke-width="7" stroke-linecap="round" />
        <ellipse cx="96" cy="142" rx="58" ry="54" fill="#a90d2d" stroke="#6f071b" stroke-width="4" />
        <ellipse cx="198" cy="150" rx="60" ry="56" fill="#c71338" stroke="#77081d" stroke-width="4" />
        <ellipse cx="82" cy="126" rx="18" ry="12" fill="#ff6b78" opacity="0.5" />
        <ellipse cx="181" cy="134" rx="18" ry="12" fill="#ff7a84" opacity="0.5" />
        <ellipse cx="153" cy="46" rx="14" ry="38" fill="#5a9a3d" transform="rotate(68 153 46)" />
      </g>`
}

function blueberryFruit() {
  return `
      <g transform="translate(118 188)">
        ${blueberry(77, 122, 51, '#40479f')}
        ${blueberry(134, 82, 55, '#5864c6')}
        ${blueberry(186, 132, 58, '#323585')}
        ${blueberry(128, 158, 48, '#4e56b5')}
        <ellipse cx="172" cy="45" rx="14" ry="38" fill="#4e883d" transform="rotate(54 172 45)" />
      </g>`
}

function mangoFruit() {
  return `
      <g transform="translate(128 184)">
        <path d="M126 32 C197 48 238 108 205 166 C172 223 68 202 37 142 C7 84 54 24 126 32Z" fill="#f2a12d" stroke="#c36b10" stroke-width="4" />
        <path d="M91 46 C151 48 195 94 178 145 C157 188 83 174 56 132 C31 91 45 55 91 46Z" fill="#ffd45b" opacity="0.42" />
        <path d="M148 42 C155 24 170 14 194 10" fill="none" stroke="#5c8f39" stroke-width="8" stroke-linecap="round" />
        <ellipse cx="196" cy="24" rx="15" ry="40" fill="#4f963b" transform="rotate(68 196 24)" />
      </g>`
}

function kiwiFruit() {
  return `
      <g transform="translate(128 188)">
        <ellipse cx="114" cy="110" rx="88" ry="68" fill="#7a5a2f" stroke="#49331b" stroke-width="5" transform="rotate(-15 114 110)" />
        <ellipse cx="128" cy="116" rx="66" ry="50" fill="#91c83f" transform="rotate(-15 128 116)" />
        <ellipse cx="128" cy="116" rx="28" ry="20" fill="#f3ecc8" transform="rotate(-15 128 116)" />
        ${sliceLines(128, 116, 46, 14, '#f3ecc8')}
        ${seedDots([[87, 99], [102, 79], [130, 72], [157, 81], [176, 101], [171, 128], [148, 150], [116, 154], [89, 137]], '#24160b', 4)}
        <ellipse cx="192" cy="42" rx="13" ry="34" fill="#519341" transform="rotate(56 192 42)" />
      </g>`
}

function sliceLines(cx, cy, radius, count, color = '#ffad21') {
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="2" opacity="0.72" />`
  }).join('')
}

function seedDots(points, color = '#fff2b7', radius = 4) {
  return points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="0.92" />`).join('')
}

function blueberry(cx, cy, radius, color) {
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" stroke="#1f225c" stroke-width="4" />
    <path d="M${cx - 11} ${cy - 13} L${cx} ${cy - 3} L${cx + 13} ${cy - 14} L${cx + 8} ${cy + 3} L${cx + 20} ${cy + 14} L${cx + 2} ${cy + 11} L${cx - 11} ${cy + 22} L${cx - 7} ${cy + 4} L${cx - 22} ${cy - 3}Z" fill="#262967" opacity="0.75" />
    <ellipse cx="${cx - 16}" cy="${cy - 18}" rx="13" ry="9" fill="#8995ff" opacity="0.36" />
  </g>`
}

function lighten(hex, ratio) {
  return mix(hex, '#ffffff', ratio)
}

function darken(hex, ratio) {
  return mix(hex, '#000000', ratio)
}

function mix(hex, targetHex, ratio) {
  const color = parseHex(hex)
  const target = parseHex(targetHex)
  const mixed = color.map((value, index) => Math.round(value + (target[index] - value) * ratio))
  return `#${mixed.map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

function parseHex(hex) {
  const clean = hex.replace('#', '')
  return [0, 2, 4].map((index) => Number.parseInt(clean.slice(index, index + 2), 16))
}
