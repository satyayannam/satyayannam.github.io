# Satya Teja Yannam Portfolio

Static GitHub Pages portfolio for Satya Teja Yannam, positioned as an Applied AI & Data Engineer.

## Architecture

- `index.html` is the production page.
- `assets/site.css` contains the visual system and responsive layout.
- `assets/site.js` handles theme persistence, mobile navigation, section reveals, active nav, copy-email, and guarded resume visibility.
- `robots.txt`, `sitemap.xml`, favicon, apple icon, and Open Graph artwork are included for SEO/social sharing.

No build step is required. GitHub Pages can serve the repository directly.

## Resume

Add a current resume PDF at:

```text
assets/resume.pdf
```

The resume CTA is disabled until that file exists, so the public site will not expose a broken PDF link.

## Local Preview

Open `index.html` directly, or run any simple static file server from this directory.

## Deploy

Push changes to the `main` branch. GitHub Pages serves `index.html` at:

https://satyayannam.github.io/
