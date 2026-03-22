# Repository Map

## Purpose
This file is the fast-entry map for AI agents working in this repository.

Use it to answer:
- what exists now,
- what is canonical,
- what is generated,
- what is planned but not implemented yet.

## Current State
The repository is no longer only planning architecture. A first clean website stack already exists.

Implemented now:
- Eleventy build configuration
- `site-src/` as website source
- `docs/` as generated GitHub Pages output
- local reference image assets

Not implemented yet:
- reusable template partials
- dedicated content layer
- AI-readable knowledge layer
- PDF layer
- multi-page portfolio content model

## Layer Overview
| Layer | Status | Purpose | Canonical | Paths |
| --- | --- | --- | --- | --- |
| Docs | Implemented | repo instructions and navigation | Yes | `AGENTS.md`, `repo-map.md` |
| Build Config | Implemented | Eleventy and npm build entrypoints | Yes | `.eleventy.js`, `package.json` |
| Website Source | Implemented | source templates, styles, and local media | Yes | `site-src/` |
| Generated Site | Implemented | GitHub Pages output | No | `docs/` |
| Content Layer | Planned | reusable narrative copy and structured page content | Planned canonical | `content/` |
| Knowledge Layer | Planned | AI-readable skills, taxonomy, evidence | Planned canonical | `knowledge/` |
| PDF Layer | Planned | PDF source and exports | Planned canonical | `pdf/` |

## Current Paths And Ownership

### `AGENTS.md`
Primary operating instructions for agents.

### `repo-map.md`
Primary repo map. Update when ownership or structure changes.

### `.eleventy.js`
Eleventy config.

Current role:
- passthrough copy for `site-src/site.css`
- passthrough copy for `site-src/assets`

### `package.json`
Current build entrypoint.

Current role:
- defines `npm run dev`
- defines `npm run build`
- pins `@11ty/eleventy`

### `site-src/`
Current canonical website source.

Current files:
- `site-src/index.njk`
- `site-src/site.css`
- `site-src/assets/reference/`

Important note:
- the site is still mostly single-template and single-page
- block partials are planned but do not exist yet

### `docs/`
Generated website output for GitHub Pages.

Current files:
- `docs/index.html`
- `docs/site.css`
- `docs/assets/reference/`

Important note:
- do not treat `docs/` as the primary editing layer
- rebuild from `site-src/` instead

## Planned Paths That Do Not Exist Yet

### `site-src/_includes/layouts/`
Planned reusable layout files for Eleventy.

### `site-src/_includes/blocks/`
Planned reusable block partials such as:
- header
- hero
- gallery
- CTA
- capabilities
- footer

### `content/`
Planned source for public-facing copy and reusable narrative content.

Likely future subpaths:
- `content/cases/`
- `content/services/`
- `content/profile/`
- `content/shared/`

### `knowledge/`
Planned AI-readable layer.

Likely future subpaths:
- `knowledge/skills/`
- `knowledge/taxonomy/`
- `knowledge/evidence/`

### `pdf/`
Planned PDF source and export layer.

Likely future subpaths:
- `pdf/source/`
- `pdf/exports/`

## Dependency Flow
Current flow:

`site-src` -> `docs`

Current asset flow:

`site-src/assets` -> `docs/assets`

Planned future flow:

`knowledge` + `content` -> `site-src` -> `docs`

Parallel planned flow:

`content` + `knowledge` + `assets` -> `pdf/source` -> `pdf/exports`

## Placement Rules
- Put website templates, CSS, and local media wiring in `site-src/`.
- Put build output only in `docs/`.
- Put repo instructions in repo-level documentation files.
- Do not place new source files directly in `docs/` unless the user explicitly requests it.
- When the dedicated `content/` and `knowledge/` layers are created, move canonical copy there instead of keeping everything inline in templates.

## Change Rules For Agents
- Prefer editing source over generated output.
- Rebuild `docs/` after website source changes.
- Do not reintroduce Tilda JS, Tilda CSS, or Tilda-hosted media into the rebuilt site.
- If a new top-level path is introduced, update this file and `AGENTS.md` in the same change.
- If a planned layer becomes real, change its status here from `Planned` to `Implemented`.

## Immediate Next Structure To Create
When the next refactor starts, create these first:
1. `site-src/_includes/layouts/`
2. `site-src/_includes/blocks/`
3. `content/`
4. `knowledge/`
5. `pdf/`
