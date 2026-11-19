import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleCheck } from 'lucide-react'

/* Tiny global toast: call showToast('message') from anywhere. */
const listeners = new Set()
let nextId = 1

export function showToast(title, detail) {
  const t = { id: nextId++, title, detail }
  listeners.forEach((fn) => fn(t))
}

/** Copy text to the clipboard and confirm it with a toast. */
export async function copyWithToast(text, title, detail = text) {
  try {
    await navigator.clipboard.writeText(text)
    showToast(title, detail)
  } catch {
    showToast('Couldn’t copy automatically', 'Please try again')
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const add = (t) => {
      setToasts((list) => [...list.slice(-2), t])
      setTimeout(() => setToasts((list) => list.filter((x) => x.id !== t.id)), 2600)
    }
    listeners.add(add)
    return () => listeners.delete(add)
  }, [])

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="flex items-center gap-3 rounded-2xl border border-lime/40 bg-[#151612]/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.9),0_0_30px_-10px_rgb(var(--accent-rgb)/0.5)] backdrop-blur-xl"
          >
            <span className="grid size-8 place-items-center rounded-full bg-lime text-on-lime">
              <CircleCheck className="size-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-fg">{t.title}</span>
              {t.detail && <span className="block font-mono text-[12px] text-fg-soft">{t.detail}</span>}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
