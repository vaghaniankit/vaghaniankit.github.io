# Brand Kit — Ankit Vaghani Portfolio

Canonical site: https://vaghaniankit.github.io/

## Brand positioning

**Senior Python / Backend Engineer** · Founder & CTO at SparkScribe Technologies  
Tone: technical, direct, credible — dark terminal aesthetic, not corporate stock.

---

## Color palette

| Token | Hex | Usage |
|-------|-----|--------|
| `--color-bg-primary` | `#080808` | Page background |
| `--color-bg-elevated` | `#0f0f0f` | Hover rows, cards |
| `--color-bg-muted` | `#181818` | Inputs, tags |
| `--color-text-primary` | `#f5f2ed` | Headings, body |
| `--color-text-secondary` | `#d6d2cc` | Descriptions |
| `--color-text-muted` | `#9e9a93` | Nav inactive, metadata |
| `--color-accent-primary` | `#e8ff00` | CTAs, links, active nav |
| `--color-accent-secondary` | `#ff6b4a` | Outcome labels, urgency |
| `--color-accent-success` | `#00ff88` | Live / available status |

**Rules**
- One primary accent per screen region (volt yellow).
- Coral for short uppercase labels only — not long paragraphs.
- Never place `#e8ff00` text on white (use black text on yellow buttons).

---

## Typography

| Role | Family | Weight | Example |
|------|--------|--------|---------|
| Display | Bebas Neue | 400 | `THE ENGINEER`, `BACKEND ENGINEER` |
| Body | Inter | 400–700 | Bio, project descriptions |
| Mono / UI | DM Mono | 400–500 | Nav, tags, dates, facts |

### Scale

| Token | Size | Use |
|-------|------|-----|
| `--text-xs` | ~14px | Captions, fine print |
| `--text-sm` | ~16px | Nav, labels, outcomes |
| `--text-base` | ~18px | Body copy |
| `--text-md` | ~20px | Lead paragraphs |
| `--text-lg` | ~23px | Subheads |

**Rules**
- Body minimum **16px effective** (`--text-base` at 17–18px root).
- All-caps only for display headings and short labels.
- Line height: **1.65** body, **0.92–1.05** display.

---

## Spacing & layout

- Sidebar: **272px** fixed (`--nav-w`)
- Section padding: `clamp(1.5rem, 4vw, 4rem)` horizontal
- Content max: fluid within viewport minus sidebar
- Border radius: **2px** (sharp, technical)

---

## Components

| Component | Notes |
|-----------|--------|
| Primary button | Volt fill, black text |
| Ghost button | Border `border2`, white text |
| Tags | `bg3` + `border2`, hover → accent border |
| Project cards | 3-col case study grid → 1 col mobile |
| Photo frame | `pg-visual--portrait`, 4:5 crop |

---

## Theme changes

Edit **`assets/brand/tokens.css`** only. All pages pull tokens from this file via `index.html`.

Do not hard-code hex values in HTML — use CSS variables.

---

## Files

```
assets/brand/tokens.css    ← design tokens (source of truth)
assets/brand/brand-kit.md  ← this document
assets/about/ankit-vaghani.png
assets/illustrations/*.svg
```
