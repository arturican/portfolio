# portfolio

Simple portfolio page built with React + TypeScript + Vite.

## Run (live reload)

```bash
npm install
npm run dev
```

Open `http://localhost:4173`.

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

## Checks

```bash
npm run lint
npm run format
npm run typecheck
npm test
```

## Structure

```text
index.html
src/
  main.tsx
  app/
    App.tsx
    styles/
      index.css
      tokens.css
      base.css
      layout.css
      components/project-card.css
  entities/
    project/
      model/projects.ts
      ui/ProjectCard.tsx
  widgets/
    projects-grid/
      ProjectsGrid.tsx
```
