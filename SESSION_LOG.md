# Resume Website — Session Log

**Date:** 2026-06-26  
**Outcome:** Portfolio website built and deployed to https://sharadsharma.in

---

## What Was Built

A modern, responsive personal resume website for Sharad Sharma (Data Engineer II @ Amazon Fintech).

**Tech stack:** HTML5, CSS3, vanilla JavaScript  
**Design inspiration:** Microsoft AI Careers page (clean, minimal, bold typography, card-based layout)  
**Hosting:** GitHub Pages with custom domain  

---

## Files & Structure

```
~/resume-website/
├── index.html          — Main page (single-page, 6 sections)
├── style.css           — Responsive styles (3 breakpoints) + dark/light theme
├── script.js           — Theme toggle, scroll animations, mobile nav, active link
├── CNAME               — Custom domain file for GitHub Pages
├── SESSION_LOG.md      — This file
└── assets/
    ├── amazon.jpg      — Amazon logo
    ├── tothenew.jpg    — To The New logo
    ├── optum.jpg       — Optum logo
    ├── tcs.png         — TCS logo
    └── glbajaj.jpeg    — GL Bajaj Institute logo
```

---

## Features

- **Dark/Light theme toggle** — Sun/moon icon in navbar, persists via localStorage, respects system preference on first visit
- **LinkedIn quick link** — `/sharadsharma12` with icon in navbar, links to profile
- **Company logos** — Real logos (from Personal/Logo folder) next to each job title
- **Tech stack icons** — Devicon library for Python, Java, Spark, Airflow, PostgreSQL, etc.
- **Scroll animations** — IntersectionObserver-based fade-in on sections and cards
- **Fully responsive** — 3 breakpoints (1024px, 768px, 400px), mobile hamburger nav
- **Active nav highlighting** — Current section highlighted as user scrolls

---

## Sections

1. **Hero** — Name, badge (Data Engineer II @ Amazon), tagline, 3 stats, CTAs
2. **About** — Summary + 3 highlight cards (pipelines, cost, performance)
3. **Experience** — 4 roles with company logos, project details, tech tags with devicon logos
4. **Skills** — 6 categories with icon-labeled pills (devicon library)
5. **Education** — B.Tech card with college logo + Certifications/Awards
6. **Contact** — Email, phone, LinkedIn, GitHub, location

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

- **No framework** — pure HTML/CSS/JS for fast load, zero dependencies, easy to edit
- **Dark/Light theme** — CSS custom properties toggled via `data-theme` attribute; localStorage for persistence; respects `prefers-color-scheme` on first visit
- **Devicon CDN** — tech logos via `cdn.jsdelivr.net/gh/devicons/devicon`
- **Inter font** — Google Fonts, clean modern sans-serif
- **Responsive:** 3 breakpoints (1024px tablet, 768px mobile, 400px small)
- **Animations:** IntersectionObserver for scroll-triggered fade-ins
- **Company badges:** Logo + name + location as a distinct visual unit
- **LinkedIn in navbar** — Quick access with icon, grouped with theme toggle

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
- Add a downloadable PDF resume link
- Add a Projects section with live demos
- Add page analytics (Google Analytics or Plausible)
- Optimize images (compress JPGs, convert to WebP)
- Add Open Graph meta tags for social sharing preview
