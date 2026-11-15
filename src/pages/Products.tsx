import { Link } from 'react-router-dom'
import { Badge, FinalCta, Reveal, Shot } from '../components/ui'

const items = [
  { to: '/meddesk', name: 'MedDesk', badge: <Badge tone="new">Launching now</Badge>, kind: 'Pharmacy ERP for Windows', text: 'Billing, stock, expiry, purchases and GST for medical stores, with AI that reads supplier bills.', shot: 'md-billing', alt: 'MedDesk billing screen (demo shop)' },
  { to: '/school-erp', name: 'School ERP', badge: <Badge>Live at erp.stdn.in</Badge>, kind: 'Web app for schools', text: 'Fee ledgers, online payments, receipts, reminders and a parent portal.', shot: 'school-ledgers', alt: 'School ERP fee ledgers (demo school)' },
  { to: '/hotel-erp', name: 'Hotel ERP', badge: <Badge>Live</Badge>, kind: 'Hotel & restaurant app for Windows', text: 'Rooms, check-ins, restaurant tables, kitchen tickets and GST billing.', shot: 'hotel-restaurant', alt: 'Hotel ERP restaurant floor plan (demo data)' },
]

export default function Products() {
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="wrap">
          <Reveal><p className="eyebrow">Products</p></Reveal>
          <Reveal delay={70}><h1 className="display mt-5 max-w-[14ch]">Software that runs real businesses.</h1></Reveal>
          <Reveal delay={140}><p className="lede mt-7 max-w-2xl">Each STDN product is built for one kind of business, around how its day actually goes.</p></Reveal>
        </div>
      </section>
      <section className="pt-20 md:pt-28">
        <div className="wrap space-y-24 md:space-y-36">
          {items.map((it) => (
            <div key={it.name} className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="h2">{it.name}</h2>
                  {it.badge}
                </div>
                <p className="mt-3 text-ink-3">{it.kind}</p>
                <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2">{it.text}</p>
                <Link to={it.to} className="btn btn-ink mt-8">Explore {it.name}</Link>
              </Reveal>
              <Shot name={it.shot} alt={it.alt} sizes="(min-width: 1024px) 700px, 100vw" zoom />
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  )
}
