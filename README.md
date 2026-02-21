# @arturican Portfolio

A fast, SEO-aware portfolio built with React and TypeScript that showcases projects as clean, responsive cards with safe outbound links and per-project social metadata.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-2-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=1A2B34)](https://prettier.io/)

## What Makes It Different

This is not just a static list of links:

- Route-aware SEO is generated from project data (`title`, `description`, canonical path, share image).
- Meta tags are applied both at runtime and during build output generation.
- A custom Vite plugin prerenders SEO HTML files for project paths and aliases.
- External project URLs are sanitized to allow only valid `http(s)` links.

## Tech Stack

| Layer        | Technologies                                         |
| ------------ | ---------------------------------------------------- |
| Frontend     | React 19, React DOM 19                               |
| Language     | TypeScript (strict mode)                             |
| Build Tool   | Vite 6 (`@vitejs/plugin-react`)                      |
| Styling      | Plain CSS with design tokens and modular style files |
| Testing      | Vitest, Testing Library, JSDOM                       |
| Code Quality | ESLint 9, Prettier 3, Husky pre-commit hooks         |
| CI/CD        | GitHub Actions, rsync over SSH to VPS                |

## Key Features

- Responsive portfolio grid with adaptive 1/2/3-column layouts.
- `live` vs `coming_soon` project states with different card behavior.
- Per-project stack badges rendered from typed project metadata.
- Safe external linking via URL protocol validation.
- Centralized SEO config with canonical URLs, OG tags, Twitter card tags, and robots directives.
- Automatic `noindex, nofollow` for unknown routes.
- Build-time prerendering of SEO route HTML files in `dist/`.
- Lightweight contact footer with email and Telegram links.

## Getting Started

### 1. Clone

```bash
git clone https://github.com/arturican/portfolio.git
cd portfolio
```

### 2. Install dependencies

Choose one package manager:

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install
```

### 3. Configure environment

Create `.env.local` (or `.env`) for local development:

```bash
VITE_SITE_URL=http://localhost:4173
```

### 4. Start development server

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Open: `http://localhost:4173`

If port `4173` is busy, `npm run dev` will fail (strict port mode) instead of silently switching to another port.

## Scripts

| Command              | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `npm run dev`        | Start Vite dev server on strict port `4173`                 |
| `npm run build`      | Type-safe production build                                  |
| `npm run preview`    | Rebuild and preview production bundle on strict port `4173` |
| `npm run typecheck`  | Run TypeScript checks (`tsc --noEmit`)                      |
| `npm run lint`       | Run ESLint                                                  |
| `npm run format`     | Check formatting via Prettier                               |
| `npm test`           | Run Vitest test suite once                                  |
| `npm run test:watch` | Run tests in watch mode                                     |

## Architecture Overview

```text
.
|-- index.html
|-- public/
|   |-- favicon.svg
|   `-- og-default.png
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   `-- styles/
|   |       |-- tokens.css
|   |       |-- base.css
|   |       |-- layout.css
|   |       `-- components/project-card.css
|   |-- entities/
|   |   `-- project/
|   |       |-- model/projects.ts
|   |       `-- ui/ProjectCard.tsx
|   |-- widgets/
|   |   `-- projects-grid/ProjectsGrid.tsx
|   |-- shared/
|   |   |-- lib/safeExternalUrl.ts
|   |   `-- seo/
|   |       |-- MetaTags.tsx
|   |       `-- seoConfig.ts
|   `-- test/setup.ts
|-- vite.config.ts
`-- .github/workflows/deploy.yml
```

- `components`: split across `app`, `widgets`, and `entities` for clear UI composition.
- `hooks`: no custom hooks directory yet; React hooks are currently colocated in feature components (for example `src/app/App.tsx`).
- `services/shared logic`: SEO resolution and URL safety utilities live in `src/shared/`.
- `assets`: static assets are in `public/`; styling is organized in `src/app/styles/`.
- `source of truth`: project data and SEO metadata are centralized in `src/entities/project/model/projects.ts`.

## Environment Variables

The codebase uses `VITE_SITE_URL` in both app runtime (`import.meta.env`) and Vite build-time SEO generation (`process.env`).

### `.env.example`

```bash
VITE_SITE_URL=https://arturican.ru
```

| Variable        | Required | Example                | Purpose                                                              |
| --------------- | -------- | ---------------------- | -------------------------------------------------------------------- |
| `VITE_SITE_URL` | Yes      | `https://arturican.ru` | Base URL used for canonical URLs and absolute OG/Twitter image links |

## Best Practices Applied

- Strict TypeScript configuration for safer refactoring and predictable types.
- ESLint + Prettier for consistent style and static analysis.
- Husky pre-commit hook runs `lint`, `format`, `typecheck`, and `test`.
- Component-level tests for rendering behavior and SEO config tests for metadata correctness.
- Secure-by-default outbound URL handling (`safeExternalUrl`) to avoid unsafe protocols.
- Accessibility-minded markup with semantic tags and `aria-label` usage on interactive UI.

## Deployment

- CI workflow: `.github/workflows/deploy.yml`
- Trigger: push to `dev` branch
- Pipeline:
  1. Install dependencies (`npm ci`)
  2. Run checks (`lint`, `typecheck`, `test`)
  3. Build (`npm run build`)
  4. Deploy `dist/` via `rsync` over SSH to `/var/www/portfolio`

Required GitHub Secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `SSH_PORT`
