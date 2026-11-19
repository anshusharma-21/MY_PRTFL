import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ease } from '../lib/motion'
import { lockScroll } from '../lib/smoothScroll'

const NAME = 'Anshu Kumari'
const STEPS = ['$ npm run portfolio', '✓ loading projects', '✓ compiling skills', '✓ ready']
const DURATION = 2100

/** Intro: the </> logo assembles, the name types out, build lines run, then the curtain lifts. */
export function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [t, setT] = useState(0) // 0 → 1 progress
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduce) {
      setShow(false)
      onDone()
      return
    }
    lockScroll(true)
    const start = performance.now()
    let timeout
    let id = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / DURATION)
      setT(p)
      if (p < 1) id = requestAnimationFrame(tick)
      else
        timeout = setTimeout(() => {
          setShow(false)
          lockScroll(false)
          onDone()
        }, 300)
    })
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(timeout)
      lockScroll(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  const typed = NAME.slice(0, Math.round(Math.min(1, Math.max(0, (t - 0.12) / 0.4)) * NAME.length))
  const steps = STEPS.slice(0, Math.floor(Math.max(0, (t - 0.45) / 0.5) * STEPS.length) + (t >= 0.45 ? 1 : 0)).slice(0, STEPS.length)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[#0f100e]"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          {/* soft glow + grid */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.12] blur-[120px]" />
          <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_10%,transparent_65%)]" />

          <div className="relative flex flex-col items-center px-6 text-center">
            {/* logo */}
            <div className="flex items-center font-mono text-[clamp(3rem,9vw,6rem)] font-bold leading-none text-lime">
              <motion.span initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
                &lt;
              </motion.span>
              <motion.span
                className="mx-[0.12em] inline-block text-fg"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.25 }}
              >
                /
              </motion.span>
              <motion.span initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>
                &gt;
              </motion.span>
            </div>

            {/* name */}
            <p className="mt-8 h-[1.2em] font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold tracking-[-0.03em] text-fg">
              {typed}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-blink bg-lime" />
            </p>
            <motion.p
              className="mt-2 font-mono text-[12px] uppercase tracking-[0.3em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: t > 0.5 ? 1 : 0 }}
            >
              Full Stack Developer
            </motion.p>

            {/* build log */}
            <div className="mt-10 h-[104px] w-[min(320px,80vw)] text-left font-mono text-[13px] leading-[26px]">
              {steps.map((s, i) => (
                <motion.p
                  key={s}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={i === 0 ? 'text-fg-soft' : 'text-lime'}
                >
                  {s}
                </motion.p>
              ))}
            </div>

            {/* progress */}
            <div className="mt-4 h-[3px] w-[min(320px,80vw)] overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-lime shadow-[0_0_14px_rgb(var(--accent-rgb)/0.9)]" style={{ width: `${Math.round(t * 100)}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
