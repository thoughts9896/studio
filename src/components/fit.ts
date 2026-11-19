// Keeps every callout label whole: if a label would run past the backdrop or the screen edge,
// it moves to the other side of its dot, and if it still doesn't fit it slides inward.
const SIDES: Record<string, string[]> = { r: ['r', 'l', 'b', 't'], l: ['l', 'r', 'b', 't'], b: ['b', 't'], t: ['t', 'b'] }
export function fitCallouts(stage: HTMLElement) {
  const box = stage.getBoundingClientRect()
  if (!box.width) return
  const pad = 10
  const L = Math.max(box.left, 0) + pad, R = Math.min(box.right, document.documentElement.clientWidth) - pad
  const T = box.top + pad, B = box.bottom - pad
  stage.querySelectorAll<HTMLElement>('.co').forEach((co) => {
    const b = co.querySelector('b')
    if (!b) return
    const want = co.dataset.want ?? (co.dataset.want = co.dataset.side ?? 'r')
    b.style.marginLeft = '0px'; b.style.marginTop = '0px'
    let best = want, bestOver = Infinity
    for (const side of co.hasAttribute('data-span') ? [want] : SIDES[want] ?? [want]) {
      co.dataset.side = side
      const r = b.getBoundingClientRect()
      const over = Math.max(0, L - r.left) + Math.max(0, r.right - R) + Math.max(0, T - r.top) + Math.max(0, r.bottom - B)
      if (over < bestOver - 0.5) { best = side; bestOver = over }
      if (over === 0) break
    }
    co.dataset.side = best
    if (bestOver > 0) {
      const r = b.getBoundingClientRect()
      const dx = r.left < L ? L - r.left : r.right > R ? R - r.right : 0
      const dy = r.top < T ? T - r.top : r.bottom > B ? B - r.bottom : 0
      b.style.marginLeft = `${dx}px`; b.style.marginTop = `${dy}px`
    }
  })
}
