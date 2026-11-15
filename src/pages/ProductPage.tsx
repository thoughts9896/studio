import type { ReactNode } from 'react'
import { FeatureList, FinalCta, Reveal, SectionHead, Shot, Todo, WhatsAppButton } from '../components/ui'
import { Story, type StoryStep } from '../components/Story'

export type ProductProps = {
  name: string
  badge: ReactNode
  title: string
  lede: string
  heroShot: string
  heroAlt: string
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
      <section className="overflow-hidden pt-14 md:pt-24">
        <div className="wrap text-center">
          <Reveal className="flex items-center justify-center gap-3">
            <span className="text-[0.95rem] font-semibold">{p.name}</span>
            {p.badge}
          </Reveal>
          <Reveal delay={70}><h1 className="display mx-auto mt-5 max-w-[15ch]">{p.title}</h1></Reveal>
          <Reveal delay={140}><p className="lede mx-auto mt-7 max-w-2xl">{p.lede}</p></Reveal>
          <Reveal delay={210} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton label="Ask for a demo" message={p.waMessage} />
            {p.secondary}
          </Reveal>
        </div>
        <div className="wrap mt-16 md:mt-24">
          <Shot name={p.heroShot} alt={p.heroAlt} zoom eager />
          {p.heroNote && <p className="mt-4 text-center text-[0.8rem] text-ink-3">{p.heroNote}</p>}
        </div>
      </section>

      <section className="pt-28 md:pt-40">
        <div className="wrap">
          <SectionHead eyebrow="Inside" title={p.storyTitle} />
          <Story steps={p.steps} />
        </div>
      </section>

      <section id="features" className="pt-28 md:pt-40">
        <div className="wrap">
          <SectionHead eyebrow="Features" title={p.featuresTitle} />
          <div className="mt-16"><FeatureList items={p.features} /></div>
        </div>
      </section>

      <section className="pt-28 md:pt-40">
        <div className="wrap">
          <SectionHead eyebrow="Pricing" title="Talk to us for a quote." />
          <Reveal className="mt-10 rounded-[22px] border border-line p-8 md:p-10">
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
