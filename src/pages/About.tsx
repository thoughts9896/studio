import { FinalCta, Mark, Reveal, WhatsAppButton } from '../components/ui'
import { SITE } from '../site'

export default function About() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <Reveal><p className="eyebrow">About</p></Reveal>
          <Reveal delay={70}><h1 className="display mt-5 max-w-[15ch]">Serious software for everyday business.</h1></Reveal>
          <Reveal delay={140}>
            <p className="lede mt-7 max-w-2xl">
              STDN Technologies builds intelligent products and AI systems for Indian businesses. We start from the counter, the classroom and the front desk, and build software that works there every day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pt-24 md:pt-36">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal><h2 className="h2">Products and people, together.</h2></Reveal>
          <Reveal delay={80}>
            <div className="max-w-2xl space-y-5 text-[1.08rem] leading-relaxed text-ink-2">
              <p>STDN started with the businesses most software forgets: the medical store, the school office, the hotel front desk. Every product is designed around how that business actually runs.</p>
              <p>The same team that builds MedDesk, School ERP and Hotel ERP builds custom websites, apps and AI systems. When you talk to STDN, an STDN expert learns your setup, shows you a demo, and stays with you after go-live.</p>
            </div>
            <div className="mt-10"><WhatsAppButton label="Talk to STDN" message="Hi STDN," /></div>
          </Reveal>
        </div>
      </section>

      <section className="pt-24 md:pt-36">
        <div className="wrap">
          <div className="grid gap-px overflow-hidden rounded-[22px] bg-line md:grid-cols-3">
            {[
              ['Company', SITE.name],
              ['Registration', `Udyam-registered MSME · ${SITE.udyam}`],
              ['Based in', `${SITE.place}, India`],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 60} className="bg-paper p-7">
                <p className="text-[0.85rem] text-ink-3">{k}</p>
                <p className="mt-2 text-[1.1rem] font-semibold">{v}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-[0.85rem] text-ink-3">Founded by {SITE.founder}.</p>
          <Reveal className="mt-20 flex items-start gap-5">
            <Mark size={40} className="mt-1 shrink-0" />
            <p className="max-w-2xl text-[1.08rem] leading-relaxed text-ink-2">
              Our mark is the taijitu: two halves that make one whole. For us that is product and service, the software we ship and the software we build for you.
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
