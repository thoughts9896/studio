// Local preview of the built site that behaves like Vercel with cleanUrls:
// /meddesk -> dist/meddesk/index.html, unknown paths -> dist/404.html (status 404),
// and the redirects from vercel.json.
// Usage: npm run build && npm run preview   (then open http://localhost:4173)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = path.resolve('dist')
const port = Number(process.env.PORT) || 4173
const { redirects = [] } = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  let p = decodeURIComponent(url.pathname)
  const r = redirects.find((x) => x.source === p)
  if (r) { res.writeHead(r.permanent ? 308 : 307, { Location: r.destination }); return res.end() }
  if (p.length > 1 && p.endsWith('/')) { res.writeHead(308, { Location: p.slice(0, -1) }); return res.end() }
  const candidates = [p, `${p}.html`, path.join(p, 'index.html')]
  for (const c of candidates) {
    const f = path.join(root, c)
    if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      const type = types[path.extname(f)] || 'application/octet-stream'
      const cache = c.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate'
      if (/text|javascript|json|xml|svg|manifest/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) {
        res.writeHead(200, { 'Content-Type': type, 'Content-Encoding': 'gzip', 'Cache-Control': cache })
        return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res)
      }
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': cache })
      return fs.createReadStream(f).pipe(res)
    }
  }
  res.writeHead(404, { 'Content-Type': types['.html'] })
  fs.createReadStream(path.join(root, '404.html')).pipe(res)
}).listen(port, () => console.log(`STDN site preview: http://localhost:${port}`))
