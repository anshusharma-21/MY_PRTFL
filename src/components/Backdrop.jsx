import { useEffect, useRef } from 'react'
import { getAccent } from '../lib/theme'

/**
 * Site-wide living background:
 *  – soft colour lights that slowly drift (aurora)
 *  – a constellation of particles linked by thin lines; lines reach out
 *    to the cursor and particles gently drift away from it
 * Pauses when the tab is hidden; static when reduced motion is preferred.
 */
export function Backdrop() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    const LINK = 140
    let w = 0
    let h = 0
    let pts = []
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(110, (w * h) / 16000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
        lime: Math.random() < 0.35,
      }))
    }

    const draw = () => {
      const A = getAccent().rgb.replace(/ /g, ',')
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduce) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 120 * 120 && d2 > 0) {
            const f = (1 - Math.sqrt(d2) / 120) * 0.6
            p.x += (dx / Math.sqrt(d2)) * f
            p.y += (dy / Math.sqrt(d2)) * f
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < -20) p.x = w + 20
          if (p.x > w + 20) p.x = -20
          if (p.y < -20) p.y = h + 20
          if (p.y > h + 20) p.y = -20
        }
      }
      // links between particles
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${A},${(1 - d / LINK) * 0.16})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        // links to the cursor
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 200) {
          ctx.strokeStyle = `rgba(${A},${(1 - md / 200) * 0.5})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.lime ? `rgba(${A},0.8)` : 'rgba(237,237,237,0.45)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce) draw()
      else raf = requestAnimationFrame(loop)
    }
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start())
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onAccent = () => reduce && draw()
    const onResize = () => {
      resize()
      if (reduce) draw()
    }

    resize()
    start()
    window.addEventListener('resize', onResize)
    window.addEventListener('accentchange', onAccent)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('accentchange', onAccent)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(10_10_10/0.7)_100%)]" />
    </div>
  )
}
