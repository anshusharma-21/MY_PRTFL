import Lenis from 'lenis'

/** Shared Lenis instance (null when reduced motion is preferred). */
export const smooth = { lenis: null }

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const lenis = new Lenis({ lerp: 0.1, anchors: true })
  smooth.lenis = lenis
  if (document.documentElement.style.overflow === 'hidden') lenis.stop() // preloader already locked
  let id = requestAnimationFrame(function raf(t) {
    lenis.raf(t)
    id = requestAnimationFrame(raf)
  })
  return () => {
    cancelAnimationFrame(id)
    lenis.destroy()
    smooth.lenis = null
  }
}

export function lockScroll(locked) {
  if (smooth.lenis) locked ? smooth.lenis.stop() : smooth.lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (smooth.lenis) smooth.lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}
