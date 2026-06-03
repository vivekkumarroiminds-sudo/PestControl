# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, hand-coded marketing website for "Pest Control Emergency." Pure HTML + CSS + vanilla JS — **no build step, no package manager, no dependencies, no tests, no framework.** Files are served as-is.

## Running locally

There is no build or dev command. Open `index.html` directly in a browser, or serve the folder over HTTP so relative links resolve cleanly:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Architecture

- **Multi-page, no templating.** Each `*.html` file is a complete standalone document. The site header (`<header class="site-header">`), nav with the Services dropdown, and footer (`<footer class="footer">`) are **copy-pasted into every page**. There is no include/partial mechanism — changing a nav link, the phone number, or footer content means editing **every** HTML file, not one.
- **`css/styles.css`** — single global stylesheet for all pages. Driven by CSS custom properties in `:root` (the green/gold brand palette, spacing, radii, shadows, fonts). Reuse these tokens (e.g. `var(--green-600)`, `var(--gold)`, `var(--radius)`) rather than hardcoding values.
- **`js/script.js`** — single global script loaded by all pages. Each feature guards on element existence (`if (el)`) so the same file works on pages that lack a given component. Behaviors: mobile nav toggle (`.nav-burger` → `.main-nav.open`), homepage service-area tabs (`.tab[data-tab]` ↔ `.tab-panel[data-panel]`), FAQ accordion (`.faq-q`/`.faq-a` via inline `max-height`), demo contact form (front-end only — `preventDefault`, shows `#formMsg`, no backend), and `IntersectionObserver` scroll reveal (`.reveal` → `.in`, respects `prefers-reduced-motion`).

## Project layout

```
index.html            entry point — must stay at repo root
*.html                all other pages (flat at root for clean URLs / GitHub Pages)
css/styles.css        single global stylesheet
js/script.js          single global script
assets/               images (e.g. hero.jpg, team.jpg) — referenced but optional
```

HTML pages stay at the root by design: `index.html` must be the root entry point, and every page cross-links to siblings by bare filename (e.g. `href="ant-control.html"`). Asset references use the `css/`, `js/`, `assets/` prefixes.

## Page inventory

- `index.html` — homepage (largest; hero, tabs, FAQ, full feature set)
- Service pages share a common template: `general-pest-control.html`, `rodent-control.html`, `roach-control.html`, `ant-control.html`, `wasp-control.html`, `hornet-control.html`, `emergency-pest-control.html`
- `about-us.html`, `contact-us.html`
- Legal: `privacy-policy.html`, `cookies-policy.html`, `terms-of-use.html`

## Conventions

- **Hero/section illustrations are inline SVG**, not image files. Pages reference `assets/hero.jpg` and `assets/team.jpg` as drop-in replacements for the SVG illustrations — drop those files into `assets/` to activate them.
- The call-to-action phone number (`tel:+18777750190`) is hardcoded in the header CTA and throughout pages — update all occurrences together.
- Class naming is plain semantic/BEM-ish (`.site-header`, `.footer-grid`, `.faq-item`); follow the existing names when adding markup so the global CSS applies.
- When adding a new page, copy the full header and footer blocks from an existing service page to keep nav and branding consistent.
