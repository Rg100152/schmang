# Raj School — Student Portal (single-file)

A complete, responsive student portal in **one self-contained `index.html`**.
No build step, no frameworks, no external fonts or CDN requests.

## Run

```bash
cd student-portal
python3 -m http.server 8000
# open http://localhost:8000/
```

You can also double-click `index.html` — it works from the filesystem because every
asset (including the campus hero photo) is embedded in the file.

## What is inside

| Section | Highlights |
|---|---|
| **Landing hero** | Sticky dark navbar, campus photo background with dark gradient, golden CTA, stats and a live student-preview card |
| **Find Your School** | White selector card, multi-pillar education icon, state dropdown, custom searchable school dropdown with live filtering |
| **Student sign-in** | Royal-blue gradient card over a subtle campus image, icon inputs, 6-character alphanumeric captcha + dark refresh button, checked instructions box, bright blue Login button, manual / register / forgot-password links |
| **Student dashboard** | Blue sidebar (Dashboard, Profile, Courses, News & Events, Logout), golden-orange welcome banner, KPI strip, 4 bordered cards with coloured headers (Featured Projects, News & Events, Teacher Directory, Notice Feed) |
| **Campus Gallery** | The 16 photographs saved in the project folder, shown as optimized thumbnails with Campus / Digital / Library filters and a full-screen lightbox (originals open in a new tab) |
| **Support** | Contact form with validation + toast confirmation, footer |

## Demo login

- Any **Student ID** or mobile number
- Any **password**
- Complete the visible **captcha**
- The "instructions" checkbox is checked by default

The selected school is remembered in `localStorage`; the active session lives in
`sessionStorage`, so a refresh keeps you signed in and closing the tab signs you out.

## Technical notes

- Pure HTML5 + CSS3 + vanilla JavaScript (single file, no dependencies)
- CSS Grid / Flexbox, responsive down to 360 px
- Smooth view fade between landing and dashboard, plus accessible focus styles
- Captcha is generated with `crypto.getRandomValues` when available
- Hero/login backgrounds use the supplied campus image, resized and embedded as a
  ~72 KB WebP `data:` URI so the file stays standalone and fast
- The Campus Gallery loads small WebP thumbnails from `../assets/img/gallery/` and only
  opens the full-size original PNG when an image is clicked (mapping lives in
  `../assets/img/gallery/gallery.json`). The same gallery is also on the root `home.html`.
- `prefers-reduced-motion` is respected
- Profile → "Download Record" exports a plain-text student record

## Structure

```
student-portal/
└── index.html      # everything: markup, themes, data, logic
../assets/img/gallery/
├── *.webp          # optimized thumbnails for the gallery cards
└── gallery.json    # thumbnail → original PNG / category / caption map
```

> Note: opening `student-portal/index.html` by double-clicking still works for the interface,
> but the gallery photographs load from the parent folder, so run the local server (above)
> to see them reliably.
