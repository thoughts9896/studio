import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLink, Badge, FinalCta, Mark, Reveal, SectionHead, WhatsAppButton } from '../components/ui'
import { Stage, ScanDemo } from '../components/visual'
import { Story } from '../components/Story'
import { BillingCard, Detail, ExpiryCard, Phone, Rail, Tile } from '../components/mobile'

const products = [
  {
    to: '/meddesk',
    name: 'MedDesk',
    kind: 'Pharmacy ERP · Windows',
    badge: <Badge tone="new">Launching now</Badge>,
    text: 'Billing, stock, expiry and GST for medical stores. Snap a supplier bill and the stock fills itself in.',
    shot: 'md-netpay',
    alt: 'MedDesk billing: payment mode cash, UPI, card or credit, and the bill total ₹278 ready to save (demo shop)',
    tone: 'med' as const,
    win: 'MedDesk · Sale',
    w: '270px',
    callout: { x: 38, y: 3, label: 'F1–F4 to pay', side: 'r' as const },
  },
  {
    to: '/school-erp',
    name: 'School ERP',
    kind: 'Fees & students · Web',
    badge: <Badge>Live at erp.stdn.in</Badge>,
    text: 'Monthly fee ledgers, online payments, receipts and reminders, with a portal for parents.',
    shot: 'd-school-pay',
    alt: 'School ERP payments: monthly fees paid by Razorpay and cash (demo student)',
    tone: 'sch' as const,
    win: 'School ERP · Payments',
    w: '300px',
    callout: { x: 86, y: 96, label: 'Paid online', side: 'b' as const, len: 22 },
  },
  {
    to: '/hotel-erp',
    name: 'Hotel ERP',
    kind: 'Rooms & restaurant · Windows',
    badge: <Badge>Live</Badge>,
    text: 'Check-ins, room board, restaurant tables and GST billing for a hotel with a restaurant.',
    shot: 'd-hotel-room',
    alt: 'Hotel ERP room card: Room 101, occupied, guest, nights and running bill (demo data)',
    tone: 'htl' as const,
    win: 'Hotel ERP · Rooms',
    w: '232px',
    callout: { x: 97, y: 74, label: 'Running bill', side: 't' as const, len: 118 },
  },
]

const story = [
  {
    kicker: 'AI bill scan',
    title: 'Photo in. Stock up.',
    text: 'Take a photo of the supplier’s bill. MedDesk reads every line, including batch, expiry, MRP, rate and GST, and checks that it adds up to the printed total before anything is saved.',
    shot: 'md-scan',
    alt: 'MedDesk Import Bill: five items read from a bill photo, lines add up to the printed grand total',
    win: 'MedDesk · Import bill',
    callouts: [{ x: 40, y: 5, label: 'Matches the printed total', side: 'r' as const }],
  },
  {
    kicker: 'Billing',
    title: 'Billing at counter speed.',
    text: 'Keyboard-first billing. Sell full strips or loose tablets, hold a bill, and take cash, UPI, card or udhaar.',
    shot: 'md-cart',
    alt: 'MedDesk billing: the search box and three medicines in the current bill, each with batch, expiry and strips or loose (demo shop)',
    win: 'MedDesk · Sale',
    callouts: [{ x: 86, y: 8, label: 'Name, generic or batch', side: 't' as const }, { x: 66.5, y: 83, label: 'Strips or loose', side: 'b' as const, len: 30 }],
  },
  {
    kicker: 'Stock & expiry',
    title: 'See expiry before it costs you.',
    text: 'Near-expiry, dead stock, out-of-stock and stock value at cost and MRP. One screen, every morning.',
    shot: 'md-stock',
    alt: 'MedDesk stock: each medicine with stock, fast mover or dead stock, and its nearest expiry (demo shop)',
    win: 'MedDesk · Stock',
    callouts: [{ x: 95.5, y: 6.5, label: 'Dead stock, flagged', side: 't' as const }, { x: 85.4, y: 97.5, label: 'Days to expiry', side: 'b' as const, len: 14 }],
  },
  {
    kicker: 'Revenue & P&L',
    title: 'Know your margin. Daily.',
    text: 'Revenue, cost of goods and profit for any period, with GST reports and Excel exports ready for your CA.',
    shot: 'md-chart',
    alt: 'MedDesk Revenue and P&L: revenue, cost of goods and profit for every day this month (demo shop)',
    win: 'MedDesk · Revenue & P&L',
    callouts: [{ x: 53, y: 93.5, label: 'Profit, every day', side: 'b' as const, len: 26 }],
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
      <MobileHome />

      {/* Hero: text, both actions and a product visual all sit above the fold */}
      <section className="hidden overflow-hidden md:block md:pt-12 lg:pt-14">
        <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-12">
          <div>
            <Reveal now className="hidden sm:block"><p className="eyebrow">STDN Technologies</p></Reveal>
            <Reveal now delay={70}>
              <h1 className="display sm:mt-4 max-w-[15ch] !text-[clamp(2rem,2.6vw+1.35rem,4rem)]">Intelligent software for the businesses that run India.</h1>
            </Reveal>
            <Reveal now delay={140}>
              <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink-2 sm:mt-5 sm:text-[1.06rem] md:text-[1.18rem]">
                AI-powered products for pharmacies, schools and hotels, and custom software for companies that need their own.
              </p>
            </Reveal>
            <Reveal now delay={210} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
              <WhatsAppButton short="Talk to STDN" />
              <a href="#products" className="btn btn-ghost"><span className="sm:hidden">Explore</span><span className="hidden sm:inline">Explore products</span></a>
            </Reveal>
          </div>
          <Reveal now delay={160}>
            <Stage
              name="md-dash"
              className="hero-stage"
              alt="MedDesk pharmacy dashboard: today’s sales, purchases, low stock, expiring medicines and today’s bills (demo shop)"
              title="MedDesk · Dashboard"
              tone="med"
              eager
              reveal={false}
              only="desktop"
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 56vw, 90vw"
              float={{ name: 'md-expiry-top', alt: 'MedDesk Expiring Soon: the four nearest expiries by batch with days left (demo shop)', width: '58%', room: '13%', callout: { x: 77.5, y: 44, ly: 8, label: '11 days left', side: 't' } }}
            />
            <p className="mt-3 text-[0.8rem] text-ink-3">MedDesk, running on a demo shop.</p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="hidden md:block md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Products" title="Software we build, ship and support." lede="Three products, each made for one kind of business and the way it actually runs." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <Link to={p.to} className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-sand transition-colors hover:bg-sand-2" style={{ '--cw': p.w } as CSSProperties}>
                  <div className="p-7 pb-0 md:p-8 md:pb-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.85rem] text-ink-3">{p.kind}</p>
                      {p.badge}
                    </div>
                    <h3 className="h3 mt-4">{p.name}</h3>
                    <p className="mt-3 text-ink-2 leading-relaxed">{p.text}</p>
                    <span className="link-arrow mt-5">Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-8 md:px-5 md:pb-5">
                    <Stage name={p.shot} alt={p.alt} title={p.win} tone={p.tone} tilt="none" className="stage-card flex-1" callouts={[p.callout]} sizes="300px" only="desktop" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MedDesk sticky story */}
      <section className="hidden md:block md:pt-28">
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
      <section className="hidden bg-sand md:mt-28 md:block md:py-28">
        <div className="wrap">
          <div className="max-w-3xl">
            <Reveal><p className="eyebrow">Built on demand</p></Reveal>
            <Reveal delay={60}><h2 className="h2 mt-4">When nothing off the shelf fits, we build the one that does.</h2></Reveal>
            <Reveal delay={120}>
              <p className="lede mt-5">
                Websites, web apps, mobile apps and AI systems for businesses that need their own. The team that built MedDesk’s bill reader builds yours.
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {buildTiles.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 70} className="bg-paper p-7 md:p-8">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{t.text}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_2fr]">
            <Reveal>
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.025em]">Proof, not promises.</h3>
              <p className="mt-3 text-ink-2">Our products are where we show what we can build.</p>
            </Reveal>
            <ul className="grid gap-8 sm:grid-cols-2">
              {proof.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 60}>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1.5 text-ink-2">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="mt-14 flex flex-wrap gap-3">
            <WhatsAppButton label="Discuss your project" message="Hi STDN, I want to build" />
            <Link to="/services" className="btn btn-ghost">How we build</Link>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="hidden md:block md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Simple, from first message to launch." />
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
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
      <section className="hidden md:block md:pt-28">
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

/* ── Phones (below 768px): phone-first hero, swipe rails, detail cards, the bill-scan story ── */

const mProducts = [
  { to: '/meddesk', tone: 'med' as const, name: 'MedDesk', kind: 'Pharmacy ERP', badge: <Badge tone="new">Launching now</Badge>, text: 'Billing, stock, expiry and GST. Snap a bill, stock fills itself.', visual: <Detail name="md-sales" alt="MedDesk dashboard tile: today’s sales ₹1,292.45 from 9 bills (demo shop)" /> },
  { to: '/school-erp', tone: 'sch' as const, name: 'School ERP', kind: 'Fees & students', badge: <Badge>Live</Badge>, text: 'Fee ledgers, online payments and a parent portal.', visual: <Detail name="d-school-dues" alt="School ERP tile: 57 pending dues (demo school)" /> },
  { to: '/hotel-erp', tone: 'htl' as const, name: 'Hotel ERP', kind: 'Rooms & restaurant', badge: <Badge>Live</Badge>, text: 'Room board, table orders, KOT and GST bills.', visual: <Detail name="d-hotel-room-top" alt="Hotel ERP room tile: Room 101, occupied, ₹1,200 a night (demo data)" /> },
]

function MobileHome() {
  return (
    <div className="md:hidden">
      {/* Hero: one message, one button, and the owner's phone */}
      <section className="overflow-hidden pt-7">
        <div className="wrap">
          
            <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-[0.8rem] font-semibold text-ink-2"><Mark size={14} /> STDN Technologies</span>
          
          <h1 className="m-display mt-4">Intelligent software for the businesses that run India.</h1>
          <p className="mt-4 text-[1.06rem] leading-snug text-ink-2">AI products for pharmacies, schools and hotels. Custom software too.</p>
          <div className="mt-6"><WhatsAppButton label="Talk to STDN" className="!h-[52px] w-full justify-center" /></div>
        </div>
        <div className="relative mt-12 flex justify-center">
          <div aria-hidden="true" className="absolute left-1/2 top-[18%] h-[70%] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,118,110,0.2),rgba(15,118,110,0))]" />
          <div className="relative w-[min(68vw,264px)]">
            <Phone name="ov-today" eager className="float" alt="MedDesk Owner View on a phone: today’s net sales, bills, how customers paid and stock alerts for a demo shop" />
          </div>
        </div>
        <div className="wrap mt-6 text-center">
          <Badge tone="soon">Coming soon</Badge>
          <p className="mx-auto mt-2 max-w-[30ch] text-[0.95rem] leading-snug text-ink-2"><span className="font-semibold text-ink">MedDesk Owner View.</span> Your shop’s sales, bills and stock alerts, on your phone.</p>
        </div>
      </section>

      {/* Products */}
      <section id="products-m" className="pt-16">
        <div className="wrap">
          <p className="eyebrow">Products</p>
          <h2 className="h2 mt-3">Software we build, ship and support.</h2>
          <div className="mt-7">
            <Rail label="Products">
              {mProducts.map((p) => (
                <Link key={p.to} to={p.to} className="block h-full">
                  <Tile tone={p.tone} kicker={p.kind} title={<span className="flex items-center justify-between gap-2">{p.name}{p.badge}</span>} text={p.text}>
                    {p.visual}
                    <span className="link-arrow mt-auto pt-3 !text-ember-2">Learn more <span aria-hidden="true">→</span></span>
                  </Tile>
                </Link>
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* Spotlight: the bill-scan story, then a swipe through the rest of the day */}
      <section className="pt-16">
        <div className="wrap">
          <p className="eyebrow">Spotlight · MedDesk</p>
          <h2 className="h2 mt-3">Photo in. Stock up.</h2>
          <p className="mt-3 text-[1.02rem] leading-snug text-ink-2">Watch MedDesk read a supplier bill.</p>
          <div className="mt-5"><ScanDemo /></div>
          <h3 className="mt-6 text-[1.4rem] font-semibold tracking-[-0.025em]">The rest of the day, sorted.</h3>
          <div className="mt-5">
            <Rail label="MedDesk features">
              <Tile tone="med" kicker="Billing" title="Counter speed." text="Strips or loose. Cash, UPI or udhaar."><BillingCard /></Tile>
              <Tile tone="med" kicker="Expiry" title="See it before it costs you." text="Near-expiry and dead stock, every morning."><ExpiryCard /></Tile>
              <Tile tone="med" kicker="Profit" title="Know your margin. Daily." text="Revenue, cost and profit for any period."><Detail name="d-md-profit" alt="MedDesk Revenue and P&L: net profit ₹2,109.18, margin 24.17% (demo shop)" /></Tile>
            </Rail>
          </div>
          <div className="mt-6"><ArrowLink to="/meddesk">Everything MedDesk does</ArrowLink></div>
        </div>
      </section>

      {/* Built on demand */}
      <section className="mt-16 bg-sand py-14">
        <div className="wrap">
          <p className="eyebrow !text-ember-2">Built on demand</p>
          <h2 className="h2 mt-3">Nothing off the shelf fits? We build it.</h2>
          <p className="mt-3 text-[1.02rem] leading-snug text-ink-2">The team behind MedDesk’s bill reader builds yours.</p>
          <div className="mt-7">
            <Rail label="What we build" width="w-[72%]">
              {buildTiles.map((t, i) => (
                <div key={t.title} className="tile flex h-full flex-col bg-paper p-5">
                  <p className="text-[0.8rem] font-semibold text-ink-3">0{i + 1}</p>
                  <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.02em]">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">{t.text}</p>
                </div>
              ))}
            </Rail>
          </div>
          <ul className="mt-8 grid gap-3">
            {proof.map(([t]) => (
              <li key={t} className="flex items-center gap-3 text-[0.98rem] font-medium"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.75rem] text-paper" aria-hidden="true">✓</span>{t}</li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <WhatsAppButton label="Discuss your project" message="Hi STDN, I want to build" className="w-full justify-center" />
            <Link to="/services" className="btn btn-ghost w-full justify-center">How we build</Link>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="pt-16">
        <div className="wrap">
          <p className="eyebrow">How we work</p>
          <h2 className="h2 mt-3">First message to launch.</h2>
          <div className="mt-7">
            <Rail label="How we work" width="w-[62%]">
              {[
                ['Talk', 'WhatsApp us, in English or Hindi.'],
                ['Plan', 'A clear scope, timeline and quote.'],
                ['Build', 'Working software early, shaped by you.'],
                ['Launch', 'We go live with you and stay reachable.'],
              ].map(([t, d], i) => (
                <div key={t} className="h-full rounded-[24px] border border-line p-5">
                  <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-ink-3">0{i + 1}</p>
                  <h3 className="mt-5 text-[1.2rem] font-semibold">{t}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-2">{d}</p>
                </div>
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* Talk to STDN */}
      <section className="pt-16">
        <div className="wrap">
          <div className="rounded-[28px] bg-sand p-6">
            <Mark size={52} />
            <h2 className="mt-5 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em]">Real people, one message away.</h2>
            <p className="mt-3 text-[1rem] leading-snug text-ink-2">Message us in English or Hindi. An STDN expert will call and show you a demo.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
