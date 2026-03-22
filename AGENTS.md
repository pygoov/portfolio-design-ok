# AGENTS.md

## Repository Mission
This repository is the working source for a designer portfolio system.

It is intended to support four coordinated outputs:
1. A public portfolio website.
2. An AI-readable knowledge base of skills and experience.
3. Curated PDF packets for specific directions or requests.
4. Repo-level guidance for AI agents working in the project.

At the moment, only the website stack is partially implemented.

## Current Phase
The repository is in early implementation mode.

What is already implemented:
1. A clean static-site build based on Eleventy.
2. A single-page portfolio starter in `site-src/`.
3. Build output to `docs/` for GitHub Pages.
4. Local reference images copied into project assets.
5. A raw portfolio intake archive in `tmp/Портфолио/`.
6. A first-pass asset audit in `pf_map.md`.
7. Base scaffolding for `content/`, `media/`, `site-src/_includes/`, `site-src/work/`, and `site-src/cases/`.

What is not implemented yet, but is planned:
1. Wire reusable partial templates into the live site.
2. Populate structured taxonomy and entry content files.
3. Build multi-page `work` and `case` routes from structured content.
4. Curate canonical media and produce web-ready asset exports.
5. AI-readable knowledge base layer.
6. PDF source and export flow.

## Current Stack
- Runtime/build tool: `Node.js` + `npm`
- Static site generator: `Eleventy` `3.1.5`
- Template format: `Nunjucks` (`.njk`)
- Site source directory: `site-src/`
- GitHub Pages output directory: `docs/`
- Main stylesheet: `site-src/site.css`
- Asset passthrough: `site-src/assets/`
- CSS foundation: custom CSS with `Open Props` loaded via CDN
- Font loading: `Google Fonts` (`Manrope`) via CDN

Current npm scripts:
- `npm run dev`
- `npm run build`

## Hard Constraints
- Do not reintroduce any Tilda runtime, CSS, JS, tracking, or Tilda-hosted dependencies.
- Do not hand-edit generated files in `docs/` unless explicitly requested.
- The public site must remain compatible with GitHub Pages static hosting.
- Prefer local project assets over remote media URLs.

## Current Public Site Structure
The implemented starter page currently includes these sections:
- `Header`
- `Hero`
- `Gallery`
- `Projects CTA`
- `Capabilities`
- `Footer`

The broader target information architecture still includes:
- `Home`
- `Work`
- `Case Study`
- `Services`
- `Skills`
- `About`
- `Contact`

Those extra pages and layers are planned, not implemented.

## Current Repository Layout
```text
/
|-- .eleventy.js                # Eleventy config
|-- .gitignore
|-- AGENTS.md
|-- README.md
|-- content/                    # scaffold for structured portfolio content
|   |-- README.md
|   |-- entries/
|   `-- taxonomy/
|-- media/                      # scaffold for curated portfolio media
|   |-- README.md
|   |-- source/
|   `-- web/
|-- package.json
|-- package-lock.json
|-- pf_map.md                   # first-pass asset inventory
|-- repo-map.md
|-- docs/                       # generated GitHub Pages output
|   |-- index.html
|   |-- site.css
|   `-- assets/
|       `-- reference/
|-- tmp/                        # raw intake archive
|   `-- Портфолио/
`-- site-src/                   # canonical website source
    |-- _includes/
    |   |-- blocks/
    |   |-- components/
    |   `-- layouts/
    |-- cases/
    |-- index.njk
    |-- site.css
    |-- work/
    `-- assets/
        `-- reference/
```

## Source Of Truth Rules
- `site-src/` is the current source of truth for the live website templates and routes.
- `docs/` is generated output for GitHub Pages.
- `docs/` should be treated as build output, not primary authoring source.
- `site-src/assets/` is the current source of truth for starter-site media already wired into the page.
- `content/` and `media/` now exist as scaffold layers for future canonical ownership.
- `tmp/Портфолио/` remains the raw intake layer until files are curated.
- `pf_map.md` is the current first-pass audit of the intake archive.
- `knowledge/` and `pdf/` do not exist yet.
- `repo-map.md` must be updated when structure or ownership changes.

## Build Rules
- Build command: `npm run build`
- Dev command: `npm run dev`
- Eleventy reads from `site-src/` and writes to `docs/`
- Asset passthrough currently copies `site-src/assets/` and `site-src/site.css`

## Styling Rules
- Use custom CSS as the primary styling layer.
- `Open Props` is currently acceptable as a lightweight token/normalize dependency.
- `Google Fonts` is currently acceptable, but may be localized later if full offline hosting is required.
- Do not add heavy UI frameworks unless there is a clear reason.
- Preserve the portfolio's custom visual direction rather than falling back to generic framework defaults.

## Agent Workflow Rules
Before making structural changes:
1. Read `AGENTS.md`.
2. Read `repo-map.md`.
3. Identify whether the change belongs to website source, generated output, assets, or future planned layers.

When working in this repository:
- Edit `site-src/` first.
- Rebuild `docs/` after source changes that affect the public site.
- Do not manually port old Tilda markup, scripts, or styles into the new source.
- Keep file and folder names predictable and machine-readable.
- If a new top-level directory is added, document it in `repo-map.md`.
- If content is moved out of templates into dedicated files, document ownership clearly.

## Near-Term Priorities
The next useful steps are:
1. Define the first taxonomy in `content/taxonomy/`.
2. Create the first real entry files in `content/entries/`.
3. Split `site-src/index.njk` into reusable partial blocks and layouts.
4. Build the first `work` and `case` routes from structured content.

## Planned But Not Yet Implemented
These layers or files are still not implemented even though some scaffold paths now exist:
- populated taxonomy files in `content/taxonomy/`
- populated entry files in `content/entries/`
- reusable templates wired from `site-src/_includes/`
- real route files inside `site-src/work/` and `site-src/cases/`
- `knowledge/`
- `pdf/`

Treat the scaffold as infrastructure, not as finished implementation.
