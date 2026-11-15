// Renders every route to static HTML after `vite build` + `vite build --ssr`.
// Each page ships real content and its own <title>/meta/canonical/OG/JSON-LD,
// then React hydrates it in the browser.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// Inline the (small) stylesheet so first paint doesn't wait for a CSS request,
// and preload the Latin font subset used by every page.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href), 'utf8')
  return `<style>${css}</style>`
})
const latin = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f))
if (latin) template = template.replace('<!--app-head-->', `<link rel="preload" href="/assets/${latin}" as="font" type="font/woff2" crossorigin />\n    <!--app-head-->`)
const { render, head, pages } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)

for (const { path: route, meta } of pages) {
  const html = template
    .replace('<!--app-head-->', head(route, meta))
    .replace('<!--app-html-->', render(route))
  const file = route === '/' ? 'index.html' : route === '/404' ? '404.html' : `${route.slice(1)}/index.html`
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true })
  fs.writeFileSync(path.join(dist, file), html)
  console.log('prerendered', route, '->', file)
}

// sitemap.xml from the same route list
const today = new Date().toISOString().slice(0, 10)
const urls = pages
  .filter((p) => p.path !== '/404')
  .map((p) => `  <url><loc>https://www.stdn.in${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log('sitemap.xml written,', urls.length, 'urls')
