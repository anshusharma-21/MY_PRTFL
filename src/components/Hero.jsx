import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { profile, skills, socials } from '../data/profile'
import { brandIcons } from './ui/BrandIcons'
import { Counter } from './ui/Counter'
import { copyWithToast } from './ui/Toast'
import { ease } from '../lib/motion'
import { CharReveal, Magnetic, PillLink } from './ui/Motion'
import { ProfilePhoto } from './ui/ProfilePhoto'

/* Border-light colours — click the portrait to cycle through them. */
const LIGHTS = [
  { name: 'Theme', value: 'var(--color-lime)' },
  { name: 'Cyan', value: '#38BDF8' },
  { name: 'Violet', value: '#A78BFA' },
  { name: 'Amber', value: '#FBBF24' },
  { name: 'Rose', value: '#FB7185' },
  { name: 'Mint', value: '#34D399' },
]

/* Small labels floating around the portrait. */
const TAGS = [
  { label: 'Web Developer', className: '-left-6 top-[8%] sm:-left-14' },
  { label: 'React.js', className: '-right-2 top-[2%] sm:-right-8' },
  { label: 'Full Stack', className: '-right-6 top-[46%] sm:-right-16' },
  { label: 'Node.js', className: '-left-4 bottom-[22%] sm:-left-12' },
  { label: 'MERN', className: 'right-[6%] -bottom-2' },
]

function Portrait({ ready }) {
  const [idx, setIdx] = useState(0)
  const [pulse, setPulse] = useState(0)
  const color = LIGHTS[idx].value
  const next = () => {
    setIdx((i) => (i + 1) % LIGHTS.length)
    setPulse((p) => p + 1)
  }
  const ringMask = 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))'
  const light = `conic-gradient(from 0deg, transparent 0deg, transparent 200deg, ${color} 300deg, #fff 335deg, ${color} 350deg, transparent 360deg)`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={ready ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.3, ease, delay: 0.45 }}
      className="relative mx-auto w-fit lg:-mt-24"
    >
      <div className="relative size-[280px] sm:size-[340px] lg:size-[390px]">
        {/* Floating tags */}
        {TAGS.map((t, i) => (
          <motion.span
            key={t.label}
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: [0, -6, 0] } : {}}
            transition={{
              opacity: { delay: 1 + i * 0.12, duration: 0.6 },
              y: { delay: 1 + i * 0.12, duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`absolute z-20 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong bg-surface/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-soft backdrop-blur ${t.className}`}
          >
            <span className="size-1.5 rounded-full transition-colors duration-500" style={{ backgroundColor: color }} />
            {t.label}
          </motion.span>
        ))}

        <button
          type="button"
          onClick={next}
          aria-label={`Change portrait light colour (current: ${LIGHTS[idx].name})`}
          className="group absolute inset-0 rounded-full"
        >
          {/* Soft glow behind the light */}
          <span
            aria-hidden="true"
            className="absolute -inset-1 animate-[spin_4s_linear_infinite] rounded-full opacity-70 blur-xl transition-[background] duration-700"
            style={{ background: light, WebkitMask: ringMask, mask: ringMask }}
          />
          {/* Thin static border */}
          <span aria-hidden="true" className="absolute inset-0 rounded-full border border-line-strong" />
          {/* Travelling light — border only */}
          <span
            aria-hidden="true"
            className="absolute -inset-[1px] animate-[spin_4s_linear_infinite] rounded-full"
            style={{ background: light, WebkitMask: ringMask, mask: ringMask }}
          />
          {/* Click ripple */}
          <AnimatePresence>
            {pulse > 0 && (
              <motion.span
                key={pulse}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: color }}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 1.22, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              />
            )}
          </AnimatePresence>
          <span className="absolute inset-[10px] overflow-hidden rounded-full transition-transform duration-700 group-hover:scale-[0.98]">
            <ProfilePhoto className="size-full" />
          </span>
        </button>
      </div>
      <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full transition-colors duration-500" style={{ backgroundColor: color }} />
          Tap the circle to change the light
        </span>
      </p>
    </motion.div>
  )
}

const ROLES = ['Full Stack Developer', 'Web Developer', 'MERN Stack Developer', 'React Developer', 'Frontend Developer']

/** Types each role, deletes it, then moves to the next — forever. */
function Typewriter({ words, start }) {
  const reduce = useReducedMotion()
  const [w, setW] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!start || reduce) return
    const word = words[w]
    let delay = deleting ? 45 : 90
    if (!deleting && text === word) delay = 1700
    if (deleting && text === '') delay = 350
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setW((i) => (i + 1) % words.length)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, w, words, start, reduce])

  return (
    <span className="text-lime">
      {reduce ? words[0] : text}
      <span aria-hidden="true" className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-blink bg-lime" />
    </span>
  )
}

export function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0.55, 0.95], [1, 0])

  const social = Object.fromEntries(socials.filter((s) => s.url).map((s) => [s.id, s]))
  const contactIcons = [
    { label: `Email ${profile.email}`, href: `mailto:${profile.email}`, Icon: Mail },
    social.github && { label: 'GitHub profile', href: social.github.url, Icon: brandIcons.github, external: true },
    social.linkedin && { label: 'LinkedIn profile', href: social.linkedin.url, Icon: brandIcons.linkedin, external: true },
    { label: "Copy phone number", Icon: Phone, onClick: () => copyWithToast(profile.phoneDisplay, 'Phone number copied!', 'Paste it to call or message me') },
    social.codechef && { label: 'CodeChef profile', href: social.codechef.url, Icon: brandIcons.codechef, external: true },
  ].filter(Boolean)
  const stats = [
    { to: 5, suffix: '+', label: 'Projects built' },
    { to: 15, suffix: '+', label: 'Automated test files' },
    { to: skills.reduce((n, g) => n + g.items.length, 0), suffix: '+', label: 'Skills & tools' },
    { to: 100, suffix: '%', label: 'Production commitment' },
  ]

  const fadeIn = (d) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.9, ease, delay: d },
  })

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[96px]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] size-[600px] rounded-full bg-lime/[0.06] blur-[140px]" />

      <motion.div style={{ opacity: fade }} className="container-x relative flex flex-1 items-center py-14 lg:py-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <motion.p {...fadeIn(0.4)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/[0.07] px-4 py-2 text-sm text-fg">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
                <span className="relative size-2 rounded-full bg-lime" />
              </span>
              {profile.availability}
            </motion.p>
            <motion.p {...fadeIn(0.5)} className="mb-3 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium text-fg-soft">
              Hello, I&apos;m
            </motion.p>

            <motion.h1 style={{ y: nameY }} className="whitespace-nowrap font-display text-[clamp(2.1rem,10vw,4.2rem)] lg:text-[clamp(3.4rem,5.2vw,5.4rem)] font-bold leading-[1] tracking-[-0.045em]">
              <span className="sr-only">{profile.name}, {profile.title}</span>
              <span aria-hidden="true">
                <CharReveal text="Anshu" animate={ready} delay={0.1} />{' '}
                <CharReveal text="Kumari" animate={ready} delay={0.3} className="text-lime" />
              </span>
            </motion.h1>

            <motion.p {...fadeIn(0.8)} className="mt-7 font-display text-xl font-medium tracking-tight text-fg sm:text-[1.45rem]">
              <span className="sr-only">{ROLES.join(', ')}</span>
              <span aria-hidden="true" className="inline-flex min-h-[1.3em] items-center gap-3">
                <span className="font-mono text-[0.7em] text-muted">&gt;_</span>
                <Typewriter words={ROLES} start={ready} />
              </span>
            </motion.p>
            <motion.p {...fadeIn(0.9)} className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-fg-soft sm:text-[16.5px]">
              I build fast, dependable web applications from the first pixel to the last API call.{' '}
              <span className="font-medium text-fg">Interfaces people enjoy using</span>, backed by{' '}
              <span className="font-medium text-fg">code that&apos;s built to last</span>.
            </motion.p>

            <motion.div {...fadeIn(1)} className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <PillLink href="#work" icon={ArrowUpRight}>Explore my projects</PillLink>
              </Magnetic>
              <Magnetic>
                <PillLink href="#contact" variant="ghost" icon={ArrowUpRight}>Get in touch</PillLink>
              </Magnetic>
            </motion.div>

            <motion.ul {...fadeIn(1.1)} className="mt-8 flex flex-wrap items-center gap-3" aria-label="Contact and profiles">
              {contactIcons.map(({ label, href, Icon, external, onClick }) => {
                const cls =
                  'grid size-12 place-items-center rounded-full border border-white/15 bg-[#1f2124] text-fg shadow-[0_6px_20px_-8px_rgb(0_0_0/0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-on-lime'
                return (
                  <li key={label}>
                    {onClick ? (
                      <button type="button" onClick={onClick} aria-label={label} title={label} className={cls}>
                        <Icon className="size-5" aria-hidden="true" />
                      </button>
                    ) : (
                      <a href={href} aria-label={label} title={label} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={cls}>
                        <Icon className="size-5" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                )
              })}
            </motion.ul>

          </div>

          <Portrait ready={ready} />
        </div>
      </motion.div>

      <motion.div {...fadeIn(1.3)} className="container-x relative pb-10">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#161616]/70 backdrop-blur-xl lg:grid-cols-4">
          {stats.map((st, i) => (
            <div
              key={st.label}
              className={`group relative px-6 py-6 text-center transition-colors duration-500 hover:bg-white/[0.03] sm:py-7 ${i % 2 ? '' : 'border-r border-white/[0.07]'} ${i < 2 ? 'border-b border-white/[0.07] lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''}`}
            >
              <dd className="font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-none tracking-[-0.04em] text-fg transition-colors duration-500 group-hover:text-lime">
                <Counter to={st.to} suffix={st.suffix} />
              </dd>
              <dt className="mt-2 text-[13.5px] text-muted">{st.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
