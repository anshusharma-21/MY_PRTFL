import { useCallback, useEffect, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { initSmoothScroll } from './lib/smoothScroll'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Backdrop } from './components/Backdrop'
import { Toaster } from './components/ui/Toast'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About, Experience } from './components/About'
import { Console } from './components/Console'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'

/** Each section rises into view as you scroll to it. */
function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 90, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-lime" style={{ scaleX }} />
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])

  useEffect(() => initSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-on-lime"
        >
          Skip to content
        </a>
        <Backdrop />
        <Toaster />
        <Preloader onDone={onDone} />
        <Cursor />
        <ScrollProgress />
        <Navbar ready={ready} />
        <main id="main">
          <Hero ready={ready} />
          <Reveal>
            <Console />
          </Reveal>
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>
      </div>
    </MotionConfig>
  )
}
