# stdn.in — STDN Technologies

The company site: light, fast and prerendered. It covers the products (MedDesk, School ERP, Hotel ERP) and custom software.

- **Stack:** Vite + React 19 + React Router + Tailwind CSS 4, Inter (self-hosted).
- **Prerendered:** every route is rendered to static HTML at build time (`scripts/prerender.mjs`), with its own title, meta, canonical, Open Graph image and JSON-LD. React then hydrates it.
- **Motion:** CSS only, plus one IntersectionObserver. Sections fade and slide in, product windows scale in on scroll (CSS scroll-driven animations where supported), and the product story is a sticky crossfade. All of it switches off with `prefers-reduced-motion`. Content is visible without JS.
- **Images:** real product screenshots, taken on **demo data only**, as AVIF/WebP at 960/1600/2400 px (plus phone crops) in `public/shots`. They are built by `npm run images` from `../raw-captures`.

## Run locally

```bash
npm ci
npm run dev        # dev server with hot reload: http://localhost:5173
npm run build      # type-check, build, prerender all pages, write sitemap.xml
npm run preview    # serve dist/ like Vercel does (clean URLs, 404, redirects): http://localhost:4173
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home: hero, products, MedDesk spotlight, custom software, how we work, talk to STDN |
| `/meddesk` | MedDesk launch page: AI bill scan, features, Owner View (coming soon), pricing (TODO), FAQ |
| `/school-erp` | School ERP (live at erp.stdn.in) |
| `/hotel-erp` | Hotel ERP (live) |
| `/products` | All products |
| `/services` | Custom software: websites, web apps, mobile apps, AI systems |
| `/about` | Company |
| `/contact` | WhatsApp, email, and a form that opens WhatsApp prefilled (nothing is stored) |
| `/privacy-policy`, `/terms` | Legal |

Redirects (in `vercel.json`): `/projects` and `/work` go to `/products`, `/privacy` goes to `/privacy-policy`. `/services`, `/contact`, `/privacy-policy` and `/terms` keep their old URLs.

## Before launch

See [TODO.md](TODO.md): WhatsApp number, email, prices and testimonials.

## Deploy (only after approval)

The Vercel project is `studio` (linked in `.vercel/`).

1. **Preview first:** push the branch, and Vercel builds a preview URL for it automatically:
   ```bash
   git push -u origin redesign/light-2026
   ```
   Or, from this folder: `npx vercel` (a preview deploy, not production).
2. In the Vercel project settings, check: Framework preset **Other**, build command `npm run build`, output directory `dist`, install command `npm ci`. `vercel.json` already sets these.
3. **Production:** merge `redesign/light-2026` into `main` (or run `npx vercel --prod`).
4. After going live: submit `https://www.stdn.in/sitemap.xml` in Google Search Console and check a few old URLs (`/projects`, `/services`).

## Re-making assets

- `npm run images`: rebuilds `public/shots` from `../raw-captures` (blurs the hotel client's name).
- `npm run brand`: rebuilds the favicon, app icons, manifest and Open Graph cards (needs Google Chrome).
