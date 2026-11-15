// Generates favicons, app icons and Open Graph images.
// OG cards are rendered by headless Chrome from plain HTML so they use the site's Inter font.
// Usage: node scripts/brand.mjs   (needs Google Chrome installed)
import sharp from 'sharp'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const pub = path.resolve('public')
const mark = (bg = '#fbfaf7') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48.5" fill="${bg}" stroke="#0f0f0d" stroke-width="3"/>
  <path d="M50 1.5a48.5 48.5 0 0 1 0 97a24.25 24.25 0 0 1 0-48.5a24.25 24.25 0 0 0 0-48.5z" fill="#0f0f0d"/>
  <circle cx="50" cy="25.75" r="7" fill="#0f0f0d"/><circle cx="50" cy="74.25" r="7" fill="${bg}"/>
</svg>`

fs.writeFileSync(path.join(pub, 'favicon.svg'), mark())
async function icon(file, size, pad) {
  const inner = await sharp(Buffer.from(mark()), { density: 800 }).resize(size - pad * 2).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#fbfaf7' } })
    .composite([{ input: inner, top: pad, left: pad }]).png().toFile(path.join(pub, file))
}
await sharp(Buffer.from(mark()), { density: 400 }).resize(32).png().toFile(path.join(pub, 'favicon-32.png'))
await icon('apple-touch-icon.png', 180, 22)

// favicon.ico (16/32/48 px PNG entries) for browsers and crawlers that only ask for /favicon.ico
const icoSizes = [16, 32, 48]
const pngs = await Promise.all(icoSizes.map((s) => sharp(Buffer.from(mark()), { density: 600 }).resize(s).png().toBuffer()))
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4)
let offset = 6 + 16 * pngs.length
const dir = pngs.map((png, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(icoSizes[i], 0); e.writeUInt8(icoSizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12)
  offset += png.length
  return e
})
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...dir, ...pngs]))
await icon('icon-192.png', 192, 24)
await icon('icon-512.png', 512, 64)
fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify({
  name: 'STDN Technologies', short_name: 'STDN', start_url: '/', display: 'browser',
  background_color: '#fbfaf7', theme_color: '#fbfaf7',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2))

// ── OG cards ────────────────────────────────────────────────────────────────
const font = path.resolve('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')
// Shot files are content-hashed (see images.mjs): pick the current 1600px webp for each name.
const shot = (n) => path.join(pub, 'shots', fs.readdirSync(path.join(pub, 'shots')).find((f) => new RegExp(`^${n}-1600\\.[0-9a-f]{8}\\.webp$`).test(f)))
const cards = [
  { file: 'home.png', kicker: 'STDN Technologies', title: 'Intelligent software for the businesses that run India.', shot: 'md-dashboard' },
  { file: 'meddesk.png', kicker: 'MedDesk · Pharmacy ERP', title: 'Snap the supplier bill. Stock updates itself.', shot: 'md-scan' },
  { file: 'school-erp.png', kicker: 'School ERP', title: 'School fees, collected on time.', shot: 'school-dashboard' },
  { file: 'hotel-erp.png', kicker: 'Hotel ERP', title: 'Rooms, restaurant and billing. One desk.', shot: 'hotel-rooms' },
]
fs.mkdirSync(path.join(pub, 'og'), { recursive: true })
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stdn-og-'))
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
for (const c of cards) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:Inter;src:url('file://${font}') format('woff2');font-weight:100 900}
  *{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#fbfaf7;font-family:Inter;color:#0f0f0d;overflow:hidden;position:relative}
  .t{position:absolute;left:72px;top:72px;width:560px}
  .k{font-size:24px;font-weight:600;color:#c2410c;letter-spacing:.01em}
  h1{margin-top:22px;font-size:58px;line-height:1.04;letter-spacing:-.045em;font-weight:650}
  .b{position:absolute;left:72px;bottom:64px;display:flex;align-items:center;gap:14px;font-size:28px;font-weight:700;letter-spacing:-.03em}
  .s{position:absolute;left:680px;top:110px;width:860px;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px rgba(15,15,13,.08),0 30px 70px -10px rgba(15,15,13,.25)}
  .s img{display:block;width:100%}
  </style></head><body>
  <div class="t"><div class="k">${c.kicker}</div><h1>${c.title}</h1></div>
  <div class="b">${mark()}<span>STDN</span></div>
  <div class="s"><img src="file://${shot(c.shot)}"></div>
  </body></html>`.replace('<svg ', '<svg width="40" height="40" ')
  const f = path.join(tmp, c.file.replace('.png', '.html'))
  fs.writeFileSync(f, html)
  const out = path.join(pub, 'og', c.file)
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--allow-file-access-from-files', `--screenshot=${out}`, `file://${f}`], { stdio: 'ignore' })
  await sharp(out).png({ compressionLevel: 9, palette: false }).toFile(out + '.tmp')
  fs.renameSync(out + '.tmp', out)
  console.log('og', c.file)
}
console.log('brand assets done')
