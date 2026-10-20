# Satya Teja Yannam Portfolio

Static GitHub Pages portfolio for Satya Teja Yannam, positioned as an Applied AI & Data Engineer.

## Architecture

- `index.html` is the production page.
- `assets/site.css` contains the retained content layouts; `assets/cyber.css` defines the terminal/cyberpunk visual system and responsive overrides.
- `assets/site.js` initializes components, accessible mobile navigation, section reveals, active nav, copy-email, and the motion control.
- `assets/components/background.js` draws the fixed Canvas 2D monuments, fire, embers, fog, and spatially partitioned particle network.
- `assets/components/skill-nodes.js`, `timeline.js`, and `terminal.js` handle the linked skills, Experience timeline, and boot/typing sequence.
- `assets/data/content.js` contains the editable skills, role copy, terminal text, and rendering settings. Existing project/about/education copy remains in semantic `index.html`.
- `robots.txt`, `sitemap.xml`, favicon, apple icon, and Open Graph artwork are included for SEO/social sharing.

No build step is required. GitHub Pages can serve the repository directly.

## Resume

Add a current resume PDF at:

```text
assets/resume.pdf
```

The current PDF is present at that path. Replace it in place when updating the resume.

## Local Preview

Serve over HTTP (ES modules require a server):

```text
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No runtime dependencies or bundler are required.

## Customization

- Colors: edit the `:root` tokens in `assets/cyber.css`. Canvas atmospheric colors are in `background.js` and intentionally reserve orange/amber for fire.
- Skills: edit the single `skills` array in `assets/data/content.js`. Keep IDs unique; `related` uses those IDs. All `proficiency` values are equal by request. Heights use this value, while staggered ground positions make the skyline varied.
- Particle density: edit `scene.desktopDots`, `mobileDots`, and `lowPowerDots`. Defaults are 1,800 / 240 / 450. The renderer also reduces density after sustained slow frames.
- Fire: change `scene.fireIntensity` (default `1`) or `flamesPerPillar` (default `24`).
- Experience: edit `experience` in the same data file, then run `node scripts/sync-content.mjs` to update the static SEO/no-JavaScript fallback. Interactive rendering uses the same template.
- Reduced motion produces a static scene. The dock's pause button stops continuous effects. Animation suspends while the page is hidden. Node buttons and timeline tags support hover, keyboard focus, and click/tap to pin; Escape clears selection.

The background is a procedural interpretation of the supplied burning-monument reference, not a photograph. Browser rendering speed varies by device; 60fps is a target, not a guarantee.

## Deploy

Push changes to the `main` branch. GitHub Pages serves `index.html` at:

https://satyayannam.github.io/
