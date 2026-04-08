# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal professional website for Michael Galde — cybersecurity professor at the University of Arizona and former defense intelligence analyst. Deployed on GitHub Pages from the `mgalde/michaelgalde.com` repo.

## File Structure

```
index.html          Single-page site; all sections are anchor-linked
css/style.css       All styles — light/dark mode via CSS custom properties
js/main.js          Theme toggle, mobile nav, smooth scroll, contact form
images/             Optimized web photos (hero-headshot.jpg, about-headshot.jpg)
```

Original high-resolution headshots live in `Headshots Close-selected/` and `Headshots Mid-selected/`. If replacing photos, re-optimize with ImageMagick:
```bash
magick input.jpg -resize 900x1100\> -quality 82 images/output.jpg
```

## Design System

**Typography:** Playfair Display (headings) + Inter (body) via Google Fonts

**Color palette — CSS custom properties on `:root` (light) and `[data-theme="dark"]`:**
- Light: steel blue `#3B6FD4` → violet `#6B48C8` gradient
- Dark: bright blue `#6B9FFF` → bright violet `#A87BFF` gradient
- Background layers: `--bg`, `--bg-surface`, `--bg-surface-2`, `--bg-strip` (dark navy)

**Theme toggle:** `data-theme` attribute on `<html>`. Persisted in `localStorage` under key `mg-theme`. Respects `prefers-color-scheme` as default.

## Page Sections (in order)

1. **#home** — Hero with photo, badge, headline, two CTAs
2. Stats strip — dark navy band, four stats
3. **#about** — Two-column with campus photo
4. **#consulting** — Four service cards (malware, ICS, forensics, training)
5. **#research** — Four active research project cards + tools grid
6. **#students** — Course grid split by CYBR / CYBV prefix
7. **#contact** — Contact info + booking card + mailto form

## Things to Update

- **TidyCal URL:** `https://tidycal.com/galdeconsulting/15-minute-meeting` — used on all "Book a Consultation" buttons.
- **Copyright year:** Footer has `&copy; 2026`. Update annually.

## Key Content Facts

- Email: Consulting@michaelgalde.com | Phone: (520) 621-0634
- University of Arizona, College of Information Science
- CYBR courses (Cyber Ops): 101, 330, 400
- CYBV courses (absorbed from CAST into CIS): 201, 226, 301, 326, 388, 454
- Active research: GRID-LM, DaRIA, SPINE, IAES-SOC
- Tools: HexCheck, PCAPMap, Bee Knees, DropTap

## Deployment

GitHub Pages — no build step. Push changes to the default branch and they go live.
