# Isabella Gomez · Portfolio

A single-page professional site for Customer Success, CX, and Learning & Development — rebuilt in **React** from the original static mockup, pixel-faithful typography, motion, and layout.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)

---

## Highlights

- **Hero + stats** with oversized display type and staggered entrance animation  
- **Marquee** strip for keywords and positioning  
- **Services**, **About**, **Experience** (timeline with featured rows), and **Contact** — same structure and copy as the reference mockup  
- **Custom cursor** (dot + trailing ring) with interactive hover states  
- **Responsive** layout: navigation collapses on smaller viewports; grids stack cleanly  

Fonts: **Playfair Display** + **Outfit** (loaded from Google Fonts).

---

## Quick start

```bash
cd isa-project
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

| Script        | What it does                |
|---------------|-----------------------------|
| `npm run dev` | Dev server with HMR         |
| `npm run build` | Typecheck + production bundle |
| `npm run preview` | Serve the built `dist` folder |

### Windows PowerShell and `npm`

If you see *“running scripts is disabled on this system”*, either:

- run **`npm.cmd install`** / **`npm.cmd run dev`**, or  
- use **Command Prompt** instead of PowerShell for that session.

---

## Project layout

```
isa-project/
├── .github/workflows/deploy-github-pages.yml
├── index.html          # Root HTML + font preconnect
├── mockup.HTML         # Original static reference
├── src/
│   ├── App.tsx         # Page composition & content
│   ├── main.tsx        # React entry
│   ├── components/
│   │   └── CustomCursor.tsx
│   └── styles/
│       ├── layout.css  # Variables, nav, hero, marquee
│       └── sections.css # Sections, footer, motion, breakpoints
├── vite.config.ts
└── package.json
```

---

## GitHub Pages

This repo is set up for a **project site**: `https://<your-username>.github.io/<repo-name>/`.

1. Push this project to a GitHub repository (the folder name and `package.json` name can differ; the **repository name** is what matters for the URL).
2. In the repo on GitHub: **Settings → Pages → Build and deployment**.
3. Under **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
4. Merge or push to **`master`** so the workflow in `.github/workflows/deploy-github-pages.yml` runs (or run it manually via **Actions → Deploy to GitHub Pages → Run workflow**).

The workflow builds with `VITE_BASE=/<repo>/` so asset paths match GitHub Pages. After the first successful deploy, the site URL appears in the workflow run and under **Settings → Pages**.

To **simulate the Pages URL locally** after a production build:

```bash
set VITE_BASE=/your-repo-name/
npm run build
npm run preview
```

(On PowerShell, use `$env:VITE_BASE="/your-repo-name/"; npm run build` instead of `set`.)

**Using a different default branch?** Edit the `on.push.branches` list in `.github/workflows/deploy-github-pages.yml` (it is set to **`master`** here).

**User or organization site** (`https://<user>.github.io/` with no repo path): set `base` to `/` by removing or overriding `VITE_BASE` in the workflow (and adjust the workflow to your Pages setup).

---

## Build notes

- No UI framework — just React and hand-authored CSS split for readability.  
- **`@types/node`** is a dev dependency so TypeScript recognizes **`process.env`** in `vite.config.ts` (standard Vite setup). `tsconfig.node.json` includes **`"types": ["node"]`** for that config only.  
- Contact links (`mailto`, LinkedIn) live in `App.tsx`; swap them for your own details when reusing the template.

---

## License

Private project unless you add an explicit license.
