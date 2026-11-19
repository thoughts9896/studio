// Phone-first building blocks (used below the md breakpoint, 768px).
// Kept small on purpose: native scroll-snap for carousels, one passive scroll listener for the
// bill-scan story, and nothing that runs while it is off screen.
import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Check, ScanLine } from 'lucide-react'
import { Pic, WhatsAppIcon } from './ui'
import { waLink } from '../site'
import { TONE, type Tone } from '../tones'

/** Horizontal swipe carousel: scroll-snap, the next card peeks in, dots follow the scroll. */
export function Rail({ children, label, width = 'w-[84%]' }: { children: ReactNode; label: string; width?: string }) {
  const items = Children.toArray(children)
  const ref = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const first = el.children[0] as HTMLElement | undefined
        if (!first) return
        const step = first.offsetWidth + 12
        const max = el.scrollWidth - el.clientWidth
        setActive(el.scrollLeft >= max - 4 ? items.length - 1 : Math.round(el.scrollLeft / step))
      })
    }
    el.addEventListener('scroll', on, { passive: true })
    return () => { el.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [items.length])
  return (
    <div>
      <ul ref={ref} className="rail" aria-label={label}>
        {items.map((c, i) => (
          <li key={i} className={`${width} max-w-[340px]`}>{c}</li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="rail-dots" aria-hidden="true">
          {items.map((_, i) => <i key={i} data-on={active === i ? 'true' : 'false'} />)}
        </div>
      )}
    </div>
  )
}

/** Apple-style feature tile: short title and line on a soft product tint, then the detail. */
export function Tile({ tone = 'sand', kicker, title, text, children, className = '' }: {
  tone?: Tone; kicker?: string; title: ReactNode; text?: ReactNode; children?: ReactNode; className?: string
}) {
  return (
    <div className={`tile flex h-full flex-col ${TONE[tone].soft} p-5 pb-6 ${className}`}>
      {kicker && <p className={`text-[0.8rem] font-semibold ${TONE[tone].accent}`}>{kicker}</p>}
      <h3 className="mt-1.5 text-[1.3rem] font-semibold leading-[1.15] tracking-[-0.025em]">{title}</h3>
      {text && <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">{text}</p>}
      {children && <div className="mt-5 flex flex-1 flex-col">{children}</div>}
    </div>
  )
}

/** A zoomed-in crop of a real screen (demo data), framed like a floating card. */
export function Detail({ name, alt, eager = false }: { name: string; alt: string; eager?: boolean }) {
  return (
    <div className="tile-img">
      <Pic name={name} alt={alt} sizes="(max-width: 767px) 80vw, 340px" only="mobile" eager={eager} />
    </div>
  )
}

/** The real Owner View phone page (made-up demo shop) in a phone frame. */
export function Phone({ name, alt, eager = false, className = '' }: { name: string; alt: string; eager?: boolean; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <Pic name={name} alt={alt} sizes="(max-width: 767px) 270px, 300px" eager={eager} only="mobile" />
      </div>
    </div>
  )
}

/** Long feature lists become a swipe rail of cards, three features per card. */
export function FeatureRail({ items, tone = 'sand' }: { items: { title: string; text: string }[]; tone?: Tone }) {
  const groups: { title: string; text: string }[][] = []
  for (let i = 0; i < items.length; i += 3) groups.push(items.slice(i, i + 3))
  return (
    <Rail label="Features">
      {groups.map((g, i) => (
        <ul key={i} className={`tile h-full space-y-5 ${TONE[tone].soft} p-5`}>
          {g.map((f) => (
            <li key={f.title}>
              <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em]">{f.title}</h3>
              <p className="mt-1 text-[0.93rem] leading-snug text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>
      ))}
    </Rail>
  )
}

/* ── HTML cards for screens too dense to crop readably (same demo rows as the app) ── */

function CardHead({ icon, title, right }: { icon: ReactNode; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#eef0ee] px-4 py-3">
      <p className="flex items-center gap-2 text-[0.92rem] font-semibold">{icon}{title}</p>
      {right}
    </div>
  )
}
const chip = 'rounded-full px-2 py-0.5 text-[0.75rem] font-semibold tracking-wide'

/** MedDesk dashboard, "Expiring soon" (demo shop). */
export function ExpiryCard() {
  const rows: [string, string, number][] = [
    ['COUGH RELIEF SYRUP 100ML', 'COU2405', 15],
    ['DICLOFENAC GEL 30G', 'DIC2407', 15],
    ['ORS ORANGE SACHET', 'ORS2404', 46],
    ['MULTIVITAMIN SYRUP 200ML', 'MUL2414', 77],
  ]
  // Same thresholds and colours as MedDesk's Expiring Soon list.
  const tone = (d: number) => d <= 30 ? ['text-[#b42318]', 'bg-[#fdecec] text-[#b42318]', 'CRITICAL']
    : d < 60 ? ['text-[#c2410c]', 'bg-[#fdf1d8] text-[#854d0e]', 'SOON'] : ['text-[#9a5b0a]', 'bg-[#dff3f1] text-med', 'WATCH']
  return (
    <div className="tile-img" role="img" aria-label="MedDesk Expiring Soon list: four batches with days left (demo shop)">
      <CardHead icon={<span className="grid h-6 w-6 place-items-center rounded-md bg-[#fdecec] text-[0.8rem] text-[#c0392b]">!</span>} title="Expiring soon" right={<span className="text-[0.8rem] font-medium text-med">View all</span>} />
      <ul className="divide-y divide-[#f1f2f0]">
        {rows.map(([n, b, d]) => (
          <li key={b} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[0.86rem] font-semibold">{n}</p>
              <p className="text-[0.75rem] text-ink-3">Batch {b}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className={`text-[0.86rem] font-semibold ${tone(d)[0]}`}>{d}d</span>
              <span className={`${chip} ${tone(d)[1]}`}>{tone(d)[2]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** MedDesk billing, current bill (demo shop). */
export function BillingCard() {
  const rows: [string, string, string][] = [
    ['PARACETAMOL 650 TAB', '1 strip', '₹32.00'],
    ['AMOXICILLIN 500 CAP', '1 strip', '₹118.00'],
    ['VITAMIN D3 60K CAP', '1 strip', '₹128.00'],
  ]
  return (
    <div className="tile-img" role="img" aria-label="MedDesk billing: three medicines in the current bill, total 278 rupees (demo shop)">
      <div className="px-4 pt-3.5">
        <div className="flex h-10 items-center gap-2 rounded-xl border-2 border-med/70 px-3 text-[0.82rem] text-ink-3">
          <span aria-hidden="true">⌕</span> Search medicine…
        </div>
      </div>
      <ul className="mt-2 divide-y divide-[#f1f2f0]">
        {rows.map(([n, q, a]) => (
          <li key={n} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[0.86rem] font-semibold">{n}</p>
              <p className="text-[0.75rem] text-ink-3">{q}</p>
            </div>
            <p className="text-[0.88rem] font-semibold tabular-nums">{a}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between bg-med px-4 py-3 text-white">
        <span className="text-[0.85rem] font-medium">Total · incl. GST</span>
        <span className="text-[1.05rem] font-semibold tabular-nums">₹278.00</span>
      </div>
    </div>
  )
}

const SCAN_ROWS: [string, string, string, number, string][] = [
  ['ZOLVITA-D3 60K CAP 4S', 'ZV24K118', 'Aug 2028', 10, '98.20'],
  ['KORIMEX 650 TAB 15S', 'KM5A2207', 'Nov 2027', 30, '24.10'],
  ['DERMALIN AQ CREAM 30GM', 'DQ3110C', 'Mar 2028', 4, '131.50'],
  ['PLUMAC DX SYRUP 100ML', 'PX08812', 'Jun 2027', 6, '82.00'],
  ['CALMIRA BODY LOTION 200ML', 'CB1102', 'May 2029', 2, '170.00'],
]

/** What MedDesk read from the synthetic test bill, simplified for a phone. */
export function ScanResult({ className = '' }: { className?: string }) {
  return (
    <div className={`tile-img ${className}`} role="img" aria-label="MedDesk read 5 lines from the bill photo, with batch, expiry, quantity and rate, and they add up to the printed total of 3,291 rupees">
      <CardHead
        icon={<span className="grid h-6 w-6 place-items-center rounded-md bg-med-soft text-med"><ScanLine size={14} /></span>}
        title="Import bill"
        right={<span className={`${chip} bg-med-soft text-med`}>5 items found</span>}
      />
      <ul className="divide-y divide-[#f1f2f0]">
        {SCAN_ROWS.map(([n, b, e, q, r], i) => (
          <li key={b} className="scan-row flex items-center gap-3 px-4 py-2.5" style={{ '--st': 0.42 + i * 0.05 } as CSSProperties}>
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-med text-white"><Check size={12} strokeWidth={3} /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.84rem] font-semibold">{n}</p>
              <p className="text-[0.75rem] text-ink-3">{b} · Exp {e}</p>
            </div>
            <p className="shrink-0 text-right text-[0.78rem] leading-tight text-ink-2 tabular-nums"><span className="font-semibold text-ink">×{q}</span><br />₹{r}</p>
          </li>
        ))}
      </ul>
      <div className="scan-total m-3 mt-1 flex items-center gap-2 rounded-xl bg-[#e7f5ec] px-3 py-2.5 text-[0.82rem] font-medium text-[#14713a]">
        <Check size={16} strokeWidth={2.75} /> Adds up to the printed total, ₹3,291.00
      </div>
    </div>
  )
}

/* ── Sticky WhatsApp bar ──────────────────────────────────────────────────── */

const BAR: Record<string, [string, string]> = {
  '/meddesk': ['Book a MedDesk demo', 'Namaste STDN, mujhe MedDesk ka demo chahiye. Shop name:'],
  '/school-erp': ['Ask for a School ERP demo', 'Hi STDN, I want to know more about the School ERP for our school.'],
  '/hotel-erp': ['Ask for a Hotel ERP demo', 'Hi STDN, I want to know more about the Hotel ERP for our hotel.'],
  '/services': ['Tell us what you need', 'Hi STDN, I want to build'],
}

/** One thumb-friendly WhatsApp bar on phones. It hides whenever another WhatsApp button
 *  (the hero's, a section's, the final call to action) is on screen, so there is never two. */
export function MobileCtaBar() {
  const { pathname } = useLocation()
  const [label, message] = BAR[pathname] ?? ['Talk to STDN on WhatsApp', 'Hi STDN, I would like to talk about']
  const [show, setShow] = useState(false)
  useEffect(() => {
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target)
        else seen.delete(e.target)
      }
      setShow(seen.size === 0)
    })
    const els = document.querySelectorAll('main [data-cta]')
    if (!els.length) { const raf = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(raf) }
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return (
    <div className="cta-bar" data-show={show ? 'true' : 'false'} aria-hidden={!show}>
      <a href={waLink(message)} target="_blank" rel="noopener" tabIndex={show ? 0 : -1} className="btn btn-ink !h-[52px] w-full justify-center !text-[1.02rem]">
        <WhatsAppIcon size={20} /> {label}
      </a>
    </div>
  )
}
