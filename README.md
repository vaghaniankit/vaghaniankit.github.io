# Ankit Vaghani — Portfolio

Personal portfolio site for [vaghaniankit.github.io](https://vaghaniankit.github.io/).

Static single-page site — HTML, CSS, and JS in separate files (no build step).

| Path | Role |
|------|------|
| `index.html` | Markup, meta, JSON-LD |
| `assets/brand/tokens.css` | Design tokens |
| `assets/css/main.css` | Layout and components |
| `assets/js/main.js` | Routing, forms, cursor, modal |

## Deploy (GitHub Pages)

1. Push `main` to [vaghaniankit/vaghaniankit.github.io](https://github.com/vaghaniankit/vaghaniankit.github.io).
2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
3. Site goes live at **https://vaghaniankit.github.io/** (usually within 1–2 minutes).

No custom domain, subdomain, or subpath — canonical URL is `vaghaniankit.github.io` only.

## Local preview

```bash
python3 -m http.server 5500
# open http://localhost:5500/
```
