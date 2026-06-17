# AGENTS.md

## Project Goal

This repository is a static GitHub Pages site for Professor Chin-Wen Liao's lab at National Changhua University of Education. The site should feel like a credible engineering and vocational education lab website, not a generic AI-generated landing page.

## Architecture

- Keep the site static: plain HTML, CSS, and JavaScript only.
- `index.html` owns page structure and editorial sections.
- `styles.css` owns the visual system and responsive layout.
- `script.js` owns small browser interactions such as publication search and filters.
- `data/publications.js` is the source of truth for publication records shown on the page.
- `img/` stores original lab photos. Avoid destructive edits to these images.

## Content Rules

- Do not invent professor credentials, titles, awards, grants, students, or industry partners.
- Public professor data should be checked against ORCID and NCUE pages before publication.
- The "教授的話" section is currently a draft derived from public research topics. Before a public launch, ask the professor or site owner to approve the wording.
- When adding publications, include at least year, title, venue, DOI, type, and theme.
- Preserve preprints when they appear in ORCID, but tag them clearly as `Preprint`.
- If a preprint later has a journal version, keep both only when the public record keeps both.
- Microchip collaboration content can use the user's provided partnership context, but technical specifics should be tied to confirmed lab work, papers, course material, or hardware actually used in the lab.

## Design Rules

- The public site now follows the classic Academic Pages / Minimal Mistakes pattern: top masthead, left author sidebar, right main content, compact publication list.
- Keep the design intentionally conventional and academic. Do not reintroduce AI-looking hero sections, oversized slogans, floating statistic cards, gradients, photo collages, or marketing-style CTA sections.
- Use a white background, small blue links, fine gray rules, readable system fonts, and conservative spacing.
- Use real lab photos only as supporting documentation. The sidebar image may remain a lab photo until a professor portrait is provided.
- Avoid mechanical dashboards, rigid numbered side rails, decorative atlas language, or equal-height product cards.
- Do not add a dedicated Reference/Sources section unless the user explicitly asks for it. Source links may live in maintainer docs, not the public page.
- Prioritize readable publication browsing and maintainable academic content over visual novelty.
- On mobile, text must wrap cleanly and controls must not overflow.

## Image Rules

- Prefer CSS cropping, brightness, contrast, and saturation adjustments before creating edited derivatives.
- If creating derived images later, write them to `assets/processed/` and leave `img/` untouched.
- Do not use generated images to replace real lab photos unless explicitly requested.
- Always use descriptive `alt` text for lab photos.

## Verification

Before handing off notable changes:

1. Open the site locally.
2. Check desktop and mobile widths.
3. Verify publication filtering and DOI links.
4. Confirm no console errors.
5. Confirm the hero and gallery photos load from GitHub Pages-compatible relative paths.

## Deployment

The site is designed for GitHub Pages. It does not require a build step. The repository root can be served directly.
