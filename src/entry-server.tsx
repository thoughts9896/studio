import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { notFound, routes, type Meta } from './routes'
import { SITE } from './site'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function head(path: string, meta: Meta) {
  const url = `${SITE.url}${path === '/' ? '/' : path}`
  const image = `${SITE.url}${meta.image ?? '/og/home.png'}`
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    path === '/404' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(meta.schema ?? []).map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.join('\n    ')
}

export function render(path: string) {
  const html = renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  )
  return html
}

export const pages = [...routes.map((r) => ({ path: r.path, meta: r.meta })), { path: notFound.path, meta: notFound.meta }]
