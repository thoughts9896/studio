// Product visuals: one consistent way to show an app on the site.
//  - Stage: a focused crop of a real screen (demo data) in an app window, floating on a soft
//    product-colour backdrop with depth and a slight tilt, plus small callout labels.
//  - ScanDemo: the AI bill scan, played once when it comes into view (bill photo, then the rows
//    fill in one by one, then the one value the bill doesn't print turns yellow and asks you).
//  - OwnerPhones: the Owner View phone screens (coming soon) for wider screens.
// Motion is CSS only, starts when visible and is switched off by prefers-reduced-motion.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Check, RotateCcw, ScanLine } from 'lucide-react'
import { Pic } from './ui'

export type StageTone = 'med' | 'sch' | 'htl' | 'sand'
/** A dot on the feature (x/y in % of the screen) and a label on one side of it. `len` moves the
 *  label further out (px) with a thin leader line, so it can sit over empty space. */
export type Callout = { x: number; y: number; label: string; side?: 'l' | 'r' | 't' | 'b'; len?: number; /** For side t/b: the label's own y in %, joined to the dot by a line (scales with the screen). */ ly?: number }
export type FloatCard = { name: string; alt: string; width: string; at?: 'br' | 'bl' | 'tr' | 'tl'; callout?: Callout; /** room kept below/above the window for the card, e.g. '14%' */ room?: string }

export type StageProps = {
  name: string
  alt: string
  /** Shown in the window's title bar, e.g. "MedDesk · Sale". */
  title?: string
  tone?: StageTone
  tilt?: 'l' | 'r' | 'none'
  callouts?: Callout[]
  float?: FloatCard
  sizes?: string
  eager?: boolean
  only?: 'mobile' | 'desktop'
  /** Animate in on scroll (off for above-the-fold heroes). */
  reveal?: boolean
  className?: string
}

function Callouts({ items }: { items?: Callout[] }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((c, i) => (
        <span key={c.label} className="co" data-side={c.side ?? 'r'} {...(c.ly !== undefined ? { 'data-span': '' } : {})}
          style={{ '--x': `${c.x}%`, '--y': `${c.ly !== undefined ? Math.min(c.y, c.ly) : c.y}%`, '--i': i, ...(c.len ? { '--len': `${c.len}px` } : {}), ...(c.ly !== undefined ? { '--h': `${Math.abs(c.y - c.ly)}%` } : {}) } as CSSProperties}>
          {c.len || c.ly !== undefined ? <s aria-hidden="true" /> : null}
          <i aria-hidden="true" />
          <b>{c.label}</b>
        </span>
      ))}
    </>
  )
}

export function Stage({ name, alt, title, tone = 'med', tilt = 'l', callouts, float, sizes = '(min-width: 1200px) 640px, (min-width: 768px) 80vw, 92vw', eager = false, only, reveal = true, className = '' }: StageProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !(callouts?.length || float?.callout)) return
    // The fitting code loads on its own, only once a stage with callouts is actually on screen
    let raf = 0, fit: ((s: HTMLElement) => void) | null = null
    const run = () => {
      cancelAnimationFrame(raf)
      if (!el.offsetWidth) return
      if (fit) { const f = fit; raf = requestAnimationFrame(() => f(el)); return }
      void import('./fit').then((m) => { fit = m.fitCallouts; run() })
    }
    const ro = new ResizeObserver(run)
    ro.observe(el)
    window.addEventListener('resize', run)
    return () => { ro.disconnect(); window.removeEventListener('resize', run); cancelAnimationFrame(raf) }
  }, [callouts, float])
  // Room under the window for labels that hang below its bottom edge
  const hang = Math.max(0, ...(callouts ?? []).filter((c) => c.side === 'b' && (c.ly ?? c.y) > 85).map((c) => (c.len ?? 16) + 30))
  return (
    <div ref={ref} className={`stage ${className}`} style={hang ? ({ '--hang': `${hang}px` } as CSSProperties) : undefined} data-tone={tone} data-tilt={tilt} {...(reveal ? { 'data-reveal': '' } : { 'data-shown': '' })}>
      <div className={`stage-body ${float ? 'has-float' : ''}`} data-at={float?.at ?? 'br'} style={float?.room ? ({ '--room': float.room } as CSSProperties) : undefined}>
        <div className="stage-win">
          <div className="stage-bar" aria-hidden="true"><i /><i /><i />{title && <span>{title}</span>}</div>
          <div className="stage-shot">
            <Pic name={name} alt={alt} sizes={sizes} eager={eager} only={only} />
            <Callouts items={callouts} />
          </div>
        </div>
        {float && (
          <div className="stage-float" data-at={float.at ?? 'br'} style={{ '--fw': float.width } as CSSProperties}>
            <div className="stage-shot">
              <Pic name={float.name} alt={float.alt} sizes={`(min-width: 1200px) ${Math.round(parseFloat(float.width) * 6.4)}px, ${float.width}`} only={only} />
              <Callouts items={float.callout ? [float.callout] : undefined} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── AI bill scan ─────────────────────────────────────────────────────────── */

// What MedDesk reads from the synthetic test bill (made-up supplier "Novamed Distributors").
// On the demo bill photo the cream's expiry is not printed (scripts/images.mjs blanks it), so
// that one cell comes back as "Check" for the shop to fill in.
const ROWS: { n: string; b: string; e: string; q: number; m: string; r: string; ask?: boolean }[] = [
  { n: 'ZOLVITA-D3 60K CAP 4S', b: 'ZV24K118', e: '08/28', q: 10, m: '142.00', r: '98.20' },
  { n: 'KORIMEX 650 TAB 15S', b: 'KM5A2207', e: '11/27', q: 30, m: '36.50', r: '24.10' },
  { n: 'DERMALIN AQ CREAM 30GM', b: 'DQ3110C', e: '', q: 4, m: '189.00', r: '131.50', ask: true },
  { n: 'PLUMAC DX SYRUP 100ML', b: 'PX08812', e: '06/27', q: 6, m: '118.00', r: '82.00' },
  { n: 'CALMIRA BODY LOTION 200ML', b: 'CB1102', e: '05/29', q: 2, m: '249.00', r: '170.00' },
]

export function ScanDemo({ eager = false }: { eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add('armed')
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('play'); io.disconnect() }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const replay = () => {
    const el = ref.current
    if (!el) return
    el.classList.remove('play')
    void el.offsetWidth
    el.classList.add('play')
    setRun((r) => r + 1)
  }
  return (
    <div className="scan2-box">
    <div ref={ref} className="scan2" data-run={run}>
      <figure className="scan2-bill">
        <div className="scan2-paper">
          <Pic name="bill" alt="A printed supplier tax invoice with five medicine lines (demo bill)" sizes="(min-width: 1024px) 460px, 90vw" eager={eager} />
          <span className="scan2-line" aria-hidden="true" />
        </div>
        <figcaption>Demo bill, photographed</figcaption>
      </figure>
      <div className="scan2-win" role="img" aria-label="MedDesk reads five lines from the bill photo, with batch, expiry, quantity, MRP and rate. The bill doesn't print the cream's expiry, so that cell is marked yellow for you to check. The lines add up to the printed total of 3,291 rupees.">
        <div className="scan2-head">
          <span className="scan2-ico"><ScanLine size={16} strokeWidth={2.2} /></span>
          <div className="min-w-0">
            <p className="scan2-title">Import bill</p>
            <p className="scan2-sub">Novamed Distributors · NMD/26-27/0412</p>
          </div>
          <span className="scan2-chip">
            <span className="s-read">Reading bill<i /><i /><i /></span>
            <span className="s-done">5 items found</span>
          </span>
        </div>
        <div className="scan2-table">
          <div className="scan2-tr scan2-th" aria-hidden="true">
            <span>Medicine</span><span className="c-b">Batch</span><span className="c-e">Expiry</span><span className="num">Qty</span><span className="num c-m">MRP</span><span className="num">Rate</span>
          </div>
          {ROWS.map((r, i) => (
            <div key={r.b} aria-hidden="true">
              <div className={`scan2-tr scan2-row ${r.ask ? 'has-ask' : ''}`} style={{ '--i': i } as CSSProperties}>
                <span className="c-n"><b>{r.n}</b><small>{r.b}</small></span>
                <span className="c-b">{r.b}</span>
                <span className={`c-e ${r.ask ? 'ask' : ''}`}>{r.ask ? <em>Check</em> : r.e}</span>
                <span className="num">{r.q}</span>
                <span className="num c-m">{r.m}</span>
                <span className="num">{r.r}</span>
              </div>
              {/* Room is kept under the asked row so the note never sits on top of other values */}
              {r.ask && <div className="scan2-tr scan2-note"><span className="ask-pill">Not on the bill. Asks you.</span></div>}
            </div>
          ))}
        </div>
        <div className="scan2-total" aria-hidden="true">
          <Check size={16} strokeWidth={2.75} /> Lines add up to the printed total, ₹3,291.00
        </div>
      </div>
      <button type="button" className="scan2-replay" onClick={replay} aria-label="Play the bill scan again"><RotateCcw size={14} strokeWidth={2.4} /> Replay</button>
    </div>
    </div>
  )
}

/* ── Owner View phones (wider screens) ───────────────────────────────────── */

const OV = [
  ['ov-stock', 'Owner View, Stock: medicines that need ordering (demo shop)'],
  ['ov-today', 'Owner View, Today: net sales, bills and how customers paid (demo shop)'],
  ['ov-dues', 'Owner View, Dues: what the shop owes suppliers and is owed (demo shop)'],
] as const

export function OwnerPhones({ only = 'desktop' }: { only?: 'mobile' | 'desktop' }) {
  return (
    <div className="ov-fan" aria-label="MedDesk Owner View on a phone (coming soon)">
      {OV.map(([n, a], i) => (
        <div key={n} className="ov-phone" data-i={i}>
          <div className="phone">
            <div className="phone-screen">
              <Pic name={n} alt={a} sizes="(min-width: 1024px) 240px, 30vw" only={only} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function StageNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[0.8rem] text-ink-3">{children}</p>
}
