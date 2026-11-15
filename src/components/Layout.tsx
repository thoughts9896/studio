import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Logo, WhatsAppIcon } from './ui'
import { SITE, waLink } from '../site'
import { useReveal } from '../hooks'

const NAV = [
  { to: '/meddesk', label: 'MedDesk' },
  { to: '/school-erp', label: 'School ERP' },
  { to: '/hotel-erp', label: 'Hotel ERP' },
  { to: '/services', label: 'Custom software' },
  { to: '/about', label: 'About' },
]

function LaunchBanner() {
  return (
    <Link to="/meddesk" className="group block bg-ink text-paper">
      <div className="wrap flex h-10 items-center justify-center gap-2 text-[0.85rem]">
        <span className="rounded-full bg-ember px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide text-white">NEW</span>
        <span className="truncate">
          <span className="font-semibold">MedDesk</span>
          <span className="text-paper/75"> — pharmacy software that reads your supplier bills.</span>
        </span>
        <span className="hidden items-center gap-1 font-medium text-paper sm:inline-flex">
          See it <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? 'bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl' : 'bg-paper'}`}>
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" aria-label="STDN Technologies, home"><Logo /></Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} className={({ isActive }) => `text-[0.94rem] transition-colors ${isActive ? 'text-ink font-medium' : 'text-ink-2 hover:text-ink'}`}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ink hidden !h-10 !px-4 text-[0.9rem] sm:inline-flex">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <ul className="wrap py-6">
            {NAV.map((n, i) => (
              <li key={n.to} style={{ animation: `menuIn .45s var(--ease-out) ${i * 40}ms both` }}>
                <Link to={n.to} onClick={() => setOpenOn(null)} className="block border-b border-line py-4 text-[1.6rem] font-semibold tracking-[-0.03em]">{n.label}</Link>
              </li>
            ))}
            <li className="pt-8">
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-ink w-full justify-center"><WhatsAppIcon /> Talk to STDN on WhatsApp</a>
            </li>
          </ul>
          <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){li{animation:none!important}}`}</style>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-sand/60">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-ink-2">Intelligent software for the businesses that run India.</p>
          <a href={waLink()} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 font-medium text-ink hover:text-ember">
            <WhatsAppIcon size={18} /> Message us on WhatsApp
          </a>
        </div>
        <FooterCol title="Products" links={[['/meddesk', 'MedDesk'], ['/school-erp', 'School ERP'], ['/hotel-erp', 'Hotel ERP'], ['/products', 'All products']]} />
        <FooterCol title="Build with us" links={[['/services', 'Custom software'], ['/services#ai', 'AI systems'], ['/contact', 'Contact']]} />
        <FooterCol title="Company" links={[['/about', 'About'], ['/privacy-policy', 'Privacy'], ['/terms', 'Terms']]} />
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-line py-6 text-[0.82rem] text-ink-3 md:flex-row md:items-center md:justify-between">
        <p>© {year} {SITE.name} · {SITE.place}, India</p>
        <p>Udyam-registered MSME · {SITE.udyam}</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-[0.82rem] font-semibold text-ink">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map(([to, label]) => (
          <li key={to}><Link to={to} className="text-[0.94rem] text-ink-2 hover:text-ink">{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with STDN on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-wa pl-4 pr-5 text-white shadow-[0_10px_30px_-6px_rgba(20,113,58,0.55)] transition-transform hover:scale-[1.03] active:scale-95 md:bottom-7 md:right-7"
    >
      <WhatsAppIcon size={24} />
      <span className="text-[0.95rem] font-semibold">Chat</span>
    </a>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  useReveal(pathname)
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
      {pathname !== '/meddesk' && <LaunchBanner />}
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

