import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Briefcase, Code2, FolderGit2, GraduationCap, HelpCircle, Send, TerminalSquare, Trash2, User } from 'lucide-react'
import { education, experience, profile, projects, skills, socials } from '../data/profile'
import { ease } from '../lib/motion'

const PROMPT = 'visitor@anshu:~$'

const CHIPS = [
  { cmd: 'help', icon: HelpCircle },
  { cmd: 'whoami', icon: User },
  { cmd: 'skills', icon: Code2 },
  { cmd: 'projects', icon: FolderGit2 },
  { cmd: 'experience', icon: Briefcase },
  { cmd: 'education', icon: GraduationCap },
  { cmd: 'contact', icon: Send },
  { cmd: 'clear', icon: Trash2 },
]

/* Each line: { t: text, k: kind } — kinds: cmd | ok | head | text | dim | err | link */
function run(raw) {
  const cmd = raw.trim().toLowerCase().replace(/^anshu\./, '').replace(/\(\)$/, '')
  switch (cmd) {
    case '':
      return []
    case 'help':
      return [
        { t: 'Available commands:', k: 'head' },
        ...[
          ['whoami', 'who I am'],
          ['skills', 'my tech stack'],
          ['projects', 'things I have built'],
          ['experience', 'where I work'],
          ['education', 'where I studied'],
          ['contact', 'how to reach me'],
          ['clear', 'clear the screen'],
        ].map(([c, d]) => ({ t: `  ${c.padEnd(12)} ${d}`, k: 'text' })),
      ]
    case 'whoami':
    case 'about':
      return [
        { t: `${profile.name} — ${profile.title}`, k: 'head' },
        { t: `📍 ${profile.location}`, k: 'dim' },
        { t: profile.intro, k: 'text' },
      ]
    case 'skills':
    case 'stack':
      return skills.flatMap((g) => [
        { t: `▸ ${g.group}`, k: 'head' },
        { t: `  ${g.items.join(' · ')}`, k: 'text' },
      ])
    case 'projects':
    case 'ls':
      return projects.flatMap((p) => [
        { t: `${p.index}  ${p.title}`, k: 'head' },
        { t: `    ${p.summary}`, k: 'text' },
        { t: `    [${p.tags.join(', ')}]`, k: 'dim' },
      ])
    case 'experience':
    case 'work':
      return experience.flatMap((j) => [
        { t: `${j.role}`, k: 'head' },
        { t: `  ${j.company} · ${j.location} · ${j.period}`, k: 'dim' },
        ...j.points.map((p) => ({ t: `  ✓ ${p}`, k: 'ok' })),
      ])
    case 'education':
      return education.flatMap((e) => [
        { t: `🎓 ${e.credential}`, k: 'head' },
        { t: `   ${e.institution}${e.location ? ` · ${e.location}` : ''} · ${e.period}`, k: 'dim' },
      ])
    case 'contact':
      return [
        { t: 'Let’s talk:', k: 'head' },
        { t: `  email   ${profile.email}`, k: 'link', href: `mailto:${profile.email}` },
        { t: '  phone   on request — use the Copy number button in Contact', k: 'dim' },
        ...socials.map((s) =>
          s.url ? { t: `  ${s.label.toLowerCase().padEnd(8)}${s.url}`, k: 'link', href: s.url } : { t: `  ${s.label.toLowerCase().padEnd(8)}coming soon`, k: 'dim' },
        ),
      ]
    case 'sudo hire anshu':
    case 'hire':
      return [{ t: '✓ Great choice. Run `contact` to get in touch.', k: 'ok' }]
    default:
      return [{ t: `command not found: ${raw.trim()} — type 'help' to see what I can do.`, k: 'err' }]
  }
}

const INTRO = [
  { t: 'system.init()', k: 'cmd' },
  { t: '✓ Environment ready [React · Node.js · Express · MongoDB]', k: 'ok' },
  { t: `✓ Profile: ${profile.name} | ${profile.title}`, k: 'ok' },
  { t: "Type 'help' or click a command above to explore.", k: 'text' },
]

const COLORS = {
  cmd: 'text-fg',
  ok: 'text-lime',
  head: 'text-fg font-semibold',
  text: 'text-fg-soft',
  dim: 'text-muted',
  err: 'text-rose-400',
  link: 'text-lime underline-offset-4 hover:underline',
}

export function Console() {
  const [lines, setLines] = useState(INTRO)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const outRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = outRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const exec = (raw) => {
    const c = raw.trim()
    if (c.toLowerCase() === 'clear') {
      setLines([])
    } else {
      setLines((l) => [...l, { t: c, k: 'cmd', prompt: true }, ...run(c)])
    }
    if (c) setHistory((h) => [c, ...h].slice(0, 30))
    setHIdx(-1)
    setValue('')
  }

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      if (history[i] !== undefined) {
        setHIdx(i)
        setValue(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(Math.max(i, -1))
      setValue(i >= 0 ? history[i] : '')
    }
  }

  return (
    <section id="console" className="relative border-t border-line py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.07] px-4 py-2 font-mono text-[12px] uppercase tracking-[0.2em] text-lime">
            <TerminalSquare className="size-4" aria-hidden="true" /> Interactive shell
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            Explore me in the{' '}
            <span className="pr-2 font-serif text-[1.12em] font-normal italic tracking-[-0.02em] text-lime">terminal.</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-fg-soft">
            Prefer the command line? Ask about my skills, projects and experience right here.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto mt-10 max-w-4xl"
        >
          <span aria-hidden="true" className="pointer-events-none absolute -inset-x-1 -inset-y-6 rounded-[40px] bg-lime/[0.06] blur-3xl sm:-inset-6" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f0d]/95 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl">
            {/* title bar */}
            <div className="flex items-center gap-4 border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <span className="flex gap-2" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </span>
              <p className="flex-1 truncate text-center font-mono text-[12.5px] text-muted">anshu@portfolio: ~</p>
              <span className="hidden font-mono text-[11px] text-muted sm:block">bash</span>
            </div>

            {/* command chips */}
            <div className="scrollbar-none flex gap-2 overflow-x-auto border-b border-white/[0.06] px-4 py-3">
              {CHIPS.map(({ cmd, icon: Icon }) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => exec(cmd)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[12px] text-fg-soft transition-colors hover:border-lime hover:text-lime"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {cmd}
                </button>
              ))}
            </div>

            {/* output */}
            <div
              ref={outRef}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
              onClick={() => inputRef.current?.focus({ preventScroll: true })}
              className="h-[360px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-[1.75] sm:text-[13.5px]"
            >
              {lines.map((l, i) =>
                l.k === 'cmd' ? (
                  <p key={i} className="mt-2 first:mt-0">
                    <span className="text-lime">{PROMPT}</span> <span className="text-fg">{l.t}</span>
                  </p>
                ) : l.href ? (
                  <p key={i} className="whitespace-pre-wrap">
                    <a href={l.href} className={COLORS.link}>
                      {l.t}
                    </a>
                  </p>
                ) : (
                  <p key={i} className={`whitespace-pre-wrap break-words ${COLORS[l.k]}`}>
                    {l.t}
                  </p>
                ),
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                exec(value)
              }}
              className="flex items-center gap-2 border-t border-white/[0.08] px-5 py-3.5 font-mono text-[13.5px]"
            >
              <label htmlFor="console-input" className="shrink-0 text-lime">
                {PROMPT}
              </label>
              <input
                id="console-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="type a command, e.g. skills"
                className="min-w-0 flex-1 bg-transparent text-fg caret-lime outline-none placeholder:text-muted/60 focus-visible:outline-none"
              />
              <button type="submit" aria-label="Run command" className="grid size-8 place-items-center rounded-lg bg-lime text-on-lime transition-transform hover:scale-105">
                <Send className="size-3.5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
