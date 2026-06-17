# NCUE Engineering Practice Lab Static Site

Static GitHub Pages website for Professor Chin-Wen Liao's lab.

## Files

- `index.html`: page structure and content sections
- `styles.css`: visual system and responsive layout
- `script.js`: publication search/filter behavior
- `data/publications.js`: publication records from ORCID
- `img/`: original lab photos
- `AGENTS.md`: maintenance rules for future Codex/agent edits

## Local Preview

This site can be opened directly in a browser, but a local server is closer to GitHub Pages behavior:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## GitHub Pages

No build step is required.

1. Push the repository to GitHub.
2. Go to repository Settings -> Pages.
3. Set the source to the default branch and `/root`.
4. Save and wait for GitHub Pages to publish.

## Updating Publications

Publication cards are generated from `data/publications.js`. Add new records using this shape:

```js
{
  year: 2026,
  date: "2026-05-19",
  title: "Paper title",
  venue: "Journal or conference",
  doi: "10.xxxx/example",
  type: "Journal Article",
  theme: "Short theme"
}
```

Use ORCID as the first source for public publication records:

```text
https://orcid.org/0000-0003-4264-3146
```

## Content Notes

The "教授的話" section is a draft based on public research topics and should be approved before public launch.
