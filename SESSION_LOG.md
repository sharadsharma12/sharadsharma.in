# Resume Website — Session Log

**Date:** 2026-06-26 (updated 2026-06-27)  
**Outcome:** Portfolio website built and deployed to https://sharadsharma.in

---

## What Was Built

A modern, responsive, interactive personal resume website for Sharad Sharma (Data Engineer II @ Amazon Fintech).

**Tech stack:** HTML5, CSS3, vanilla JavaScript  
**Design inspiration:** Microsoft AI Careers page (clean, minimal, bold typography, card-based layout)  
**Hosting:** GitHub Pages with custom domain  

---

## Files & Structure

```
~/resume-website/
├── index.html          — Main page (single-page, 6 sections)
├── style.css           — Responsive styles (3 breakpoints) + dark/light theme + micro-interactions + print styles
├── script.js           — Theme toggle, animated counters, parallax, magnetic buttons, scroll animations
├── CNAME               — Custom domain file for GitHub Pages
├── SESSION_LOG.md      — This file
└── assets/
    ├── amazon.jpg      — Amazon logo
    ├── tothenew.jpg    — To The New logo
    ├── optum.jpg       — Optum logo
    ├── tcs.png         — TCS logo
    ├── glbajaj.jpeg    — GL Bajaj Institute logo
    └── Sharad_Sharma_Resume.pdf — Downloadable resume
```

---

## Features

### Core
- **Dark/Light theme toggle** — Sun/moon icon in navbar, persists via localStorage, respects system preference on first visit
- **LinkedIn quick link** — `/sharadsharma12` with icon in navbar, grouped with theme toggle
- **Download Resume** — PDF download button in hero section (downloads `Sharad_Sharma_Resume.pdf`)
- **Company logos** — Real logos next to each job title
- **Tech stack icons** — Devicon library for Python, Java, Spark, Airflow, PostgreSQL, etc.
- **Fully responsive** — 3 breakpoints (1024px, 768px, 400px), mobile hamburger nav with animation
- **Active nav highlighting** — Current section highlighted as user scrolls

### Interactivity (Subtle & Professional)
- **Animated particle network** — Hero background with drifting dots connected by lines; adapts to theme; pauses off-screen for performance
- **Project cards carousel** — 3 swipeable project cards (Fintech TDW, DEEP, ExaLogs) with metrics; directional slide animations (left/right with scale); auto-advances every 5s; dot navigation; touch swipe support on mobile; pauses on hover
- **Interactive skills radar chart** — 6-axis spider chart with animated draw-in on scroll; hover highlights dots (glow + scale); tooltip shows proficiency % and context (e.g., "92% — 34 DAGs in production"); cursor changes to crosshair; redraws on theme switch; sticky on desktop
- **Animated stat counters** — Numbers count up from 0 when scrolling into view (eased with quartic curve)
- **Hero parallax** — Title fades out and stats drift up as you scroll
- **Magnetic buttons** — Follow cursor slightly on hover + shine sweep on primary button
- **Badge shimmer** — Subtle light sweep animation on the hero badge
- **Staggered fade-ins** — Elements appear with slight delays for rhythm (not all at once)
- **Timeline cards** — Slide right + blue glow on hover
- **Highlight cards** — Lift with icon scaling up on hover
- **Skill pills** — Lift with soft shadow on hover
- **Contact links** — Slide right with blue left-border accent on hover
- **Navbar** — Border/shadow appears only after scrolling (clean hero)
- **Theme switch** — Smooth 0.4s transition on all backgrounds/colors
- **Material Design easing** — All animations use `cubic-bezier(0.4, 0, 0.2, 1)`
- **Performance** — Scroll events use `requestAnimationFrame`; particle animation pauses when off-screen

---

## Sections

1. **Hero** — Particle network background, badge (Data Engineer II @ Amazon · Gurgaon, India), name, tagline, 3 animated stats, CTAs + download resume
2. **About** — "Pipelines at scale, reliability by design" + 3 highlight cards
3. **Experience** — 4 roles with company logos, project details, tech tags with devicon logos
4. **Skills** — Interactive radar chart (6-axis, hover tooltips) + 6 categories with icon-labeled pills
5. **Education** — B.Tech card with college logo + Certifications/Awards
6. **Recommendations** — 5 LinkedIn recommendations in horizontal scroll (3 visible at a time, arrow navigation, company context tags)
7. **Contact** — "Get in touch" + email, phone, LinkedIn, GitHub, location

---

## Data Sources Used

- **Primary resume:** `/Users/sshardb/documents/non-work/Personal/Sharad_Sharma_DataEngineer_Resume_2026.pdf`
- **Older detailed resume:** `/Users/sshardb/documents/non-work/Personal/Sharad_DataEngineer_6YOE.pdf`
- **LinkedIn profile:** https://in.linkedin.com/in/sharadsharma12
- **Company logos:** `/Users/sshardb/Documents/Non-Work/Personal/Logo/`

---

## Key Details from Resumes

### Amazon India (Fintech) — Data Engineer II (Apr 2022 – Present)
- Project: Fintech TDW, Team Size: 11
- AWS-Global: 15B+ records/month, $12B+ revenue, 15 countries
- US-Retail: 30B+ records/month, $45B+ revenue, ~1B records/day at peak
- 34 Airflow DAGs, Bronze→Silver→Gold architecture
- SLA improved Day 8 → Day 5, infra costs cut 71%
- Redshift latency reduced 54%, saves 1,200 hours/year

### To The New Pvt Ltd — Senior Data Engineer (Jan 2022 – Apr 2022)
- Auction client trade-analysis
- First engineer from TTN for this client
- 6-month roadmap single-handedly

### Optum Global Solution (UHG) — Associate Data Analyst/Data Engineer (Aug 2020 – Jan 2022)
- Project: DEEP (Data Science Enablement Platform), Team Size: 24
- 50+ processes, 30+ ingestion jobs, 5+ TB/day
- Cluster: 100TB, 750+ data nodes, 120 V-Cores
- Sources: DB2, Oracle, SQL Server, PostgreSQL, CSV/Excel → Hadoop

### TCS — System Engineer (Sep 2016 – Apr 2020)
- Project: TCS Analytics (ExaLogs), Team Size: 15, Role: Hadoop Developer
- Full Hadoop ecosystem: Sqoop, Hive, Pig, Phoenix, HBase, MapReduce, Flume
- Analytics dashboard (Angular, D3.js, Java, PostgreSQL) — adopted org-wide
- Led team of 5, Won Applause Award

---

## Deployment

| Item | Value |
|------|-------|
| GitHub Repo | https://github.com/sharadsharma12/sharadsharma.in |
| Live URL | https://sharadsharma.in |
| Hosting | GitHub Pages (free) |
| Domain Registrar | GoDaddy |
| DNS Records | 4x A records → GitHub IPs + CNAME www → sharadsharma12.github.io |
| HTTPS | Enforced (Let's Encrypt via GitHub) |

### GoDaddy DNS Configuration

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | sharadsharma12.github.io |

---

## Design Decisions

- **No framework** — pure HTML/CSS/JS for fast load, zero build step, easy to edit
- **Dark/Light theme** — CSS custom properties toggled via `data-theme` attribute; localStorage for persistence; smooth 0.4s transition between themes
- **Devicon CDN** — tech logos via `cdn.jsdelivr.net/gh/devicons/devicon`
- **Inter font** — Google Fonts, clean modern sans-serif
- **Responsive:** 3 breakpoints (1024px tablet, 768px mobile, 400px small)
- **Animations:** IntersectionObserver for scroll-triggered fade-ins with stagger
- **Company badges:** Logo + name + location as a distinct visual unit
- **LinkedIn in navbar** — Quick access with icon, grouped with theme toggle
- **No section numbers** — removed for cleaner look
- **Reduced bold** — only 1–2 key metrics per role highlighted
- **No generic copy** — rewrote headlines to be specific and concise

### Roast-Driven Improvements Applied
- ~~"Scroll to explore"~~ Removed — unnecessary
- ~~"Built with purpose" footer~~ Simplified to just © line
- ~~Over-bolding~~ Reduced to 1–2 per role
- ~~Generic headlines~~ Rewritten ("Pipelines at scale, reliability by design" / "Get in touch")
- ~~Section numbers (01, 02...)~~ Removed

---

## How to Update

1. Edit files in `~/resume-website/`
2. Go to https://github.com/sharadsharma12/sharadsharma.in
3. Click "Add file" → "Upload files"
4. Drag updated files — they overwrite existing ones
5. Commit — changes go live in ~1–2 minutes

---

## Future Improvements

- ~~Add dark mode toggle~~ ✅ Done
- ~~Add LinkedIn in navbar~~ ✅ Done
- ~~Make it interactive~~ ✅ Done (counters, parallax, magnetic buttons, micro-interactions)
- ~~Remove generic copy~~ ✅ Done
- ~~Add a downloadable PDF resume link~~ ✅ Done
- ~~Add a Projects section~~ ✅ Done (carousel with 3 project cards)
- ~~Add interactive skills visualization~~ ✅ Done (radar chart)
- ~~Add animated hero background~~ ✅ Done (particle network)
- ~~Add Open Graph meta tags~~ ✅ Done (og:title, og:description, og:image + twitter:card)
- ~~Add prefers-reduced-motion~~ ✅ Done (disables all animations for accessibility)
- ~~Add LinkedIn recommendations~~ ✅ Done (5 cards — Nirmal Kumar, Shivani Nathwani, Nitish Kochar, Rajlaxmi Desurkar, Mukesh Upadhyay — 3 visible at a time with scroll arrows + company context tags)
- ~~Add proficiency levels to radar chart~~ ✅ Done (Expert/Advanced legend + differentiated values + hover tooltip)
- Add page analytics (Google Analytics or Plausible)
- Optimize images (compress JPGs, convert to WebP)
- Add a case study page for the 71% cost reduction migration

---

## Session 2 Updates (2026-06-27)

### Changes Made

1. **Profile photo added** — Circular 120px headshot in hero section (90px on mobile)
2. **Hero layout restructured** — CSS Grid (`grid-template-columns: 120px 1fr`) with photo left, name + badge right; replaced negative margin hack
3. **Favicon added** — SVG favicon (`assets/favicon.svg`) with "SS" branding in blue square
4. **Font subsetting** — Inter reduced from 7 weights (300-900) to 3 (400/600/800) for faster load
5. **Devicon lazy-loaded** — `media="print" onload="this.media='all'"` defers non-critical CSS
6. **OG image fixed** — Regenerated at correct 1200x630 ratio (was 1200x1200, cropped on Slack/LinkedIn)
7. **Nav logo animation** — 3D tilt on hover (`perspective(400px) rotateY(25deg)`), expands from "SS" to "Sharad Sharma"
8. **Nav logo theming** — Black background in light mode, blue in dark mode
9. **Hero badge tightened** — `width: fit-content` + smaller padding so pill hugs text
10. **Photo circle fix** — Added `min-width`, `max-width`, `aspect-ratio: 1/1` to prevent stretching on prod
11. **Recommendations reordered** — Mukesh, Shivani, Nitish (managers first), then Nirmal, Rajlaxmi (colleagues)
12. **Recommendation corrections** — Nitish: "Managed me at Optum" (was TCS); Shivani: "Managed me at TCS" (was Optum)

### New Files
- `assets/photo.jpeg` — Profile headshot
- `assets/favicon.svg` — SVG favicon

### Known Issue (Prod)
- **SS → Sharad Sharma expansion broken on prod** — Logo expand animation not rendering correctly on live site. Needs investigation (likely CSS not uploaded or cached).

### Files Modified
- `index.html` — Photo, favicon link, font subset, logo markup, recommendation reorder
- `style.css` — Hero grid, photo styles, logo animation, badge fit-content, dark mode overrides
- `assets/og-preview.png` — Replaced with 1200x630 version
