import { motion } from 'motion/react'
import { Bot, CircleCheck, ExternalLink, FolderGit2, HeartPulse, Rocket, ShoppingBag } from 'lucide-react'
import { projects } from '../data/profile'
import { ease } from '../lib/motion'
import { trackSpot } from './ui/Motion'
import { GitHubIcon } from './ui/BrandIcons'

const ICONS = { hms: HeartPulse, urbancart: ShoppingBag, ai: Bot }

function ProjectCard({ project: p, index, lone }) {
  const Icon = ICONS[p.id] ?? FolderGit2
  const links = [
    p.links?.live && { href: p.links.live, label: 'Live demo', icon: ExternalLink },
    p.links?.github && { href: p.links.github, label: 'Source code', icon: GitHubIcon },
  ].filter(Boolean)

  return (
    <motion.article
      aria-labelledby={`${p.id}-title`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay: (index % 2) * 0.1 }}
      onPointerMove={trackSpot}
      className={`spotlight group relative flex flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#151617]/85 p-7 backdrop-blur-xl transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:border-lime/40 hover:shadow-[0_0_70px_-25px_rgb(var(--accent-rgb)/0.6)] sm:p-10 ${
        lone ? 'lg:col-span-2 lg:mx-auto lg:w-[calc(50%-12px)]' : ''
      }`}
    >
      <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* top row */}
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl border border-lime/30 bg-lime/[0.1] text-lime transition-all duration-500 group-hover:-rotate-6 group-hover:bg-lime group-hover:text-on-lime">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <span className="font-mono text-[15px] font-semibold uppercase tracking-[0.2em] text-lime">Project {p.index}</span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[12.5px] text-fg-soft">{p.type}</span>
      </div>

      <h3 id={`${p.id}-title`} className="relative mt-7 font-display text-[clamp(1.45rem,2vw,1.8rem)] font-bold leading-tight tracking-[-0.03em] transition-colors duration-300 group-hover:text-lime">
        {p.title}
      </h3>

      <ul className="relative mt-5 space-y-3.5">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[15px] leading-[1.7] text-fg-soft">
            <span className="mt-[11px] size-0 shrink-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-lime" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>

      <ul className="relative mt-7 flex flex-wrap gap-2.5" aria-label="Technologies and concepts">
        {p.tags.map((t) => (
          <li key={t} className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[13px] text-fg transition-colors hover:border-lime/50 hover:text-lime">
            {t}
          </li>
        ))}
      </ul>

      {/* footer */}
      <div className="relative mt-auto pt-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6">
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-5">
              {links.map(({ href, label, icon: L }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-lime underline-offset-4 hover:underline">
                  {label} <L className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-[13px] text-fg-soft">
              <CircleCheck className="size-4 text-lime" aria-hidden="true" />
              {p.stats[0][0]} {p.stats[0][1]}
            </span>
          )}
          <span className="inline-flex items-center gap-2 font-mono text-[13px] text-fg-soft">
            <CircleCheck className="size-4 text-lime" aria-hidden="true" />
            {p.stats[1][0]} {p.stats[1][1]}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const lone = projects.length % 2 === 1

  return (
    <section id="work" className="relative border-t border-line py-16 sm:py-20">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-lime/35 bg-lime/[0.07] px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-lime">
            <Rocket className="size-4" aria-hidden="true" /> Portfolio showcase
          </p>
          <h2 className="mt-7 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1] tracking-[-0.045em]">
            Featured <span className="pr-2 font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-lime">projects</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-fg-soft">
            A healthcare platform, an e-commerce portal and an AI assistant — built end to end.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} lone={lone && i === projects.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
