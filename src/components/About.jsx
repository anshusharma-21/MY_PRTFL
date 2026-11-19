import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Briefcase, CalendarDays, Code2, GraduationCap, MapPin, UserRound } from 'lucide-react'
import { education, experience, profile } from '../data/profile'
import { ease } from '../lib/motion'
import { trackSpot } from './ui/Motion'

const card = 'rounded-3xl border border-white/[0.08] bg-[#151617]/85 backdrop-blur-xl'
const serif = 'pr-2 font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-lime'

/* Only the two education entries the portfolio highlights. */
const certificate = education.find((e) => e.institution.includes('NavGurukul'))
const degree = education.find((e) => e.credential.includes('Bachelor'))

function Badge({ icon: Icon, children }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-lime/35 bg-lime/[0.07] px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-lime">
      <Icon className="size-4" aria-hidden="true" /> {children}
    </p>
  )
}

function Rise({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function EduCard({ edu, tag, delay }) {
  return (
    <Rise delay={delay}>
      <article onPointerMove={trackSpot} className={`${card} spotlight group relative overflow-hidden p-7 transition-colors duration-500 hover:border-lime/35`}>
        <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-lime/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <GraduationCap aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-4 size-32 rotate-[-12deg] text-white/[0.03] transition-all duration-700 group-hover:text-lime/[0.08]" />
        <p className="relative inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
          <GraduationCap className="size-3.5" aria-hidden="true" /> {tag}
        </p>
        <h3 className="relative mt-4 font-display text-[1.45rem] font-bold leading-tight tracking-tight">{edu.credential}</h3>
        <p className="relative mt-1.5 text-[15px] font-semibold text-lime">{edu.institution}</p>
        <p className="relative mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12.5px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" /> {edu.period}
          </span>
          {edu.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" /> {edu.location}
            </span>
          )}
        </p>
        {edu.cgpa && (
          <div className="relative mt-5 border-t border-white/[0.07] pt-5">
            <p className="flex items-center justify-between text-[15px] font-semibold">
              Academic performance
              <span className="font-mono text-lime">{edu.cgpa} / 10 CGPA</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${edu.cgpa * 10}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-lime-soft to-lime shadow-[0_0_14px_rgb(var(--accent-rgb)/0.7)]"
              />
            </div>
          </div>
        )}
      </article>
    </Rise>
  )
}

export function About() {
  const facts = [
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: Code2, label: 'Core stack', value: 'React · Node.js · Express · MongoDB' },
  ]

  return (
    <section id="about" className="relative border-t border-line pb-28 pt-16 sm:pb-36 sm:pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          {/* Story */}
          <div>
            <Rise>
              <Badge icon={UserRound}>About me</Badge>
              <h2 className="mt-7 font-display text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.045em]">
                Building web apps that <span className={serif}>actually work.</span>
              </h2>
            </Rise>
            <Rise delay={0.1} className="mt-8 space-y-5 text-[15.5px] leading-[1.8] text-fg-soft">
              <p>
                I&apos;m a <strong className="font-semibold text-fg">Full Stack Developer</strong> with a <strong className="font-semibold text-fg">Bachelor of Computer Applications from Amity University</strong> and
                intensive web development training from <strong className="font-semibold text-fg">NavGurukul</strong>. My work centres on turning ideas into responsive, data-driven
                applications that are functional, scalable and easy to maintain.
              </p>
              <p>
                Currently working as an <strong className="font-semibold text-fg">Application &amp; Software Development Intern at {experience[0].company}</strong>, I build across the
                full stack — frontend components, backend services, <strong className="font-semibold text-fg">REST API integrations</strong> and database operations — while supporting
                API-driven automation workflows.
              </p>
              <p>
                Whether it&apos;s a <strong className="font-semibold text-fg">multi-tenant hospital platform with 8 role-based dashboards</strong>, an <strong className="font-semibold text-fg">e-commerce portal with a unified
                product pipeline</strong> or an <strong className="font-semibold text-fg">AI assistant powered by the Gemini API</strong>, I focus on building software that solves real
                problems — and keep growing in backend development and AI-driven solutions.
              </p>
            </Rise>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {facts.map((f, i) => (
                <motion.li
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.07 }}
                  className={`${card} p-5`}
                >
                  <f.icon className="size-5 text-lime" aria-hidden="true" />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{f.label}</p>
                  <p className="mt-1 text-[14.5px] font-semibold leading-snug text-fg">{f.value}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Education + philosophy */}
          <div className="flex flex-col gap-5 lg:pt-28">
            {degree && <EduCard edu={degree} tag="Degree" delay={0.18} />}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Experience & education timeline ──────────────────────── */

const TIMELINE = [
  ...experience.map((j) => ({
    kind: 'work',
    title: j.role,
    org: j.company,
    place: j.location,
    period: j.period,
    current: j.current,
    points: [
      'Contribute to application development by implementing requested features, improving existing functionality and supporting ongoing software enhancements.',
      'Build and refine frontend components and backend services that support end-to-end application workflows.',
      'Integrate REST APIs and handle database operations to keep data flowing reliably between services.',
      'Troubleshoot technical issues and modify application logic based on project requirements.',
      'Support and maintain API-driven automation workflows used across the product.',
    ],
    tags: ['Frontend', 'Backend services', 'REST APIs', 'Databases', 'Automation workflows'],
  })),
  certificate && {
    kind: 'edu',
    title: certificate.credential,
    org: certificate.institution,
    place: certificate.location,
    period: certificate.period,
    text: 'Full-time, hands-on training in modern web development — building responsive interfaces, REST APIs and database-backed applications with the MERN stack.',
    tags: ['HTML5 & CSS3', 'JavaScript', 'React.js', 'Node.js & Express', 'MongoDB'],
  },
  degree && {
    kind: 'edu',
    title: degree.credential,
    org: degree.institution,
    place: degree.location,
    period: degree.period,
    text: 'Comprehensive three-year curriculum covering Programming Fundamentals, Data Structures & Algorithms, Operating Systems and Computer Networks — building a strong foundation in problem solving and core computer science.',
    tags: ['Programming Fundamentals', 'Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'Problem Solving'],
  },
].filter(Boolean)

export function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="experience" className="relative scroll-mt-28 overflow-x-clip pb-16 sm:pb-20">
      <div className="container-x">

        <ol ref={listRef} className="relative space-y-6 sm:pl-16">
          {/* faint track + a lime line that draws itself while scrolling */}
          <span aria-hidden="true" className="absolute bottom-0 left-[23px] top-0 hidden w-px bg-white/10 sm:block" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: draw }}
            className="absolute bottom-0 left-[22px] top-0 hidden w-[3px] origin-top rounded-full bg-gradient-to-b from-lime via-lime to-lime/40 shadow-[0_0_14px_rgb(var(--accent-rgb)/0.8)] sm:block"
          />
          {TIMELINE.map((t, i) => {
            const Icon = t.kind === 'work' ? Briefcase : GraduationCap
            return (
              <motion.li
                key={t.title}
                initial={{ opacity: 0, x: 70, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease }}
                className="group/item relative"
              >
                {/* timeline dot: pops in, pulses, spins its icon on hover */}
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                  className="absolute -left-16 top-8 hidden size-12 place-items-center rounded-full border border-lime/50 bg-bg text-lime shadow-[0_0_24px_-4px_rgb(var(--accent-rgb)/0.7)] transition-colors duration-500 group-hover/item:bg-lime group-hover/item:text-on-lime sm:grid"
                >
                  <span className="absolute inset-0 animate-ping rounded-full border border-lime/40 [animation-duration:2.4s]" />
                  <Icon className="size-5 transition-transform duration-700 group-hover/item:rotate-[360deg]" />
                </motion.span>
                <article
                  onPointerMove={trackSpot}
                  className={`${card} spotlight shine group relative overflow-hidden p-6 transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:border-lime/40 hover:shadow-[0_25px_70px_-25px_rgb(var(--accent-rgb)/0.6)] sm:p-9`}
                >
                  <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-lime/70 to-transparent" />
                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.55rem)] font-bold leading-tight tracking-tight">{t.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[15.5px] font-semibold text-lime">
                        <Icon className="size-4" aria-hidden="true" />
                        {t.org}
                        {t.place && <span className="text-[15px] font-normal text-muted">· {t.place}</span>}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-fg-soft">
                      {t.current ? <span className="size-1.5 animate-pulse rounded-full bg-lime" /> : <CalendarDays className="size-3.5 text-lime" aria-hidden="true" />}
                      {t.period}
                    </span>
                  </div>

                  {t.points ? (
                    <ul className="relative mt-6 space-y-3">
                      {t.points.map((p, j) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease, delay: 0.35 + j * 0.12 }}
                          className="flex gap-3 text-[15.5px] leading-relaxed text-fg-soft"
                        >
                          <span className="mt-[9px] size-1.5 shrink-0 rotate-45 bg-lime" aria-hidden="true" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="relative mt-5 text-[15.5px] leading-relaxed text-fg-soft">{t.text}</p>
                  )}

                  <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-6">
                    {t.tags.map((tag, j) => (
                      <motion.li
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 + j * 0.06 }}
                        className="cursor-default rounded-full border border-lime/25 bg-lime/[0.06] px-3 py-1 font-mono text-[12px] text-lime transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-on-lime"
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
