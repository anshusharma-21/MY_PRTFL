import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Braces, Brain, Code, MonitorSmartphone, Server, Smartphone, Workflow, Wrench, Database } from 'lucide-react'
import {
  siCss, siExpress, siGit, siGithub, siGooglechrome, siHtml5, siJavascript, siMongodb,
  siNodedotjs, siPython, siReact, siRender, siTailwindcss, siVercel,
} from 'simple-icons'
import { skills } from '../data/profile'
import { ease } from '../lib/motion'
import { trackSpot } from './ui/Motion'

/* Icon + one-line description for each group. */
const GROUP_META = {
  Frontend: { icon: MonitorSmartphone, blurb: 'Interfaces people see, touch and enjoy' },
  'Backend & APIs': { icon: Server, blurb: 'Servers, routes and the APIs behind them' },
  Languages: { icon: Braces, blurb: 'What I write every day' },
  Database: { icon: Database, blurb: 'Where the data lives' },
  'Tools & Platforms': { icon: Wrench, blurb: 'How I build, debug and ship' },
}
const ORDER = ['Frontend', 'Backend & APIs', 'Languages', 'Database', 'Tools & Platforms']

/* Logo for every skill — brand marks where they exist, line icons otherwise. */
const SKILL_LOGO = {
  HTML5: siHtml5,
  CSS3: siCss,
  'React.js': siReact,
  'Tailwind CSS': siTailwindcss,
  'Responsive Web Design': Smartphone,
  'JavaScript (ES6+)': siJavascript,
  Python: siPython,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  'RESTful APIs': Workflow,
  MongoDB: siMongodb,
  Git: siGit,
  GitHub: siGithub,
  'VS Code': Code,
  'Chrome DevTools': siGooglechrome,
  Vercel: siVercel,
  Render: siRender,
}

/* Very dark brand colours (GitHub, Vercel…) would vanish on charcoal — draw them light. */
function brandColor(hex) {
  const n = parseInt(hex, 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.25 ? '#ededed' : `#${hex}`
}

function glowFor(skill) {
  const src = SKILL_LOGO[skill]
  if (src?.hex) {
    const c = brandColor(src.hex)
    return c === '#ededed' ? 'rgb(237 237 237 / 0.12)' : `${c}33`
  }
  return 'rgb(var(--accent-rgb) / 0.16)'
}

function Logo({ skill, className = 'size-4' }) {
  const src = SKILL_LOGO[skill] ?? Brain
  if (src.path) {
    return (
      <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={brandColor(src.hex)} aria-hidden="true">
        <path d={src.path} />
      </svg>
    )
  }
  const Icon = src
  return <Icon className={`shrink-0 text-lime ${className}`} aria-hidden="true" />
}

/* One skill tile — glows in its own brand colour on hover. */
function SkillTile({ skill, i }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.05 }}
      onPointerMove={trackSpot}
      style={{ '--glow': glowFor(skill) }}
      className="spotlight group/tile flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-white/25"
    >
      <span className="relative grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-bg/80 transition-transform duration-500 ease-[var(--ease-premium)] group-hover/tile:-rotate-6 group-hover/tile:scale-110">
        <Logo skill={skill} className="size-5" />
      </span>
      <span className="relative text-[15px] font-semibold leading-snug text-fg">{skill}</span>
    </motion.li>
  )
}

function SkillCard({ group, wide, index = 0 }) {
  const { icon: Icon, blurb } = GROUP_META[group.group] ?? { icon: Brain, blurb: '' }
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease, delay: (index % 2) * 0.12 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151617]/85 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-lime/35 sm:p-8 ${wide ? 'lg:col-span-2' : ''}`}
    >
      <Icon aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-6 size-44 rotate-[-12deg] text-white/[0.03] transition-all duration-700 group-hover:-rotate-[4deg] group-hover:text-lime/[0.07]" />
      <header className="relative flex items-center gap-4 border-b border-white/[0.07] pb-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-lime/30 bg-lime/[0.08] text-lime transition-transform duration-500 group-hover:-rotate-6">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[1.45rem] font-bold leading-tight tracking-tight">{group.group}</h3>
          <p className="mt-0.5 text-[14px] text-fg-soft">{blurb}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[12px] text-muted">
          {group.items.length} {group.items.length === 1 ? 'Skill' : 'Skills'}
        </span>
      </header>
      <ul className={`relative mt-6 grid gap-3 sm:grid-cols-2 ${wide ? 'lg:grid-cols-3' : ''}`}>
        {group.items.map((s, i) => (
          <SkillTile key={s} skill={s} i={i} />
        ))}
      </ul>
    </motion.article>
  )
}

export function Skills() {
  const [filter, setFilter] = useState('All')
  const groups = ORDER.map((n) => skills.find((g) => g.group === n)).filter(Boolean)
  const shown = filter === 'All' ? groups : groups.filter((g) => g.group === filter)
  const tabs = ['All', ...groups.map((g) => g.group)]

  return (
    <section id="skills" className="relative border-t border-line py-16 sm:py-20">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-lime/35 bg-lime/[0.07] px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-lime">
            <Code className="size-4" aria-hidden="true" /> Technical skills
          </p>
          <h2 className="mt-7 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1] tracking-[-0.045em]">
            Skills &amp; <span className="pr-2 font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-lime">capabilities</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-fg-soft">
            The languages, frameworks and tools I use to turn ideas into working products.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div role="tablist" aria-label="Filter skills" className="mt-8 flex flex-wrap justify-center gap-2.5">
          {tabs.map((t) => {
            const on = filter === t
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(t)}
                className={`relative rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300 ${
                  on ? 'border-lime/60 text-lime' : 'border-white/10 bg-white/[0.03] text-fg-soft hover:border-white/25 hover:text-fg'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="skill-filter"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-lime/[0.12] shadow-[0_0_28px_-4px_rgb(var(--accent-rgb)/0.55)]"
                  />
                )}
                <span className="relative">{t === 'All' ? 'All Skills' : t}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((g, i) => (
              <SkillCard key={g.group} group={g} index={i} wide={filter !== 'All' || (i === shown.length - 1 && shown.length % 2 === 1)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
