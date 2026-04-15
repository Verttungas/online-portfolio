# Carlos Vertti — Portfolio

Personal portfolio site for [Carlos Vertti](https://www.linkedin.com/in/carlos-vertti), a Systems & IT Engineering student focused on backend systems, automation tooling, and production data workflows.

**Live:** [verttungas.github.io/online-portfolio](https://verttungas.github.io/online-portfolio)

## Overview

Static, bilingual (EN / ES-LATAM), no build step. Hosted on GitHub Pages. Designed to read well in under a minute — case studies with measurable impact at Clip, Daimler Truck México, and 1927 are the focus; everything else is framing.

## Design language

The site commits to an *engineering-editorial* aesthetic — treating a software portfolio like a technical publication rather than a generic "dev portfolio" template.

| Element | Choice | Why |
|---|---|---|
| Display type | [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable serif) | Editorial gravitas, variable optical size for large headlines |
| Body type | [Geist](https://fonts.google.com/specimen/Geist) | Modern geometric sans; avoids the overused Inter default |
| Metadata | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Dates, labels, navigation — engineer-authentic |
| Accent | Warm ochre `#d4a537` (dark) / `#8b6508` (light) | Distinctive vs. the generic purple/blue accent seen on most portfolios |
| Structure | Numbered sections (`01 / 02 / 03`), mono eyebrows, hairline rules | Reads like a journal, not a landing page |
| Background | Subtle 72px grid, faint radial amber wash | Engineering-paper texture without noise |

Dark mode is the default; a theme toggle is persisted in `localStorage`. Language toggle switches between `/` (EN) and `/es/` (ES-LATAM) 1:1.

## Tech stack

- **HTML / CSS / vanilla JS** — no framework, no bundler
- [Bootstrap 5.3](https://getbootstrap.com/) grid utilities via CDN (layout only)
- [AOS](https://michalsnik.github.io/aos/) for scroll reveals on the case-studies page
- Google Fonts with `preconnect` for faster font delivery
- One custom script (`skills-matrix.js`) that renders the filterable skills grid

Everything else is static HTML and CSS. ~1.3k lines of CSS, zero build pipeline.

## Project structure

```
.
├── index.html              # EN home (hero, impact, case studies preview, about, experience, contact)
├── projects.html           # EN full case studies
├── skills.html             # EN technical skills matrix
├── es/
│   ├── index.html          # ES-LATAM home
│   ├── projects.html       # ES-LATAM case studies
│   └── skills.html         # ES-LATAM skills matrix
├── assets/
│   ├── css/styles.css      # Design system + all page styles
│   ├── js/skills-matrix.js # Skills matrix component
│   ├── img/                # Profile photo, client logos, project screenshots
│   └── files/              # Resume PDF
└── .github/                # Pages deployment workflow
```

## Running locally

No dependencies. Serve the directory with anything that handles static files:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`. Editing HTML/CSS/JS and reloading is the entire workflow.

## Deployment

Pushing to `main` triggers GitHub Pages via the workflow in `.github/workflows/`. The site serves from the repository root; no build artifacts are committed.

## License

Content (copy, images, resume) © Carlos Alberto Ortiz Pérez Vertti. Code is available for reference; please don't copy the design wholesale.

## Contact

- Email: [verttigo@proton.me](mailto:verttigo@proton.me)
- LinkedIn: [carlos-vertti](https://www.linkedin.com/in/carlos-vertti)
- GitHub: [@Verttungas](https://github.com/Verttungas)
