# Raj School Management System — Frontend

A complete, multi-page **School Management System frontend** built with plain **HTML + CSS + JavaScript**.
No build step, no backend, no external libraries. All pages share one connected data layer using
`localStorage`, so adding a student / marking attendance / collecting a fee updates every page instantly.

---

## 🚀 How to Run

1. Open the folder `raj-school-frontend` (this folder).
2. Double-click **`home.html`** to view the landing page, or **`index.html`** to log in directly.
3. Pick any role and click **Enter Portal** (demo mode — any password works).

> Optional: serve it locally to avoid any browser file restrictions:
>
> ```bash
> python3 -m http.server 8000
> ```
> Then open <http://localhost:8000/home.html>.

---

## 🎓 Single-File Student Portal

A second, fully self-contained portal UI lives in **`student-portal/index.html`**.
It has its own landing hero, "Find Your School" selector, captcha login and student
dashboard — all in one file with the campus photo embedded. Open it directly or visit
<https://rg100152.github.io/schmang/>. See `student-portal/README.md` for details.

---

## 📁 Folder Structure

```
raj-school-frontend/
├── assets/
│   └── img/
│       ├── campus-dusk.webp      # Blurred campus hero backdrop
│       ├── digital-waves.webp    # Login/dashboard ambient waves
│       ├── library-books.webp    # Results academic archive banner
│       └── gallery/              # Saved folder photographs + optimized thumbnails
│           ├── campus-01.webp … campus-08.webp
│           ├── waves-01.webp … waves-04.webp
│           ├── library-01.webp … library-04.webp
│           └── gallery.json      # Image → thumbnail / original / category mapping
├── css/
│   └── style.css          # Shared dark glassmorphism theme + print styles
├── js/
│   ├── app.js             # Shared data layer, auth, sidebar/topbar, helpers
│   └── gallery.js         # Gallery filters + full-screen lightbox
├── home.html              # Landing page (hero, features, campus gallery, contact form)
├── index.html             # Login (Admin / Teacher / Student)
├── dashboard.html         # KPIs, charts, notices, admission inquiries
├── students.html          # Student directory (add / edit / delete / search)
├── teachers.html          # Teacher management
├── attendance.html        # Daily P/A attendance register
├── fees.html              # Fee collection, payment modes, printable receipt
├── results.html           # Digital ID card, marksheet, edit marks
├── timetable.html         # Class-wise weekly timetable
└── README.md
```

---

## 🔐 Demo Roles

| Role | Can access |
|------|-----------|
| **Admin** | Everything — students, teachers, attendance, fees, results, timetable, notices, inquiries |
| **Teacher** | Dashboard, Students (read-only), Attendance, Results (edit marks), Timetable |
| **Student / Parent** | Dashboard, Fees (pay online + receipt), Results, Timetable |

Access control lives in `js/app.js` (`NAV` + `checkAuth`). Opening a page your role cannot use
redirects you back to the dashboard.

---

## ✨ Features

- **Landing page** with hero, feature grid, **campus gallery** and admission/contact form.
- **Campus Gallery** — the 16 photographs saved in the project folder appear on the website as optimized thumbnails with Campus / Digital / Library filters and a full-size lightbox (originals open in a new tab). Same gallery is also in the student portal.
- **Admission inquiries** submitted on the website appear instantly on the Admin dashboard and can be marked handled.
- **Student directory** — add, edit, delete, search by name / roll / phone, filter by class.
- **Teacher management** — faculty profiles, subjects, qualifications, assigned classes.
- **Attendance register** — date + class selection, P/A toggles, "mark all present/absent", saved per date, with live percentages.
- **Fee management** — collect offline or pay online (Cash / UPI / Card / Bank Transfer), auto receipt number, printable official receipt.
- **Results** — digital ID card, subject-wise grades, pass/fail, editable marks (Admin/Teacher), printable marksheet.
- **Timetable** — weekly periods by class, admin add/delete.
- **Notice board** — publish notices from the dashboard.
- **Shared shell** — role-aware sidebar, topbar, mobile slide-in menu, toast messages.
- **Utilities** — JSON data backup and full demo reset (`exportData()` / `resetData()` in `js/app.js`).

---

## 🗄️ Data Storage

All data is kept in the browser (demo only — not production secure):

| Key | Contents |
|-----|----------|
| `raj_school_students` | Student records, fees, attendance, marks |
| `raj_school_teachers` | Teacher profiles |
| `raj_school_notices` | Notice board |
| `raj_school_inquiries` | Landing-page admission inquiries |
| `raj_school_timetable` | Weekly timetable |
| `raj_school_attendance_log` | Date-wise attendance entries |
| `raj_school_user` | Logged-in user (name + role) |

To reset everything: open the browser console and run
```js
localStorage.clear(); location.reload();
```
or call `resetData()` from the app shell.

---

## 🎨 Visual Themes

The backgrounds combine **optimized blurred WebP images** (derived from the reference PNGs
in the project root, which are left untouched) with CSS overlays and inline SVG:

| Page | Theme |
|------|-------|
| `home.html` | Modern campus photo backdrop + campus skyline + floating 3D-tilted dashboard preview |
| `index.html` | Futuristic indigo/purple digital waves with glow orbs |
| `dashboard.html` | Animated aurora glow + faint digital waves behind glass cards |
| `results.html` | Dark academia "academic archive" banner with bookshelf |

Processed assets are only **16–33 KB each** (1600 px, pre-blurred), so they stay fast and
readable under the dark overlays. Animations respect `prefers-reduced-motion` and the 3D tilt
is disabled on mobile.

### 🖼️ Folder photographs on the website

The PNG images you saved in the project root are shown in a **Campus Gallery** on both
`home.html` and the student portal. To keep pages fast, each photo is served as a small WebP
thumbnail (~6–57 KB) from `assets/img/gallery/`, and the full-size original PNG is loaded only
when you open the lightbox. `gallery.json` maps each thumbnail to its original file, category
and caption — add a new photo there (plus its thumbnail) and it appears in both galleries
automatically. To add your own images, drop a PNG in the project root, generate a thumbnail in
`assets/img/gallery/`, and add an entry to `gallery.json`.

## 🛠️ Tech Notes

- Pure HTML/CSS/JS — works offline, fast on low-end machines.
- Shared design tokens in `:root` (`css/style.css`): change `--primary` to re-theme the whole portal.
- Print styles hide navigation so receipts and marksheets print cleanly.
- All dynamic text is escaped before rendering (`esc()` in `app.js`).

---

© 2026 Raj School Management System · Demo frontend by Raj Gautam.
