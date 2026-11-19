import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ease } from '../../lib/motion'

/** Each line slides up from behind a mask. `lines` is an array of nodes. */
export function LineReveal({ lines, className = '', lineClassName = '', delay = 0, animate }) {
  const trigger = animate === undefined ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -80px 0px' } } : { animate: animate ? 'show' : 'hidden' }
  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 1, ease, delay: delay + i * 0.08 } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Characters rise one by one — used for the big hero name. */
export function CharReveal({ text, animate, delay = 0, className = '' }) {
  return (
    <motion.span className={`inline-flex overflow-hidden pb-[0.06em] ${className}`} initial="hidden" animate={animate ? 'show' : 'hidden'} aria-label={text}>
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          variants={{ hidden: { y: '110%', rotate: 8 }, show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease, delay: delay + i * 0.035 } } }}
        >
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </motion.span>
  )
}

/** Words brighten one after another as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

/** Pulls its child gently toward the pointer. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div className={`inline-block ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

/** Section label — a lime-dotted pill, e.g. "● About me" */
export function SectionLabel({ children, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className={`inline-flex w-fit items-center gap-2.5 self-start whitespace-nowrap rounded-full border border-line-strong bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-soft lg:sticky lg:top-28 ${className}`}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-lime/50" />
        <span className="relative size-2 rounded-full bg-lime" />
      </span>
      {children}
    </motion.p>
  )
}

/** Primary pill button with a fill-wipe hover. */
export function PillLink({ href, children, variant = 'lime', icon: Icon, className = '', ...rest }) {
  const styles =
    variant === 'lime'
      ? 'bg-lime text-on-lime before:bg-fg'
      : 'border border-line-strong text-fg before:bg-lime hover:text-on-lime hover:border-lime'
  return (
    <a
      href={href}
      className={`group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full px-6 text-[15px] font-medium transition-colors duration-500 before:absolute before:inset-0 before:translate-y-full before:rounded-full before:transition-transform before:duration-500 before:ease-[var(--ease-premium)] hover:before:translate-y-0 ${styles} ${className}`}
      {...rest}
    >
      <span className="relative">{children}</span>
      {Icon && <Icon className="relative size-4 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true" />}
    </a>
  )
}

/** Pointer handler for the `spotlight` utility — moves the glow to the cursor. */
export function trackSpot(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}
