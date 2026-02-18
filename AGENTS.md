# AGENTS.md

## Project Snapshot

- Stack: React + TypeScript + Vite.
- App type: static portfolio page (no backend in repo).
- Entry point: `src/main.tsx`.
- UI composition:
  - `src/app/App.tsx`
  - `src/widgets/projects-grid/ProjectsGrid.tsx`
  - `src/entities/project/ui/ProjectCard.tsx`
  - `src/entities/project/model/projects.ts`

## Dev Workflow

- Install: `npm install`
- Run dev server: `npm run dev`
- Type check: `npm run typecheck`
- Lint: `npm run lint`
- Format check: `npm run format`
- Build: `npm run build`

## Code Rules

- Keep components in TypeScript (`.tsx`) and business/data in `.ts`.
- Prefer explicit prop/type interfaces near components.
- Keep `projects` source of truth in `src/entities/project/model/projects.ts`.
- Keep styling in existing CSS split:
  - `src/app/styles/tokens.css`
  - `src/app/styles/base.css`
  - `src/app/styles/layout.css`
  - `src/app/styles/components/project-card.css`

## Deployment

- CI deploy file: `.github/workflows/deploy.yml`.
- Trigger: push to `dev`.
- CI build output: `dist/`.
- Deploy target: `/var/www/portfolio` via `rsync` over SSH.
- Required GitHub Secrets:
  - `SSH_HOST`
  - `SSH_USER`
  - `SSH_PRIVATE_KEY`
  - `SSH_PORT`

## Notes For Future Changes

- Keep root `index.html` minimal (only `#root` and script include).
- If app should be served under subpath (example `/todolist/`), set `base` in `vite.config.ts` and align nginx + deploy path.
- Before commit, run: `npm run lint && npm run format && npm run typecheck`.
