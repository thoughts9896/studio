import type { ComponentType } from 'react'
import Home from './pages/Home'
import MedDesk from './pages/MedDesk'
import SchoolErp from './pages/SchoolErp'
import HotelErp from './pages/HotelErp'
import Services from './pages/Services'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import { NotFound, Privacy, Terms } from './pages/Legal'
import { SITE } from './site'

export type Meta = { title: string; description: string; image?: string; schema?: object[] }
export type RouteDef = { path: string; Component: ComponentType; meta: Meta }

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: 'STDN',
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  address: { '@type': 'PostalAddress', addressLocality: 'Jind', addressRegion: 'Haryana', addressCountry: 'IN' },
  email: SITE.email,
}

const app = (name: string, description: string, os: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  operatingSystem: os,
  applicationCategory: 'BusinessApplication',
  url: `${SITE.url}${url}`,
  publisher: { '@id': `${SITE.url}/#organization` },
})

export const routes: RouteDef[] = [
  {
    path: '/',
    Component: Home,
    meta: {
      title: 'STDN Technologies — Intelligent software for the businesses that run India',
      description: 'STDN builds AI-powered products for pharmacies, schools and hotels, including MedDesk, School ERP and Hotel ERP, plus custom websites, apps and AI systems.',
      schema: [org, { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url, publisher: { '@id': `${SITE.url}/#organization` } }],
    },
  },
  {
    path: '/meddesk',
    Component: MedDesk,
    meta: {
      title: 'MedDesk — Pharmacy software with AI bill scan | STDN',
      description: 'MedDesk is a pharmacy ERP for Windows: fast billing, batch-wise stock and expiry, GST reports, backups, and an AI that reads supplier bills from a photo.',
      image: '/og/meddesk.png',
      schema: [app('MedDesk', 'Pharmacy management software for Indian medical stores with AI supplier-bill scanning.', 'Windows', '/meddesk')],
    },
  },
  {
    path: '/school-erp',
    Component: SchoolErp,
    meta: {
      title: 'School ERP — Fees, students and online payments | STDN',
      description: 'School ERP manages students, monthly fee ledgers, late fees, Razorpay payments, receipts, reminders and a parent portal.',
      image: '/og/school-erp.png',
      schema: [app('School ERP', 'School fee and student management with online payments and a parent portal.', 'Web', '/school-erp')],
    },
  },
  {
    path: '/hotel-erp',
    Component: HotelErp,
    meta: {
      title: 'Hotel ERP — Rooms, restaurant and GST billing | STDN',
      description: 'Hotel ERP for hotels with a restaurant: room board, guest check-in, table orders and KOT, thermal printing and GST-correct billing.',
      image: '/og/hotel-erp.png',
      schema: [app('Hotel ERP', 'Hotel and restaurant management with rooms, KOT and GST billing.', 'Windows', '/hotel-erp')],
    },
  },
  {
    path: '/products',
    Component: Products,
    meta: { title: 'Products — MedDesk, School ERP, Hotel ERP | STDN', description: 'Software built for one kind of business at a time: MedDesk for pharmacies, School ERP for schools, Hotel ERP for hotels.' },
  },
  {
    path: '/services',
    Component: Services,
    meta: { title: 'Custom software — Websites, apps and AI systems | STDN', description: 'STDN builds websites, web apps, mobile apps and AI systems, including chatbots, WhatsApp bots and document reading, for Indian businesses.' },
  },
  {
    path: '/about',
    Component: About,
    meta: { title: 'About STDN Technologies', description: 'STDN Technologies is a software company in Jind, Haryana, building intelligent products and AI systems for Indian businesses.' },
  },
  {
    path: '/contact',
    Component: Contact,
    meta: { title: 'Contact STDN — WhatsApp or email', description: 'Talk to STDN on WhatsApp about MedDesk, School ERP, Hotel ERP or a custom website, app or AI system.' },
  },
  { path: '/privacy-policy', Component: Privacy, meta: { title: 'Privacy Policy | STDN', description: 'How STDN Technologies handles personal data on stdn.in and in its products.' } },
  { path: '/terms', Component: Terms, meta: { title: 'Terms of Use | STDN', description: 'Terms of use for stdn.in.' } },
]

export const notFound: RouteDef = { path: '/404', Component: NotFound, meta: { title: 'Page not found | STDN', description: 'This page could not be found.' } }
