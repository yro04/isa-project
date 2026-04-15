# cxc-project

Single-page **React** application built with **Vite** and **TypeScript**, ported from a static HTML/CSS reference (`mockup.HTML`). Layout, typography, and motion are implemented with plain CSS modules (split stylesheets) and a small amount of client-side JavaScript for the custom pointer.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)

---

## Stack

| Layer | Choice |
|--------|--------|
| Runtime | React 19 |
| Bundler / dev server | Vite 6 |
| Language | TypeScript (strict) |
| Styling | Global CSS (no CSS-in-JS, no UI kit) |
| Fonts | Google Fonts (Playfair Display, Outfit) |

---

## Features (UI)

- Fixed top navigation with in-page anchors; nav list hidden below a width breakpoint (see `sections.css` media query).
- Full-viewport hero: two-column grid, background outline type, CTA row, metric cards with hover translation.
- Infinite horizontal marquee (duplicated track + CSS keyframe `translateX(-50%)`).
- Content sections: services grid, split about panel (dark + accent column), experience timeline (including full-width “featured” rows), contact band, footer.
- Custom cursor: two positioned elements, `mousemove` + `requestAnimationFrame` for trailing behavior; scale on interactive targets (`CustomCursor.tsx`).

---

## Quick start

```bash
cd isa-project
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

| Script | Action |
|--------|--------|
| `npm run dev` | Dev server + HMR |
| `npm run build` | `tsc -b` then `vite build` |
| `npm run preview` | Serve production output from `dist/` |

### Windows: PowerShell execution policy

If `npm` fails with scripts disabled, use **`npm.cmd`** (e.g. `npm.cmd install`) or run the same commands from **cmd.exe**.

---

## Repository layout

```
isa-project/
├── .github/workflows/deploy-github-pages.yml
├── index.html
├── mockup.HTML              # Reference static document (not used at runtime)
├── src/
│   ├── App.tsx              # Page tree + copy
│   ├── main.tsx
│   ├── components/
│   │   └── CustomCursor.tsx
│   └── styles/
│       ├── layout.css       # Tokens, reset, nav, hero, marquee
│       └── sections.css     # Sections, footer, keyframes, breakpoints
├── vite.config.ts           # `base` from VITE_BASE (GitHub Pages)
├── tsconfig.json            # Solution-style references
├── tsconfig.app.json        # Application TS
├── tsconfig.node.json       # Vite config TS (+ Node types)
└── package.json
```

---

## GitHub Pages (project site)

Published URL shape: `https://<github-username>.github.io/<repository-name>/`.

1. Push to GitHub; note the **repository slug** (used in `VITE_BASE`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to **`master`** (or adjust `on.push.branches` in the workflow) or trigger **Deploy to GitHub Pages** manually.

The workflow sets `VITE_BASE=/<repository-name>/` during `npm run build` so chunk and asset URLs resolve under the project path. After a green run, the live URL is shown on the workflow summary and on the Pages settings screen.

**Local check against a subpath:**

```bash
# cmd.exe
set VITE_BASE=/your-repo-name/
npm run build
npm run preview
```

```powershell
$env:VITE_BASE = "/your-repo-name/"
npm run build
npm run preview
```

For a **user/org root** site (`https://<user>.github.io/` with `base: /`), override or remove `VITE_BASE` in the workflow so `vite.config.ts` resolves `base` to `/`.

---

## Build / TypeScript notes

- **`@types/node`** + **`"types": ["node"]`** in `tsconfig.node.json` type-check `vite.config.ts` (`process.env.VITE_BASE`).
- **`tsc -b`** runs before **`vite build`**; app sources use `tsconfig.app.json`.
- Replace placeholder outbound URLs and copy in **`src/App.tsx`** when repurposing the template.

---

## License

Add a `LICENSE` file if you intend to distribute or open-source the repo; otherwise treat as private.
