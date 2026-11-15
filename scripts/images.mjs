// Builds web-ready product shots from ../raw-captures (demo data only) into public/shots.
// Usage: node scripts/images.mjs
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAW = path.resolve('../raw-captures')
const OUT = path.resolve('public/shots')
fs.mkdirSync(OUT, { recursive: true })

const shots = [
  ['meddesk/dashboard.png', 'md-dashboard'],
  ['meddesk/sale-cart.png', 'md-billing'],
  ['meddesk/scan-3.png', 'md-scan'],
  ['meddesk/stock.png', 'md-stock'],
  ['meddesk/revenue.png', 'md-pnl'],
  ['meddesk/reports.png', 'md-reports'],
  ['meddesk/sales-history.png', 'md-history'],
  ['ashoka/dashboard.png', 'hotel-dashboard', 'blurBrand'],
  ['ashoka/rooms.png', 'hotel-rooms', 'blurBrand'],
  ['ashoka/restaurant.png', 'hotel-restaurant', 'blurBrand'],
  ['ashoka/bookings.png', 'hotel-bookings', 'blurBrand'],
  ['school/dashboard.png', 'school-dashboard'],
  ['school/ledgers.png', 'school-ledgers'],
  ['school/payments.png', 'school-payments'],
  ['school/students.png', 'school-students'],
  ['school/reports.png', 'school-reports'],
]

async function brandBlur(input) {
  // Heavily blur the hotel's name in the sidebar header (client name, not ours to show).
  const region = { left: 20, top: 20, width: 400, height: 110 }
  const patch = await sharp(input).extract(region).blur(18).toBuffer()
  return sharp(input).composite([{ input: patch, left: region.left, top: region.top }]).toBuffer()
}

for (const [src, name, fx] of shots) {
  let buf = fs.readFileSync(path.join(RAW, src))
  if (fx === 'blurBrand') buf = await brandBlur(buf)
  for (const w of [960, 1600, 2400]) {
    const img = sharp(buf).resize({ width: w })
    await img.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`))
    await img.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }
  console.log('ok', name)
}

// Tighter crops for phones, where a full-width desktop screenshot is too small to read.
const crops = [
  ['meddesk/dashboard.png', 'md-dashboard', { left: 420, top: 110, width: 1600, height: 1000 }],
  ['meddesk/scan-3.png', 'md-scan', { left: 330, top: 290, width: 1600, height: 1000 }],
]
for (const [src, name, region] of crops) {
  const buf = await sharp(fs.readFileSync(path.join(RAW, src))).extract(region).toBuffer()
  for (const w of [800, 1200]) {
    await sharp(buf).resize({ width: w }).avif({ quality: 55, effort: 6 }).toFile(path.join(OUT, `${name}-m${w}.avif`))
    await sharp(buf).resize({ width: w }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}-m${w}.webp`))
  }
  console.log('ok crop', name)
}

// The synthetic test bill used for the scan demo (made-up supplier, marked "synthetic test data").
const bill = '/Users/apple/MedDeskData/synthetic-bills/S01-busy-intra.jpg'
if (fs.existsSync(bill)) {
  for (const w of [700, 1200]) {
    await sharp(bill).resize({ width: w }).avif({ quality: 60 }).toFile(path.join(OUT, `bill-${w}.avif`))
    await sharp(bill).resize({ width: w }).webp({ quality: 80 }).toFile(path.join(OUT, `bill-${w}.webp`))
  }
  console.log('ok bill')
}
