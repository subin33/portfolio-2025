## Portfolio 2025 – Next.js 15, React 19, GSAP, Framer Motion

A modern personal portfolio built with Next.js 15 and React 19. Smooth animations with GSAP and Framer Motion, Lenis-based smooth scrolling, responsive layouts, and a production-ready contact form powered by EmailJS.

---

### Features

- **Next.js 15 App Router** with optimized image pipeline and CSP for SVGs
- **Animations**: GSAP timelines, Framer Motion transitions, SplitText effects
- **Smooth Scrolling**: Lenis integration
- **Responsive**: Mobile-first breakpoints and adaptive components
- **Contact Form**: React Hook Form + Zod validation + EmailJS
- **Sections**: Home (hero, marquee, parallax gallery), About, Portfolio, Projects, Mini Projects, Contact
- **Performance**: Pre-optimized image formats (WebP/AVIF) and cache headers

---

### UI Preview / Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="public/assets/readme/preview-1.png" alt="preview-1" width="300" />
  <img src="public/assets/readme/preview-2.png" alt="preview-2" width="300" />
  <img src="public/assets/readme/preview-3.png" alt="preview-3" width="300" />
  <img src="public/assets/readme/preview-4.png" alt="preview-4" width="300" />
  <img src="public/assets/readme/preview-5.png" alt="preview-5" width="300" />
  <img src="public/assets/readme/preview-6.png" alt="preview-6" width="300" />
  <img src="public/assets/readme/preview-7.png" alt="preview-7" width="300" />
  <img src="public/assets/readme/preview-8.png" alt="preview-8" width="300" />
</div>

---

### Tech Stack

- Framework: **Next.js 15**, **React 19**, **TypeScript 5**
- Animation: **GSAP**, **@gsap/react**, **Framer Motion**, **SplitType**
- Forms/Validation: **React Hook Form**, **Zod**, **@hookform/resolvers**
- Smooth Scroll: **Lenis**
- UI / Utilities: **Radix UI (Label/Slot)**, **tailwind-merge**, **clsx**, **Lucide**
- Carousel: **Swiper**
- Email: **@emailjs/browser**
- Images: **sharp** (dev), Next.js Image with WebP/AVIF

---

### Getting Started

Prerequisites:

- Node.js 18+ (Recommended), pnpm/npm/yarn

Install dependencies:

```bash
npm install
```

Run development server (Turbopack):

```bash
npm run dev
```

Build and start production:

```bash
npm run build
npm start
```

Lint and format:

```bash
npm run lint
npm run lint:fix
npm run format
```

Optional – optimize local images (if you add new assets):

```bash
npm run optimize-images
```

---

### Project Structure (high level)

```
app/                   # Next.js App Router pages/layout
components/            # Reusable UI + section components
  layout/              # Navbar, Menu, Custom cursor, Showreel
  sections/            # Home, About, Portfolio, Projects, Mini Projects, Contact
  ui/                  # Buttons, inputs, modals, common UI primitives
lib/                   # animations, hooks, utils, data, responsive helpers
public/                # images, fonts, icons, GIFs, service worker
styles/                # global CSS modules
```

Key config:

- `next.config.ts`: image formats (WebP/AVIF), CSP for SVGs, cache headers, bundle analyzer opt-in
- `eslint.config.mjs`, `.prettierrc`: linting and formatting
- `tsconfig.json`: TypeScript config

---

### Notable Implementation Details

- **Animations** are organized under `lib/animations` and related section components. GSAP is used for complex timelines; Framer Motion handles entrance/transition effects.
- **Parallax Gallery** uses performant transforms and pre-optimized assets under `public/parallax-gallery`.
- **Contact Form** integrates EmailJS with schema validation (Zod) and controlled inputs (React Hook Form).
- **Image Policy** enables `image/webp` and `image/avif`, with sensible device/image sizes and long-lived cache headers.

---

### Environment & EmailJS

For the contact form to send emails, configure EmailJS public key, service ID, and template ID. Create a small config (already included as `emailjs-config.js`) or use environment variables if you prefer. Update your values in the integration code.

---

### Scripts

- `dev`: `next dev --turbopack`
- `build`: `next build`
- `start`: `next start`
- `lint`: `next lint`
- `lint:fix`: `next lint --fix`
- `format`: `prettier --write .`
- `optimize-images`: `node scripts/optimize-images.js`

---

### Accessibility & Performance

- Semantic HTML and keyboard-friendly components where applicable
- Motion reduced when `prefers-reduced-motion` is enabled (where feasible)
- Optimized images, lazy loading, and GPU-accelerated transforms
