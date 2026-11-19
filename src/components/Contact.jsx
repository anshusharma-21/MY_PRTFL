import { motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Copy, Download, Mail, Phone, Send } from 'lucide-react'
import { profile, socials } from '../data/profile'
import { useAssetAvailable } from '../hooks/useUtils'
import { ease } from '../lib/motion'
import { brandIcons } from './ui/BrandIcons'
import { Magnetic, trackSpot } from './ui/Motion'
import { copyWithToast } from './ui/Toast'

const social = Object.fromEntries(socials.filter((s) => s.url).map((s) => [s.id, s]))

/* One contact card — the whole card is the action. */
function ContactCard({ icon: Icon, label, title, sub, cta, ctaIcon: CtaIcon = ArrowUpRight, href, onClick, external, i }) {
  const inner = (
    <>
      {/* hover light + watermark */}
      <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 size-40 rounded-full bg-lime/0 blur-3xl transition-colors duration-700 group-hover:bg-lime/15" />
      <Icon aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-4 size-32 rotate-[-12deg] text-white/[0.03] transition-all duration-700 ease-[var(--ease-premium)] group-hover:-rotate-[4deg] group-hover:text-lime/[0.08]" />

      <span className="relative flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl border border-lime/30 bg-lime/[0.08] text-lime transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-lime group-hover:text-on-lime">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-white/15 text-fg-soft transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-on-lime">
          <CtaIcon className="size-4" aria-hidden="true" />
        </span>
      </span>

      <span className="relative mt-8 block font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
        {String(i + 1).padStart(2, '0')} · {label}
      </span>
      <span className="relative mt-2 block font-display text-[1.55rem] font-bold leading-tight tracking-[-0.025em] text-fg">{title}</span>
      <span className="relative mt-2 block text-[14.5px] leading-relaxed text-fg-soft [overflow-wrap:anywhere]">{sub}</span>

      <span className="relative mt-auto block pt-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13.5px] font-semibold text-fg transition-colors duration-300 group-hover:border-lime/50 group-hover:text-lime">
          {cta}
        </span>
      </span>
    </>
  )
  const cls =
    'spotlight group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-[#1a1b1c]/90 to-[#131414]/90 p-7 text-left backdrop-blur-xl transition-[border-color,translate,box-shadow] duration-500 hover:-translate-y-2 hover:border-lime/40 hover:shadow-[0_25px_70px_-25px_rgb(var(--accent-rgb)/0.55)]'
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease, delay: i * 0.08 }}
    >
      {onClick ? (
        <button type="button" onClick={onClick} onPointerMove={trackSpot} className={`${cls} w-full`}>
          {inner}
        </button>
      ) : (
        <a href={href} onPointerMove={trackSpot} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={cls}>
          {inner}
        </a>
      )}
    </motion.li>
  )
}

export function Contact() {
  const hasResume = useAssetAvailable(profile.resume, 'pdf')
  const [user, domain] = profile.email.split('@')
  const cards = [
    {
      icon: Mail,
      label: 'Email',
      title: 'Drop me a line',
      sub: (
        <>
          {user}
          <wbr />@{domain}
        </>
      ),
      cta: 'Send an email',
      href: `mailto:${profile.email}?subject=${encodeURIComponent('Hello Anshu')}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      title: 'Let’s have a call',
      sub: 'Tap to copy my number — then call or WhatsApp.',
      cta: 'Copy number',
      ctaIcon: Copy,
      onClick: () => copyWithToast(profile.phoneDisplay, 'Phone number copied!', 'Paste it to call or message me'),
    },
    social.linkedin && { icon: brandIcons.linkedin, label: 'LinkedIn', title: 'Let’s connect', sub: 'Follow my journey and say hi.', cta: 'Open LinkedIn', href: social.linkedin.url, external: true },
    social.github && { icon: brandIcons.github, label: 'GitHub', title: 'Peek at my code', sub: `@${social.github.handle}`, cta: 'View GitHub', href: social.github.url, external: true },
  ].filter(Boolean)

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pb-14 pt-16 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-60 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[140px]" />
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-lime/35 bg-lime/[0.07] px-5 py-2.5 font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-lime">
            <Send className="size-4" aria-hidden="true" /> Let&apos;s connect
          </p>
          <h2 className="mt-7 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1] tracking-[-0.045em]">
            Get in <span className="pr-2 font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-lime">touch.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-fg-soft">Have a role, a project or just an idea? My inbox is always open.</p>
        </motion.div>

        <ul className={`mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 ${cards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {cards.map((c, i) => (
            <ContactCard key={c.label} {...c} i={i} />
          ))}
        </ul>

        {hasResume && (
          <div className="mt-12 flex justify-center">
            <Magnetic strength={0.3}>
              <a
                href={profile.resume}
                download="Anshu_Kumari_Resume.pdf"
                className="group inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-semibold text-on-lime shadow-[0_12px_40px_-12px_rgb(var(--accent-rgb)/0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Download className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                Download résumé
              </a>
            </Magnetic>
          </div>
        )}

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">© {new Date().getFullYear()} {profile.name}</p>
          <a href="#home" className="group inline-flex items-center gap-2 text-sm text-fg-soft transition-colors hover:text-lime">
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-on-lime">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
