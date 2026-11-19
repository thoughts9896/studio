import type { ReactNode } from 'react'
import { Stage, type Callout, type FloatCard, type StageTone } from './visual'
import { Rail, Tile } from './mobile'
import type { Tone } from '../tones'
import { useActiveStep } from '../hooks'

export type StoryStep = {
  kicker: string; title: string; text: string; shot: string; alt: string
  /** The app window: its title bar, callouts on the screen and an optional zoomed-in card. */
  win?: string; callouts?: Callout[]; float?: FloatCard
  /** Phones: a readable detail (crop or card) and a shorter line. Steps without one are skipped there. */
  detail?: ReactNode; short?: string
}

/**
 * Apple-style sticky product story: text steps scroll on the left while the
 * product window stays pinned on the right and crossfades to the active screen.
 * Tablets show each step with its own screenshot; phones get a swipe rail of detail tiles.
 */
const stageTone = (t: Tone): StageTone => (t === 'sand' ? 'med' : t)

export function Story({ steps, tone = 'sand' }: { steps: StoryStep[]; tone?: Tone }) {
  const { refs, active } = useActiveStep(steps.length)
  const mobile = steps.filter((s) => s.detail)
  return (
    <>
      {mobile.length > 0 && (
        <div className="mt-7 md:hidden">
          <Rail label="Inside the product">
            {mobile.map((s) => (
              <Tile key={s.title} tone={tone} kicker={s.kicker} title={s.title} text={s.short ?? s.text}>{s.detail}</Tile>
            ))}
          </Rail>
        </div>
      )}
      <div className="hidden md:block lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
        <ol>
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              ref={(el) => { refs.current[i] = el }}
              className="flex flex-col justify-center py-10 lg:min-h-[62vh] lg:py-0"
            >
              <p className="eyebrow mb-3">{s.kicker}</p>
              <h3 className={`h3 transition-colors duration-500 ${active === i ? 'text-ink' : 'lg:text-ink-3'}`}>{s.title}</h3>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-2">{s.text}</p>
              <div className="mt-8 lg:hidden">
                <Stage name={s.shot} alt={s.alt} title={s.win} tone={stageTone(tone)} tilt={i % 2 ? 'r' : 'l'} callouts={s.callouts} float={s.float} sizes="90vw" />
              </div>
            </li>
          ))}
        </ol>
        <div className="hidden lg:block">
          <div className="sticky top-[max(84px,calc(50vh-19rem))]">
            <div className="grid items-center">
              {steps.map((s, i) => (
                <div key={s.shot} className="story-shot [grid-area:1/1]" data-active={active === i ? 'true' : 'false'} aria-hidden={active !== i}>
                  <Stage name={s.shot} alt={s.alt} title={s.win} tone={stageTone(tone)} tilt={i % 2 ? 'r' : 'l'} callouts={s.callouts} float={s.float} reveal={false} className="story-stage" sizes="(min-width: 1440px) 900px, 66vw" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span key={s.shot} className={`h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-6 bg-ink' : 'w-1.5 bg-sand-2'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
