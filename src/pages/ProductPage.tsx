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
      <section className="overflow-hidden pt-6 md:pt-12 lg:pt-14">
        <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="text-[0.95rem] font-semibold">{p.name}</span>
              {p.badge}
            </Reveal>
            <Reveal delay={70}><h1 className="display mt-4 max-w-[14ch] !text-[clamp(2rem,2.6vw+1.35rem,4rem)]">{p.title}</h1></Reveal>
            <Reveal delay={140}><p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-2 sm:mt-5 sm:text-[1.06rem] md:text-[1.18rem]">{p.lede}</p></Reveal>
            <Reveal delay={210} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <WhatsAppButton label="Ask for a demo on WhatsApp" short="Ask for a demo" message={p.waMessage} />
              {p.secondary ?? <a href="#features" className="btn btn-ghost">See features</a>}
            </Reveal>
          </div>
          <Reveal delay={160}>
            <Shot name={p.heroShot} alt={p.heroAlt} sizes="(min-width: 1024px) 680px, 100vw" eager />
            {p.heroNote && <p className="mt-3 text-[0.8rem] text-ink-3">{p.heroNote}</p>}
          </Reveal>
        </div>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Inside" title={p.storyTitle} />
          <Story steps={p.steps} />
        </div>
      </section>

      <section id="features" className="pt-20 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Features" title={p.featuresTitle} />
          <div className="mt-12"><FeatureList items={p.features} /></div>
        </div>
      </section>

      <section className="pt-20 md:pt-28">
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
