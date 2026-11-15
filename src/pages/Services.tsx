import { Link } from 'react-router-dom'
import { ArrowLink, FinalCta, Reveal, SectionHead, Shot, WhatsAppButton } from '../components/ui'

const MSG = 'Hi STDN, I want to build'

const offers = [
  {
    id: 'websites',
    title: 'Websites',
    lede: 'Fast, clear, built to bring in enquiries.',
    points: ['Company and product sites', 'Fast on budget phones and slow networks', 'Search basics, analytics and WhatsApp built in', 'Easy to update after launch'],
  },
  {
    id: 'web-apps',
    title: 'Web apps & portals',
    lede: 'Software that fits how your business already works.',
    points: ['Dashboards, billing, booking and inventory', 'Customer and parent portals', 'Online payments and receipts', 'Roles, audit logs and backups'],
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    lede: 'Apps for your customers or your team in the field.',
    points: ['Android and iOS', 'Connected to your existing systems', 'Designed for one-hand, on-the-go use', 'Store listing and release'],
  },
  {
    id: 'ai',
    title: 'AI systems',
    lede: 'AI that does real work, with checks you can trust.',
    points: ['Chatbots on your website that answer from your own content', 'WhatsApp bots for orders, bookings and support', 'Document reading: bills, invoices and forms into clean data', 'Automation for repetitive office work'],
  },
]

const work = [
  { name: 'MedDesk', what: 'AI bill reading, offline desktop app, GST', to: '/meddesk' },
  { name: 'School ERP', what: 'Payments, parent portal, automated reminders', to: '/school-erp' },
  { name: 'Hotel ERP', what: 'Rooms, restaurant, KOT and thermal printing', to: '/hotel-erp' },
]

export default function Services() {
  return (
    <>
      <section className="pt-10 md:pt-16">
        <div className="wrap">
          <Reveal><p className="eyebrow">Custom software</p></Reveal>
          <Reveal delay={70}><h1 className="display mt-5 max-w-[14ch]">Your software, built properly.</h1></Reveal>
          <Reveal delay={140}>
            <p className="lede mt-7 max-w-2xl">
              Websites, web apps, mobile apps and AI systems for businesses that need something of their own. Built by the team behind MedDesk, School ERP and Hotel ERP.
            </p>
          </Reveal>
          <Reveal delay={210} className="mt-10 flex flex-wrap gap-3">
            <WhatsAppButton label="Tell us what you need" message={MSG} />
          </Reveal>
        </div>
      </section>

      <section className="pt-16 md:pt-24">
        <div className="wrap divide-y divide-line border-y border-line">
          {offers.map((o) => (
            <div key={o.id} id={o.id} className="grid gap-6 py-12 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-16">
              <Reveal>
                <h2 className="h3 !text-[clamp(1.6rem,2vw+1rem,2.4rem)]">{o.title}</h2>
                <p className="mt-3 text-[1.1rem] text-ink-2">{o.lede}</p>
              </Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {o.points.map((pt, i) => (
                  <Reveal as="li" key={pt} delay={i * 50} className="rounded-2xl bg-sand px-5 py-4 text-[0.98rem] leading-snug">{pt}</Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="Proof" title="Our own products are the portfolio." lede="Each one solves a problem you may have too: reading documents, taking payments, running offline, automating reminders." />
          <div className="mt-14">
            <Shot name="md-scan" alt="MedDesk reading a supplier bill with AI and matching it to the printed total" zoom />
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {work.map((w, i) => (
              <Reveal as="li" key={w.name} delay={i * 70}>
                <Link to={w.to} className="block h-full rounded-[20px] border border-line p-6 transition-colors hover:bg-sand">
                  <p className="text-[1.15rem] font-semibold">{w.name}</p>
                  <p className="mt-1.5 text-ink-2">{w.what}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Clear steps. No surprises." />
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              ['Talk', 'A WhatsApp message or a call. Tell us the problem, not the technology.'],
              ['Plan', 'A written scope, timeline and quote before any work starts.'],
              ['Build', 'Working software early, so you can steer while it is built.'],
              ['Launch & support', 'Go-live with you, then fixes and improvements as you grow.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 80} className="border-t border-ink pt-5">
                <p className="text-[0.85rem] font-semibold text-ink-3">0{i + 1}</p>
                <h3 className="mt-2 text-[1.2rem] font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12"><ArrowLink to="/about">About STDN</ArrowLink></Reveal>
        </div>
      </section>

      <FinalCta title="Tell us what you want to build." text="A few lines on WhatsApp are enough to start. We’ll reply with questions, then a plan." message={MSG} />
    </>
  )
}
