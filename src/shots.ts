import type { ShotFile } from './shots.gen'

// Shot files are content-hashed by scripts/images.mjs: /shots/<name>-<width>.<hash>.<ext>
export const shotUrl = (base: string, w: number, v: string, ext: string) => `/shots/${base}-${w}.${v}.${ext}`
// Each file is resized to min(width, source width), so describe it by its real width.
export function shotSrcset(base: string, f: ShotFile, ext: string) {
  return f.ws.map((w) => `${shotUrl(base, w, f.v, ext)} ${Math.min(w, f.w)}w`).join(', ')
}
