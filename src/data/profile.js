/**
 * Single source of truth for all portfolio content (taken from the résumé).
 * Add profile links later by replacing `url: null` with the real URL.
 * Photo: put your picture at public/profile.jpg.  Résumé: public/resume.pdf.
 */

export const profile = {
  name: 'Anshu Kumari',
  firstName: 'Anshu',
  title: 'Full Stack Developer',
  location: 'Bangalore, Karnataka, India',
  shortLocation: 'Bangalore, India',
  timeZone: 'Asia/Kolkata',
  email: 'anshusharma21aaj@gmail.com',
  phoneDisplay: '+91 92342 13875',
  phoneHref: 'tel:+919234213875',
  photo: '/profile.jpg',
  resume: '/resume.pdf',
  availability: 'Open to Full Stack Developer roles & collaborations',
  intro: 'I build fast, dependable web applications from the first pixel to the last API call. Interfaces people enjoy using, backed by code that’s built to last.',
  summary: 'I don’t stop at “it works.” I want to know why it works — and then build it the right way, so it keeps working.',
  about: [
    'Most of my work lives in the JavaScript world: React on the front, Node.js and Express in the middle, MongoDB underneath. I enjoy the part where all of it connects — the API calls, the data flow, the logic nobody sees.',
    'I also work with Python and AI APIs, bringing models like Gemini into real interfaces. Whatever I build, I want it to do its job reliably and be easy for the next developer to pick up.',
  ],
}

export const socials = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/anshu-kumari-32b1a82a7/', handle: 'in/anshu-kumari-32b1a82a7' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/anshusharma-21', handle: 'anshusharma-21' },
  { id: 'codechef', label: 'CodeChef', url: null },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'console', label: 'Console' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const experience = [
  {
    role: 'Application & Software Development Intern',
    company: 'AI Automation Labs LLP',
    location: 'Bangalore, Karnataka',
    period: '09/2026 — Present',
    current: true,
    points: [
      'Build requested features and refine existing ones as part of an active product team.',
      'Work across the stack — frontend components, backend services, REST API integrations and database operations.',
      'Debug issues, adjust application logic and help keep API-driven automation workflows running smoothly.',
    ],
  },
]

/** Projects — add real URLs to `links` (live / github) when ready. */
export const projects = [
  {
    id: 'hms',
    index: '01',
    title: 'Hospital Management System',
    type: 'Full-stack · Healthcare SaaS',
    summary: 'One platform where many hospitals — and each of their branches — run day-to-day operations, with eight separate dashboards for everyone from doctors to patients and every hospital’s data kept apart.',
    points: [
      'Covers a full hospital day: OPD/IPD, appointments, live token queues, digital prescriptions, beds & ICU, OT scheduling, pharmacy stock, lab reports, billing and insurance.',
      'Safety built in — drug-allergy alerts, a patient portal and FHIR-standard healthcare data conversion.',
      '15+ automated test files keep these workflows dependable.',
    ],
    stats: [
      ['8', 'Role dashboards'],
      ['15+', 'Test files'],
      ['FHIR', 'Data standard'],
    ],
    tags: ['Multi-tenant', 'RBAC', 'FHIR', 'Automated tests'],
    links: { live: null, github: null },
  },
  {
    id: 'urbancart',
    index: '02',
    title: 'UrbanCart',
    type: 'E-commerce · Admin portal',
    summary: 'An online store with its own admin side — shoppers browse a live catalog while admins manage products and inventory behind role-based access.',
    points: [
      'Built from reusable React components, with app state in Context API + useReducer and server data in TanStack React Query.',
      'REST APIs, protected routes and a wishlist that stays saved between visits.',
      'One product pipeline merges API, admin-added and static products into a single catalog.',
    ],
    stats: [
      ['3', 'Data sources unified'],
      ['RBAC', 'Admin access'],
      ['RQ', 'Server state'],
    ],
    tags: ['React', 'Context API', 'useReducer', 'TanStack Query', 'REST APIs'],
    links: { live: null, github: null },
  },
  {
    id: 'ai',
    index: '03',
    title: 'Quantum Assistant',
    type: 'AI Assistant · Gemini API',
    summary: 'A chat assistant written in plain JavaScript and CSS that talks to the Gemini API — answering questions in real time and describing images you upload.',
    points: [
      'Async requests, chat state and live DOM updates keep the conversation smooth — no page reloads.',
      'Images are read in the browser with the FileReader API and sent to the API as Base64.',
    ],
    stats: [
      ['Gemini', 'API'],
      ['Text + Image', 'Multimodal'],
      ['0', 'Frameworks'],
    ],
    tags: ['JavaScript', 'CSS', 'Gemini API', 'FileReader API'],
    links: { live: null, github: null },
  },
]

export const skills = [
  { group: 'Frontend', items: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS', 'Responsive Web Design'] },
  { group: 'Languages', items: ['JavaScript (ES6+)', 'Python'] },
  { group: 'Backend & APIs', items: ['Node.js', 'Express.js', 'RESTful APIs'] },
  { group: 'Database', items: ['MongoDB'] },
  { group: 'Tools & Platforms', items: ['Git', 'GitHub', 'VS Code', 'Chrome DevTools', 'Vercel', 'Render'] },
]

export const education = [
  { credential: 'Certificate Course in Web Development', institution: 'NavGurukul Foundation', location: 'Pune, MH', period: '04/2025 — 09/2026' },
  { credential: 'Bachelor of Computer Applications', institution: 'Amity University', location: null, period: '07/2022 — 07/2025', cgpa: 8.5 },
  { credential: 'Higher Secondary Education', institution: 'Crescent Public School', location: 'Bokaro, JH', period: '2018 — 2020' },
]

export const languages = ['English', 'Hindi']
