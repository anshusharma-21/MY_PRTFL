import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useMediaQuery } from '../hooks/useUtils'

/** A lime follower ring for mouse users — grows over links and buttons. */
export function Cursor() {
  const enabled = useMediaQuery('(pointer: fine) and (prefers-reduced-motion: no-preference)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHover(!!e.target.closest?.('a, button, [role="tab"], input, textarea, label'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[80] rounded-full border-2 border-lime shadow-[0_0_14px_rgb(var(--accent-rgb)/0.6)] transition-colors duration-200 ${hover ? 'bg-lime/15' : 'bg-transparent'}`}
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 22, height: hover ? 56 : 22, opacity: visible ? 1 : 0, }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}
