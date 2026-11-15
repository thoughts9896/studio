import { Link } from 'react-router-dom'
import { ArrowLink, Badge, FinalCta, Mark, Reveal, SectionHead, Shot, WhatsAppButton } from '../components/ui'
import { Story } from '../components/Story'

const products = [
  {
    to: '/meddesk',
    name: 'MedDesk',
    kind: 'Pharmacy ERP · Windows',
    badge: <Badge tone="new">Launching now</Badge>,
    text: 'Billing, stock, expiry and GST for medical stores. Snap a supplier bill and the stock fills itself in.',
    shot: 'md-dashboard',
    alt: 'MedDesk dashboard with today’s sales, expiring stock and today’s bills (demo shop)',
  },
  {
    to: '/school-erp',
    name: 'School ERP',
    kind: 'Fees & students · Web',
    badge: <Badge>Live at erp.stdn.in</Badge>,
    text: 'Monthly fee ledgers, online payments, receipts and reminders, with a portal for parents.',
    shot: 'school-dashboard',
    alt: 'School ERP principal dashboard with students, pending dues and revenue (demo school)',
  },
  {
    to: '/hotel-erp',
    name: 'Hotel ERP',
    kind: 'Rooms & restaurant · Windows',
    badge: <Badge>Live</Badge>,
    text: 'Check-ins, room board, restaurant tables and GST billing for a hotel with a restaurant.',
    shot: 'hotel-rooms',
    alt: 'Hotel ERP room board showing occupied and available rooms (demo data)',
  },
]

const story = [
  {
    kicker: 'AI bill scan',
    title: 'Photo in. Stock up.',
    text: 'Take a photo of the supplier’s bill. MedDesk reads every line, including batch, expiry, MRP, rate and GST, and checks that it adds up to the printed total before anything is saved.',
    shot: 'md-scan',
    alt: 'MedDesk Import Bill: five items read from a bill photo, lines add up to the printed grand total',
  },
  {
    kicker: 'Billing',
    title: 'Billing at counter speed.',
    text: 'Keyboard-first billing. Sell full strips or loose tablets, hold a bill, and take cash, UPI, card or udhaar.',
    shot: 'md-billing',
    alt: 'MedDesk billing screen with three medicines in the current bill',
  },
  {
    kicker: 'Stock & expiry',
    title: 'See expiry before it costs you.',
    text: 'Near-expiry, dead stock, out-of-stock and stock value at cost and MRP. One screen, every morning.',
    shot: 'md-stock',
    alt: 'MedDesk stock screen with health, nearest expiry and stock value per medicine',
  },
  {
    kicker: 'Revenue & P&L',
    title: 'Know your margin. Daily.',
    text: 'Revenue, cost of goods and profit for any period, with GST reports and Excel exports ready for your CA.',
    shot: 'md-pnl',
    alt: 'MedDesk Revenue and P&L with a daily revenue, cost and profit chart',
  },
]

const buildTiles = [
  { title: 'Websites', text: 'Fast, clear sites that bring in enquiries, not just compliments.' },
  { title: 'Web apps & portals', text: 'Dashboards, booking, billing and customer portals that fit how you work.' },
  { title: 'Mobile apps', text: 'Android and iOS apps for your customers or your field team.' },
  { title: 'AI systems', text: 'Chatbots on your website, WhatsApp bots, document reading and automation that removes busywork.' },
]

const proof = [
  ['AI document reading', 'MedDesk turns a bill photo into checked purchase lines.'],
  ['Online payments', 'School ERP collects fees through Razorpay and issues receipts.'],
  ['Offline-first desktop apps', 'MedDesk and Hotel ERP keep running without internet.'],
  ['WhatsApp & email automation', 'School ERP sends fee reminders on its own.'],
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden pt-16 md:pt-28">
        <div className="wrap text-center">
          <Reveal><p className="eyebrow">STDN Technologies</p></Reveal>
          <Reveal delay={70}>
            <h1 className="display mx-auto mt-5 max-w-[16ch]">Intelligent software for the businesses that run India.</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede mx-auto mt-7 max-w-2xl">
              We build AI-powered products for pharmacies, schools and hotels, and custom software for companies that need their own.
            </p>
          </Reveal>
          <Reveal delay={210} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton />
            <a href="#products" className="btn btn-ghost">Explore products</a>
          </Reveal>
        </div>
        <div className="wrap mt-16 md:mt-24">
          <Shot name="md-dashboard" alt="MedDesk pharmacy dashboard: today’s sales, purchases, expiring stock and today’s bills (demo shop)" zoom eager phoneCrop />
          <p className="mt-4 text-center text-[0.8rem] text-ink-3">MedDesk, running on a demo shop.</p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="pt-32 md:pt-44">
        <div className="wrap">
          <SectionHead eyebrow="Products" title="Software we build, ship and support." lede="Three products, each made for one kind of business and the way it actually runs." />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <Link to={p.to} className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-sand transition-colors hover:bg-sand-2">
                  <div className="p-7 pb-0 md:p-8 md:pb-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.85rem] text-ink-3">{p.kind}</p>
                      {p.badge}
                    </div>
                    <h3 className="h3 mt-4">{p.name}</h3>
                    <p className="mt-3 text-ink-2 leading-relaxed">{p.text}</p>
                    <span className="link-arrow mt-5">Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                  </div>
                  <div className="mt-8 translate-x-7 translate-y-1 transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:translate-x-5 md:translate-x-8">
                    <Shot name={p.shot} alt={p.alt} sizes="(min-width: 1024px) 420px, 92vw" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MedDesk sticky story */}
      <section className="pt-32 md:pt-44">
        <div className="wrap">
          <SectionHead
            eyebrow="Spotlight · MedDesk"
            title={<>A medical store, run on one screen.</>}
            lede="MedDesk is our pharmacy ERP for Windows. It handles the counter, the shelf and the books, with AI where it saves the most time."
          />
          <div className="mt-6 lg:mt-0">
            <Story steps={story} />
          </div>
          <Reveal className="mt-10 lg:mt-4">
            <ArrowLink to="/meddesk">Everything MedDesk does</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Built on demand */}
      <section className="mt-32 bg-ink py-28 text-paper md:mt-44 md:py-40">
        <div className="wrap">
          <div className="max-w-3xl">
            <Reveal><p className="eyebrow !text-[#f0a37f]">Built on demand</p></Reveal>
            <Reveal delay={60}><h2 className="h2 mt-4">When nothing off the shelf fits, we build the one that does.</h2></Reveal>
            <Reveal delay={120}>
              <p className="lede mt-5 !text-paper/75">
                Websites, web apps, mobile apps and AI systems for businesses that need their own. The team that built MedDesk’s bill reader builds yours.
              </p>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[22px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {buildTiles.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 70} className="bg-ink p-7 md:p-8">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-paper/70">{t.text}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-20 grid gap-10 border-t border-white/15 pt-12 md:grid-cols-[1fr_2fr]">
            <Reveal>
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.025em]">Proof, not promises.</h3>
              <p className="mt-3 text-paper/70">Our products are where we show what we can build.</p>
            </Reveal>
            <ul className="grid gap-8 sm:grid-cols-2">
              {proof.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 60}>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1.5 text-paper/70">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="mt-14 flex flex-wrap gap-3">
            <WhatsAppButton label="Discuss your project" message="Hi STDN, I want to build" className="!bg-paper !text-ink hover:!bg-white" />
            <Link to="/services" className="btn text-paper shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] hover:bg-white/10">How we build</Link>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="pt-32 md:pt-44">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Simple, from first message to launch." />
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {[
              ['Talk', 'Message us on WhatsApp. Describe the problem in your own words, in English or Hindi.'],
              ['Plan', 'We come back with a clear scope, a timeline and a quote.'],
              ['Build', 'You see working software early and give feedback as it takes shape.'],
              ['Launch', 'We launch it with you and stay reachable after go-live.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 80} className="border-t border-ink pt-5">
                <p className="text-[0.85rem] font-semibold text-ink-3">0{i + 1}</p>
                <h3 className="mt-2 text-[1.25rem] font-semibold tracking-[-0.02em]">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Talk to STDN */}
      <section className="pt-32 md:pt-44">
        <div className="wrap">
          <div className="grid items-center gap-12 rounded-[28px] bg-sand p-8 md:grid-cols-[auto_1fr] md:gap-16 md:p-14">
            <Reveal>
              <Mark size={88} className="md:h-44 md:w-44" />
            </Reveal>
            <div>
              <Reveal><p className="eyebrow">Talk to STDN</p></Reveal>
              <Reveal delay={60}><h2 className="h3 mt-3 !text-[clamp(1.6rem,2.4vw+0.8rem,2.6rem)]">Real people, one message away.</h2></Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ink-2">
                  Message STDN on WhatsApp, in English or Hindi. Our team will get back to you, and an STDN expert will call to understand how your business runs and show you a demo. After go-live, the same team stays with you for help and updates.
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-8">
                <WhatsAppButton label="Talk to STDN" message="Hi STDN, I would like to talk about" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
