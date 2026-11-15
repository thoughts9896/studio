import { useEffect, useRef, useState } from 'react'

/**
 * Adds `.in` to every [data-reveal] / [data-zoom] element as it enters the viewport.
 * Nothing is hidden until this runs (html.anim): whatever is already on screen at that moment
 * is marked shown without a transition, so above-the-fold content never fades or waits for JS.
 */
export function useReveal(key: string) {
  useEffect(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in), [data-zoom]:not(.in)'))
    const els = all.filter((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < innerHeight && r.bottom > 0) { el.classList.add('in', 'now'); return false }
      return true
    })
    document.documentElement.classList.add('anim')
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}

/** Index of the step currently crossing the middle of the viewport. */
export function useActiveStep(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.slice(0, count).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [count])
  return { refs, active }
}
