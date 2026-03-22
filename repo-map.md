# Repository Map

## Purpose
This file is the fast-entry map for AI agents working in this repository.

Use it to answer:
- what exists now,
- what is canonical,
- what is generated,
- what is still only planned,
- how portfolio content should be structured as the site grows.

## Current State
The repository currently has a working Eleventy starter site, generated GitHub Pages output, and a large incoming portfolio asset archive.

Implemented now:
- Eleventy build configuration
- `site-src/` as the current website source
- `docs/` as generated GitHub Pages output
- `tmp/Портфолио/` as the current raw portfolio intake archive
- `pf_map.md` as the first asset inventory and suitability map
- scaffold directories for `content/`, `media/`, `site-src/_includes/`, `site-src/work/`, and `site-src/cases/`

Not implemented yet:
- reusable partial templates
- dedicated content model for sections, subsections, and entries
- multi-page `work` and `case` routes
- canonical media layer split into source assets and web-ready exports
- AI-readable knowledge layer
- PDF production layer

## Architectural Direction
The repo is moving away from a single monolithic page and toward a content-driven portfolio system.

Target public structure:
- `Home`
- `Work`
- `Work / Section`
- `Work / Section / Subsection`
- `Case`

Target portfolio logic:
- keep public navigation shallow
- keep deeper categorization in structured content, not in ad hoc folders
- allow one entry to appear in multiple sections or subsections
- allow only selected larger entries to have dedicated case pages

## Target Content Model
The site should be built around structured entries rather than around the raw folder names in `tmp/Портфолио/`.

### Core taxonomy
- `section`
- `subsection`
- `entry`

### `entry` types
- `case` — a substantial project with its own page
- `gallery` — a smaller work item shown only in listings or grouped galleries

### Expected `entry` fields
- `title`
- `slug`
- `type`
- `sections`
- `subsections`
- `client`
- `year`
- `summary`
- `cover`
- `assets`
- `has_page`

Important rule:
- an entry may belong to multiple public categories
- an entry should have only one canonical case URL

## Layer Overview
| Layer | Status | Purpose | Canonical | Paths |
| --- | --- | --- | --- | --- |
| Docs | Implemented | repo instructions and navigation | Yes | `AGENTS.md`, `repo-map.md`, `pf_map.md` |
| Build Config | Implemented | Eleventy and npm build entrypoints | Yes | `.eleventy.js`, `package.json` |
| Website Source | Implemented | current Eleventy templates and CSS | Yes for current site | `site-src/` |
| Generated Site | Implemented | GitHub Pages output | No | `docs/` |
| Portfolio Inbox | Implemented | raw incoming reference and project files | No | `tmp/Портфолио/` |
| Content Layer | Implemented as scaffold | canonical taxonomy and entry metadata | Not yet canonical until populated | `content/` |
| Media Layer | Implemented as scaffold | curated source assets and web-ready derivatives | Not yet canonical until curated | `media/` |
| Knowledge Layer | Planned | AI-readable experience and taxonomy layer | Planned canonical | `knowledge/` |
| PDF Layer | Planned | PDF source and export workflow | Planned canonical | `pdf/` |

## Current Paths And Ownership

### `AGENTS.md`
Primary operating instructions for agents.

### `repo-map.md`
Primary repo map. Update when ownership, structure, or canonical paths change.

### `pf_map.md`
Current first-pass portfolio asset map.

Current role:
- inventories files inside `tmp/Портфолио/`
- marks likely source assets, web candidates, and manual-review files

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
Current canonical website source for the live starter site.

Current files:
- `site-src/index.njk`
- `site-src/site.css`
- `site-src/assets/reference/`
- `site-src/_includes/`
- `site-src/work/`
- `site-src/cases/`

Important note:
- the current site is still mostly single-template and single-page
- `site-src/assets/` is still serving the starter site
- selected portfolio media should eventually move into a dedicated canonical media layer

### `site-src/_includes/`
Current scaffold for reusable Nunjucks partials and layouts.

Current role:
- reserved for layouts
- reserved for blocks
- reserved for shared components

Important note:
- the directory exists, but templates are not wired into the live site yet

### `site-src/work/`
Current scaffold for future `work` listing routes.

Important note:
- the directory exists, but no listing pages have been implemented yet

### `site-src/cases/`
Current scaffold for future case routes.

Important note:
- the directory exists, but no case pages have been implemented yet

### `docs/`
Generated website output for GitHub Pages.

Current role:
- built from `site-src/`
- should not be used as a primary authoring layer

### `tmp/Портфолио/`
Current intake archive of portfolio source material.

Current role:
- raw incoming storage
- preserves the original grouping and file names
- useful for research, auditing, and selection

Important note:
- do not treat this folder as the final canonical structure for the website
- not all files in this tree are suitable for direct publication

### `content/`
Current scaffold for structured portfolio content.

Current role:
- reserved for taxonomy definitions
- reserved for canonical entry metadata

Important note:
- the directory exists, but the content model is not populated yet

### `content/taxonomy/`
Current scaffold for taxonomy definitions.

Expected first files:
- `content/taxonomy/sections.yaml`
- `content/taxonomy/subsections.yaml`

### `content/entries/`
Current scaffold for entry metadata.

Each future file should represent one portfolio unit such as:
- a brand case
- a room or interior project
- a grouped listing entry for logos
- a grouped listing entry for packaging or labels

### `media/`
Current scaffold for the canonical media layer.

Important note:
- the directory exists, but curated masters and web derivatives have not been moved here yet

### `media/source/`
Current scaffold for curated master assets selected from `tmp/Портфолио/`.

Expected first subpaths:
- `media/source/entries/<entry-slug>/`

Use for:
- selected source images
- PDFs kept as reference masters
- approved video masters

### `media/web/`
Current scaffold for web-ready derivatives.

Expected first subpaths:
- `media/web/entries/<entry-slug>/`

Use for:
- compressed `webp`
- resized JPG or PNG only when needed
- poster frames or previews for video

## Still Planned Paths

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

## Public IA Mapping From Existing Material
This is the current intended public grouping based on the existing asset archive.

Top-level public sections:
- `Графика`
- `Интерьер`
- `Печать и упаковка`
- `Контент и motion`
- `Фото и ретушь`

Likely subsection mapping:
- `Графика / Маркетплейсы`
- `Графика / Логотипы`
- `Графика / Реклама`
- `Графика / Мокапы`
- `Графика / Техническая графика`
- `Графика / Гайдлайны`
- `Интерьер / Визуализации и планы`
- `Печать и упаковка / Этикетки`
- `Печать и упаковка / Коробки`
- `Печать и упаковка / Наружная реклама`
- `Печать и упаковка / Рекламные макеты`
- `Контент и motion / Видео`
- `Контент и motion / Посты`
- `Фото и ретушь / Реализованные бренды`

Important rule:
- do not force every raw folder in `tmp/Портфолио/` to become a public route
- use structured entries to decide what becomes a case page and what stays in galleries

## Dependency Flow
Current flow:

`site-src` -> `docs`

Current intake flow:

`tmp/Портфолио` -> `pf_map.md`

Planned publishing flow:

`tmp/Портфолио` -> `media/source` + `content/entries` -> `media/web` + `site-src` -> `docs`

Planned parallel flow:

`content` + `media` + `knowledge` -> `pdf/source` -> `pdf/exports`

## Placement Rules
- Put templates, route files, and CSS in `site-src/`.
- Put generated build output only in `docs/`.
- Keep raw incoming project material in `tmp/Портфолио/` until curated.
- Put canonical entry metadata in `content/entries/` as that layer is populated.
- Put selected master assets in `media/source/` as curation starts.
- Put optimized site assets in `media/web/` as publishing assets are produced.
- Do not treat `tmp/Портфолио/` as the direct publishing source.
- Do not place new source files directly in `docs/` unless the user explicitly requests it.

## Change Rules For Agents
- Prefer editing canonical source over generated output.
- Rebuild `docs/` after website source changes.
- Now that content and media layers exist as scaffold, move canonical ownership there as they are populated instead of keeping everything embedded in templates or raw intake folders.
- Do not reintroduce Tilda JS, Tilda CSS, or Tilda-hosted media.
- If a new top-level path is added, update this file and `AGENTS.md` in the same change.
- If a planned layer becomes real, change its status here from `Planned` to `Implemented`.

## Immediate Next Implementation Targets
Now that the base scaffold exists, implement these next:
1. `content/taxonomy/sections.yaml`
2. `content/taxonomy/subsections.yaml`
3. first entry files in `content/entries/`
4. base layouts and blocks in `site-src/_includes/`
5. first `work` listing routes in `site-src/work/`
6. first case routes in `site-src/cases/`
