import type { CSSProperties, ReactNode, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { waLink } from '../site'
import { SHOTS, type ShotFile } from '../shots.gen'
import { shotSrcset, shotUrl } from '../shots'

/** The STDN mark: a balanced taijitu (yin-yang). */
export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48.5" fill="#fbfaf7" stroke="#0f0f0d" strokeWidth="3" />
      <path d="M50 1.5a48.5 48.5 0 0 1 0 97a24.25 24.25 0 0 1 0-48.5a24.25 24.25 0 0 0 0-48.5z" fill="#0f0f0d" />
      <circle cx="50" cy="25.75" r="7" fill="#0f0f0d" />
      <circle cx="50" cy="74.25" r="7" fill="#fbfaf7" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <Mark size={26} />
      <span className="text-[1.15rem] font-[700] tracking-[-0.03em]">STDN</span>
    </span>
  )
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  )
}

export function WhatsAppButton({ label = 'Talk to STDN on WhatsApp', short, message, className = '' }: { label?: string; short?: string; message?: string; className?: string }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener" data-cta="" className={`btn btn-ink ${className}`}>
      <WhatsAppIcon />
      {short ? <><span className="sm:hidden">{short}</span><span className="hidden sm:inline">{label}</span></> : label}
    </a>
  )
}

export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const external = /^https?:/.test(to)
  const inner = (
    <>
      {children} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
    </>
  )
  return external ? (
    <a href={to} className={`link-arrow ${className}`} target="_blank" rel="noopener">{inner}</a>
  ) : (
    <Link to={to} className={`link-arrow ${className}`}>{inner}</Link>
  )
}

/** Fades/slides in when scrolled into view (see useReveal). */
// `now`: above the fold (page heroes). Rendered visible from the first paint, never faded in.
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', now = false }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'section' | 'p' | 'h2'; now?: boolean }) {
  if (now) return <Tag className={className}>{children}</Tag>
  return (
    <Tag data-reveal="" className={className} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}

// Fade-in marker. index.html catches images that load before React hydrates; these two catch
// the rest (an image React creates can finish loading before it is attached to the page).
const markLoaded = (e: SyntheticEvent<HTMLImageElement>) => e.currentTarget.classList.add('ok')
const markIfLoaded = (img: HTMLImageElement | null) => { if (img?.complete) img.classList.add('ok') }
const MISSING: ShotFile = { w: 1600, h: 1000, v: '', ws: [1600], ph: '' }
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
// Below / above the md breakpoint (768px). A hidden copy of an image gets a 1px blank source,
// so phones never download desktop-only images and the reverse.
const ONLY = { mobile: '(min-width: 768px)', desktop: '(max-width: 767px)' }

/**
 * A responsive picture: AVIF + WebP at every built width, a tiny blurred placeholder underneath
 * (never a white box while loading) and fixed width/height (no layout shift). The image fades in
 * once loaded (see the load listener in index.html).
 */
export function Pic({ name, alt, sizes, eager = false, only, phoneCrop = false, className = '' }: {
  name: string; alt: string; sizes: string; eager?: boolean; only?: 'mobile' | 'desktop'; phoneCrop?: boolean; className?: string
}) {
  const f = SHOTS[name] ?? MISSING
  const m = phoneCrop ? f.m : undefined
  const style = { '--ph': f.ph ? `url(${f.ph})` : 'none', ...(m ? { '--mph': `url(${m.ph})` } : {}) } as CSSProperties
  return (
    <span className={`pic ${m ? 'pic-m' : ''} ${className}`} style={style}>
      <picture>
        {only && <source media={ONLY[only]} srcSet={BLANK} />}
        {m && <source media="(max-width: 640px)" type="image/avif" srcSet={shotSrcset(`${name}-m`, m, 'avif')} sizes="100vw" width={m.w} height={m.h} />}
        {m && <source media="(max-width: 640px)" type="image/webp" srcSet={shotSrcset(`${name}-m`, m, 'webp')} sizes="100vw" width={m.w} height={m.h} />}
        <source type="image/avif" srcSet={shotSrcset(name, f, 'avif')} sizes={sizes} />
        <source type="image/webp" srcSet={shotSrcset(name, f, 'webp')} sizes={sizes} />
        <img
          src={shotUrl(name, f.ws[Math.min(1, f.ws.length - 1)], f.v, 'webp')}
          alt={alt}
          width={f.w}
          height={f.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          {...(eager ? { fetchPriority: 'high' as const, className: 'now' } : {})}
          ref={markIfLoaded}
          onLoad={markLoaded}
          onError={markLoaded}
        />
      </picture>
    </span>
  )
}

export function Shot({ name, alt, sizes = '(min-width: 1200px) 1100px, 100vw', zoom = false, eager = false, frame = true, phoneCrop = true, only, className = '' }: {
  name: string; alt: string; sizes?: string; zoom?: boolean; eager?: boolean; frame?: boolean; phoneCrop?: boolean; only?: 'mobile' | 'desktop'; className?: string
}) {
  const pic = <Pic name={name} alt={alt} sizes={sizes} eager={eager} only={only} phoneCrop={phoneCrop} />
  return (
    <div {...(zoom ? { 'data-zoom': '' } : {})} className={className}>
      {frame ? (
        <div className="window">
          <div className="window-bar" aria-hidden="true"><i /><i /><i /></div>
          {pic}
        </div>
      ) : pic}
    </div>
  )
}

export function Todo({ children }: { children: ReactNode }) {
  return <span className="todo">TODO · {children}</span>
}

export function Badge({ children, tone = 'live' }: { children: ReactNode; tone?: 'live' | 'new' | 'soon' }) {
  const tones = {
    live: 'bg-[#e7f5ec] text-[#14713a]',
    new: 'bg-[#fdeee6] text-[#9a3412]',
    soon: 'bg-sand text-ink-2',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${tones[tone]}`}>
      {tone === 'live' && <span className="h-1.5 w-1.5 rounded-full bg-[#1fa855]" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function SectionHead({ eyebrow, title, lede, center = false }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <Reveal><p className="eyebrow mb-4">{eyebrow}</p></Reveal>}
      <Reveal delay={60}><h2 className="h2">{title}</h2></Reveal>
      {lede && <Reveal delay={120}><p className="lede mt-5">{lede}</p></Reveal>}
    </div>
  )
}

export function FeatureList({ items, cols = 3 }: { items: { title: string; text: string }[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-10 sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''}`}>
      {items.map((f, i) => (
        <Reveal as="li" key={f.title} delay={(i % 3) * 70} className="border-t border-line pt-5">
          <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em]">{f.title}</h3>
          <p className="mt-2 text-ink-2 leading-relaxed">{f.text}</p>
        </Reveal>
      ))}
    </ul>
  )
}

export function FinalCta({ title = 'Have something to build?', text = 'Tell us on WhatsApp. The STDN team will get back to you.', message }: { title?: string; text?: string; message?: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap text-center">
        <Reveal><Mark size={44} className="mx-auto mb-8" /></Reveal>
        <Reveal delay={60}><h2 className="h2 mx-auto max-w-3xl">{title}</h2></Reveal>
        <Reveal delay={120}><p className="lede mx-auto mt-5 max-w-xl">{text}</p></Reveal>
        <Reveal delay={180} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton message={message} />
          <Link to="/contact" className="btn btn-ghost">Other ways to reach us</Link>
        </Reveal>
      </div>
    </section>
  )
}
