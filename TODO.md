# Before this goes live: things only STDN can fill in

Everything here is marked `TODO` in the code. Nothing on the site is invented: no stats, clients, logos, reviews or team members.

## Must fill

| # | What | Where | Now on the site |
|---|------|-------|-----------------|
| 1 | **WhatsApp number**: confirm or replace | `src/site.ts` → `whatsapp` | `917404019891` (the number the old stdn.in used). Every WhatsApp button uses it. |
| 2 | **Public email**: confirm or replace | `src/site.ts` → `email` | `support@stdn.in` (the address MedDesk ships with). Shown on Contact, Privacy and in the JSON-LD. |
| 3 | **MedDesk price / plans** | `src/site.ts` → `PRICES.meddesk` | A yellow "TODO · MedDesk price and plans" chip on /meddesk#pricing |
| 4 | **School ERP price** | `src/site.ts` → `PRICES.schoolErp` | A yellow TODO chip on /school-erp |
| 5 | **Hotel ERP price** | `src/site.ts` → `PRICES.hotelErp` | A yellow TODO chip on /hotel-erp |
| 6 | **Testimonials** | `src/site.ts` → `TESTIMONIALS` | None shown. Only add real quotes, with the customer's permission. |

## Should do

- **Team photos.** None are shown on purpose. Add real photos only when real people can be named.
- **"Local STDN expert".** Copy says "an STDN expert will call you". Add "local" once city/region teams exist (`src/pages/Home.tsx`, `About.tsx`, `Contact.tsx`).
- **Review the Privacy Policy and Terms** (`src/pages/Legal.tsx`). They describe what the site actually does today (no cookies, no analytics, the contact form only opens WhatsApp) and say that School ERP data is held on servers STDN operates. Have someone check them before launch.
- **MedDesk "Now launching"** badge and the NEW top banner: change the wording once the launch date is fixed (`src/components/Layout.tsx`, `src/pages/MedDesk.tsx`).
- **Hotel ERP is labelled "Live"**, because installers were built for a client hotel (v1.4.5). The client's name is never shown, and it is blurred in the screenshots. If you'd rather not call it live, change the badge in `src/pages/HotelErp.tsx`, `Home.tsx` and `Products.tsx`.

## Noticed, outside this repo

- **erp.stdn.in login page**: the left panel shows "500+ Active Students · 98% Collection Rate", and the form shows a "Demo credentials" box (admin / parent emails and passwords). Check whether these are still shown in production.
- Old site content (the "Studio." name, projects JD & Dark, SPS Naguran, Research AI) was removed. Send the links if you want any of those builds listed on /services.

## Mobile layer (phones under 768px)

- **Owner View images** (`ov-today/stock/dues`) are the real phone page from the unreleased `feat/owner-view` branch, rendered with made-up data ("Shree Balaji Medical Store", "Demo Distributor A/B/C"). Retake them when Owner View ships, and keep the "Coming soon" label until then.
- **AI scan animation** (`ScanDemo` in `src/components/visual.tsx`) redraws what MedDesk read from the synthetic test bill. It marks the cream's **pack size** in yellow ("Not on the bill. Asks you.") because the bill doesn't print it. Check this matches how MedDesk flags missing values before launch; change `ask` in `ROWS` if not.
- **Expiry, billing and bill-scan cards** are HTML redraws of the same demo rows shown in MedDesk (the real tables are too dense to crop readably on a phone). If MedDesk's screens change, update `src/components/mobile.tsx`.
