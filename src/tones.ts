export type Tone = 'med' | 'sch' | 'htl' | 'sand'
export const TONE: Record<Tone, { soft: string; accent: string }> = {
  med: { soft: 'bg-med-soft', accent: 'text-med' },
  sch: { soft: 'bg-sch-soft', accent: 'text-sch' },
  htl: { soft: 'bg-htl-soft', accent: 'text-htl' },
  sand: { soft: 'bg-sand', accent: 'text-ember' },
}
