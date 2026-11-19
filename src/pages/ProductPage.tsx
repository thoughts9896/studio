import type { ReactNode } from 'react'
import { FeatureList, FinalCta, Reveal, SectionHead, Todo, WhatsAppButton } from '../components/ui'
import { Stage, type Callout, type FloatCard } from '../components/visual'
import { Story, type StoryStep } from '../components/Story'
import { FeatureRail } from '../components/mobile'
import { TONE, type Tone } from '../tones'

export type ProductProps = {
  name: string
  badge: ReactNode
  tone: Tone
  title: string
  lede: string
  /** Phones: a shorter lede and a readable detail instead of the full screenshot. */
  shortLede: string
  heroDetail: ReactNode
  heroShot: string
  heroAlt: string
  heroWin?: string
  heroCallouts?: Callout[]
  heroFloat?: FloatCard
  heroNote?: ReactNode
  secondary?: ReactNode
  storyTitle: string
  steps: StoryStep[]
  featuresTitle: string
  features: { title: string; text: string }[]
  price: string | null
  priceLabel: string
  waMessage: string
  ctaTitle: string
  ctaText: string
}

export function ProductPage(p: ProductProps) {
  return (
    <>
      {/* Phones: one message, one button, then a zoomed-in detail on the product's colour */}
      <section className="overflow-hidden pt-7 md:hidden">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`text-[0.95rem] font-semibold ${TONE[p.tone].accent}`}>{p.name}</span>
            {p.badge}
          </div>
          <h1 className="m-display mt-3">{p.title}</h1>
          <p className="mt-4 text-[1.06rem] leading-snug text-ink-2">{p.shortLede}</p>
          <div className="mt-6"><WhatsAppButton label="Ask for a demo" message={p.waMessage} className="!h-[52px] w-full justify-center" /></div>
          <Reveal now delay={220} className={`tile mt-9 ${TONE[p.tone].soft} px-5 py-7`}>
            {p.heroDetail}
          </Reveal>
          {p.heroNote && <p className="mt-3 text-[0.8rem] text-ink-3">{p.heroNote}</p>}
        </div>
      </section>

      <section className="hidden overflow-hidden md:block md:pt-12 lg:pt-14">
        <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-12">
          <div>
            <Reveal now className="flex flex-wrap items-center gap-3">
              <span className="text-[0.95rem] font-semibold">{p.name}</span>
              {p.badge}
            </Reveal>
            <Reveal now delay={70}><h1 className="display mt-4 max-w-[14ch] !text-[clamp(2rem,2.6vw+1.35rem,4rem)]">{p.title}</h1></Reveal>
            <Reveal now delay={140}><p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-2 sm:mt-5 sm:text-[1.06rem] md:text-[1.18rem]">{p.lede}</p></Reveal>
            <Reveal now delay={210} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <WhatsAppButton label="Ask for a demo on WhatsApp" short="Ask for a demo" message={p.waMessage} />
              {p.secondary ?? <a href="#features" className="btn btn-ghost">See features</a>}
            </Reveal>
          </div>
          <Reveal now delay={160}>
            <Stage className="hero-stage" name={p.heroShot} alt={p.heroAlt} title={p.heroWin} tone={p.tone === 'sand' ? 'med' : p.tone} eager reveal={false} only="desktop" callouts={p.heroCallouts} float={p.heroFloat} sizes="(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 90vw" />
            {p.heroNote && <p className="mt-3 text-[0.8rem] text-ink-3">{p.heroNote}</p>}
          </Reveal>
        </div>
      </section>

      <section className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Inside" title={p.storyTitle} />
          <Story steps={p.steps} tone={p.tone} />
        </div>
      </section>

      <section id="features" className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Features" title={p.featuresTitle} />
          <div className="mt-7 md:hidden"><FeatureRail items={p.features} tone={p.tone} /></div>
          <div className="mt-12 hidden md:block"><FeatureList items={p.features} /></div>
        </div>
      </section>

      <section className="pt-16 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Pricing" title="Talk to us for a quote." />
          <Reveal className="mt-8 rounded-[22px] border border-line p-6 md:mt-10 md:p-10">
            {p.price ? <p className="h3">{p.price}</p> : <Todo>{p.priceLabel}</Todo>}
            <p className="mt-4 max-w-xl text-ink-2">Tell us about your setup and we’ll show you a demo first.</p>
            <div className="mt-7"><WhatsAppButton label="Ask on WhatsApp" message={p.waMessage} /></div>
          </Reveal>
        </div>
      </section>

      <FinalCta title={p.ctaTitle} text={p.ctaText} message={p.waMessage} />
    </>
  )
}
