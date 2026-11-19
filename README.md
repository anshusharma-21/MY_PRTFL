# Anshu Kumari — Portfolio

React 19 · Vite · Tailwind CSS 4 · Motion · Lenis (smooth scroll) · Lucide React

```bash
npm install      # first time only
npm run dev      # open the local link it prints (usually http://localhost:5173)
npm run build    # production build → dist/
```

## Add your photo and résumé

| What | Put the file here | Result |
|------|-------------------|--------|
| Profile photo (square works best) | `public/profile.jpg` | Shows in the hero circle (initials "AK" until then) |
| Résumé PDF | `public/resume.pdf` | A "Résumé" download button appears in the hero |

## Update content

Everything lives in **`src/data/profile.js`** — projects, skills, learnings, education.
For LinkedIn / GitHub / CodeChef, replace `url: null` with your profile URL.

Profiles and projects without a URL are simply hidden — nothing shows "coming soon".

Animations respect the system "reduce motion" setting.
