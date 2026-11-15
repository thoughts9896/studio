// Builds web-ready product images from ../raw-captures (demo data only) into public/shots,
// and writes src/shots.gen.ts with each image's size, hash, available widths and a tiny
// blurred placeholder (so <img> reserves space and never shows a blank box while loading).
// Usage: node scripts/images.mjs
//
// Every crop stays inside the app's content area: no sidebars (user names, versions, client
// branding) and no dev-only panels. Raw desktop captures are 3024x1890 (1512x945 @2x).
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
const PHONE = [800, 1200]
const DETAIL = [640, 1000]

// Full product shots: [source, name, desktop crop, phone crop (optional)]
const shots = [
  ['meddesk/dashboard.png', 'md-dashboard', box(424, 90, 3024, 1230), box(1700, 560, 3000, 1205)],
  ['meddesk/dashboard.png', 'md-expiry', box(1700, 560, 3000, 1205)],
  // Scan result: the total check and the extracted table only (no stats banner, no debug panel).
  ['meddesk/scan-3.png', 'md-scan', box(330, 441, 2690, 1436), box(330, 441, 1640, 1436)],
  ['meddesk/sale-cart.png', 'md-billing', box(424, 90, 3024, 1290), box(424, 60, 1560, 800)],
  ['meddesk/stock.png', 'md-stock', box(424, 90, 3024, 1300), box(424, 350, 2000, 1370)],
  ['meddesk/revenue.png', 'md-pnl', box(424, 90, 3024, 1500), box(424, 270, 2000, 970)],
  ['meddesk/reports.png', 'md-reports', box(424, 90, 3024, 1500)],
  ['ashoka/dashboard.png', 'hotel-dashboard', box(450, 110, 3024, 1890)],
  ['ashoka/rooms.png', 'hotel-rooms', box(450, 110, 3024, 1500), box(450, 250, 1750, 1270)],
  ['ashoka/restaurant.png', 'hotel-restaurant', box(450, 110, 3024, 1500)],
  ['ashoka/bookings.png', 'hotel-bookings', box(450, 110, 3024, 1100)],
  ['school/dashboard.png', 'school-dashboard', box(450, 110, 3024, 1560), box(450, 150, 1780, 1170)],
  ['school/ledgers.png', 'school-ledgers', box(450, 110, 3024, 1560)],
  ['school/payments.png', 'school-payments', box(450, 110, 3024, 1560)],
  ['school/students.png', 'school-students', box(450, 110, 3024, 1560)],
]

// Detail cards for phones: one meaningful element, zoomed in so it reads at phone size.
// (Tables too dense to crop readably, like the expiry list, are drawn as HTML cards instead.)
const details = [
  ['meddesk/dashboard.png', 'd-md-sales', box(430, 218, 940, 464)],
  ['meddesk/revenue.png', 'd-md-profit', box(436, 395, 1330, 640)],
  ['ashoka/rooms.png', 'd-hotel-room', box(494, 380, 1088, 1096)],
  ['ashoka/rooms.png', 'd-hotel-room-top', box(494, 380, 1088, 830)],
  ['ashoka/restaurant.png', 'd-hotel-tables', box(494, 380, 1388, 946)],
  ['ashoka/dashboard.png', 'd-hotel-occupied', box(1118, 804, 1718, 1042)],
  ['school/dashboard.png', 'd-school-dues', box(1748, 354, 2358, 686)],
  ['school/dashboard.png', 'd-school-revenue', box(2372, 354, 2976, 686)],
  ['school/payments.png', 'd-school-pay', box(500, 500, 1300, 990)],
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
for (const [src, name, crop, phone] of shots) {
  const raw = read(src)
  sizes[name] = await emit(await sharp(raw).extract(crop).toBuffer(), name, DESK)
  if (phone) sizes[name].m = await emit(await sharp(raw).extract(phone).toBuffer(), `${name}-m`, PHONE)
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
  sizes.bill = await emit(fs.readFileSync(bill), 'bill', [700, 1200])
  console.log('ok bill')
}

fs.writeFileSync(
  path.resolve('src/shots.gen.ts'),
  `// Generated by scripts/images.mjs. Do not edit.
export type ShotFile = { w: number; h: number; v: string; ws: number[]; ph: string }
export const SHOTS: Record<string, ShotFile & { m?: ShotFile }> = ${JSON.stringify(sizes, null, 2)}
`,
)
