# Jack — 3D Creator Portfolio

A dark-themed, animated 3D creator portfolio landing page.
Built with **HTML5, CSS3, Bootstrap 5, vanilla JavaScript**, and the animation
libraries **GSAP + ScrollTrigger** and **AOS (Animate On Scroll)** — no React, no Angular.

## Tech stack

- HTML5
- CSS3 (custom properties, `clamp()` fluid type, flexbox)
- Bootstrap 5 (layout utilities, grid, buttons)
- Vanilla JavaScript (ES6+)
- GSAP 3 + ScrollTrigger (npm package `gsap`) — scroll-scrubbed text reveal & sticky card scaling
- AOS (npm package `aos`) — fade/zoom on-scroll reveals
- Node.js + npm — used to manage the animation packages and run a local dev server

## Project structure

```
portfolio-jack/
├── index.html          # All 5 sections: Hero, Marquee, About, Services, Projects
├── css/
│   └── style.css        # Dark theme, gradient headings, responsive layout
├── js/
│   └── main.js           # Marquee scroll, magnet hover, text reveal, card stacking
├── package.json
└── README.md
```

## Run it

The page works simply by opening `index.html` in a browser (all libraries load
from CDN links already wired into the `<head>`/before `</body>`).

To run it as a proper Node project with a local dev server:

```bash
npm install
npm start
```

This starts `lite-server` and opens the site at `http://localhost:3000`
with live-reload on file changes.

## Sections

1. **Hero** — full-screen intro, gradient headline, magnetic mouse-follow portrait, contact CTA
2. **Marquee** — two rows of 21 project preview GIFs, scrolling in opposite directions tied to scroll position
3. **About** — four floating 3D decorative renders, character-by-character scroll-revealed bio text
4. **Services** — 5-item numbered service list on a white panel
5. **Projects** — 3 sticky, scale-stacking project cards with image grids and "Live Project" links

## Customizing

- Colors & fonts: edit CSS variables at the top of `css/style.css`
- Copy/content: edit directly in `index.html`
- Animation timing: adjust `data-aos-delay` attributes (AOS) and the GSAP
  tween settings in `js/main.js`
