/**
 * Accent colour switcher. Every accent in the UI reads from
 * --color-lime / --color-lime-soft / --accent-rgb, so swapping these
 * three variables recolours the whole site instantly.
 */
export const ACCENTS = [
  { id: 'lime', name: 'Lime', hex: '#c6f432', soft: '#dcff7a', rgb: '198 244 50' },
  { id: 'cyan', name: 'Cyan', hex: '#22d3ee', soft: '#67e8f9', rgb: '34 211 238' },
  { id: 'violet', name: 'Violet', hex: '#a78bfa', soft: '#c4b5fd', rgb: '167 139 250' },
  { id: 'orange', name: 'Orange', hex: '#fb923c', soft: '#fdba74', rgb: '251 146 60' },
]

const KEY = 'portfolio-accent'
let current = ACCENTS[0]

export function getAccent() {
  return current
}

export function applyAccent(id) {
  current = ACCENTS.find((a) => a.id === id) ?? ACCENTS[0]
  const root = document.documentElement.style
  root.setProperty('--color-lime', current.hex)
  root.setProperty('--color-lime-soft', current.soft)
  root.setProperty('--accent-rgb', current.rgb)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#141414')
  try {
    localStorage.setItem(KEY, current.id)
  } catch {
    /* storage unavailable — the choice just isn't remembered */
  }
  window.dispatchEvent(new CustomEvent('accentchange', { detail: current }))
}

export function initAccent() {
  let saved = null
  try {
    saved = localStorage.getItem(KEY)
  } catch {
    /* ignore */
  }
  if (saved && saved !== 'lime') applyAccent(saved)
}
