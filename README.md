# APU WELLNESS FEST 2026
> **Tagline:** “Move Better. Live Healthier. Feel Stronger.”

---

### ⚠️ IMPORTANT ACADEMIC DISCLAIMER
This website is an **academic demonstration project** created solely for a Web Development Team Assignment. It represents an imaginary student event at APU University. It is **NOT** an official event organized or endorsed by Asia Pacific University of Technology & Innovation (APU).

---

## 1. Project Overview
**APU Wellness Fest 2026** is a modern, responsive, front-end university event platform built to promote student health, fitness, mindful stress relief, and holistic nutrition. The interface is engineered with pure Vanilla web technologies, adhering to modern UI/UX design standards:
- **Clean and Minimal Aesthetic** with health and wellness inspiration.
- **Glassmorphism & Micro-Interactions** for modern visual delight.
- **Accessible Contrast & Typographic Hierarchy** utilizing Google Fonts (*Outfit* and *Plus Jakarta Sans*).
- **Zero-Backend Client-Side Persistence** leveraging browser `localStorage`.
- **Works directly by opening `index.html`** in any modern web browser.

---

## 2. Technology Stack
- **HTML5:** Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>` / modal structures).
- **CSS3:** Custom Properties (CSS variables for Light & Dark mode), Flexbox, CSS Grid, media queries, keyframe animations, glassmorphism filters.
- **Vanilla JavaScript (ES6+):** Modular, beginner-friendly client-side logic without any third-party JavaScript frameworks (No React, No Bootstrap, No Tailwind, No jQuery).
- **Typography:** Google Fonts (*Outfit* for bold display headings, *Plus Jakarta Sans* for readable body prose).
- **Icons:** Font Awesome 6.5.1 via CDN.

---

## 3. File Structure
```
apu-wellness-fest/
│
├── index.html            # Main landing page with Hero, Highlights, Committee & Stats
├── about.html            # Mission, 6 Core Objectives, Committee & Past Event Archives
├── schedule.html         # 3-Day interactive schedule with filtering & CSV download
├── activities.html       # 10 Flagship activities with interactive modal details
├── registration.html     # Client-validated registration form & ID generator
├── resources.html        # Downloadable guides, handbooks, and toolkits
├── gallery.html          # Masonry image gallery with category filters & lightbox
├── news.html             # Blog & campus announcements with modal reader
├── faq.html              # Accordion-style frequently asked questions
├── contact.html          # Inquiry form, helpline details, and venue zone map
├── feedback.html         # 5-star interactive rating and survey system
├── login.html            # Demo participant login portal with autofill
├── dashboard.html        # Personalized participant portal & Digital Event Pass
│
├── css/
│   └── style.css         # Master responsive stylesheet & theme variables
│
├── js/
│   └── script.js         # Complete vanilla JavaScript implementing all 22 workflows
│
├── images/
│   ├── hero.jpg          # Campus wellness festival hero banner
│   ├── fitness.jpg       # Functional athletic challenge imagery
│   ├── yoga.jpg          # Sunlit campus yoga session
│   ├── nutrition.jpg     # Fresh wholesome culinary demonstration
│   ├── mental-health.jpg # Student wellbeing reflection circle
│   └── gallery/          # High-resolution gallery photographs
│
└── README.md             # Project documentation
```

---

## 4. Key JavaScript Features Implemented (22 Workflows)
1. **Mobile Navigation:** Responsive hamburger toggle menu with smooth transition animations.
2. **Sticky Navigation:** Header with blur glassmorphism and subtle elevation on scroll.
3. **Smooth Scrolling:** Fluid internal link transitions across sections.
4. **Live Countdown Timer:** Calculates real-time Days, Hours, Minutes, and Seconds until November 20, 2026.
5. **Schedule Filtering:** Dual-axis filtering by Event Day (Day 1, 2, 3) and Category (Fitness, Nutrition, Mental Health, Yoga, Community).
6. **Form Validation:** Comprehensive client-side validation for names, IDs, emails, phone numbers, and checkboxes.
7. **LocalStorage Registration:** Persists user registrations and generates unique IDs (e.g. `APU-WF-2026-1045`).
8. **Demo Authentication:** Simulated client-side login checking student credentials.
9. **Dashboard Display:** Renders student pass, registration list, notifications, and wellness milestones.
10. **FAQ Accordion:** Smooth CSS height transition accordion for answers.
11. **Gallery Filtering:** Category filtering (All, Fitness, Yoga, Food, Workshops, Students).
12. **Image Lightbox:** Fullscreen modal with image enlargement, captions, next/previous navigation, and keyboard listeners (Esc, Left, Right).
13. **Activity Detail Modal:** In-depth popups with eligibility, equipment, and instant registration pre-fill.
14. **News Article Modal:** Full editorial reader for campus articles.
15. **Contact Form Validation:** Regex email checking, message character verification, and simulated submission.
16. **Feedback Survey Validation:** Verifies required fields and stores feedback in `localStorage`.
17. **Interactive Star Rating:** Hover effects and 5-star rating selection widget.
18. **Global Search Functionality:** Real-time search overlay scanning across activities, schedule, FAQs, news, and resources.
19. **Dark/Light Mode Toggle:** Persists theme preference across page reloads using `localStorage`.
20. **Download Schedule Feature:** Generates and triggers instant browser download of a clean `.csv` schedule file.
21. **Scroll-To-Top Button:** Floats into view past 350px scroll threshold with smooth return.
22. **Toast Notification System:** Non-intrusive floating status alerts for user feedback.

---

## 5. Demo Login Credentials
To test the Participant Dashboard without filling out the registration form:
- **Email:** `student@apu-demo.com`
- **Password:** `wellness2026`
- *Or click the **“Autofill Demo”** button on `login.html` for one-click testing.*

---

## 6. How to Run
### Option A: Direct Browser Execution (No Server Required)
Simply double-click `index.html` or drag and drop it into Google Chrome, Firefox, Microsoft Edge, or Safari. All styles, icons, and scripts will load immediately.

### Option B: Local Web Server (Node.js / Vite / Live Server)
1. Run `npm install` (if dependencies are required).
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## 7. Accessibility & UI/UX Principles
- **WCAG AA Contrast Compliant:** Text and backgrounds maintain legible ratios in both Light and Dark themes.
- **Keyboard Navigation:** Modals and lightboxes handle `Escape` and arrow keys.
- **Focus Indicators:** Interactive elements display clean visible focus rings (`:focus-visible`).
- **Responsive Layout:** Fluid grid scaling from 1440px desktop down to mobile phones (375px).
