# Development Instructions & Reference (`CLAUDE.md`)

This guide outlines build/run commands, code styles, and rules for agents and developers working in this repository.

---

## 1. Build and Development Commands

### Button Showcase (`button-showcase/`)
Navigate to `button-showcase/` directory to run these:
- **Dev Server**: `npm run dev`
- **Build Production Bundle**: `npm run build`
- **Lint Code**: `npm run lint`

### Next.js UX Portfolio (`Portfolio/portfolio-next/`)
Navigate to `Portfolio/portfolio-next/` directory to run these:
- **Dev Server**: `npm run dev`
- **Build Production Bundle**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Code**: `npm run lint`

### Python static site builders (`Portfolio/portfolio-html/`)
- **Sync/Apply Tags**: `python3 apply_cms_tags.py`
- **Build Projects**: `python3 build_projects.py`
- **Start local python server**: `python3 serve.py` (starts a simple server on port 8000)

---

## 2. Agent Guidelines & Code Rules

### Next.js Agent Guidelines (CRITICAL)
- **Next.js Breaking Changes**: As specified in `Portfolio/portfolio-next/AGENTS.md`, this Next.js project may use custom APIs or conventions that differ from standard training data.
- **Reference Docs**: Always inspect `node_modules/next/dist/docs/` or the existing files in `src/app/` and `src/components/` before creating new pages or rewriting routing.

### Token & Styling Guidelines
- **No Inline Styles/Ad-hoc Colors**: Never hardcode colors, spacing, or typography details. Always map to design token variables:
  - In `button-showcase`, use CSS variables from `src/tokens.css` (e.g. `var(--color-brand-500)`).
  - In `portfolio-next`, use CSS variables from `src/app/globals.css` (e.g. `var(--acc)` for the rust accent, `var(--bg)` for background, `var(--t1)` for text).
- **Maintain Noise Overlay**: Ensure all pages or sub-portals inherit the body noise overlay pattern defined in CSS for visual texture.
- **Corner Radii Integrity**: Retain the sharp aesthetic style (radii values of `2px` or `4px` for small components like buttons and text inputs, and `12px` for larger wrappers like showcase containers and cards).

### Content and Copy Rules
- **Source of Truth**: The `projects.json` file in `Portfolio/portfolio-next/src/data/projects.json` contains the exact project content, descriptions, metrics, and tags. Do not invent or add placeholder information.
- **Copy Restrictions**: Use the specific terminology of **Sarah Mitchell** (CX Manager) and other personas. High-stakes enterprise XM copy rules must be followed exactly.
