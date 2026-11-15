import { Shot } from './ui'
import { useActiveStep } from '../hooks'

export type StoryStep = { kicker: string; title: string; text: string; shot: string; alt: string }

/**
 * Apple-style sticky product story: text steps scroll on the left while the
 * product window stays pinned on the right and crossfades to the active screen.
 * On small screens each step simply shows its own screenshot.
 */
export function Story({ steps }: { steps: StoryStep[] }) {
  const { refs, active } = useActiveStep(steps.length)
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
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
              <Shot name={s.shot} alt={s.alt} sizes="100vw" zoom />
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-17rem)]">
          <div className="grid items-center">
            {steps.map((s, i) => (
              <div key={s.shot} className="story-shot [grid-area:1/1]" data-active={active === i ? 'true' : 'false'} aria-hidden={active !== i}>
                <Shot name={s.shot} alt={s.alt} sizes="(min-width: 1200px) 680px, 58vw" phoneCrop={false} />
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
  )
}
