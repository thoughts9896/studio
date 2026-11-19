// Builds web-ready product images from ../raw-captures (demo data only) into public/shots,
// and writes src/shots.gen.ts with each image's size, hash, available widths and a tiny
// blurred placeholder (so <img> reserves space and never shows a blank box while loading).
// Usage: node scripts/images.mjs
//
// Every crop stays inside the app's content area: no sidebars (user names, versions, client
// branding) and no dev-only panels. Captures are taken at 2x (see the list below).
// Owner View captures are 1170x2532 (390x844 @3x) of the real phone page with a demo shop.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const RAW = path.resolve('../raw-captures')
const OUT = path.resolve('public/shots')
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const box = (x0, y0, x1, y1) => ({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 })
const DESK = [960, 1600, 2400]
const DETAIL = [640, 1000]

// Every capture is the app at a small window and 2x scale (MedDesk 1440x900, School ERP
// 1200x760; Hotel ERP 1512x945), so a crop shown at ~700px keeps its text at real size.
// Each crop is the one thing a section talks about; nothing is shown twice on a page.
// [source, name, crop, widths]
const W = [700, 1100, 1600]
const shots = [
  // MedDesk: demo shop "Shree Balaji Medical Store", captured 19 Nov 2026 (meddesk-v3)
  ['meddesk-v3/dash.png', 'md-dash', box(0, 0, 2880, 1250), DESK],
  ['meddesk-v3/dash.png', 'md-expiry', box(1650, 574, 2866, 1236), W],
  ['meddesk-v3/dash.png', 'md-expiry-top', box(1650, 574, 2866, 950), W],
  ['meddesk-v3/dash.png', 'md-sales', box(432, 222, 914, 462), [480]],
  ['meddesk-v3/dash.png', 'md-lowstock', box(432, 574, 1642, 1236), W],
  ['meddesk-v3/sale.png', 'md-cart', box(420, 230, 2196, 1000), W],
  ['meddesk-v3/sale.png', 'md-pay', box(2194, 740, 2866, 1784), [400, 672]],
  ['meddesk-v3/sale.png', 'md-netpay', box(2194, 1150, 2866, 1784), [400, 672]],
  ['meddesk-v3/sale-search.png', 'md-search', box(420, 225, 2196, 745), W],
  ['meddesk-v3/stock.png', 'md-stock', box(430, 470, 2010, 1300), W],
  ['meddesk-v3/stock-exp.png', 'md-near-expiry', box(430, 470, 2010, 1130), W],
  ['meddesk-v3/revenue.png', 'md-profit', box(430, 390, 1900, 960), W],
  ['meddesk-v3/revenue2.png', 'md-chart', box(430, 100, 2040, 885), W],
  ['meddesk-v3/revenue2.png', 'md-pnl-statement', box(2055, 100, 2866, 885), [480, 811]],
  ['meddesk-v3/revenue2.png', 'md-gst', box(2055, 1310, 2866, 1765), [480, 811]],
  ['meddesk-v3/revenue2.png', 'md-topmeds', box(430, 905, 2040, 1780), W],
  ['meddesk-v3/purchase-recent.png', 'md-purchases', box(430, 330, 2310, 1330), W],
  // The AI scan result as MedDesk shows it (the synthetic test bill, all five lines linked)
  ['meddesk/scan-3.png', 'md-scan', box(330, 470, 2390, 1410), W],
  // School ERP: local copy with a demo school and made-up students (school-v2)
  ['school-v2/dash.png', 'school-dash', box(462, 110, 2360, 1450), W],
  ['school-v2/dash.png', 'school-insights', box(530, 1080, 1720, 1440), [480, 800, 1190]],
  ['school-v2/ledgers.png', 'school-ledgers', box(490, 150, 2360, 1500), W],
  ['school-v2/payments.png', 'school-payments', box(490, 150, 2200, 1520), W],
  ['school-v2/students.png', 'school-students', box(490, 150, 1960, 1520), W],
  ['school-v2/fee-structures.png', 'school-fees', box(490, 150, 2360, 1520), W],
  // Hotel ERP: demo guests and rooms; crops stay right of the sidebar (client branding)
  ['ashoka/dashboard.png', 'hotel-dashboard', box(470, 170, 2970, 1100), DESK],
  ['ashoka/rooms.png', 'hotel-rooms', box(470, 150, 2340, 1130), W],
  ['ashoka/restaurant.png', 'hotel-restaurant', box(470, 150, 2370, 1340), W],
  ['ashoka/bookings.png', 'hotel-bookings', box(470, 150, 2400, 1000), W],
  ['ashoka/dashboard.png', 'hotel-checkins', box(470, 780, 2970, 1790), W],
]

// Detail cards for phones: one meaningful element, zoomed in so it reads at phone size.
// (Tables too dense to crop readably, like the expiry list, are drawn as HTML cards instead.)
const details = [
  ['meddesk-v3/revenue.png', 'd-md-profit', box(430, 390, 1210, 640)],
  ['ashoka/rooms.png', 'd-hotel-room', box(494, 380, 1088, 1096)],
  ['ashoka/rooms.png', 'd-hotel-room-top', box(494, 380, 1088, 830)],
  ['ashoka/restaurant.png', 'd-hotel-tables', box(494, 380, 1388, 946)],
  ['ashoka/dashboard.png', 'd-hotel-occupied', box(1118, 804, 1718, 1042)],
  ['school-v2/dash.png', 'd-school-dues', box(520, 742, 1060, 1010)],
  ['school-v2/dash.png', 'd-school-revenue', box(1450, 742, 1990, 1010)],
  ['school-v2/payments.png', 'd-school-pay', box(490, 580, 1350, 1250)],
]

// Owner View (coming soon): the real phone page, rendered with a made-up demo shop.
const phones = ['ov-today', 'ov-stock', 'ov-dues']

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8)

// A ~20px-wide, pre-blurred webp as a data URI: shown under the image until it loads.
async function placeholder(buf) {
  const b = await sharp(buf).resize({ width: 20 }).blur(0.8).webp({ quality: 45 }).toBuffer()
  return `data:image/webp;base64,${b.toString('base64')}`
}

// Writes <base>-<w>.<hash>.{avif,webp} for each width (capped at the source width) and
// returns the entry for SHOTS. Filenames carry a content hash, so a changed image always
// gets a new URL and no CDN or browser can keep serving an old copy.
async function emit(buf, base, widths) {
  const { width, height } = await sharp(buf).metadata()
  const v = hash(buf)
  const ws = []
  for (const w of widths) {
    if (ws.length && ws.at(-1) >= width) break
    const img = sharp(buf).resize({ width: Math.min(w, width) })
    await img.clone().avif({ quality: 58, effort: 6 }).toFile(path.join(OUT, `${base}-${w}.${v}.avif`))
    await img.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${base}-${w}.${v}.webp`))
    ws.push(w)
  }
  return { w: width, h: height, v, ws, ph: await placeholder(buf) }
}

const read = (src) => fs.readFileSync(path.join(RAW, src))
const sizes = {}
for (const [src, name, crop, widths] of shots) {
  sizes[name] = await emit(await sharp(read(src)).extract(crop).toBuffer(), name, widths)
  console.log('ok', name)
}
for (const [src, name, crop] of details) {
  sizes[name] = await emit(await sharp(read(src)).extract(crop).toBuffer(), name, DETAIL)
  console.log('ok', name)
}
for (const name of phones) {
  sizes[name] = await emit(read(`owner-view/${name}.png`), name, [500, 800, 1170])
  console.log('ok', name)
}

// The synthetic test bill used for the scan demo (made-up supplier, marked "synthetic test data").
const bill = '/Users/apple/MedDeskData/synthetic-bills/S01-busy-intra.jpg'
if (fs.existsSync(bill)) {
  // Just the printed part of the page (header, the five lines and the totals).
  sizes.bill = await emit(await sharp(fs.readFileSync(bill)).extract(box(0, 0, 1600, 600)).toBuffer(), 'bill', [600, 1000, 1600])
  console.log('ok bill')
}

fs.writeFileSync(
  path.resolve('src/shots.gen.ts'),
  `// Generated by scripts/images.mjs. Do not edit.
export type ShotFile = { w: number; h: number; v: string; ws: number[]; ph: string }
export const SHOTS: Record<string, ShotFile & { m?: ShotFile }> = ${JSON.stringify(sizes, null, 2)}
`,
)
