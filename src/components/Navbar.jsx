import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, FileText } from 'lucide-react'
import { navLinks, profile, socials } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { ease } from '../lib/motion'
import { lockScroll } from '../lib/smoothScroll'
import { ACCENTS, applyAccent, getAccent } from '../lib/theme'
import { useAssetAvailable } from '../hooks/useUtils'

const SECTION_IDS = navLinks.map((l) => l.id)

/** Text that rolls up to a lime copy on hover. */
export function RollText({ children, className = '' }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 block translate-y-full text-lime transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-y-0" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

/** Accent colour switcher — recolours the whole site. */
function AccentDots({ className = '' }) {
  const [active, setActive] = useState(getAccent().id)
  return (
    <div role="radiogroup" aria-label="Accent colour" className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/60 p-1.5 ${className}`}>
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={active === a.id}
          aria-label={`${a.name} theme`}
          title={a.name}
          onClick={() => {
            applyAccent(a.id)
            setActive(a.id)
          }}
          className={`size-5 rounded-full transition-transform duration-300 hover:scale-110 ${active === a.id ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-[#161616]' : ''}`}
          style={{ backgroundColor: a.hex }}
        />
      ))}
    </div>
  )
}

export function Navbar({ ready }) {
  const hasResume = useAssetAvailable(profile.resume, 'pdf')
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 200 && y > prev && !open)
  })

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -120 }}
        animate={{ y: !ready || hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container-x pt-4">
          <nav
            aria-label="Primary"
            className={`flex h-16 items-center justify-between rounded-full border pl-6 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
              scrolled && !open
                ? 'border-white/10 bg-[#161616]/80 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)]'
                : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <a href="#home" onClick={close} aria-label="Anshu Kumari — home" className="group flex items-center font-mono text-[22px] font-bold tracking-tight">
              <span className="text-lime transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-translate-x-1">&lt;</span>
              <span className="px-1">Anshu</span>
              <span className="text-lime transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1">/&gt;</span>
            </a>

            <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group flex items-center gap-2 text-sm" aria-current={active === l.id ? 'location' : undefined}>
                    <span className={`size-1.5 rounded-full transition-all duration-300 ${active === l.id ? 'scale-100 bg-lime' : 'scale-0 bg-transparent'}`} aria-hidden="true" />
                    <RollText className={active === l.id ? 'text-fg' : 'text-fg-soft'}>{l.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <AccentDots />
              {hasResume ? (
                <a href={profile.resume} download className="group flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-5 py-2.5 text-sm transition-colors hover:border-lime">
                  <FileText className="size-4 text-lime" aria-hidden="true" />
                  <RollText>Résumé</RollText>
                </a>
              ) : (
                <a href="#contact" className="group flex items-center gap-2 rounded-full border border-line-strong bg-bg/60 px-5 py-2.5 text-sm transition-colors hover:border-lime">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-lime/60" />
                    <span className="relative size-2 rounded-full bg-lime" />
                  </span>
                  <RollText>Let&apos;s talk</RollText>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-[60] flex h-11 items-center gap-3 rounded-full border border-line-strong px-4 font-mono text-xs uppercase tracking-widest lg:hidden"
            >
              {open ? 'Close' : 'Menu'}
              <span className="flex w-4 flex-col gap-1" aria-hidden="true">
                <span className={`h-px w-full bg-fg transition-transform duration-300 ${open ? 'translate-y-[2.5px] rotate-45' : ''}`} />
                <span className={`h-px w-full bg-fg transition-transform duration-300 ${open ? '-translate-y-[2.5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-surface px-5 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: 'circle(0% at 90% 36px)' }}
            animate={{ clipPath: 'circle(150% at 90% 36px)' }}
            exit={{ clipPath: 'circle(0% at 90% 36px)' }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={close}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease }}
                    className={`flex items-baseline gap-4 py-1 font-display text-5xl font-semibold tracking-tight ${active === l.id ? 'text-lime' : ''}`}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-auto space-y-4 border-t border-line pt-6 text-sm">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
                Theme <AccentDots />
              </div>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 break-all text-fg-soft">
                {profile.email} <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <p className="flex gap-4 font-mono text-xs uppercase tracking-widest text-muted">
                {socials.map((s) => (
                  <span key={s.id}>{s.label}</span>
                ))}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
