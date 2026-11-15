import { FinalCta, Mark, Reveal, WhatsAppButton } from '../components/ui'
import { SITE } from '../site'

export default function About() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <Reveal><p className="eyebrow">About</p></Reveal>
          <Reveal delay={70}><h1 className="display mt-5 max-w-[15ch]">Small team. Serious software.</h1></Reveal>
          <Reveal delay={140}>
            <p className="lede mt-7 max-w-2xl">
              STDN Technologies builds intelligent products and AI systems for Indian businesses. We start from the counter, the classroom and the front desk, and build software that works there every day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pt-24 md:pt-36">
        <div className="wrap grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
          <Reveal>
            <div className="grid h-48 w-48 place-items-center rounded-full bg-ink text-[3.2rem] font-semibold tracking-[-0.04em] text-paper md:h-60 md:w-60" role="img" aria-label="Nitesh Narwal">NN</div>
          </Reveal>
          <div>
            <Reveal><p className="eyebrow">Founder</p></Reveal>
            <Reveal delay={60}><h2 className="h2 mt-3">{SITE.founder}</h2></Reveal>
            <Reveal delay={100}><p className="mt-2 text-[1.1rem] text-ink-3">Founder & engineer</p></Reveal>
            <Reveal delay={140}>
              <div className="mt-8 max-w-2xl space-y-5 text-[1.08rem] leading-relaxed text-ink-2">
                <p>Nitesh founded STDN to build software for the businesses most software forgets: the medical store, the school office, the hotel front desk.</p>
                <p>Nitesh designs and writes STDN’s products, from MedDesk’s AI bill reader to the School ERP’s payments. Clients work with the person building their software, so decisions are quick and nothing gets lost in a hand-off.</p>
              </div>
            </Reveal>
            <Reveal delay={200} className="mt-10"><WhatsAppButton label="Message Nitesh on WhatsApp" message="Hi Nitesh," /></Reveal>
          </div>
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
