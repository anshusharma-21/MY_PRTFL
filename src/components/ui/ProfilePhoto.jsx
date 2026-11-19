import { useState } from 'react'
import { profile } from '../../data/profile'

/** Circular portrait. Falls back to initials until public/profile.jpg exists. */
export function ProfilePhoto({ className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden rounded-full bg-surface-2 ${className}`}>
      {failed ? (
        <div className="grid size-full place-items-center" role="img" aria-label={`${profile.name} — photo coming soon`}>
          <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-lime">AK</span>
        </div>
      ) : (
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          onError={() => setFailed(true)}
          className="size-full object-cover object-[50%_30%] scale-[1.08] grayscale-[15%] transition-[filter,transform] duration-700 hover:scale-[1.13] hover:grayscale-0"
          decoding="async"
        />
      )}
    </div>
  )
}
