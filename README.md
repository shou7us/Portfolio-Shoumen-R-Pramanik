# Design Tokens & UX Portfolio Repository

This repository acts as the central hub for the design system tokens, a dynamic component showcase, and the interactive design portfolio of **Shoumen R Pramanik (Lead UX Designer)**.

---

## 1. Codebase Purpose

The repository is structured to manage and present:
1. **Design Tokens**: Raw token exports from Figma (JSON files in the root and subdirectories) that govern the typography, colors, spacing, borders, and shadows across enterprise B2B SaaS platform interfaces.
2. **Button Showcase (`button-showcase/`)**: A React + TypeScript + Vite project displaying 282+ button variants styled dynamically using CSS variables mapped directly from the design tokens.
3. **UX Portfolio (`Portfolio/`)**:
   - **`portfolio-next/`**: A Next.js App Router project presenting Shoumen's portfolio of enterprise B2B SaaS case studies, leveraging custom animations (framer-motion) and visual elements.
   - **`portfolio-html/`**: A static version of the portfolio containing case study HTML documents and a custom showreel implementation.

---

## 2. Goals of the Codebase

- **Maintain Design System Fidelity**: Translate Figma token exports into CSS variables and React component states with zero manual intervention or discrepancies.
- **Complexity Management in Regulated SaaS**: Showcase UX paradigms built for high-stakes enterprise applications (Credit Unions, Healthcare Networks, K–12 Education) that deal with HIPAA, FERPA, and compliance constraints.
- **Demonstrate Human-AI Collaboration UI**: Feature interfaces that build trust through evidence layers (claims tracing), natural-language to survey logic generators, and progressive disclosure of AI reasoning.

---

## 3. Critical Files

```
.
├── $metadata.json               # Token set ordering and composition configuration
├── $themes.json                 # Active design token theme mappings
├── global.json                  # Baseline core tokens (primitives)
├── color.json                   # Base colors exported from design library
├── Core.json                    # Core application theme tokens
├── CX.json                      # Customer Experience theme tokens
├── EX.json                      # Employee Experience theme tokens
├── Success.json                 # Success-state semantic color mappings
├── Error.json                   # Error-state semantic color mappings
├── Shell.json                   # Shell application theme tokens
├── button-showcase/             # React/Vite button variants builder
│   ├── src/tokens.css           # CSS variables mapped from JSON design tokens
│   └── src/App.tsx              # Component variant grid testing bench
└── Portfolio/
    ├── portfolio-next/          # Next.js App Router case studies hub
    │   ├── src/data/projects.json # Case study copy, metrics, images, and config
    │   └── src/app/globals.css  # Portfolio main styling & visual identity tokens
    └── portfolio-html/          # Legacy static build files & case study transcripts
```

---

## 4. Visual Identity & Design Tokens

### Color Palette

#### Portfolio Visual System (from `globals.css`)
- **Background**: `#f5f2ec` (Warm cream)
- **Primary Text**: `#0d0f14` (Deep charcoal)
- **Secondary/Body Text**: `#4a4642` (Muted brown-grey)
- **Accent (Primary)**: `#c94c2e` (Burnt orange/rust)
- **Accent Light**: `rgba(201, 76, 46, 0.1)` (Accent dim)
- **Border**: `#d9d4cc`
- **Border High**: `rgba(13,15,20,0.4)`

#### Button Showcase Themes (from `tokens.css`)
- **Core Theme**:
  - `50`: `#f9f9fc` | `100`: `#e1e6f5` | `500`: `#4068b1` | `800`: `#2a487d` | `900`: `#203864`
- **Brand Theme (Default)**:
  - `50`: `#e5fffd` | `100`: `#c8f1e9` | `200`: `#afdfd7` | `500`: `#006159` | `800`: `#005a4f` | `900`: `#004a41`
- **CX Theme**:
  - `50`: `#e3f1f1` | `100`: `#c5e1df` | `200`: `#b1d5cd` | `500`: `#3e7880` | `800`: `#346868` | `900`: `#26514c`
- **Assessment Theme**:
  - `50`: `#efebf2` | `100`: `#dbd0e2` | `200`: `#c7b4d4` | `500`: `#6c3f8e` | `800`: `#593375` | `900`: `#4c2b65`
- **Shell Theme**:
  - `50`: `#f0f1f2` | `100`: `#e7e8ea` | `200`: `#ccced4` | `500`: `#5c6069` | `800`: `#33353a` | `900`: `#211e1f`
- **Error Palette**:
  - `50`: `#fde9e8` | `100`: `#f8d0cd` | `200`: `#f6bab6` | `500`: `#e82015` | `800`: `#b81810` | `900`: `#a1150e`
- **AI Gradient**:
  - **Start**: `#6c16ac` (Purple) | **End**: `#02becc` (Teal)

### Typography

- **Fonts**:
  - **Serif (Headers)**: `'Playfair Display', serif`
  - **Sans-Serif (Body & UI)**: `'DM Sans', sans-serif`
  - **Monospace (Details & Metadata)**: `'DM Mono', monospace`
- **Type Scale (from `tokens.css`)**:
  - `Scale 01`: `0.75rem` (12px)
  - `Scale 02`: `0.875rem` (14px)
  - `Scale 03`: `1rem` (16px)
  - `Scale 09`: `1.125rem` (18px)
  - `Scale 10`: `1.5rem` (24px)
- **Font Weights**:
  - Light: `300` | Medium: `500` | Semibold: `600` | Bold: `700` | Black: `900`

### Spacing & Corner Radii

- **Button Padding**:
  - **Small (sm)**: `0.25rem` (v) / `0.5rem` (h)
  - **Medium (md)**: `0.5rem` (v) / `1rem` (h)
  - **Large (lg)**: `0.75rem` (v) / `1.5rem` (h)
  - **Extra Large (xl)**: `1rem` (v) / `2rem` (h)
- **Radii**:
  - Regular: `0.188rem` (3px)
  - Medium: `0.375rem` (6px)
  - Large: `0.562rem` (9px)
  - Extra Large: `0.75rem` (12px)
  - Full: `9999px`

---

## 5. Core Case Studies copy (Real Data)

The following B2B SaaS features represent the native shapes of the product:

### 1. Custom Dashboard (Decision Clarity)
- **Problem**: Account Managers struggled to combine ratings, response tables, and score summaries.
- **Visual Design**: Real-time modular grids, governed live-sharing, and modular component drag/drop interfaces.

### 2. Unified Filter Architecture
- **Problem**: Five enterprise products handled filtering differently, resulting in cognitive load for power users.
- **Visual Design**: Unified workspace and query bar builder that acts consistently across the platform.

### 3. Customer Directory (Pivoting ARR)
- **Problem**: Designed for the wrong user cohort, leading to $180K of engineering risk. Redesigned to support segment building and trigger-based survey automation.
- **Visual Design**: Master segment tables, progress indicators, and inline detail panels.

### 4. AI-Powered Insights (Sogolytics Case Study)
- **Features**:
  - **Evidence Layer**: inline claim expansion, not modal-driven, letting compliance and admins see the underlying raw comments backing any AI-generated narrative statement.
  - **Role-Based Narratives**: Adapt output language based on vertical (Healthcare, Credit Union, K–12) at the session level.
  - **Constraint Envelopes**: Built-in HIPAA/FERPA PII masking filters.
